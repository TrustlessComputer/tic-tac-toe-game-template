import React, { useContext } from 'react';
import * as S from '@/components/Faucet/styled';
import BaseModal from '@/components/BaseModal';
import Text from '@/components/Text';
import { WalletContext } from '@/contexts/wallet.context';
import { AssetsContext } from '@/contexts/assets.context';

interface IProps {
  show: boolean;
  onClose: () => void;
}

const PrivateKeyModal = React.memo(({ show, onClose }: IProps) => {
  const { keySet } = useContext(WalletContext);
  const { balance } = useContext(AssetsContext);

  return (
    <BaseModal show={show} handleClose={onClose} title="Show TC Private Key" width="550">
      <S.Content style={{ gap: 12 }}>
        <S.BoxKey>
          <Text fontWeight="semibold" className="balance">
            {balance.amountFormated} TC
          </Text>
          <Text size="16" fontWeight="medium" className="key-text address">
            {keySet.address}
          </Text>
        </S.BoxKey>
        <S.BoxKey>
          <Text>This is your private key</Text>
          <Text size="16" color="txt-error" fontWeight="medium" className="key-text prvkey-text">
            {keySet.prvKey}
          </Text>
        </S.BoxKey>
      </S.Content>
    </BaseModal>
  );
});

export default PrivateKeyModal;
