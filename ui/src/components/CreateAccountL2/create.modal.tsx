import BaseModal from '@/components/BaseModal';
import IconSVG from '@/components/IconSVG';
import { CDN_URL } from '@/configs';
import { WalletContext } from '@/contexts/wallet.context';
import { Text } from '@chakra-ui/react';
import copy from 'copy-to-clipboard';
import { throttle } from 'lodash';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import PasswordIcon from '../PassWord';
import * as S from './styled';

export const CREATE_MODAL_KEY = 'CREATE_MODAL_KEY';

type Props = {
  show: boolean;
  handleClose: () => void;
  openImport?: () => void;
};

const CreateModal = React.memo((props: Props) => {
  const { show, handleClose, openImport } = props;
  const [showPK, setShowPK] = useState(false);
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const { keySet } = useContext(WalletContext);
  const [step, setStep] = useState<'1' | '2' | '3'>('1');

  const { onRandomAccount } = useContext(WalletContext);

  const handleNext = () => {
    setStep('2');
  };

  const handleSubmit = async (): Promise<void> => {
    const isValid = pass.length === 4 && confirmPass.length === 4 && pass === confirmPass;
    if (isValid) {
      onRandomAccount(confirmPass);
      setStep('3');
    } else {
      toast.error('Incorrect passcode.');
    }
  };

  const handleContinue = () => {
    // dispatch(closeModal({ id: CREATE_MODAL_KEY }));
    handleClose && handleClose();
  };

  const onSwitchToImport = () => {
    openImport && openImport();
  };

  const copyPrivateKey = throttle(
    () => {
      if (keySet && keySet.prvKey) {
        copy(keySet.prvKey);
        toast.success('Copied');
      }
    },
    1000,
    {
      leading: true,
      trailing: false,
    },
  );

  const hidePriKeyStr = React.useMemo(() => {
    return (
      keySet.prvKey
        ?.split('')
        // eslint-disable-next-line no-unused-vars
        .map(_ => '*')
        .join('')
    );
  }, [keySet.prvKey]);

  const renderStepBackupPrivateKey = () => {
    return (
      <>
        <p className="desc-text">
          Important Notice: Before you start playing games with this wallet, please export and store your private key in
          a secure location to avoid any potential loss or unauthorized access to your digital assets.
        </p>
        <S.BoxKey>
          <S.Row>
            <Text>This is your private key</Text>
            <div className="wrapperIcon">
              <PasswordIcon isShow={showPK} onClick={() => setShowPK(!showPK)} />
            </div>
          </S.Row>
          <S.Row>
            <Text size="40" color="txt-error" fontWeight="medium" className="key-text">
              {showPK ? keySet.prvKey : hidePriKeyStr}
            </Text>

            <div className="icCopy" onClick={copyPrivateKey}>
              <IconSVG src={`${CDN_URL}/icons/ic-copy.svg`} color="black" maxWidth="25" iconType="stroke"></IconSVG>
            </div>
          </S.Row>
        </S.BoxKey>
        <S.ButtonCreate onClick={handleContinue}>Continue</S.ButtonCreate>
      </>
    );
  };

  const renderOtherStep = () => {
    return (
      <>
        {step === '1' && (
          <p className="desc-text">
            Set a passcode to create an in-game wallet. This wallet is only used to pay network fees and earn rewards
            for playing games on NOS.
          </p>
        )}

        {step === '1' && (
          <S.PasscodeContainer>
            <p className="passcodeTitle">PASSCODE</p>
            <OtpInput
              value={pass}
              onChange={setPass}
              numInputs={4}
              renderSeparator={<S.PasscodeSeparator />}
              renderInput={props => <S.PasscodeInput {...props} type="password" />}
              containerStyle={{ width: '100%' }}
              inputType="tel"
            />
          </S.PasscodeContainer>
        )}

        {step === '2' && (
          <>
            <S.PasscodeContainer>
              <p className="passcodeTitle">CONFIRM PASSCODE</p>
              <OtpInput
                value={confirmPass}
                onChange={setConfirmPass}
                numInputs={4}
                renderSeparator={<S.PasscodeSeparator />}
                renderInput={props => <S.PasscodeInput {...props} type="password" />}
                containerStyle={{ width: '100%' }}
                inputType="tel"
              />
            </S.PasscodeContainer>
          </>
        )}

        {step === '1' && <S.ButtonCreate onClick={handleNext}>Next</S.ButtonCreate>}

        {step === '2' && <S.ButtonCreate onClick={handleSubmit}>Create</S.ButtonCreate>}

        <p className="import-text">
          You already have wallet. <span onClick={onSwitchToImport}>Import private key.</span>
        </p>
      </>
    );
  };

  return (
    <BaseModal show={show} handleClose={handleClose} title="Create In-game Wallet" width={500}>
      <S.Content>{step === '3' ? renderStepBackupPrivateKey() : renderOtherStep()}</S.Content>
    </BaseModal>
  );
});

CreateModal.displayName = 'CreateModal';

export default CreateModal;
