import { http, createConfig } from 'wagmi';
import { mainnet, lineaSepolia } from 'wagmi/chains';

import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [lineaSepolia, mainnet],
  transports: {
    [lineaSepolia.id]: http(),
    [mainnet.id]: http(),
  },
  connectors: [metaMask()],
});
