import { IRole } from '@/interfaces/useGetGameSttate';
import { IGameMapper, Player, WinnerState } from '@/interfaces/useGetGames';
import { IGetPlayerState } from '@/hooks/useCheckPlayerState';

export interface IJoinGamePayload {
  games: IGameMapper;
  gameID: string;
}

export interface IGameState {
  gameID: string;
  myTurn: IRole;
  winner: WinnerState;
  myRolePlayer: Player;
  competitorAddress: string;
}

export interface ILocalState {
  [key: number]: IRole;
}

export interface IGameContext {
  squares: IRole[];
  loading: boolean;
  turn: IRole;
  gameInfo: IGameState | undefined;
  localState: ILocalState;
  playerState: IGetPlayerState;

  showJoinRoom: boolean;
  showCreateRoom: boolean;

  resetGame: () => void;

  setShowJoinRoom: (show: boolean) => void;
  setShowCreateRoom: (show: boolean) => void;

  onJoinRoom: (payload: IJoinGamePayload) => void;
  updateSquares: (ind: number | string) => void;
}
