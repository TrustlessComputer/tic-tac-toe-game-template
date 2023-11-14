import styled, { css } from 'styled-components';
import { MediaQueryBuilder } from '@/theme';
import { opacify } from '@/theme/utils';
import px2rem from '@/utils/px2rem';
import { motion } from 'framer-motion';

const ContainerLG = css`
  flex: unset;
`;

const ContainerMD = css`
  margin-top: 32px;
`;

const Container = styled.div`
  // margin-top: 120px;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;

  .noti-turn {
    margin-top: 20px;
    color: white;
    font-size: 14px;
  }

  .alert-move {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    padding: 15px 30px 15px 30px;
    animation: aniAlert 0.5s forwards;
    background: #fff1bc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 99;

    .myTurn {
      background: #ffb46c;
      padding: 3px 15px;
      border-radius: 999px;
    }

    .rowFlex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      gap: 10px;
    }
    .time {
      width: 30px;
    }
    .player {
      display: flex;
      align-items: center;
      gap: 5px;
      .avatar {
        width: 22px;
        height: 22px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 100%;
          border: 1px solid white;
        }
      }
      .tick {
        span {
          width: 15px;
          height: 15px;

          &.x {
            width: 19px;
            height: 19px;
            border: 7px solid transparent;

            &:before,
            &:after {
              height: 2px;
            }
          }

          @media screen and (max-width: 600px) {
            width: 17px;
            height: 17px;
          }
        }
      }
      .name {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 80px;
        &.right {
          text-align: right;
        }
      }
      &.active {
        background: #ffcf89;
        padding: 2px 5px;
        border-radius: 999px;
        border: 2px solid #f7c35c;
      }
    }

    @keyframes aniAlert {
      from {
        top: -100%;
      }
      to {
        top: 0;
      }
    }

    span {
      color: black;
      font-weight: 600;
      font-size: 14px;
    }
  }

  .warning-wrapper {
    background: #fef3cd;
    border: 1px solid #ffeeba;
    padding: 12px 32px;
    border-radius: 4px;
    // margin-top: 24px;

    width: 100%;

    p {
      color: #856404;
      font-size: 18px;
    }

    span {
      text-decoration: underline;
      margin-left: 6px;
      cursor: pointer;
      :hover {
        opacity: 0.9;
      }
    }
  }

  .wrap-spinner {
    margin-left: auto;
    margin-right: auto;
    margin-top: 24px;
  }

  ${MediaQueryBuilder('lg', ContainerLG)}
  ${MediaQueryBuilder('md', ContainerMD)}
`;

const BoxMD = css`
  min-width: unset;
  max-width: calc(100vw - 32px);

  @media screen and (max-width: 600px) {
    max-width: 100%;
    width: 100%;
  }
`;

const Box = styled.div`
  background-color: rgba(22, 26, 41, 0.5);
  min-width: ${px2rem(600)};
  margin-top: ${px2rem(24)};
  border-radius: ${px2rem(24)};
  padding: ${px2rem(24)};
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${MediaQueryBuilder('md', BoxMD)}
`;

const BannerMD = css`
  max-width: calc(100vw - 32px);
`;

const Banner = styled.img`
  border-radius: 12px;
  ${MediaQueryBuilder('md', BannerMD)}
`;

const ActionsXL = css`
  margin-top: 24px;
  flex-direction: row;
`;

const ActionsMD = css`
  gap: 16px;
  flex-direction: column;
`;

const Actions = styled(motion.div)`
  display: flex;
  flex-direction: row;
  margin-left: auto;
  margin-right: auto;
  margin-top: 32px;
  width: 100%;
  gap: 32px;

  ${MediaQueryBuilder('xl', ActionsXL)}
  ${MediaQueryBuilder('md', ActionsMD)}
`;

const MatchContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 24px;
  align-items: center;
  margin-top: 32px;

  .loading-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #000000b5;
    z-index: 9999;
  }

  .drawOfferBtn {
    background:#1c1c1c;
    font-size:14px;
    color:white;
    padding:6px; 12px;
    border-radius: 5px;
  }

  .modal-offer-draw {
    width: 95%;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    z-index: 999;
    background: white;
    border-radius: 10px;

    p {
      color: black;
      font-size: 14px;
      text-align: center;

      &.reject {
        font-style:italic;
        margin-top:30px;
        font-size: 12px;
        color: gray;
      }
    }

    .footer {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      gap: 15px;

      button {
        width: 170px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: black;
        border-radius: 10px;

        &.yes {
          background: #f7c700;
        }
        &.no {
          background: #e6e6e6;
        }
      }
    }
  }

  
  

  // @media screen and (max-width: 600px) {
  //   .wrap-counter {
  //     display: none;
  //   }
  // }
`;

const PlayerBox = styled.div<{ isMyTurn: boolean; turnColor: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  background-color: ${({ theme, isMyTurn, turnColor }) =>
    isMyTurn ? opacify(40, turnColor) : opacify(20, theme['bg-secondary'])};
  border-radius: 4px;
  padding: 12px;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  width: 100%;

  .square-box {
    width: 65px;
    height: 65px;

    @media screen and (max-width: 600px) {
      width: 40px;
      height: 40px;
    }
  }

  .address-highlight {
    color: ${({ theme }) => theme['txt-highlight']};
    margin-right: 12px;
  }

  .moving-now {
    margin-top: 4px;
  }
`;

export { Container, Actions, MatchContent, PlayerBox, Box, Banner };
