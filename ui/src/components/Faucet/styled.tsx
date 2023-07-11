import styled from 'styled-components';
import { TwitterShareButton } from 'react-share';
import px2rem from '@/utils/px2rem';

const Content = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoxKey = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${px2rem(16)} ${px2rem(20)};
  gap: ${px2rem(6)};
  background-color: rgba(22, 26, 41, 0.5);
  border-radius: ${px2rem(8)};
  width: 100%;
  .key-text {
    line-break: anywhere;
    color: ${({ theme }) => theme['txt-secondary']} !important;
  }
  .balance {
    color: ${({ theme }) => theme['txt-highlight']};
  }
  .address {
    color: ${({ theme }) => theme['txt-parallel']} !important;
  }
  .prvkey-text {
    color: ${({ theme }) => theme['txt-error']} !important;
  }
`;

const Share = styled(TwitterShareButton)`
  display: flex;
  justify-items: center !important;
  height: 45px;
  background: #1ca2f1 !important;
  border-radius: 4px;
  max-width: 220px;
  margin-top: 32px;
  button {
    background-color: transparent !important;
    color: white !important;
    text-transform: none;
  }
`;

export { Content, Share, BoxKey };
