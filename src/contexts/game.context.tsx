import React, { PropsWithChildren, useContext } from 'react';
import { IRole } from '@/interfaces/useGetGameSttate';
import { IGameContext, IGameState } from '@/interfaces/game.context';
import { NUMBER_COLUMN } from '@/configs';
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

const initialValue: IGameContext = {
  squares: [],
  loading: false,
  turn: IRole.X,
  gameInfo: undefined,
  localState: {},
  playerState: { ...INIT_PLAYER_STATE },

  showJoinRoom: false,
  showCreateRoom: false,

  resetGame: () => undefined,
  setShowCreateRoom: () => undefined,
  setShowJoinRoom: () => undefined,

  onJoinRoom: () => undefined,
  updateSquares: () => undefined,
};

const INIT_ARRAY = Array(NUMBER_COLUMN * NUMBER_COLUMN).fill(IRole.Empty);

export const GameContext = React.createContext(initialValue);

let interval: any | undefined = undefined;

export const GameProvider = ({ children }: PropsWithChildren) => {
  const { keySet } = useContext(WalletContext);
  const [loading, setLoading] = React.useState(false);
  const [squares, setSquares] = React.useState(INIT_ARRAY);
  const [turn, setTurn] = React.useState(IRole.X);
  const [localState, setLocalState] = React.useState<{ [key: number]: IRole }>({});
  const [playerState, setPlayerState] = React.useState<IGetPlayerState>({ ...INIT_PLAYER_STATE });

  const { onMakeMoves } = useMakeMoves();
  const { onGetGameState } = useGetGameState();
  const { onGetWinner } = useGetGames();
  const { onCheckPlayer } = useCheckPlayerState();

  const [showJoinRoom, setShowJoinRoom] = React.useState(false);
  const [showCreateRoom, setShowCreateRoom] = React.useState(false);

  const [gameInfo, setGameInfo] = React.useState<IGameState | undefined>(undefined);

  const resetGame = () => {
    setSquares(INIT_ARRAY);
    setTurn(IRole.X);
    setGameInfo(undefined);
    setLoading(false);
    setShowJoinRoom(false);
    setShowCreateRoom(false);
    setLocalState({});
    setPlayerState({ ...INIT_PLAYER_STATE });
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

  const _onGetGameState = async (gameID: string) => {
    try {
      const [gameState, winner] = await Promise.all([await onGetGameState(gameID), onGetWinner({ gameID })]);
      if (gameState) {
        const { squares, newTurn } = gameState;
        setSquares(squares);
        setTurn(newTurn);
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

  const updateSquares = async (ind: string | number) => {
    if (squares[Number(ind)] || !gameInfo?.gameID || loading || turn !== gameInfo.myTurn) return;
    try {
      setLoading(true);
      setLocalState(value => ({ ...value, [ind]: gameInfo.myTurn }));
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
      const { desc } = getErrorMessage(error);
      toast.error(desc);
    } finally {
      setLoading(false);
    }
  };

  const onCheckPlayerState = async () => {
    const state = await onCheckPlayer();
    setPlayerState(state);
  };

  const throttleUpdateSquares = throttle(updateSquares, 500);
  const throttleOnCheckPlayerState = throttle(onCheckPlayerState, 500);

  React.useEffect(() => {
    if (!gameInfo?.gameID) {
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
      return;
    }
    _onGetGameState(gameInfo.gameID);
    interval = setInterval(() => _onGetGameState(gameInfo.gameID), 1500);
    return () => {
      clearInterval(interval);
      interval = undefined;
    };
  }, [gameInfo?.gameID]);

  useAsyncEffect(async () => {
    if (!keySet.address) return;
    await throttleOnCheckPlayerState();
    const interval = setInterval(throttleOnCheckPlayerState, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [keySet.address]);

  React.useEffect(resetGame, []);

  const contextValues = React.useMemo(() => {
    return {
      squares,
      showJoinRoom,
      showCreateRoom,
      loading,
      resetGame,
      turn,
      setShowJoinRoom,
      setShowCreateRoom,
      gameInfo,
      onJoinRoom,
      updateSquares: throttleUpdateSquares,
      localState,
      playerState,
    };
  }, [
    squares,
    showJoinRoom,
    showCreateRoom,
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
  ]);

  return (
    <GameContext.Provider value={contextValues}>
      {children}
      {showCreateRoom && <CreateRoom />}
      {showJoinRoom && <JoinRoom />}
      {gameInfo?.winner && gameInfo.winner !== WinnerState.Playing && <GameEnd />}
    </GameContext.Provider>
  );
};
