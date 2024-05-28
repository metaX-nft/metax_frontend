import { parseUnits, parseEther } from 'viem';
import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
  useSendTransaction,
} from 'wagmi';

import winJoyAbi from './abi';
import { useApprove } from '@abis/contracts/xToken/XTokenContract';
import { useEffect } from 'react';
import useSetContract from '@hooks/useSetContract';

const contractAddress = process.env.WONJOY_ADDRESS as '0x${string}';

export function useGetJoyResult() {
  const { data: result } = useReadContract({
    abi: winJoyAbi,
    functionName: 'getLuckyTicketId',
    address: contractAddress,
  });

  return { result };
}

export function useJoinJoy() {
  const {
    setContract: buyATicket,
    error,
    isPending,
    isSuccess,
    hash,
  } = useSetContract({
    address: contractAddress,
    abi: winJoyAbi,
    functionName: 'buyTicket',
  });

  return {
    error,
    buyATicket,
    isPending,
    isSuccess,
    hash,
  };
}

export function useClaimResult() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const winnerResult = () => {
    writeContract({
      address: contractAddress,
      abi: winJoyAbi,
      functionName: 'claim',
      args: [],
    });
  };

  return {
    isPending,
    winnerResult,
    isConfirming,
    isConfirmed,
    error,
  };
}
