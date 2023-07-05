export enum Player {
  Empty = '0',
  Player1 = '1',
  Player2 = '2',
}

export enum WinnerState {
  Playing = '0',
  Player1 = '1',
  Player2 = '2',
  Draw = '3',
}

export interface IGameMapper {
  player1: Player;
  player2: Player;
  winner: WinnerState;
  turn: Player;
}
