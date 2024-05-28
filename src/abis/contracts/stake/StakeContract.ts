import { useReadContract, useAccount } from 'wagmi';
import stakeAbi from './StakeAbi';
import { formatUnits } from 'viem';

import useSetContract from '@hooks/useSetContract';

const address = process.env.STAKE_ADDRESS as `0x${string}`;

export const useStakedETH = () => {
  const { address: walletAddress } = useAccount();

  const { data, error } = useReadContract({
    abi: stakeAbi,
    functionName: 'stakedETH',
    address,
    args: [walletAddress as `0x${string}`],
  });

  return {
    data: data ? formatUnits(data, 18) : 0,
    error,
  };
};

export const useSendStakeWork = () => {
  const {
    setContract: sendStakeInput,
    error,
    isPending,
    isSuccess,
    hash,
  } = useSetContract({
    abi: stakeAbi,
    address,
    functionName: 'stake',
  });

  return {
    sendStakeInput,
    hash,
    stakeError: error,
    sending: isPending,
    sendSuccess: isSuccess,
  };
};

export const useClaimXToken = () => {
  const { setContract, error, isPending, isSuccess } = useSetContract({
    abi: stakeAbi,
    address,
    functionName: 'claim',
  });

  return {
    sendClaim: setContract,
    claimError: error,
    claiming: isPending,
    claimSuccess: isSuccess,
  };
};

export const useUnStakeETH = () => {
  const { setContract, error, isPending, isSuccess } = useSetContract({
    abi: stakeAbi,
    address,
    functionName: 'unstake',
  });

  return {
    sendUnStake: setContract,
    unStakeError: error,
    unStaking: isPending,
    unStakeSuccess: isSuccess,
  };
};
