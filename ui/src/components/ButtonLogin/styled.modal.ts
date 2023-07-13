import styled from 'styled-components';
import { opacify } from '@/theme/utils';

const Content = styled.div`
  margin-top: 24px;
  .import {
    color: ${({ theme }) => theme['txt-highlight']};
    cursor: pointer;
    :hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
  .create {
    color: ${({ theme }) => opacify(90, theme['txt-1'])};
    cursor: pointer;

    :hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
`;

const Space = styled.div`
  margin-top: 24px;
`;

export { Content, Space };
