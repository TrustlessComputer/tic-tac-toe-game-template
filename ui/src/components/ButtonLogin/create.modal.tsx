import BaseModal from '@/components/BaseModal';
import * as S from './styled.modal';
import { Input } from '@/components/Input';
import React, { useContext } from 'react';
import Button from '@/components/Button';
import { WalletContext } from '@/contexts/wallet.context';
import storageLocal from '@/lib/storage.local';
import { Formik } from 'formik';

interface IProps {
  show: boolean;
  handleClose: () => void;
}

interface IFormValue {
  pass: string;
  confirm: string;
}
const CreateWalletModal = ({ show, handleClose }: IProps) => {
  const { onRandomAccount } = useContext(WalletContext);
  const [value, setValue] = React.useState({ pass: '', confirm: '' });

  const isError = React.useMemo(() => {
    if (value.pass && value.confirm) {
      return value.pass !== value.confirm;
    }
    return false;
  }, [value]);

  const isCreatable = React.useMemo(() => {
    return !!(value.pass && value.confirm && !isError);
  }, [value, isError]);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.pass) {
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
    onRandomAccount(payload.pass + '');
    handleClose();
  };

  return (
    <BaseModal show={show} handleClose={handleClose} title="Create wallet" width="550">
      <Formik
        key="create-wallet"
        initialValues={{
          pass: '',
          confirm: '',
        }}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ values, errors, handleChange, handleSubmit }) => (
          <S.Content>
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
              Create
            </Button>
          </S.Content>
        )}
      </Formik>
    </BaseModal>
  );
};

export default CreateWalletModal;
