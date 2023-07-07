import React from 'react';
import * as S from '@/components/ButtonEndMatch/styled';
import useRequestEndMatch from '@/hooks/useRequestEndMatch';
import debounce from 'lodash/debounce';

const ButtonEndMatch = () => {
  const { onRequestEndMatch } = useRequestEndMatch();

  const debounceClick = debounce(onRequestEndMatch, 1000);

  return <S.Container onClick={debounceClick}>Cancel</S.Container>;
};

export default ButtonEndMatch;
