import { StorageService } from '@/lib/storage.local';
import { decryptAES, encryptAES } from '@/utils/encryption';

class AccountStorage extends StorageService {
  ACCOUNT_KEY = 'ACCOUNT_CIPHER_TEXT';
  ADDRESS_KEY = 'ADDRESS_STORAGE';

  getAccountKey = () => this.ACCOUNT_KEY;

  getAccountCipher = () => {
    const key = this.getAccountKey();
    const cipherText = this.get(key);
    return cipherText;
  };

  getAccount = (password: string) => {
    const cipherText = this.getAccountCipher();
    const prvKey = decryptAES(cipherText, password);
    return prvKey;
  };

  setAccount = ({ prvKey, password }: { prvKey: string; password: string }) => {
    const key = this.getAccountKey();
    const cipherText = encryptAES(prvKey, password);
    this.set(key, cipherText);
  };

  getAddressKey = () => this.ADDRESS_KEY;

  getAddress = () => {
    const key = this.getAddressKey();
    const address = this.get(key);
    return address;
  };

  setAddress = ({ address }: { address: string }) => {
    const key = this.getAddressKey();
    this.set(key, address);
  };
}

const accountStorage = new AccountStorage();

export default accountStorage;
