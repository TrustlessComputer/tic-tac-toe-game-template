import React, { PropsWithChildren } from 'react';
import FaucetModal from '@/components/Faucet/faucet.modal';

interface IFaucetContext {
  show: boolean;
  setShow: (show: boolean) => void;
}

const initialValue: IFaucetContext = {
  show: false,
  setShow: () => undefined,
};

export const FaucetContext = React.createContext(initialValue);

export const FaucetProvider = ({ children }: PropsWithChildren) => {
  const [show, setShow] = React.useState(false);

  const contextValues = React.useMemo(() => {
    return { show, setShow };
  }, [show, setShow]);

  return (
    <FaucetContext.Provider value={contextValues}>
      {children}
      {show && <FaucetModal />}
    </FaucetContext.Provider>
  );
};
