export const mechPetAddress = '0x6eae53F181Efff2E46c01e0d96Ca8a8A15745920';
// const chainlinkRaffleAddress = '0xFA50748EfA00390B5Fc631bceA9D81c38c6cC434';
// const luckyPickAddress = '0xE813f0C680956A40E6E5F6743444D3C732394945';
// const expStakeAddress = '0xAD3c67db91309b2cEd457A4c0fD8aE9Eae7878D7';
// const priceFeedAddress = '0x83140d6532Af3769047dCB36cf9A6D7133275A38';

import MechPetAbi from './MechPetAbi';

import { useReadContract, useReadContracts, useAccount } from 'wagmi';

import useSetContract from '@hooks/useSetContract';

const useClaimFreePet = () => {
  const {
    setContract: claimFreePet,
    error,
    isPending,
    isSuccess,
  } = useSetContract({ abi: MechPetAbi, functionName: 'claimFreePet', address: mechPetAddress });

  return {
    claimFreePet,
    error,
    isPending,
    isSuccess,
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
  const results = useReadContracts({
    contracts: [
      {
        abi: MechPetAbi,
        functionName: 'getLv',
        address: mechPetAddress,
        args: [petId],
      },
      {
        abi: MechPetAbi,
        functionName: 'getExp',
        address: mechPetAddress,
        args: [petId],
      },
      {
        abi: MechPetAbi,
        functionName: 'getPoint',
        address: mechPetAddress,
        args: [petId],
      },
      {
        abi: MechPetAbi,
        functionName: 'tokenURI',
        address: mechPetAddress,
        args: [petId],
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
