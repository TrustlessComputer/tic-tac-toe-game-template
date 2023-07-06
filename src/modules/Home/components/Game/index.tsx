import React, { useContext } from 'react';
import Square from '../Square';
import * as S from './styled';
import { NUMBER_COLUMN } from '@/configs';
import { GameContext } from '@/contexts/game.context';

const Game = React.memo(() => {
  const { squares, updateSquares } = useContext(GameContext);

  const LIST_MATRIX = React.useMemo(() => {
    return Array(NUMBER_COLUMN * NUMBER_COLUMN)
      .fill('')
      .map((data, index) => index + '');
  }, []);

  return (
    <S.Container>
      {LIST_MATRIX.map(ind => (
        <Square key={ind} ind={ind} updateSquares={updateSquares} clsName={squares[Number(ind)]} />
      ))}
    </S.Container>
  );
});

export default Game;
