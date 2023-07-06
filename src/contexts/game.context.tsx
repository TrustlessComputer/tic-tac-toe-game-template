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

const initialValue: IGameContext = {
  squares: [],
  loading: false,
  turn: IRole.X,
  gameInfo: undefined,

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

  const { onMakeMoves } = useMakeMoves();
  const { onGetGameState } = useGetGameState();
  const { onGetWinner } = useGetGames();

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
  };

  const onJoinRoom = ({ games, gameID }: { games: IGameMapper; gameID: string }) => {
    if (!keySet.address) return resetGame();
    resetGame();
    const isPlayer1 = keySet.address.toLowerCase() === games.player1.toLowerCase();
    setGameInfo({
      gameID,
      myRolePlayer: isPlayer1 ? Player.Player1 : Player.Player2,
      winner: games.winner,
      myTurn: isPlayer1 ? IRole.X : IRole.O,
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

  const throttleUpdateSquares = throttle(updateSquares, 1000);

  React.useEffect(() => {
    if (!gameInfo?.gameID) {
      if (interval) {
        clearInterval(interval);
        interval = undefined;
      }
      return;
    }
    _onGetGameState(gameInfo.gameID);
    interval = setInterval(() => _onGetGameState(gameInfo.gameID), 1000);
    return () => {
      clearInterval(interval);
      interval = undefined;
    };
  }, [gameInfo?.gameID]);

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
  ]);

  return (
    <GameContext.Provider value={contextValues}>
      {children}
      {showCreateRoom && <CreateRoom />}
      {showJoinRoom && <JoinRoom />}
    </GameContext.Provider>
  );
};
