import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import { useChainId, Connector, useConnect } from 'wagmi';
import useMetaMask from '@hooks/useMetaMask';

export default function ConnectorWallect() {
  const [ready, setReady] = useState(false);

  const { connect } = useConnect();
  const chainId = useChainId();

  const metamask: Connector = useMetaMask();

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

  const handleConnectWallect = () => {
    connect(
      { connector: metamask, chainId },
      {
        onError(error, variables, context) {
          console.log(error);
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
