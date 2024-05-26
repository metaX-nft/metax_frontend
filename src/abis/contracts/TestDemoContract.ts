import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import type { WriteContractErrorType } from 'viem';
import TestDemoAbi from './TestDemoAbi';
import { useCallback, useEffect, useState } from 'react';

const contractAddress = '0xCe2eC9ADB7E6A12BaE1C46b5dCF85e7ec43145D6' as '0x${string}';

export function useGetMessage() {
  const { data: message } = useReadContract({
    abi: TestDemoAbi,
    functionName: 'getMessage',
    address: contractAddress,
  });

  return message;
}

export function useSetMessage() {
  const [error, setError] = useState<WriteContractErrorType | null>(null);
  const [isSuccess, setSuccess] = useState<boolean>(true);
  const [isPending, setPending] = useState<boolean>(false);

  const { data: transactionHash, writeContract } = useWriteContract();

  const setMessage = useCallback(
    async (message: string) => {
      setPending(true);
      setSuccess(false);
      setError(null);

      try {
        await writeContract({
          address: contractAddress,
          abi: TestDemoAbi,
          functionName: 'setMessage',
          args: [message],
        });
      } catch (err: any) {
        setError(err);
        setPending(false);
      }
    },
    [writeContract],
  );

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: transactionHash,
  });

  useEffect(() => {
    if (transactionHash) {
      setPending(isConfirming);
      setSuccess(isConfirmed);

      if (!isConfirming && !isConfirmed) {
        setPending(false);
      }
    }
  }, [isConfirming, isConfirmed, transactionHash]);

  return {
    setMessage,
    error,
    isPending,
    isSuccess,
  };
}
