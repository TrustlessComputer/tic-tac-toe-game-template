import BaseModal from '@/components/BaseModal';
import * as S from './styled.modal';
import { Input } from '@/components/Input';
import React, { useContext } from 'react';
import Button from '@/components/Button';
import { WalletContext } from '@/contexts/wallet.context';
import { Formik } from 'formik';
import toast from 'react-hot-toast';
import { getErrorMessage } from '@/utils/error';
import { throttle } from 'lodash';

interface IProps {
  show: boolean;
  handleClose: () => void;
}

type IFormValue = {
  password: string;
};

const LoginModal = ({ show, handleClose }: IProps) => {
  const { onLogin } = useContext(WalletContext);

  const validateForm = (values: IFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    if (!values.password) {
      errors.name = 'Password is required.';
    }

    return errors;
  };

  const handleSubmit = throttle(async (params: IFormValue): Promise<void> => {
    try {
      onLogin(params.password);
      handleClose();
    } catch (error) {
      const { message } = getErrorMessage(error);
      toast.error(message);
    }
  }, 1000);

  return (
    <BaseModal show={show} handleClose={handleClose} title="Login" width="550">
      <S.Content>
        <Formik
          key="login"
          initialValues={{
            password: '',
          }}
          validate={validateForm}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form className="form" onSubmit={handleSubmit}>
              <Input
                title="Password"
                id="password"
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="input"
                autoFocus={true}
                placeholder="Enter 4-digit passcode"
                errorMsg={errors.password && touched.password ? errors.password : undefined}
              />
              <Button disabled={isSubmitting} sizes="stretch" type="submit" className="mt-24">
                Login
              </Button>
            </form>
          )}
        </Formik>
      </S.Content>
    </BaseModal>
  );
};

export default LoginModal;
