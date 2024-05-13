import { useMetaMask } from '@hooks/index';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import globalStore from '@states/global';
import { useEffect } from 'react';
import OauthTwitter from './OauthTwitter';
import Connector from '@components/Connector';

export default function Nav() {
  const user = globalStore(state => state.user);
  const updateUser = globalStore(state => state.updateUser);
  const resetUser = globalStore(state => state.resetUser);

  const { provider, signer, chainId, account, connet, changeNetwork } = useMetaMask();

  useEffect(() => {
    if (account) {
      updateUser({
        accounts: account,
      });
    } else {
      resetUser();
    }
  }, [account]);

  return (
    <div className="flex items-center p-1 h-[100px]">
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
        {user.xAccount ? (
          <Connector
            chainId={chainId}
            account={account}
            onConnect={connet}
            onChangeNetwork={changeNetwork}
          />
        ) : (
          <OauthTwitter />
        )}
      </div>
    </div>
  );
}
