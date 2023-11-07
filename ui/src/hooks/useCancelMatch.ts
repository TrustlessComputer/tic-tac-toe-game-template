import useContractSigner from '@/hooks/useContractSigner';
import SDKError, { ERROR_CODE } from '@/utils/error';

const useCancelMatch = () => {
  console.log('Start Cancel');
  const contractSigner = useContractSigner();
  const onCancelMatch = async () => {
    if (!contractSigner) throw new SDKError(ERROR_CODE.CANCEL_MATCH_ERROR);
    try {
      const tx = await contractSigner.cancelMatch();
      console.log('Cancel match ____', tx);
      await tx.wait();
    } catch (error) {
      console.log('error cancel ___', error);
    }
  };
  return { onCancelMatch };
};

export default useCancelMatch;
