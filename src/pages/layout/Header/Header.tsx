import * as S from './styled';
import ButtonLogin from '@/components/ButtonLogin';
import LogoIcon from '@/components/Icons/Logo';
import { Row } from '@/components/Row';

const Header = () => {
  return (
    <S.Container>
      <Row gap="60px" padding="12px 0">
        <LogoIcon />
        <ButtonLogin />
      </Row>
    </S.Container>
  );
};

export default Header;
