import { useReadContract } from 'wagmi'

import winJoyAbi from './abi';

const contractAddress = '0xCe2eC9ADB7E6A12BaE1C46b5dCF85e7ec43145D6' as '0x${string}';

export function useGetJoyResult() {
  const { data: result } = useReadContract({
    abi: winJoyAbi,
    functionName: 'getLuckyTicketId',
    address: contractAddress,
  })

  return result
}