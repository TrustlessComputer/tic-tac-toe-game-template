import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Meta from './Meta';
// import Header from './Header';
import { useContentSize } from '@/hooks/useContentSize';
import { Container, ContentWrapper } from '@/pages/layout';
import Header from './Header2';
import { WalletContext } from '@/contexts/wallet.context';
import { useContext } from 'react';

const LayoutOutlet = () => {
  const { height } = useContentSize();
  const { walletState } = useContext(WalletContext);
  return (
    <>
      <Meta />
      <Header isWallet={!!walletState.isLogged} />
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
