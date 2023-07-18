import IconSVG from '@/components/IconSVG';
import PrivateKeyModal from '@/components/PrivateKey';
import SvgInset from '@/components/SvgInset';
import { CDN_ICONS, CDN_URL } from '@/configs';
import { AssetsContext } from '@/contexts/assets.context';
import { WalletContext } from '@/contexts/wallet.context';
import { Box, Button, Flex, Menu, MenuButton, MenuList } from '@chakra-ui/react';
import cs from 'classnames';
import copy from 'copy-to-clipboard';
import { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { ellipsisCenter } from 'tc-formatter';
import s from './styles.module.scss';

const ButtonWalletConnectL2 = ({ isLight }: { isLight?: boolean }) => {
  const [showPrv, setShowPrv] = useState(false);
  const { address, walletState } = useContext(WalletContext);
  const { balance } = useContext(AssetsContext);

  const onClickCopy = (address: string) => {
    copy(address);
    toast.success('Copied');
  };

  const onShowAccount = () => {
    setShowPrv(true);
  };

  if (walletState.isNeedCreate) return <div></div>;

  return (
    <Box
      className={cs(s.connectedContainer, {
        [`${s.connectedContainer__light}`]: isLight,
      })}
    >
      <Menu placement="bottom-end">
        <MenuButton as={Button} className={cs(s.btnConnected)}>
          <div className={s.avatar}>
            <Jazzicon diameter={28} seed={jsNumberForAddress(address || '')} />
          </div>
        </MenuButton>
        <MenuList>
          <div className={s.contentMenuList}>
            <div className={s.wallet}>
              <div className={s.ingame}>
                <p className={s.title}>In-game wallet</p>
                <div className={s.wallet_address}>
                  <Flex alignItems={'center'} gap={4}>
                    <IconSVG src={`${CDN_URL}/icons/ic-penguin.svg`} iconType="fill" maxWidth="24" maxHeight="24" />
                    <span className={s.address}>{ellipsisCenter({ str: address, limit: 10 })}</span>
                  </Flex>
                  <div className={s.icCopy} onClick={() => onClickCopy(address || '')}>
                    <IconSVG src={`${CDN_URL}/icons/ic-copy.svg`} color="black" maxWidth="16" iconType="fill" />
                  </div>
                </div>
              </div>
              <div className={s.amount}>
                <p>{balance?.amountFormated} TC</p>
              </div>
            </div>
            {/*<div style={{ marginTop: 12, marginBottom: 12, marginLeft: 4 }}>
              <CheckBox content={SAVE_CONTENT} />
            </div>*/}
            <div className={s.actions}>
              <a className={s.btnExport} href="/topup" target="_blank">
                <Flex alignItems={'center'} gap={6}>
                  <SvgInset size={24} svgUrl={`${CDN_ICONS}/ic-topup.svg`} />
                  <span style={{ fontSize: 16, fontWeight: 600 }}>Topup</span>
                </Flex>
              </a>
              {/* <div className={s.btnExport} onClick={onShowSendTC}>
                <Flex alignItems={'center'} gap={6}>
                  <SvgInset size={24} svgUrl={`${CDN_ICONS}/ic-money-withdrawal.svg`} />
                  <span style={{ fontSize: 16, fontWeight: 600 }}>Withdraw</span>
                </Flex>
              </div> */}
              <div className={s.btnExport} onClick={onShowAccount}>
                <Flex alignItems={'center'} gap={6}>
                  <SvgInset size={24} svgUrl={`${CDN_ICONS}/ic-lock.svg`} />
                  <span style={{ fontSize: 16, fontWeight: 600 }}>Export Private Key</span>
                </Flex>
              </div>
            </div>
          </div>
        </MenuList>
      </Menu>
      {showPrv && <PrivateKeyModal show={showPrv} onClose={() => setShowPrv(false)} />}
    </Box>
  );
};

export default ButtonWalletConnectL2;
