import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Meta from './Meta';
import { useContentSize } from '@/hooks/useContentSize';
import { Container, ContentWrapper } from '@/pages/layout';

const LayoutOutlet = () => {
  const { height } = useContentSize();
  return (
    <>
      <Meta />
      {/* <Header isWallet={!!walletState.isLogged} /> */}
      <Container>
        <ContentWrapper style={{ minHeight: height }}>
          <Outlet />
        </ContentWrapper>
      </Container>
      <Footer />
    </>
  );
};

export default LayoutOutlet;
