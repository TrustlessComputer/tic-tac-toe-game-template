import React, { useContext } from 'react';
import * as S from '@/components/Faucet/styled';
import BaseModal from '@/components/BaseModal';
import { FaucetContext } from '@/contexts/faucet.context';
import ReCAPTCHA from 'react-google-recaptcha';
import { GG_RECAPTCHA_SITE, isProduction } from '@/configs';
import Button from '@/components/Button';
import toast from 'react-hot-toast';
import Text from '@/components/Text';
import { WalletContext } from '@/contexts/wallet.context';
import faucetStorage from '@/components/Faucet/faucet.storage';
import { throttle } from 'lodash';

const FaucetModal = React.memo(() => {
  const { show, setShow } = useContext(FaucetContext);
  const { keySet } = useContext(WalletContext);

  const recaptchaRef = React.useRef<any>();
  const [token, setToken] = React.useState<string | undefined>(undefined);
  const [loading, setLoading] = React.useState<boolean>(false);

  const onClose = () => setShow(false);

  const onSubmit = async () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      return toast.error('Verify recaptcha now!');
    }
    setLoading(true);
    try {
      await fetch(`https://api${isProduction ? '' : '-dev'}.trustlessbridge.io/api/ttt-tc-faucet`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          TCAddress: keySet.address,
          ReCaptcha: recaptchaValue,
        }),
      }).then(async response => {
        if (response.ok) {
          faucetStorage.setFaucetStorage();
          toast.success('Faucet successfully.');
          return response.json();
        }
        const _response = await response.json();
        if (_response?.error?.message) {
          toast.error(_response?.error?.message);
        }
      });
      setShow(false);
    } catch (error) {
      // TODO
    } finally {
      setLoading(false);
    }
  };

  const throttleSubmit = throttle(onSubmit, 500);

  return (
    <BaseModal show={show} handleClose={onClose} title="Faucet" width="550">
      <S.Content>
        <ReCAPTCHA size="normal" ref={recaptchaRef} sitekey={GG_RECAPTCHA_SITE} onChange={() => setToken('1')} />
        <Button
          disabled={!token || loading}
          isLoading={loading}
          onClick={throttleSubmit}
          sizes="large"
          className="mt-24"
        >
          <Text color="white">Faucet</Text>
        </Button>
      </S.Content>
    </BaseModal>
  );
});

export default FaucetModal;
