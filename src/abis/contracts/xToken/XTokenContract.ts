import useSetContract from '@hooks/useSetContract';
import { XTokenAbi, metaXTokenAddress } from './XRokenabi';

import { useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

import { useCallback } from 'react';

export const useMintToken = () => {
  const { setContract: mintToken, error } = useSetContract({
    abi: XTokenAbi,
    address: metaXTokenAddress,
    functionName: 'mint',
  });

  return { mintToken, error };
};

export const useTransfer = () => {
  const { address } = useAccount();
  const { data: hash, sendTransaction, isPending } = useSendTransaction();

  const handleTrans = useCallback((value: string) => {
    if (address) {
      sendTransaction({ to: address, value: parseEther(value) });
    }
  }, []);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return { handleTrans, isPending: isPending || isConfirming, isSuccess: isConfirmed };
};
