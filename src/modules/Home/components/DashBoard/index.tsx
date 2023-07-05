import React from 'react';
import * as S from './styled';
import Button from '@/components/Button';

const DashBoard = React.memo(() => {
  return (
    <S.Container>
      <S.Actions>
        <Button>New Game</Button>
        <Button variants="outline">Join Game</Button>
        <Button variants="underline">Auto Match</Button>
      </S.Actions>
    </S.Container>
  );
});

export default DashBoard;
