import React, { useContext } from 'react';
import * as S from '@/components/Faucet/styled';
import BaseModal from '@/components/BaseModal';
import Text from '@/components/Text';
import { WalletContext } from '@/contexts/wallet.context';
import { AssetsContext } from '@/contexts/assets.context';
import IconSVG from '@/components/IconSVG';
import copy from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { CDN_URL } from '@/configs';

interface IProps {
  show: boolean;
  onClose: () => void;
}

const PrivateKeyModal = React.memo(({ show, onClose }: IProps) => {
  const { keySet } = useContext(WalletContext);
  const { balance } = useContext(AssetsContext);

  const onClickCopy = (address: string) => {
    copy(address);
    toast.success('Copied');
  };

  return (
    <BaseModal show={show} handleClose={onClose} title="Show TC Private Key" width="550">
      <S.Content style={{ gap: 12 }}>
        <S.BoxKey>
          <Text fontWeight="semibold" className="balance">
            {balance.amountFormated} TC
          </Text>

          <S.Row>
            <Text size="16" fontWeight="medium" className="key-text address">
              {keySet.address}
            </Text>
            <div className="wrapperIcon" onClick={() => onClickCopy(keySet.address || '')}>
              <IconSVG src={`${CDN_URL}/icons/ic-copy.svg`} color="white" maxWidth="20" iconType="fill" />
            </div>
          </S.Row>
        </S.BoxKey>
        <S.BoxKey>
          <Text className="address">This is your private key</Text>
          <S.Row>
            <Text size="16" color="txt-error" fontWeight="medium" className="key-text prvkey-text">
              {keySet.prvKey}
            </Text>
            <div className="wrapperIcon" onClick={() => onClickCopy(keySet.prvKey || '')}>
              <IconSVG src={`${CDN_URL}/icons/ic-copy.svg`} color="white" maxWidth="20" iconType="fill" />
            </div>
          </S.Row>
        </S.BoxKey>
      </S.Content>
    </BaseModal>
  );
});

export default PrivateKeyModal;
