import { useReadContract, useAccount, useSendTransaction, useWaitForTransactionReceipt } from 'wagmi'
import { BigNumber } from '@ethersproject/bignumber'
import stakeAbi from './StakeAbi'
import { parseEther } from 'viem'

import useSetContract from '@hooks/useSetContract';

const address = '0x675c494c242E0D9955b3348f6Ccb6B14948de30E' as `0x${string}`;

export const useStakedETH = () => {
  const { address: walletAddress } = useAccount();

  const { data, error } = useReadContract({
    abi: stakeAbi,
    functionName: "stakedETH",
    address,
    args: [walletAddress as `0x${string}`]
  })

  return {
    data: BigNumber.from(data || BigInt(0)).toNumber(),
    error
  }
}

export const useSendStakeWork = () => {
  const { sendTransactionAsync, data, error } = useSendTransaction({})
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  })

  const sendStakeInput = (input: string) => {
    return sendTransactionAsync({
      to: address,
      value: parseEther(input),
    })
  }

  return {
    sendStakeInput,
    stakeResult: data,
    stakeError: error,
    sending: isLoading,
    sendSuccess: isSuccess,
  }
}


export const useClaimXToken = () => {
  const {
    setContract,
    error,
    isPending,
    isSuccess,
  } = useSetContract({
    abi: stakeAbi,
    address,
    functionName: 'claim',
  })

  return {
    sendClaim: setContract,
    claimError: error,
    claiming: isPending,
    claimSuccess: isSuccess,
  }
}

export const useUnStakeETH = () => {
  const {
    setContract,
    error,
    isPending,
    isSuccess,
  } = useSetContract({
    abi: stakeAbi,
    address,
    functionName: 'unstake',
  })

  return {
    sendUnStake: setContract,
    unStakeError: error,
    unStaking: isPending,
    unStakeSuccess: isSuccess,
  }
}