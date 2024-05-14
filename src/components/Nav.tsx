import { useMetaMask } from '@hooks/index';
import { Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import globalStore from '@states/global';
import { useEffect } from 'react';
import OauthTwitter from './OauthTwitter';
import Connector from '@components/Connector';
import Logo from '@assets/images/logo.svg'

const menus = ['Galley', 'WinJoy', 'Vault', 'Ranking']

export default function Nav() {
  const user = globalStore(state => state.user);
  const updateUser = globalStore(state => state.updateUser);
  const resetUser = globalStore(state => state.resetUser);

  const { provider, signer, chainId, account, connet, changeNetwork } = useMetaMask();
  const { pathname } = useLocation()

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
    <div className="flex justify-center items-center p-1 h-[100px] bg-[#09110F4D]">
      <div className="logo w-60 mr-[228px]">
        <img src={Logo} />
      </div>
      <div className="menu items-center flex mr-[280px]">
        {
          menus.map(item => (
            <Link key={item} className='px-[24px] py-[10px] mr-[48px]' to={`/${item.toLowerCase()}`}>
              <Button className='text-[#FFFFFF] leading-[24px] font-[700] text-[20px]' style={pathname.endsWith(item.toLowerCase()) ? { color: '#3EE19E' } : {}}>{item.toLocaleUpperCase()}</Button>
            </Link>
          ))
        }
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
