import { Player } from '@/interfaces/useGetGames';

const turnMapper = (turn: boolean): Player => {
  const _turn = turn ? Player.Player1 : Player.Player2;
  return _turn;
};

export { turnMapper };
