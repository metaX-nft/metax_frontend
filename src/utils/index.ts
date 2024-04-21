const supportedNetworks = [
  { chainId: '0xaa36a7', chainName: 'Sepolia Testnet', }, // 11155111
  { chainId: '0x1', chainName: 'Ethereum Mainnet' }, // 1
  { chainId: '0x7a69', chainName: 'Hardhat Localhost' }, // 31337
]

const ellipsisHash = (hash: string, prefixLen = 7, suffixLen = 5) => {
  const hashLen = hash.length

  if (hashLen <= prefixLen + suffixLen) {
    return hash
  }

  return `${hash.slice(0, prefixLen)}...${hash.slice(hashLen - suffixLen, hashLen)}`
}

const blockTimeToLocalTime = (time: bigint) => {
  const timestamp = Number(time) * 1000
  return new Date(timestamp).toLocaleString()
}

export {
  supportedNetworks,
  ellipsisHash,
  blockTimeToLocalTime,
};
