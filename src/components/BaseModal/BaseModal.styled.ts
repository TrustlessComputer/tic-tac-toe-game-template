import px2rem from '@/utils/px2rem';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledModal = styled(Modal)<{ width?: number }>`
  &.modal {
    --bs-modal-color: ${({ theme }) => theme['bg-secondary']};
    --bs-modal-width: ${({ width }: { width?: number }) => px2rem(width || 500)};
    overflow-y: hidden;
  }

  .modal-content {
    border-radius: 2px;
    border-radius: ${px2rem(8)};
    padding: ${px2rem(32)};
    padding-top: ${px2rem(8)};
    background: ${({ theme }) => theme['bg-secondary']};
  }

  .modal-header {
    border-bottom: none;
    padding: 0;
    display: flex;
    justify-content: flex-end;
    padding-top: ${px2rem(18)};
  }

  .modal {
    display: block !important;
  }

  /* Important part */
  .modal-dialog {
    overflow-y: initial !important;
  }

  .modal-body {
    padding-top: ${px2rem(0)};
    max-height: 80vh;
    overflow-y: auto;

    ::-webkit-scrollbar {
      display: none;
    }
  }

  .modal-footer {
    border-top: none;
  }
`;

export const Title = styled.p`
  font-weight: 600;
  font-size: ${px2rem(24)};
  :first-letter {
    text-transform: uppercase;
  }
  color: ${({ theme }) => theme['txt-primary']};
`;

export const SubTitle = styled.p`
  font-weight: 400;
  font-size: ${px2rem(18)};
  line-height: ${px2rem(28)};
  letter-spacing: -0.03em;
`;
