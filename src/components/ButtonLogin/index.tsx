import React, { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import Button from '@/components/Button';
import CreateWalletModal from '@/components/ButtonLogin/create.modal';
import LoginModal from '@/components/ButtonLogin/create.login';
import * as formatter from 'tc-formatter';

const ButtonLogin = React.memo(() => {
  const { keySet } = useContext(WalletContext);
  const [showCreate, setShowCreate] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const onShowCreate = () => setShowCreate(true);
  const onCloseCreate = () => setShowCreate(false);

  const onShowLogin = () => setShowLogin(true);
  const onCloseLogin = () => setShowLogin(false);

  const state = React.useMemo(() => {
    const isLogged = keySet.prvKey && keySet.address;
    const isNeedCreate = !isLogged && keySet.isNeedCreate;
    const isNeedLogin = !isLogged && !isNeedCreate;
    return {
      isLogged,
      isNeedCreate,
      isNeedLogin,
    };
  }, [keySet]);

  return (
    <>
      {state.isNeedCreate && <Button onClick={onShowCreate}>Create wallet</Button>}
      {state.isNeedLogin && <Button onClick={onShowLogin}>Login</Button>}
      {state.isLogged && (
        <Button>
          {formatter.ellipsisCenter({
            str: keySet.address,
            limit: 6,
          })}
        </Button>
      )}
      <CreateWalletModal show={showCreate} handleClose={onCloseCreate} />
      <LoginModal show={showLogin} handleClose={onCloseLogin} />
    </>
  );
});

export default ButtonLogin;
