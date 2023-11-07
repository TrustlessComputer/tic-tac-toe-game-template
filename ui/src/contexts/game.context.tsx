import React, { PropsWithChildren, useContext, useEffect, useState } from 'react';
import { IRole } from '@/interfaces/useGetGameSttate';
import { IGameContext, IGameState, IRoomInfoState } from '@/interfaces/game.context';
import { NUMBER_COLUMN, PARENT_PATH } from '@/configs';
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
  const { onGetWinner } = useGetGames();
  const { onCheckPlayer } = useCheckPlayerState();

  const [showJoinRoom, setShowJoinRoom] = React.useState(false);
  const [showCreateRoom, setShowCreateRoom] = React.useState(false);
  const [showAutoMatchRoom, setShowAutoMatchRoom] = React.useState(false);

  const [gameInfo, setGameInfo] = React.useState<IGameState | undefined>(undefined);
  const [roomInfo, setRoomInfo] = useState<IRoomInfoState | undefined>(undefined);

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

  const onJoinRoom = ({ games, gameID }: { games: IGameMapper; gameID: string }) => {
    if (!keySet.address) return resetGame();
    resetGame();
    const isPlayer1 = keySet.address.toLowerCase() === games.player1.toLowerCase();
    const myRolePlayer = isPlayer1 ? Player.Player1 : Player.Player2;
    const myTurn = isPlayer1 ? IRole.X : IRole.O;
    const competitorAddress = isPlayer1 ? games.player2 : games.player1;
    setGameInfo({
      gameID,
      myRolePlayer,
      winner: games.winner,
      myTurn,
      competitorAddress,
    });
  };

  console.log('Game Info ====___', gameInfo);

  const _onGetGameState = async (gameID: string) => {
    try {
      const [gameState, winner] = await Promise.all([await onGetGameState(gameID), onGetWinner({ gameID })]);
      console.log('gameState___', gameState);
      console.log('winner___', winner);
      if (gameState) {
        const { squares: newSquares, newTurn, timeLeftCurrTurn, matchData } = gameState;
        setSquares(newSquares);
        setTurn(newTurn);
        if (gameInfo?.infoForWatcher && !gameInfo?.infoForWatcher.player1 && !gameInfo?.infoForWatcher.player2) {
          setGameInfo(value =>
            value
              ? {
                  ...value,
                  infoForWatcher: {
                    player1: matchData.player1,
                    player2: matchData.player2,
                  },
                }
              : undefined,
          );
        }
        if (newTurn !== turn) {
          const lastMoveIndex = newSquares.findIndex((square, index) => squares[index] !== square);
          setLastMove(lastMoveIndex);
          const timeLeftNumb = Number(timeLeftCurrTurn || '0');
          console.log('LOGGER----TIME LEFT: ', timeLeftNumb);
          const _timeLeft = timeLeftNumb >= 30 ? 30 : timeLeftNumb;
          updateTime(_timeLeft);
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
      toast.error(desc);
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

      console.log('aabb__', games);
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

  useEffect(() => {
    window.addEventListener('message', function (event) {
      console.log('EVENT___', event);
      console.log('Parent Path___', PARENT_PATH);
      if (event.origin.includes(PARENT_PATH)) {
        const data = event.data;

        // console.log('EVENT___', event.data);

        if (typeof data === 'object') {
          switch (data?.status) {
            case 'PLAY':
              setShowCreateRoom(true);
              setRoomInfo({
                roomId: data?.tokenRoom,
                reward: data?.reward.toString(),
              });
              break;
            case 'WATCH':
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
      }
    });
  }, []);

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
