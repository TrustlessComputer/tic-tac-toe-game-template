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
  infoForWatcher?: {
    player1: string;
    player2: string;
    winner?: string;
  };
}

export interface ILocalState {
  [key: number]: IRole;
}

export interface IRoomInfoState {
  roomId: string;
  reward: number;
}

export interface IGameContext {
  squares: IRole[];
  loading: boolean;
  turn: IRole;
  roomInfo?: IRoomInfoState | undefined;
  gameInfo: IGameState | undefined;
  localState: ILocalState;
  playerState: IGetPlayerState;
  loadedPlayerState: boolean;
  counter: number;
  lastMoveIndex: number | undefined;

  showJoinRoom: boolean;
  showCreateRoom: boolean;
  showAutoMatchRoom: boolean;

  resetGame: () => void;

  setShowJoinRoom: (show: boolean) => void;
  setShowAutoMatchRoom: (show: boolean) => void;

  setShowCreateRoom: (show: boolean) => void;

  onJoinRoom: (payload: IJoinGamePayload) => void;
  updateSquares: (ind: number | string) => void;
}
