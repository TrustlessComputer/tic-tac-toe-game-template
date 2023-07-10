import React from 'react';
import * as S from './styled';
import throttle from 'lodash/throttle';
import useRequestEndFinding from '@/hooks/useRequestEndFinding';

const ButtonCancelFind = () => {
  const { onRequestEndFinding } = useRequestEndFinding();

  const throttleClick = throttle(onRequestEndFinding, 1000);

  return <S.Container onClick={throttleClick}>Cancel</S.Container>;
};

export default ButtonCancelFind;
