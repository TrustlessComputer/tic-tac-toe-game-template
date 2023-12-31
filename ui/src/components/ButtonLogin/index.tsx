import React, { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import Button from '@/components/Button';
// import CreateWalletModal from '@/components/ButtonLogin/create.modal';
import CreateWalletModalNew from '@/components/CreateAccountL2/create.modal';
import LoginModal from '@/components/ButtonLogin/create.login';
import * as formatter from 'tc-formatter';
import Text from '@/components/Text';
import * as S from './styled';
import { AssetsContext } from '@/contexts/assets.context';
import CopyIcon from '@/components/Icons/Copy';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { Row } from '@/components/Row';
import ToolTip from '@/components/Tooltip';
// import { CDN_URL_ICONS } from '@/configs';
// import IconSVG from '@/components/IconSVG';
import PrivateKeyModal from '@/components/PrivateKey';
import { GameContext } from '@/contexts/game.context';
// import ImportWalletModal from '@/components/ButtonLogin/import.modal';
import ImportWalletModalNew from '@/components/ImportAccountL2/import.modal';

const ButtonLogin = React.memo(() => {
  const { walletState, address, keySet } = useContext(WalletContext);
  const { balance } = useContext(AssetsContext);
  const { playerState } = useContext(GameContext);

  const [showCreate, setShowCreate] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);
  const [showImport, setShowImport] = React.useState(false);
  const [showPrv, setShowPrv] = React.useState(false);

  const onShowCreate = () => {
    onCloseImport();
    setShowCreate(true);
  };
  const onCloseCreate = () => setShowCreate(false);

  const onShowLogin = () => setShowLogin(true);
  const onCloseLogin = () => setShowLogin(false);

  const onShowImport = () => {
    onCloseCreate();
    setShowImport(true);
  };
  const onCloseImport = () => setShowImport(false);

  return (
    <S.Container>
      {address && (
        <S.Account>
          <Row gap="12px" className="wrap-address">
            <Jazzicon diameter={24} seed={jsNumberForAddress(address)} />
            <Text color="txt-primary" size="18" fontWeight="semibold">
              {formatter.ellipsisCenter({ str: address, limit: 7 })}
            </Text>
            <ToolTip unwrapElement={<CopyIcon maxWidth="18" className="ic-copy" content={address} />} width={300}>
              <Text size="14">Copy TC address</Text>
            </ToolTip>
            {/* {keySet.prvKey && (
              <ToolTip
                unwrapElement={
                  <IconSVG
                    src={`${CDN_URL_ICONS}/ic-exchange.svg`}
                    maxWidth="18"
                    className="ic-copy"
                    onClick={() => setShowPrv(true)}
                  />
                }
                width={300}
              >
                <Text size="14">Export TC private key</Text>
              </ToolTip>
            )} */}
          </Row>
          {/* <Text
            style={{ minWidth: 150 }}
            align="right"
            color="txt-highlight"
            size="18"
            fontWeight="semibold"
            className="balance"
          >
            {balance.amountFormated} TC | ELO {playerState.elo}
          </Text> */}
        </S.Account>
      )}
      {(walletState.isNeedCreate || walletState.isNeedLogin) && (
        <Text align="center" size="20" className={`mb-24 ${address ? 'mt-24' : ''}`}>
          {/* Please {walletState.isNeedCreate ? 'create wallet' : 'login'} to play the game */}
          Comming soon...
        </Text>
      )}
      {/* {walletState.isNeedCreate && (
        <Button onClick={onShowCreate} className="button-action">
          Create wallet
        </Button>
      )} */}
      {walletState.isNeedLogin && (
        <Row className="login-actions" gap="32px">
          <Button onClick={onShowLogin} className="button-action">
            Login
          </Button>
          {/*<Button onClick={onShowCreate} variants="outline" className="button-action">*/}
          {/*  Create a new wallet*/}
          {/*</Button>*/}
        </Row>
      )}
      {/* <CreateWalletModal show={showCreate} handleClose={onCloseCreate} openImport={onShowImport} /> */}
      {showCreate && <CreateWalletModalNew show={showCreate} handleClose={onCloseCreate} openImport={onShowImport} />}

      <LoginModal show={showLogin} handleClose={onCloseLogin} />
      <PrivateKeyModal show={showPrv} onClose={() => setShowPrv(false)} />

      {/* <ImportWalletModal show={showImport} handleClose={onCloseImport} openCreate={onShowCreate} /> */}
      {showImport && <ImportWalletModalNew show={showImport} handleClose={onCloseImport} openCreate={onShowCreate} />}
    </S.Container>
  );
});

export default ButtonLogin;
