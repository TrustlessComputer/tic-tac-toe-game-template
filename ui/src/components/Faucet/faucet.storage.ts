import { StorageService } from '@/lib/storage.local';

class FaucetStorage extends StorageService {
  STORAGE_KEY = 'FAUCET_STORAGE';
  getFaucetKey = () => this.STORAGE_KEY;

  getFaucetStorage = () => {
    const key = this.getFaucetKey();
    return this.get(key);
  };

  setFaucetStorage = () => {
    const key = this.getFaucetKey();
    return this.set(key, 'true');
  };
}

const faucetStorage = new FaucetStorage();

export default faucetStorage;
