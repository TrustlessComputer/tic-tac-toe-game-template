import { IGameMapper, Player } from '@/interfaces/useGetGames';

const gamesBuilder = (games: any): IGameMapper => {
  const turn = games.turn === true ? '1' : '2';
  return {
    player1: games.player1,
    player2: games.player2,
    turn: turn as Player,
    winner: games[3].toString(),
  };
};

export { gamesBuilder };
