import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'

import winJoyAbi from './abi';

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
  const { data: hash, error, isPending, writeContract } = useWriteContract()

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const buyATicket = () => {
    writeContract({
      address: contractAddress,
      abi: winJoyAbi,
      functionName: 'buyTicket',
      args: [],
    })
  }

  return {
    isPending,
    buyATicket,
    isConfirming,
    isConfirmed,
    error
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