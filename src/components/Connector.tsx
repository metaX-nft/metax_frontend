import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

import { useChainId, useAccount, Connector, useConnect } from 'wagmi';
import useMetaMask from '@hooks/useMetaMask';

export default function ConnectorWallect() {
  const [ready, setReady] = useState(false);

  const { connect } = useConnect();
  const { isConnected } = useAccount();

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
        安装 MetaMask
      </Button>
    );
  }

  if (!isConnected && metamask) {
    return (
      <Button
        variant="text"
        disabled={!ready}
        onClick={() => connect({ connector: metamask, chainId })}
      >
        连接钱包
      </Button>
    );
  }
  return <></>;
}
