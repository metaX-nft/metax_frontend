import { parseUnits, parseEther } from 'viem';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useSendTransaction } from 'wagmi'

import winJoyAbi from './abi';
import { useApprove } from '@abis/contracts/xToken/XTokenContract';
import { useEffect } from 'react';

const contractAddress = '0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9' as '0x${string}';

export function useGetJoyResult() {
  const { data: result } = useReadContract({
    abi: winJoyAbi,
    functionName: 'getLuckyTicketId',
    address: contractAddress,
  })

  return { result }
}

export function useJoinJoy() {
  const {
    approve,
    error: approveError,
    isPending: approvePending,
    isSuccess: approveSuccess,
    hash: approveHash,
  } = useApprove();

  const { sendTransactionAsync, data, error } = useSendTransaction({})
  const { isLoading, isSuccess, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: data,
  })

  const buyATicket = async () => {
    await approve([contractAddress, parseUnits('1', 18)])
  }

  useEffect(() => {
    if (approveHash) {
      sendTransactionAsync({
        to: contractAddress,
        value: parseEther('0.0001'),
      })
    }
  }, [approveHash])

  return {
    approveError,
    approvePending,
    approveSuccess,
    approveHash,
    error,
    buyATicket,
    isLoading,
    isSuccess,
    isConfirming,
  }
}

export function useClaimResult() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash
  })

  const winnerResult = () => {
    writeContract({
      address: contractAddress,
      abi: winJoyAbi,
      functionName: 'claim',
      args: [],
    })
  }

  return {
    isPending,
    winnerResult,
    isConfirming,
    isConfirmed,
    error
  }
}