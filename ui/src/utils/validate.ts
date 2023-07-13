import { Wallet } from 'ethers';
import { getErrorMessage } from '@/utils/error';
import toast from 'react-hot-toast';

const isValidPrvKey = (secretKey: string) => {
  let isValid = false;

  try {
    const wallet = new Wallet(secretKey);
    const address = wallet.address;
    if (address) {
      isValid = true;
    }
  } catch (error) {
    const { desc } = getErrorMessage(error);
    toast.error(desc);
    isValid = false;
  }

  return isValid;
};

export { isValidPrvKey };
