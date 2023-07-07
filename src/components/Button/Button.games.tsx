import styled from 'styled-components';
import Button from '@/components/Button/index';

const ButtonCreateRoom = styled(Button)`
  flex: 1;
  background: linear-gradient(0deg, #ffc702, #ffc702) !important;
`;

const ButtonJoinMatch = styled(Button)`
  flex: 1;
  background: linear-gradient(180deg, #76ebff 0%, #00a3ff 100%) !important;
`;

export { ButtonCreateRoom, ButtonJoinMatch };
