import styled from 'styled-components';
import { motion } from 'framer-motion';
import { opacify } from '@/theme/utils';

const Container = styled(motion.div)<{ isLastMove: boolean }>`
  border: 2px solid transparent;
  display: grid;
  place-items: center;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme, isLastMove }) => (isLastMove ? opacify(40, theme.black) : opacify(14, theme.black))};
  border-radius: 6px;
  width: 33px;
  height: 33px;

  :hover {
    opacity: 0.8;
  }

  span {
    display: block;
    position: relative;
    width: 80%;
    height: 80%;
    border-radius: 50%;
    border: 7px solid transparent;
    &.x::after,
    &.x::before {
      position: absolute;
      content: '';
      width: 250%;
      height: 6px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      background: #62fffc;
      border-radius: 5px;
    }

    &.x::after {
      transform: translate(-50%, -50%) rotate(45deg);
      opacity: 1;
    }

    &.o {
      border-color: #ffa02e;
      border-width: 5px;
      width: 69%;
      height: 70%;
    }
  }
`;

export { Container };
