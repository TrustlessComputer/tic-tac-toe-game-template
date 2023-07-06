import React, { useContext } from 'react';
import * as S from './styled';
import { ButtonCreateRoom, ButtonJoinRoom } from '@/components/Button/Button.games';
import { GameContext } from '@/contexts/game.context';

const DashBoard = React.memo(() => {
  const { setShowCreateRoom, setShowJoinRoom } = useContext(GameContext);

  return (
    <S.Container>
      <S.Actions>
        <ButtonCreateRoom onClick={() => setShowCreateRoom(true)} />
        <ButtonJoinRoom onClick={() => setShowJoinRoom(true)} />
      </S.Actions>
    </S.Container>
  );
});

export default DashBoard;
