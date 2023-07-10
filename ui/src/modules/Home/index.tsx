import Game from '@/modules/Home/components/Game';
import DashBoard from '@/modules/Home/components/DashBoard';
import * as S from '@/modules/styled';

const Home = () => {
  return (
    <S.Container>
      <DashBoard />
      <Game />
    </S.Container>
  );
};

export default Home;
