import React, { useContext } from 'react';
import { WalletContext } from '@/contexts/wallet.context';
import Button from '@/components/Button';
import CreateWalletModal from '@/components/ButtonLogin/create.modal';
import LoginModal from '@/components/ButtonLogin/create.login';
import * as formatter from 'tc-formatter';
import { CDN_URL_ICONS } from '@/configs';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import Dropdown from '@/components/Popover';
import * as S from './styled';
import { AssetsContext } from '@/contexts/assets.context';
import onCopy from '@/utils/copy';
import QRCode from 'react-qr-code';
import CopyIcon from '@/components/Icons/Copy';
import { Row } from '@/components/Row';
import { IconWrapper } from '@/components/IconSVG/IconSVG.styled';

const ButtonLogin = React.memo(() => {
  const { keySet } = useContext(WalletContext);
  const { balance } = useContext(AssetsContext);

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
        <Dropdown
          element={
            <Text color="txt-primary" fontWeight="medium" size="16" onClick={() => onCopy(keySet.address)}>
              {formatter.ellipsisCenter({ str: keySet.address, limit: 6 })} <S.VerticalLine>|</S.VerticalLine>{' '}
              {balance.amount} TC
            </Text>
          }
          width={384}
          type="hover"
          icon={<IconSVG src={`${CDN_URL_ICONS}/`} maxWidth="32" />}
        >
          <S.DropdownList>
            <S.QRCodeWrapper>
              <QRCode
                size={165}
                style={{ height: 'auto', maxWidth: '100%', width: '100%', padding: '12px' }}
                value={keySet.address || ''}
                bgColor="white"
                viewBox={`0 0 165 165`}
              />
            </S.QRCodeWrapper>
            <Row justify="space-between" gap="12px">
              <Text color="txt-primary" size="18">
                {formatter.ellipsisCenter({ str: keySet.address, limit: 7 })}
              </Text>
              <IconWrapper>
                <CopyIcon maxWidth="18" content={keySet.address} />
              </IconWrapper>
            </Row>
          </S.DropdownList>
        </Dropdown>
      )}
      <CreateWalletModal show={showCreate} handleClose={onCloseCreate} />
      <LoginModal show={showLogin} handleClose={onCloseLogin} />
    </>
  );
});

export default ButtonLogin;
