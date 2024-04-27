import { useMetaMask } from '@hooks/index';
import Connector from '@components/Connector';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Nav() {
  const { provider, signer, chainId, account, connet, changeNetwork } = useMetaMask();

  return (
    <div className="flex items-center p-1">
      <div className="logo w-60">logo</div>
      <div className="menu flex-1 grow mx-1 items-center flex justify-between">
        <Link to="/galley">
          <Button>Galley</Button>
        </Link>
        <Link to="/winjoy">
          <Button>WinJoy</Button>
        </Link>
        <Link to="/vault">
          <Button>Vault</Button>
        </Link>
        <Link to="/ranking">
          <Button> Ranking</Button>
        </Link>
      </div>
      <div className="login">
        <Connector
          chainId={chainId}
          account={account}
          onConnect={connet}
          onChangeNetwork={changeNetwork}
        />
      </div>
    </div>
  );
}
