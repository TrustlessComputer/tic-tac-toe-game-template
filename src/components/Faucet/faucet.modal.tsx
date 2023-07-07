import React, { useContext } from 'react';
import * as S from '@/components/Faucet/styled';
import BaseModal from '@/components/BaseModal';
import { FaucetContext } from '@/contexts/faucet.context';
import ReCAPTCHA from 'react-google-recaptcha';
import { GG_RECAPTCHA_SITE, isProduction } from '@/configs';
import Button from '@/components/Button';
import toast from 'react-hot-toast';
import IconSVG from '@/components/IconSVG';
import Text from '@/components/Text';
import { WalletContext } from '@/contexts/wallet.context';
import faucetStorage from '@/components/Faucet/faucet.storage';

const FaucetModal = React.memo(() => {
  const { show, setShow } = useContext(FaucetContext);
  const { keySet } = useContext(WalletContext);

  const recaptchaRef = React.useRef<any>();
  const [token, setToken] = React.useState<string | undefined>(undefined);

  const onClose = () => setShow(false);

  const onSubmit = async () => {
    const recaptchaValue = recaptchaRef.current.getValue();
    if (!recaptchaValue) {
      return toast.error('Verify recaptcha now!');
    }
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
    }
  };

  return (
    <BaseModal show={show} handleClose={onClose} title="Faucet" width="550">
      <S.Content>
        <ReCAPTCHA size="normal" ref={recaptchaRef} sitekey={GG_RECAPTCHA_SITE} onChange={() => setToken('1')} />
        <S.Share
          disabled={!token}
          url={`https://ttt-game.trustless.computer/`}
          title={`I just got free TC for the TIC-TAC-TOE GAME NIGHT!
                  \nPowered by NOS - Bitcoin Layer 2 scaling solution with a lightning-fast 2-second block time.\n\n`}
          onShareWindowClose={onSubmit}
        >
          <Button disabled={!token}>
            <IconSVG src={`https://cdn.generative.xyz/icons/ic-twitter-white-20x20.svg`} maxWidth="32px" />
            <Text color="white">Share on Twitter</Text>
          </Button>
        </S.Share>
      </S.Content>
    </BaseModal>
  );
});

export default FaucetModal;
