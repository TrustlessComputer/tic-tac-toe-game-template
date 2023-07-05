import * as S from './styled';
import ButtonLogin from '@/components/ButtonLogin';
import LogoIcon from '@/components/Icons/Logo';
import { Row } from '@/components/Row';
import { Wrapper } from './styled';

const Header = () => {
  return (
    <S.Container>
      <Wrapper>
        <Row gap="60px">
          <LogoIcon />
          <ButtonLogin />
        </Row>
      </Wrapper>
    </S.Container>
  );
};

export default Header;
