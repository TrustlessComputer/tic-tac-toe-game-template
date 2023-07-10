import React from 'react';
import * as S from '@/components/ButtonEndMatch/styled';
import useRequestEndMatch from '@/hooks/useRequestEndMatch';
import throttle from 'lodash/throttle';

const ButtonEndMatch = () => {
  const { onRequestEndMatch } = useRequestEndMatch();

  const throttleClick = throttle(onRequestEndMatch, 1000);

  return <S.Container onClick={throttleClick}>Cancel</S.Container>;
};

export default ButtonEndMatch;
