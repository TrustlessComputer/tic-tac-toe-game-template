import BaseModal from '@/components/BaseModal';
import * as S from './styled.modal';
import { Input } from '@/components/Input';
import React, { useContext } from 'react';
import Button from '@/components/Button';
import { WalletContext } from '@/contexts/wallet.context';

interface IProps {
  show: boolean;
  handleClose: () => void;
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

  return (
    <BaseModal show={show} handleClose={handleClose} title="Create wallet" width="550">
      <S.Content>
        <Input
          value={value.pass}
          type="password"
          placeholder="Enter password"
          onChange={event => setValue(value => ({ ...value, pass: event.target.value }))}
        />
        <S.Space />
        <Input
          value={value.confirm}
          type="password"
          placeholder="Confirm password"
          onChange={event => setValue(value => ({ ...value, confirm: event.target.value }))}
          errorMsg={isError ? 'Incorrect password' : ''}
        />
        <Button
          sizes="stretch"
          className="mt-24"
          disabled={!isCreatable}
          onClick={() => {
            onRandomAccount(value.pass);
            handleClose();
          }}
        >
          Create
        </Button>
      </S.Content>
    </BaseModal>
  );
};

export default CreateWalletModal;
