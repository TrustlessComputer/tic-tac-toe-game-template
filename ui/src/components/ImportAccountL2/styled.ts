import styled from 'styled-components';
import { Box, Button } from '@chakra-ui/react';

const Content = styled(Box)`
  margin-top: 24px;

  .create-wallet {
    color: rgba(0, 0, 0, 1);
    font-size: 14px;
    margin-top: 24px;
    text-align: center;
    font-weight: 500;
    color: rgba(253, 171, 29, 1) !important;
    text-decoration-line: underline;

    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

const Space = styled.div`
  margin-top: 24px;
`;

const ButtonCreate = styled(Button)`
  margin-top: 32px;
  width: 100%;
  border-radius: 4px !important;
  background-color: rgba(253, 171, 29, 1) !important;
  font-family: var(--chakra-fonts-bangers);
  color: black !important;
  font-weight: 500 !important;
  padding: 6px;
`;

const PasscodeContainer = styled.div`
  .passcodeTitle {
    font-family: var(--chakra-fonts-titillium);
    font-size: 12px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
    color: #5b5b5b;
    margin-bottom: 12px;
  }
`;
const PasscodeInput = styled.input`
  padding: 11px 14px 11px 14px;
  border-radius: 8px;
  border: 1px solid #000010;
  width: 100% !important;

  font-family: var(--chakra-fonts-titillium);
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;

  color: #000000;
`;

const PasscodeSeparator = styled.div`
  width: 60px;
`;

export { Content, Space, ButtonCreate, PasscodeContainer, PasscodeSeparator, PasscodeInput };
