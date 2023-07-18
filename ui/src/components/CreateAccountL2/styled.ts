import px2rem from '@/utils/px2rem';
import { Box, Button } from '@chakra-ui/react';
import styled from 'styled-components';

const Content = styled(Box)`
  margin-top: 24px;
  .import-text {
    color: rgba(0, 0, 0, 1);
    font-size: 12px;
    margin-top: 24px;
    text-align: center;
    font-weight: 500;
    span {
      color: rgba(253, 171, 29, 1) !important;
      text-decoration-line: underline;
      :hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }

  .desc-text {
    font-family: var(--chakra-fonts-titillium);
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
    letter-spacing: 0em;
    text-align: left;
    color: #5b5b5b;
    margin-bottom: 24px;
  }
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
  border: 1px solid #000000;
  width: 100% !important;

  font-family: var(--chakra-fonts-titillium);
  font-size: 16px;
  font-weight: 400;
  line-height: 26px;
  letter-spacing: 0em;
  text-align: center;
`;

const PasscodeSeparator = styled.div`
  width: 60px;
`;

const Space = styled.div`
  margin-top: 24px;
`;

const ButtonCreate = styled(Button)`
  margin-top: 24px;
  width: 100%;
  border-radius: 4px !important;
  padding: 6px;
  background-color: rgba(253, 171, 29, 1) !important;
  color: black !important;
  font-weight: 500 !important;
`;

const BoxKey = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${px2rem(16)} ${px2rem(20)};
  gap: ${px2rem(6)};
  border-radius: ${px2rem(8)};
  background-color: #cbc7c7;
  width: 100%;

  .row {
    display: flex;
    flex-direction: row;
  }

  .key-text {
    line-break: anywhere;
    color: #ff4747;
  }

  p {
    font-weight: 500;
    font-size: ${px2rem(16)};
  }
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: ${px2rem(40)};

  .wrapperIcon {
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

  .icCopy {
    margin-left: 5px;
    min-width: 25px;

    :hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }
`;

export { BoxKey, ButtonCreate, Content, PasscodeContainer, PasscodeInput, PasscodeSeparator, Row, Space };
