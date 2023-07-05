import styled from 'styled-components';
import { NUMBER_COLUMN } from '@/configs';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(${NUMBER_COLUMN}, 50px);
  height: fit-content;
`;

export { Container };
