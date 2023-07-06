import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import { motion } from 'framer-motion';

const ContainerLG = css`
  flex-direction: column;
  gap: 32px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  ${MediaQueryBuilder('xl', ContainerLG)}
`;

const GamePopup = styled(motion.div)`
  .text {
    background: ${({ theme }) => theme['bg-secondary']};
    width: 70%;
    max-width: 400px;
    height: 350px;
    border: 2px solid;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
  .text h2 {
    font-size: 2.5em;
    margin: 15px 0;
    color: ${({ theme }) => theme['txt-primary']};
  }
  .win {
    margin: 0 auto;
    width: fit-content;
    border: 2px solid ${({ theme }) => theme['txt-primary']};
    border-radius: 10px;
    display: flex;
    gap: 15px;
  }
  .input-room {
    width: 250px;
    height: 55px;
    font-size: 32px;
    text-align: center;
    border: 1px solid ${({ theme }) => theme['border-secondary']};
    border-radius: 12px;
    color: ${({ theme }) => theme['txt-primary']};
  }

  .actions {
    display: flex;
    gap: 32px;
    margin-top: 32px;
    button {
      width: 150px;
    }
  }
`;

export { Container, GamePopup };
