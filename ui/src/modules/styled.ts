import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import { motion } from 'framer-motion';
import BGImage from '@/images/background-popup.jpg';

const ContainerLG = css`
  flex-direction: column;
  gap: 32px;
`;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;

  ${MediaQueryBuilder('xxl', ContainerLG)}
`;

const GamePopupMD = css`
  .text {
    max-width: 90vw;
    width: 100%;
  }
`;

const BannerMD = css`
  max-width: 80%;
`;

const Banner = styled.img`
  border-radius: 12px;
  max-width: 70%;
  ${MediaQueryBuilder('md', BannerMD)}
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
    background-image: url(${BGImage});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 12px;
  }
  .text h5 {
    font-size: 20px;
    margin: 12px 0;
    color: ${({ theme }) => theme['txt-parallel']};
    font-weight: 600;
    font-style: italic;
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
    width: 300px;
    height: 55px;
    font-size: 22px;
    text-align: center;
    border: 1px solid ${({ theme }) => theme['border-secondary']};
    border-radius: 12px;
    color: ${({ theme }) => theme['txt-primary']};
  }

  .actions {
    display: flex;
    gap: 24px;
    margin-top: 32px;
    button {
      width: 150px;
    }
  }
  ${MediaQueryBuilder('md', GamePopupMD)}
`;

export { Container, GamePopup, Banner };
