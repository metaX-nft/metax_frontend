import { useCallback, useEffect, useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

import type { WriteContractErrorType, Abi } from 'viem';
import { type WriteContractVariables } from '@wagmi/core/query';
import type { Config } from '@wagmi/core';

const useSetContract = ({
  abi,
  functionName,
  address: abiAddress,
}: WriteContractVariables<
  Abi,
  string,
  readonly unknown[],
  Config,
  Config['chains'][number]['id']
>) => {
  //claimFreePet
  // const [error, setError] = useState<WriteContractErrorType | null>(null);
  // const [isSuccess, setSuccess] = useState<boolean>(true);
  // const [isPending, setPending] = useState<boolean>(false);

  const { data: transactionHash, writeContract, error } = useWriteContract();

  const setContract = useCallback(async (args?: unknown[]) => {
    // setPending(true);
    // setSuccess(false);
    // setError(null);

    await writeContract({
      abi,
      functionName,
      address: abiAddress,
      args,
    });

    // try {
    //   await writeContract({
    //     abi,
    //     functionName,
    //     address: abiAddress,
    //     args,
    //   });
    // } catch (err: any) {
    //   setError(err);
    //   setPending(false);
    // }
  }, []);

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash: transactionHash,
    confirmations: 4,
  });

  // useEffect(() => {
  //   if (transactionHash) {
  //     setPending(isConfirming);
  //     setSuccess(isConfirmed);

  //     if (!isConfirming && !isConfirmed) {
  //       setPending(false);
  //     }
  //   }
  // }, [isConfirming, isConfirmed, transactionHash]);

  return {
    setContract,
    error,
    isPending: isConfirming,
    isSuccess: isConfirmed,
    hash: transactionHash,
  };
};

export default useSetContract;
