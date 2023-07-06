import { IRole } from '@/interfaces/useGetGameSttate';
import { IGameMapper, Player, WinnerState } from '@/interfaces/useGetGames';

export interface IJoinGamePayload {
  games: IGameMapper;
  gameID: string;
}

export interface IGameState {
  gameID: string;
  myTurn: IRole;
  winner: WinnerState;
  myRolePlayer: Player;
}

export interface IGameContext {
  squares: IRole[];
  loading: boolean;
  turn: IRole;
  gameInfo: IGameState | undefined;

  showJoinRoom: boolean;
  showCreateRoom: boolean;

  resetGame: () => void;

  setShowJoinRoom: (show: boolean) => void;
  setShowCreateRoom: (show: boolean) => void;

  onJoinRoom: (payload: IJoinGamePayload) => void;
  updateSquares: (ind: number | string) => void;
}
