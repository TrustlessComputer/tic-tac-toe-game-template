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
}

export type { IKeySet, IWalletContext };
