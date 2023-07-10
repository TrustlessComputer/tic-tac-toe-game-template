import { IGameMapper, Player } from '@/interfaces/useGetGames';

const gamesBuilder = (games: any): IGameMapper => {
  const turn = games[2] === true ? '1' : '2';
  return {
    player1: games[0],
    player2: games[6],
    turn: turn as Player,
    winner: games[4].toString(),
  };
};

export { gamesBuilder };
