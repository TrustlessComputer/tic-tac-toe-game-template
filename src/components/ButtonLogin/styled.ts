import styled from 'styled-components';
import px2rem from '@/utils/px2rem';

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
`;

const VerticalLine = styled.span`
  margin-left: 24px;
  margin-right: 24px;
`;

export { Container, DropdownList, VerticalLine, QRCodeWrapper };
