import styled from 'styled-components';
import px2rem from '@/utils/px2rem';
import { Row } from '@/components/Row';
import { opacify } from '@/theme/utils';

const Container = styled.div``;

const DropdownList = styled.div`
  display: grid;
  gap: ${px2rem(24)} !important;
  min-width: 240px;
`;

const QRCodeWrapper = styled.div`
  padding: 8px;
  background-color: white;
  border-radius: 12px;

  .qrCode {
    height: auto;
    max-width: 100%;
    width: 100%;
    padding: ${px2rem(12)};
  }
`;

const VerticalLine = styled.span`
  margin-left: 24px;
  margin-right: 24px;
`;

const AddressBar = styled(Row)`
  background-color: ${({ theme }) => opacify(50, theme['bg-primary'])};
  padding: ${px2rem(12)};
  border-radius: 8px;
`;

export { Container, DropdownList, VerticalLine, QRCodeWrapper, AddressBar };
