import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import { useChainId, Connector, useConnect, useAccount } from 'wagmi';
import useMetaMask from '@hooks/useMetaMask';
import globalStore from '@states/global';

export default function ConnectorWallect() {
  const [ready, setReady] = useState(false);

  const { connect } = useConnect();
  const chainId = useChainId();
  const { address } = useAccount();

  const metamask: Connector = useMetaMask();
  const updateUser = globalStore(state => state.updateUser);

  useEffect(() => {
    if (metamask) {
      (async () => {
        const provider = await metamask.getProvider();
        setReady(!!provider);
      })();
    }
  }, [metamask]);

  if (!window.ethereum || !window.ethereum.isMetaMask) {
    return (
      <Button variant="text" href="https://home.metamask.io/" target="_blank">
        Install MetaMask
      </Button>
    );
  }

  const handleConnectWallect = async () => {
    await connect(
      { connector: metamask, chainId },
      {
        onError(error, variables, context) {
          console.log(error);
        },
        onSuccess: function () {
          updateUser({ address: address, chainId: chainId });
        },
      },
    );
  };

  return (
    <Button variant="text" disabled={!ready} onClick={handleConnectWallect}>
      Connect Wallect
    </Button>
  );
}
