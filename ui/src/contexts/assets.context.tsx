import React, { PropsWithChildren, useContext } from 'react';
import { WalletContext } from './wallet.context';
import useProvider from '../hooks/useProvider';
import debounce from 'lodash/debounce';
import BigNumber from 'bignumber.js';
import { TOPUP_AMOUNT } from '@/configs';
import * as formatter from 'tc-formatter';
import faucetStorage from '@/components/Faucet/faucet.storage';

const INITIAL_BALANCE = {
  isLoaded: false,
  amount: '0',
  amountFormated: '0',
};

const initialValue = {
  balance: {
    ...INITIAL_BALANCE,
  },
  isNeedTopupTC: false,
};

export const AssetsContext = React.createContext(initialValue);

export const AssetsProvider = ({ children }: PropsWithChildren) => {
  const { address } = useContext(WalletContext);
  const provider = useProvider();

  const [balance, setBalance] = React.useState({
    ...INITIAL_BALANCE,
  });

  const onLoadBalance = async () => {
    if (!provider || !address) return;
    try {
      const balance = await provider.getBalance(address);
      setBalance({
        amount: balance.toString(),
        isLoaded: true,
        amountFormated: formatter.shorterAmount({ originalAmount: balance.toString(), decimals: 18 }),
      });
    } catch (e) {
      setBalance({
        amount: '0',
        isLoaded: true,
        amountFormated: '0',
      });
    }
  };

  const debounceLoadBalance = React.useCallback(debounce(onLoadBalance, 1000), [address]);

  const isNeedTopupTC = React.useMemo(() => {
    return balance.isLoaded && new BigNumber(balance.amount).lt(TOPUP_AMOUNT) && !faucetStorage.getFaucetStorage();
  }, [balance, faucetStorage]);

  const contextValues = React.useMemo(() => {
    return {
      balance,
      isNeedTopupTC,
    };
  }, [balance, isNeedTopupTC]);

  React.useEffect(() => {
    debounceLoadBalance();
    const interval = setInterval(() => {
      debounceLoadBalance();
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [address]);

  return <AssetsContext.Provider value={contextValues}>{children}</AssetsContext.Provider>;
};
