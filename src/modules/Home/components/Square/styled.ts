import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled(motion.div)`
  border: 1px solid #eee;
  display: grid;
  place-items: center;
  cursor: pointer;
  aspect-ratio: 1/1;
  span {
    display: block;
    position: relative;
    width: 70%;
    height: 70%;
    border-radius: 50%;
    border: 8px solid transparent;
    &.x::after,
    &.x::before {
      position: absolute;
      content: '';
      width: 150%;
      height: 8px;
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
    }
  }
`;

export { Container };
