import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Button, Tooltip } from '@mui/material';
import { FC, useState } from 'react';
import { supportedNetworks, ellipsisHash } from '@utils/index';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

interface Props {
  chainId: string | undefined;
  account: string | undefined;
  onConnect: () => Promise<void>;
  onChangeNetwork: (chainId: string) => Promise<void>;
}

const Connector: FC<Props> = ({ chainId, account, onConnect, onChangeNetwork }) => {
  const [connectLoading, setConnectLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleConnect = async () => {
    setConnectLoading(true);
    await onConnect();
    await onChangeNetwork(supportedNetworks[0].chainId);
    setConnectLoading(false);
  };

  if (!window.ethereum || !window.ethereum.isMetaMask) {
    return (
      <Button variant="contained" href="https://home.metamask.io/" target="_blank">
        安装 MetaMask
      </Button>
    );
  }

  if (account === undefined) {
    return (
      <Button variant="contained" onClick={handleConnect}>
        连接
      </Button>
    );
  }

  const handleControllerTip = () => {
    setOpen(open ? false : true);
  };

  return (
    <>
      <Tooltip title="已复制" placement="bottom" open={open} onClose={handleControllerTip}>
        <span>
          <CopyToClipboard text={account} onCopy={handleControllerTip}>
            <span className="flex items-center">
              <Jazzicon diameter={20} seed={jsNumberForAddress(account)} />
              <span className="ml-5">{ellipsisHash(account)}</span>
            </span>
          </CopyToClipboard>
        </span>
      </Tooltip>
    </>
  );
};

export default Connector;
