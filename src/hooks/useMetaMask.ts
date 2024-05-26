// import { BrowserProvider, JsonRpcSigner, ethers } from 'ethers';
// import { useEffect, useState } from 'react';

// import { useEffect } from 'react';
import { Connector, useConnect } from 'wagmi';

const useMetaMask = () => {
  const hasMetaMask = typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
  const { connectors } = useConnect();
  const metaMask: Connector | undefined = connectors.find(item => item.id === 'io.metamask');

  if (!metaMask || !hasMetaMask) {
    return {} as Connector;
  }

  return {
    ...metaMask,
  };

  // const [provider, setProvider] = useState<BrowserProvider | null>(null);
  // const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  // const [chainId, setChainId] = useState<string>();
  // const [accounts, setAccounts] = useState<string[]>([]);

  // useEffect(() => {
  //   setProvider(new ethers.BrowserProvider(window.ethereum));

  //   window.ethereum.on('accountsChanged', (accounts: string[]) => {
  //     setAccounts(accounts);
  //   });

  //   window.ethereum.on('chainChanged', (chainId: string) => {
  //     setChainId(chainId);
  //   });
  // }, []);

  // useEffect(() => {
  //   if (!!provider) {
  //     provider.send('eth_chainId', []).then(chainId => {
  //       setChainId(chainId);
  //     });

  //     provider.send('eth_accounts', []).then(accounts => {
  //       setAccounts(accounts);
  //     });
  //   }
  // }, [provider]);

  // useEffect(() => {
  //   if (!!provider && accounts[0]) {
  //     provider
  //       .getSigner()
  //       .then(signer => {
  //         setSigner(signer);
  //       })
  //       .catch(() => {
  //         setSigner(null);
  //       });
  //   } else {
  //     setSigner(null);
  //   }
  // }, [provider, accounts[0]]);

  // const connet = async () => {
  //   try {
  //     await provider?.send('eth_requestAccounts', []);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const changeNetwork = async (chainId: string) => {
  //   try {
  //     await provider?.send('wallet_switchEthereumChain', [{ chainId }]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
};

export default useMetaMask;
