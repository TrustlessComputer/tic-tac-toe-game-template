import React from 'react';
import * as S from './styled';
import { ButtonCreateRoom, ButtonJoinRoom } from '@/components/Button/Button.games';

const DashBoard = React.memo(() => {
  return (
    <S.Container>
      <S.Actions>
        <ButtonCreateRoom />
        <ButtonJoinRoom />
      </S.Actions>
    </S.Container>
  );
});

export default DashBoard;
