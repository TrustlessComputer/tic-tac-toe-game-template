import React from 'react';
import Square from '../Square';
import * as S from './styled';
import { NUMBER_COLUMN } from '@/configs';

const Game = React.memo(() => {
  const LIST_MATRIX = React.useMemo(() => {
    return Array(NUMBER_COLUMN * NUMBER_COLUMN)
      .fill(null)
      .map((data, index) => index + 1 + '');
  }, []);

  return (
    <S.Container>
      {LIST_MATRIX.map(ind => (
        <Square key={ind} ind={ind} updateSquares={() => {}} clsName="" />
      ))}
    </S.Container>
  );
});

export default Game;
