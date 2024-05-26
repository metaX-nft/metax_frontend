import useSetContract from '@hooks/useSetContract';
import { XTokenAbi, metaXTokenAddress } from './XTokenabi';
import { useReadContract } from 'wagmi';

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

export const useApprove = () => {
  const {
    setContract: approve,
    error,
    isPending,
    isSuccess,
    hash,
  } = useSetContract({
    abi: XTokenAbi,
    address: metaXTokenAddress,
    functionName: 'approve',
  });
  return { approve, error, isPending, isSuccess, hash };
};

export const useGetBalance = () => {
  const { data, error } = useReadContract({
    abi: XTokenAbi,
    functionName: 'getBalance',
    address: metaXTokenAddress,
  });
  return { data, error };
};
