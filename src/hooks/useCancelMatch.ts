import useContractSigner from '@/hooks/useContractSigner';
import SDKError, { ERROR_CODE } from '@/utils/error';

const useCancelMatch = () => {
  const contractSigner = useContractSigner();
  const onCancelMatch = async () => {
    if (!contractSigner) throw new SDKError(ERROR_CODE.CANCEL_MATCH_ERROR);
    const tx = await contractSigner.cancelMatch();
    await tx.wait();
  };
  return { onCancelMatch };
};

export default useCancelMatch;
