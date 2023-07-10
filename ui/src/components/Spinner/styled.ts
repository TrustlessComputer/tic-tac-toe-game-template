import styled from 'styled-components';
import px2rem from '@/utils/px2rem';
import { opacify } from '@/theme/utils';

const Container = styled.div<{ size: number }>`
  width: ${({ size }) => px2rem(size)};
  height: ${({ size }) => px2rem(size)};
  position: relative;
  display: inline-block;
  border: 6px solid;
  border-radius: 50%;
  border-right-color: ${({ theme }) => opacify(70, theme['loader-primary'])};
  color: ${({ theme }) => theme['loader-primary']};

  animation: rotate 1.2s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export { Container };
