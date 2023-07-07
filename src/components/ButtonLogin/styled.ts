import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .button-action {
    max-width: 200px;
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
  .ic-copy {
    :hover {
      opacity: 0.8;
    }
  }
`;

export { Container, Account };
