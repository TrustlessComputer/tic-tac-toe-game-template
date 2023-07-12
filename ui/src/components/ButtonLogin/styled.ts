import styled, { css } from 'styled-components';
import px2rem from '@/utils/px2rem';
import { MediaQueryBuilder } from '@/theme';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .button-action {
    max-width: 250px;
  }
  .login-actions {
    display: flex;
    justify-content: center;
  }
`;

const AccountMD = css`
  flex-direction: column;
  justify-content: unset;
  gap: 16px;
  .balance {
    min-width: unset;
    text-align: left;
    width: 100%;
    font-size: 22px !important;
  }
`;

const Account = styled.div`
  display: flex;
  padding: 12px 24px;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;
  border: 1px solid ${({ theme }) => theme['border-secondary']};
  border-radius: ${px2rem(12)};
  .wrap-address {
    width: fit-content;
    align-self: start;
  }
  .ic-copy {
    :hover {
      opacity: 0.8;
    }
  }
  ${MediaQueryBuilder('md', AccountMD)}
`;

export { Container, Account };
