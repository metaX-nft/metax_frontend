import { BrowserProvider, JsonRpcSigner, ethers } from 'ethers';
import { useEffect, useState } from 'react';

const useMetaMask = () => {
  const hasMetaMask = typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;

  if (!hasMetaMask) {
    return {
      provider: null,
      signer: null,
      chainId: undefined,
      account: undefined,
      connet: async () => {},
      changeNetwork: async () => {},
    };
  }

  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [chainId, setChainId] = useState<string>();
  const [accounts, setAccounts] = useState<string[]>([]);

  useEffect(() => {
    setProvider(new ethers.BrowserProvider(window.ethereum));

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      setAccounts(accounts);
    });

    window.ethereum.on('chainChanged', (chainId: string) => {
      setChainId(chainId);
    });
  }, []);

  useEffect(() => {
    if (!!provider) {
      provider.send('eth_chainId', []).then(chainId => {
        setChainId(chainId);
      });

      provider.send('eth_accounts', []).then(accounts => {
        setAccounts(accounts);
      });
    }
  }, [provider]);

  useEffect(() => {
    if (!!provider && accounts[0]) {
      provider
        .getSigner()
        .then(signer => {
          setSigner(signer);
        })
        .catch(() => {
          setSigner(null);
        });
    } else {
      setSigner(null);
    }
  }, [provider, accounts[0]]);

  const connet = async () => {
    try {
      await provider?.send('eth_requestAccounts', []);
    } catch (error) {
      console.error(error);
    }
  };

  const changeNetwork = async (chainId: string) => {
    try {
      await provider?.send('wallet_switchEthereumChain', [{ chainId }]);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    provider,
    signer,
    chainId,
    account: accounts[0],
    connet,
    changeNetwork,
  };
};

export default useMetaMask;
