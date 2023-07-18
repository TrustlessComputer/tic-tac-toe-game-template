import { Input } from '@/components/Input';
import { WalletContext } from '@/contexts/wallet.context';
// import { useAppDispatch } from '@/state/hooks';
// import { closeModal } from '@/state/modal';
import BaseModal from '@/components/BaseModal';
import accountStorage from '@/lib/account/account.storage';
import { ethers } from 'ethers';
import { Formik } from 'formik';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import OtpInput from 'react-otp-input';
import * as S from './styled';

export const IMPORT_MODAL_KEY = 'IMPORT_MODAL_KEY';

type Props = {
  show: boolean;
  handleClose: () => void;
  openCreate?: () => void;
};

type IFormValue = {
  pass: string;
  confirm: string;
  prvKey: string;
};

const ImportModal = React.memo((props: Props) => {
  const { show, handleClose, openCreate } = props;

  const { onLogin } = useContext(WalletContext);

  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  // const dispatch = useAppDispatch();

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.prvKey) {
      errors.prvKey = 'Private key is required.';
    }
    if (values.prvKey) {
      try {
        new ethers.Wallet(values.prvKey).address;
      } catch (e) {
        errors.prvKey = 'Invalid private key.';
      }
    }

    return errors;
  };

  const handleSubmit = async (payload: IFormValue): Promise<void> => {
    const isValid = pass.length === 4 && confirmPass.length === 4 && pass === confirmPass;
    if (isValid) {
      accountStorage.setAccount({
        prvKey: payload.prvKey,
        password: pass,
      });

      onLogin(pass);
      handleClose && handleClose();
    } else {
      toast.error('Incorrect passcode.');
    }
  };

  return (
    <BaseModal show={show} handleClose={handleClose} title="Import Private Key" width={500}>
      <Formik
        key="create-wallet"
        initialValues={{
          pass: '',
          confirm: '',
          prvKey: '',
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <S.Content>
            <Input
              id="prvKey"
              title="PRIVATE KEY"
              value={values.prvKey}
              placeholder="Enter your private key"
              onChange={handleChange}
              errorMsg={errors.prvKey}
            />
            <S.Space />

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

            <S.PasscodeContainer style={{ marginTop: 16 }}>
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
            <S.ButtonCreate type="submit" onClick={handleSubmit}>
              Import
            </S.ButtonCreate>
            <p className="create-wallet" onClick={openCreate}>
              Create new wallet
            </p>
          </S.Content>
        )}
      </Formik>
    </BaseModal>
  );
});

ImportModal.displayName = 'ImportModal';

export default ImportModal;
