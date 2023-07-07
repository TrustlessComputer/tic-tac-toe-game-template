import styled from 'styled-components';
import { TwitterShareButton } from 'react-share';

const Content = styled.div`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export { Content, Share };
