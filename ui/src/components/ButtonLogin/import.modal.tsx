import BaseModal from '@/components/BaseModal';
import * as S from './styled.modal';
import { Input } from '@/components/Input';
import React, { useContext } from 'react';
import Button from '@/components/Button';
import { WalletContext } from '@/contexts/wallet.context';
import { Formik } from 'formik';
import accountStorage from '@/lib/account/account.storage';
import { isValidPrvKey } from '@/utils/validate';
import Text from '@/components/Text';

interface IProps {
  show: boolean;
  handleClose: () => void;
  openCreate: () => void;
}

interface IFormValue {
  pass: string;
  confirm: string;
  prvKey: string;
}
const ImportWalletModal = ({ show, handleClose, openCreate }: IProps) => {
  const { onLogin } = useContext(WalletContext);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.prvKey) {
      errors.prvKey = 'Required.';
    } else if (!isValidPrvKey(values.prvKey)) {
      errors.prvKey = 'Incorrect private key.';
    } else if (!values.pass) {
      errors.pass = 'Required.';
    } else if ((values.pass + '').length !== 4) {
      errors.pass = 'Enter 4-digit passcode.';
    } else if (!values.confirm) {
      errors.confirm = 'Required.';
    } else if ((values.confirm + '').length !== 4) {
      errors.confirm = 'Enter 4-digit passcode.';
    } else if (values.pass && values.confirm && values.pass !== values.confirm) {
      errors.confirm = 'Incorrect passcode.';
    }

    return errors;
  };

  const handleSubmit = async (payload: IFormValue): Promise<void> => {
    accountStorage.setAccount({
      prvKey: payload.prvKey,
      password: payload.pass + '',
    });
    onLogin(payload.pass + '');
    handleClose();
  };

  return (
    <BaseModal show={show} handleClose={handleClose} title="Create wallet" width="550">
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
              value={values.prvKey}
              type="text"
              placeholder="Enter private key"
              onChange={handleChange}
              errorMsg={errors.prvKey}
            />
            <S.Space />
            <Input
              id="pass"
              value={values.pass}
              type="number"
              placeholder="Enter 4-digit passcode"
              onChange={handleChange}
              errorMsg={errors.pass}
            />
            <S.Space />
            <Input
              id="confirm"
              value={values.confirm}
              type="number"
              placeholder="Confirm 4-digit passcode"
              onChange={handleChange}
              errorMsg={errors.confirm}
            />
            <Button type="submit" sizes="stretch" className="mt-24" onClick={handleSubmit}>
              Import
            </Button>
            <Text className="mt-24 create" align="center" fontWeight="light" onClick={openCreate}>
              Create new wallet
            </Text>
          </S.Content>
        )}
      </Formik>
    </BaseModal>
  );
};

export default ImportWalletModal;
