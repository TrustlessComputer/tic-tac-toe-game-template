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
  padding: ${px2rem(16)} ${px2rem(15)};
  gap: ${px2rem(6)};
  background-color: rgba(22, 26, 41, 0.8);
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
    color: white !important;
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

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  .wrapperIcon {
    padding: 5px;
  }
`;
export { Content, Share, BoxKey, Row };
