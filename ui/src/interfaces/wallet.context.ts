interface IKeySet {
  prvKey?: string;
  address?: string;
  password?: string;
  isNeedCreate: boolean;
}

interface IWalletContext {
  keySet: IKeySet;
  onLogin: (password: string) => void;
  onRandomAccount: (password: string) => void;
  walletState: {
    isLogged: boolean;
    isNeedCreate: boolean;
    isNeedLogin: boolean;
  };
}

export type { IKeySet, IWalletContext };
