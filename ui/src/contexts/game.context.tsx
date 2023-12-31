import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { IRole } from '@/interfaces/useGetGameSttate';
import { IGameContext, IGameState, IRoomInfoState } from '@/interfaces/game.context';
import { API_URL, NUMBER_COLUMN, PARENT_PATH, PARENT_PATH_V2 } from '@/configs';
import CreateRoom from '@/modules/Home/components/CreateRoom';
import { IGameMapper, Player, WinnerState } from '@/interfaces/useGetGames';
import { WalletContext } from '@/contexts/wallet.context';
import JoinRoom from '@/modules/Home/components/JoinRoom';
import useMakeMoves from '@/hooks/useMakeMoves';
import useGetGameState from '@/hooks/useGetGameState';
import useGetGames from '@/hooks/useGetGames';
import { getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';
import { throttle } from 'lodash';
import GameEnd from '@/modules/Home/components/GameEnd';
import useCheckPlayerState, { IGetPlayerState, INIT_PLAYER_STATE } from '@/hooks/useCheckPlayerState';
import useAsyncEffect from 'use-async-effect';
import AutoMatchRoom from '@/modules/Home/components/AutoMatchRoom';
import useCountDown from '@/hooks/useCountDown';
import useContractSigner from '@/hooks/useContractSigner';
import axios from 'axios';
import { ellipsisCenter } from 'tc-formatter';

const initialValue: IGameContext = {
  squares: [],
  loading: false,
  turn: IRole.X,
  gameInfo: undefined,
  localState: {},
  playerState: { ...INIT_PLAYER_STATE },
  loadedPlayerState: false,
  counter: 0,
  lastMoveIndex: undefined,

  showJoinRoom: false,
  showCreateRoom: false,
  showAutoMatchRoom: false,
  roomInfo: undefined,

  resetGame: () => undefined,
  setShowCreateRoom: () => undefined,
  setShowJoinRoom: () => undefined,
  setShowAutoMatchRoom: () => undefined,

  onJoinRoom: () => undefined,
  updateSquares: () => undefined,
  setGameInfo: () => undefined,
};

const INIT_ARRAY = Array(NUMBER_COLUMN * NUMBER_COLUMN).fill(IRole.Empty);

export const GameContext = React.createContext(initialValue);

let intervalGameState: any | undefined = undefined;

export const GameProvider = ({ children }: PropsWithChildren) => {
  const { keySet, address } = useContext(WalletContext);
  const [loading, setLoading] = React.useState(false);
  const [loadedPlayerState, setLoadedPlayerState] = React.useState(false);
  const [squares, setSquares] = React.useState(INIT_ARRAY);
  const [turn, setTurn] = React.useState(IRole.Empty);
  const [localState, setLocalState] = React.useState<{ [key: number]: IRole }>({});
  const [playerState, setPlayerState] = React.useState<IGetPlayerState>({ ...INIT_PLAYER_STATE });
  const [lastMove, setLastMove] = React.useState<number | undefined>(undefined);

  const { counter, updateTime } = useCountDown();

  const { onMakeMoves } = useMakeMoves();
  const { onGetGameState } = useGetGameState();
  const { onGetWinner, onWaitingGames } = useGetGames();
  const { onCheckPlayer } = useCheckPlayerState();

  const [showJoinRoom, setShowJoinRoom] = React.useState(false);
  const [showCreateRoom, setShowCreateRoom] = React.useState(false);
  const [showAutoMatchRoom, setShowAutoMatchRoom] = React.useState(false);

  const [gameInfo, setGameInfo] = React.useState<IGameState | undefined>(undefined);
  const [roomInfo, setRoomInfo] = useState<IRoomInfoState | undefined>(undefined);

  const contractSigner = useContractSigner();
  const resetGame = () => {
    setSquares(INIT_ARRAY);
    updateTime(undefined);
    setTurn(IRole.Empty);
    setGameInfo(undefined);
    setLoading(false);
    setShowJoinRoom(false);
    setShowCreateRoom(false);
    setShowAutoMatchRoom(false);
    setLocalState({});
    setPlayerState({ ...INIT_PLAYER_STATE });
    setLastMove(undefined);
  };

  const onJoinRoom = async ({ games, gameID }: { games: IGameMapper; gameID: string }) => {
    console.log('JOIN ROOM ___', games);
    if (!keySet.address) return resetGame();
    resetGame();
    const isPlayer1 = keySet.address.toLowerCase() === games.player1.toLowerCase();
    const myRolePlayer = isPlayer1 ? Player.Player1 : Player.Player2;
    const myTurn = isPlayer1 ? IRole.X : IRole.O;
    const competitorAddress = isPlayer1 ? games.player2 : games.player1;

    const detail1 = await fetchPlayer(keySet?.address);
    const detail2 = await fetchPlayer(competitorAddress);

    setGameInfo({
      gameID,
      myRolePlayer,
      winner: games.winner,
      myTurn,
      competitorAddress,
      player1: {
        address: keySet?.address || '',
        name: detail1.twitter_name || ellipsisCenter({ str: keySet?.address, limit: 5 }),
        avatar: detail1?.twitter_avatar || '',
      },
      player2: {
        address: competitorAddress || '',
        name: detail2.twitter_name || ellipsisCenter({ str: competitorAddress, limit: 5 }),
        avatar: detail2?.twitter_avatar || '',
      },
    });
  };

  console.log('Game Info ====___', gameInfo);

  const updateInfoForWatcher = async (matchData: any) => {
    const detail1 = await fetchPlayer(matchData?.player1);
    const detail2 = await fetchPlayer(matchData?.player2);

    setGameInfo(value =>
      value
        ? {
            ...value,
            infoForWatcher: {
              player1: matchData.player1,
              player2: matchData.player2,
            },
            player2: {
              address: matchData?.player1 || '',
              name: detail1.twitter_name || ellipsisCenter({ str: matchData?.player1, limit: 5 }),
              avatar: detail1?.twitter_avatar || '',
            },
            player1: {
              address: matchData?.player2 || '',
              name: detail2.twitter_name || ellipsisCenter({ str: matchData?.player2, limit: 5 }),
              avatar: detail2?.twitter_avatar || '',
            },
          }
        : undefined,
    );
  };

  const _onGetGameState = async (gameID: string) => {
    try {
      const [gameState, winner] = await Promise.all([await onGetGameState(gameID), onGetWinner({ gameID })]);
      // console.log('gameState___', gameState);
      // console.log('winner___', winner);
      if (gameState) {
        const { squares: newSquares, newTurn, timeLeftCurrTurn, matchData, drawOffer } = gameState;
        setSquares(newSquares);
        setTurn(newTurn);
        if (gameInfo?.infoForWatcher && !gameInfo?.infoForWatcher.player1 && !gameInfo?.infoForWatcher.player2) {
          updateInfoForWatcher(matchData);
        }
        // if (typeof drawOffer === 'number') {
        //   setGameInfo(value =>
        //     value
        //       ? {
        //           ...value,
        //           drawOffer,
        //         }
        //       : undefined,
        //   );
        // }

        if (newTurn !== turn) {
          const lastMoveIndex = newSquares.findIndex((square, index) => squares[index] !== square);
          setLastMove(lastMoveIndex);
          const timeLeftNumb = Number(timeLeftCurrTurn || '0');
          updateTime(timeLeftNumb - 5);
          console.log('LOGGER----TIME LEFT: ', timeLeftNumb);
          // const _timeLeft = timeLeftNumb >= 47 ? 47 : timeLeftNumb;
          // updateTime(_timeLeft - 3);
        }
      }

      if (winner) {
        setGameInfo(value =>
          value
            ? {
                ...value,
                winner: winner,
              }
            : undefined,
        );
      }
    } catch (error) {
      const { desc } = getErrorMessage(error);
      console.log('error get game state__', error);
      toast.error('Transaction game state failed!');
      setTimeout(() => {
        window.top?.postMessage({ tokenRoom: roomInfo?.roomId, status: 'CLOSE' }, '*');
      }, 3000);
      // toast.error(desc);
    }
  };

  const onFetchAfterBack = async (gameID: string) => {
    try {
      const games = await onWaitingGames(gameID);
      console.log('mememe:', games);
      if (games) {
        onJoinRoom({
          games,
          gameID,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const throttleOnGetGameState = throttle(_onGetGameState, 300);

  const updateSquares = async (ind: string | number) => {
    if (squares[Number(ind)] || !gameInfo?.gameID || loading || turn !== gameInfo.myTurn || !counter) return;
    try {
      setLoading(true);
      setLocalState(value => ({ ...value, [ind]: gameInfo.myTurn }));
      setLastMove(Number(ind));
      const { games } =
        (await onMakeMoves({
          gameID: gameInfo.gameID,
          moveIdx: ind,
          myRolePlayer: gameInfo.myRolePlayer,
        })) || {};

      if (games?.winner && games?.winner !== WinnerState.Playing) {
        setGameInfo(value =>
          value
            ? {
                ...value,
                winner: games.winner,
              }
            : value,
        );
      }
    } catch (error) {
      setLocalState(value => ({ ...value, [ind]: IRole.Empty }));
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    } finally {
      setLoading(false);
    }
  };

  const onCheckPlayerState = async () => {
    const state = await onCheckPlayer();
    setPlayerState(state);
    setLoadedPlayerState(true);
  };

  const throttleUpdateSquares = throttle(updateSquares, 500);
  const throttleOnCheckPlayerState = throttle(onCheckPlayerState, 500);

  const clearGameState = () => {
    if (intervalGameState) {
      clearInterval(intervalGameState);
      intervalGameState = undefined;
    }
  };

  React.useEffect(() => {
    if (!gameInfo?.gameID) {
      if (intervalGameState) {
        clearGameState();
      }
      return;
    }
    if (gameInfo?.winner !== '0') {
      if (intervalGameState) {
        clearGameState();
      }
      return;
    }
    throttleOnGetGameState(gameInfo.gameID);
    intervalGameState = setInterval(() => throttleOnGetGameState(gameInfo.gameID), 1000);
    return () => {
      clearGameState();
    };
  }, [gameInfo?.gameID, gameInfo?.winner, turn, squares]);

  const fetchPlayer = async (player_address: any) => {
    if (!player_address) return '';
    try {
      const rs: any = await axios.get(`${API_URL}/api/player-share/profile/v3`, {
        params: {
          network: 'nos',
          player_address: player_address.toLocaleLowerCase(),
          address: '',
        },
      });
      console.log('RS NAME: ', rs);
      if (rs.data.result) {
        const detail = rs.data.result;
        return detail;
      }
    } catch (error) {
      console.log('error get player');
    } finally {
    }
  };

  // useEffect(() => {
  //   if (gameInfo?.player1?.name && gameInfo?.player2?.name) return;
  //   if (gameInfo?.competitorAddress) {
  //     (async () => {
  //       const detail1 = await fetchPlayer(keySet?.address);
  //       const detail2 = await fetchPlayer(gameInfo?.competitorAddress);
  //       setGameInfo({
  //         ...gameInfo,
  //         player1: {
  //           address: keySet?.address || '',
  //           name: detail1.twitter_name || ellipsisCenter({ str: keySet?.address, limit: 5 }),
  //           avatar: detail1?.twitter_avatar || '',
  //         },
  //         player2: {
  //           address: gameInfo?.competitorAddress || '',
  //           name: detail2.twitter_name || ellipsisCenter({ str: gameInfo?.competitorAddress, limit: 5 }),
  //           avatar: detail2?.twitter_avatar || '',
  //         },
  //       });
  //     })();
  //   }
  //   if (gameInfo?.infoForWatcher) {
  //     (async () => {
  //       console.log('hehehehe');
  //       const detail1 = await fetchPlayer(gameInfo?.infoForWatcher?.player1);
  //       const detail2 = await fetchPlayer(gameInfo?.infoForWatcher?.player2);
  //       setGameInfo({
  //         ...gameInfo,
  //         player2: {
  //           address: gameInfo?.infoForWatcher?.player1 || '',
  //           name: detail1.twitter_name || ellipsisCenter({ str: gameInfo?.infoForWatcher?.player1, limit: 5 }),
  //           avatar: detail1?.twitter_avatar || '',
  //         },
  //         player1: {
  //           address: gameInfo?.infoForWatcher?.player2 || '',
  //           name: detail2.twitter_name || ellipsisCenter({ str: gameInfo?.infoForWatcher?.player2, limit: 5 }),
  //           avatar: detail2?.twitter_avatar || '',
  //         },
  //       });
  //     })();
  //   }
  // }, [gameInfo]);

  useEffect(() => {
    console.log('contractSigner___', contractSigner);

    if (roomInfo) return;

    window.addEventListener('message', function (event) {
      console.log('event before: ', event.data);
      // if (event.origin === PARENT_PATH) {
      // }
    });
    if (!contractSigner) return;
    window.top?.postMessage({ status: 'LOADED' }, '*');

    window.addEventListener('message', function (event) {
      const data = event.data;
      // setStoreData(event?.data);
      console.log('EVENT___', event.data);

      if (typeof data === 'object') {
        switch (data?.status) {
          case 'PLAY':
            setShowCreateRoom(true);
            setRoomInfo({
              roomId: data?.tokenRoom,
              reward: data?.reward.toString(),
              status: 'PLAY',
            });
            break;
          case 'CONTINUE':
            setRoomInfo({
              roomId: data?.tokenRoom,
              reward: data?.reward.toString(),
              status: 'CONTINUE',
            });
            onFetchAfterBack(data?.gameId);

            break;
          case 'WATCH':
            setRoomInfo({
              roomId: data?.tokenRoom,
              reward: data?.reward.toString(),
              status: 'WATCH',
            });
            setGameInfo({
              myRolePlayer: Player.Empty,
              winner: WinnerState.Playing,
              myTurn: IRole.O,
              competitorAddress: '',
              gameID: data?.gameId,
              infoForWatcher: {
                player1: '',
                player2: '',
              },
            });
            break;
          default:
            break;
        }
      }
    });
  }, [contractSigner, roomInfo]);

  useAsyncEffect(async () => {
    if (!address) return;
    await throttleOnCheckPlayerState();
    const interval = setInterval(throttleOnCheckPlayerState, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [address]);

  const contextValues = React.useMemo(() => {
    return {
      squares,
      showJoinRoom,
      showCreateRoom,
      showAutoMatchRoom,
      loading,
      resetGame,
      turn,
      setShowJoinRoom,
      setShowCreateRoom,
      setShowAutoMatchRoom,
      gameInfo,
      onJoinRoom,
      updateSquares: throttleUpdateSquares,
      localState,
      playerState,
      loadedPlayerState,
      counter,
      lastMoveIndex: lastMove,
      roomInfo,
      setGameInfo,
    };
  }, [
    squares,
    showJoinRoom,
    showCreateRoom,
    showAutoMatchRoom,
    loading,
    resetGame,
    turn,
    setShowJoinRoom,
    setShowCreateRoom,
    gameInfo,
    onJoinRoom,
    throttleUpdateSquares,
    localState,
    playerState,
    loadedPlayerState,
    setShowAutoMatchRoom,
    counter,
    lastMove,
    roomInfo,
    setGameInfo,
  ]);

  return (
    <GameContext.Provider value={contextValues}>
      {children}
      {showCreateRoom && <CreateRoom />}
      {showJoinRoom && <JoinRoom />}
      {showAutoMatchRoom && <AutoMatchRoom />}
      {gameInfo?.winner && gameInfo.winner !== WinnerState.Playing && <GameEnd />}
    </GameContext.Provider>
  );
};
