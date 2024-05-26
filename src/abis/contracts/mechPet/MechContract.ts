export const mechPetAddress = process.env.MECH_PET_ADDRESS;

import MechPetAbi from './MechPetAbi';

import { useReadContract, useReadContracts, useAccount } from 'wagmi';

import useSetContract from '@hooks/useSetContract';

const useClaimFreePet = () => {
  const {
    setContract: claimFreePet,
    error,
    isPending,
    isSuccess,
    hash,
  } = useSetContract({ abi: MechPetAbi, functionName: 'claimFreePet', address: mechPetAddress });

  return {
    claimFreePet,
    error,
    isPending,
    isSuccess,
    hash,
  };
};

const usePetId = () => {
  const { address: walletAddress } = useAccount();

  const { data, error } = useReadContract({
    abi: MechPetAbi,
    functionName: 'getPetIdOf',
    address: mechPetAddress,
    args: walletAddress ? [walletAddress] : undefined,
  });

  return { id: data || BigInt(0), error };
};

const useGetPetInfo = (petId?: bigint) => {
  const args = petId ? [petId] : undefined;

  const results = useReadContracts({
    contracts: [
      {
        abi: MechPetAbi,
        functionName: 'getLv',
        address: mechPetAddress,
        args,
      },
      {
        abi: MechPetAbi,
        functionName: 'getExp',
        address: mechPetAddress,
        args,
      },
      {
        abi: MechPetAbi,
        functionName: 'getPoint',
        address: mechPetAddress,
        args,
      },
      {
        abi: MechPetAbi,
        functionName: 'tokenURI',
        address: mechPetAddress,
        args,
      },
    ],
  });

  const [lv, exp, point, petURI] = results?.data ?? [];
  return { lv, exp, point, petURI };
};

const useFeedPetForFood = () => {
  //feedPetWithFood
  const {
    setContract: feedPetWithFood,
    error,
    isPending,
    isSuccess,
    hash,
  } = useSetContract({ address: mechPetAddress, abi: MechPetAbi, functionName: 'feedPetWithFood' });

  return {
    feedPetWithFood,
    error,
    isPending,
    isSuccess,
    hash,
  };
};

const useFeedPetForX = () => {
  const {
    setContract: feedPetWithX,
    error,
    isPending,
    isSuccess,
    ...rest
  } = useSetContract({ address: mechPetAddress, abi: MechPetAbi, functionName: 'feedPetWithX' });

  return {
    feedPetWithX,
    error,
    isPending,
    isSuccess,
    ...rest,
  };
};

const useGrowPet = () => {
  const {
    setContract: growPet,
    error,
    isPending,
    isSuccess,
    hash,
  } = useSetContract({ address: mechPetAddress, abi: MechPetAbi, functionName: 'growPet' });

  return {
    growPet,
    error,
    isPending,
    isSuccess,
    hash,
  };
};

export { useClaimFreePet, useGetPetInfo, useFeedPetForX, useFeedPetForFood, usePetId, useGrowPet };
