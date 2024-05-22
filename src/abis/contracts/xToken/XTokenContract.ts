import useSetContract from '@hooks/useSetContract';
import { XTokenAbi, metaXTokenAddress } from './XRokenabi';

export const useMintToken = () => {
  const { setContract: mintToken, error } = useSetContract({
    abi: XTokenAbi,
    address: metaXTokenAddress,
    functionName: 'mint',
  });

  return { mintToken, error };
};

export const useTransfer = () => {
  const {
    setContract: transfer,
    error,
    isPending,
    isSuccess,
  } = useSetContract({
    abi: XTokenAbi,
    address: metaXTokenAddress,
    functionName: 'transfer',
  });
  return { transfer, error, isPending, isSuccess };
};
