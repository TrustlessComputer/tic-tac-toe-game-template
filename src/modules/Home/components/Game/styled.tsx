import styled from 'styled-components';
import { NUMBER_COLUMN } from '@/configs';
import { opacify } from '@/theme/utils';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${NUMBER_COLUMN}, ${px2rem(45)});
  height: fit-content;
  background-color: ${({ theme }) => opacify(50, theme.white)};
  border-radius: ${px2rem(50)};
  border: ${px2rem(15)} solid ${({ theme }) => opacify(10, theme.black)};
  padding: ${px2rem(16)};
  gap: ${px2rem(6)};
`;

export { Container };
