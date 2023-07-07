import React, { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import Button from '@/components/Button';
import CreateWalletModal from '@/components/ButtonLogin/create.modal';
import LoginModal from '@/components/ButtonLogin/create.login';
import * as formatter from 'tc-formatter';
import Text from '@/components/Text';
import * as S from './styled';
import { AssetsContext } from '@/contexts/assets.context';
import CopyIcon from '@/components/Icons/Copy';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Row } from '@/components/Row';

const ButtonLogin = React.memo(() => {
  const { keySet, walletState } = useContext(WalletContext);
  const { balance } = useContext(AssetsContext);

  const [showCreate, setShowCreate] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const onShowCreate = () => setShowCreate(true);
  const onCloseCreate = () => setShowCreate(false);

  const onShowLogin = () => setShowLogin(true);
  const onCloseLogin = () => setShowLogin(false);

  return (
    <S.Container>
      {(walletState.isNeedCreate || walletState.isNeedLogin) && (
        <Text align="center" size="20" className="mb-24">
          Please {walletState.isNeedCreate ? 'create wallet' : 'login'} to continue
        </Text>
      )}
      {walletState.isNeedCreate && (
        <Button onClick={onShowCreate} className="button-action">
          Create wallet
        </Button>
      )}
      {walletState.isNeedLogin && (
        <Row className="login-actions" gap="32px">
          <Button onClick={onShowLogin} className="button-action">
            Login
          </Button>
          <Button onClick={onShowCreate} variants="outline" className="button-action">
            Create wallet
          </Button>
        </Row>
      )}
      {walletState.isLogged && keySet.address && (
        <S.Account>
          <Row gap="12px">
            <Jazzicon diameter={24} seed={jsNumberForAddress(keySet.address)} />
            <Text color="txt-primary" size="18" fontWeight="semibold">
              {formatter.ellipsisCenter({ str: keySet.address, limit: 7 })}
            </Text>
            <CopyIcon maxWidth="18" className="ic-copy" content={keySet.address} />
          </Row>
          <Text style={{ minWidth: 150 }} align="right" color="txt-highlight" size="18" fontWeight="semibold">
            {balance.amountFormated} TC
          </Text>
        </S.Account>
      )}
      <CreateWalletModal show={showCreate} handleClose={onCloseCreate} />
      <LoginModal show={showLogin} handleClose={onCloseLogin} />
    </S.Container>
  );
});

export default ButtonLogin;
