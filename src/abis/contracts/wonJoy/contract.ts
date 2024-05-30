import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';

import winJoyAbi from './abi';

import useSetContract from '@hooks/useSetContract';

export const wonjoyAddress = process.env.WONJOY_ADDRESS as '0x${string}';

export function useGetJoyResult() {
  const { data: result } = useReadContract({
    abi: winJoyAbi,
    functionName: 'getLuckyTicketId',
    address: wonjoyAddress,
  });

  return { result };
}

export function useJoinJoy() {
  const { address: wallectAddress } = useAccount();

  const {
    setContract: buyATicket,
    error,
    isPending,
    isSuccess,
    hash,
  } = useSetContract({
    address: wonjoyAddress,
    abi: winJoyAbi,
    functionName: 'buyTicket',
    account: wallectAddress,
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
      address: wonjoyAddress,
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
