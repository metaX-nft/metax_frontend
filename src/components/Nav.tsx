import { Link, useLocation } from 'react-router-dom';
import globalStore from '@states/global';
import OauthTwitter from './OauthTwitter';

import Logo from '@assets/images/logo.svg';
import { useEffect } from 'react';
import Account from './Account';

const menus = ['Galley', 'Stake', 'WinJoy', 'Ranking'];

export default function Nav() {
  const user = globalStore(state => state.user);
  const { pathname } = useLocation();
  // const updateUser = globalStore(state => state.updateUser);
  // const resetUser = globalStore(state => state.resetUser);

  // 通过接口返回的 twitter 信息
  useEffect(() => {
    // if (user) {
    //   updateUser({
    //     xAccount: user,
    //   });
    // } else {
    //   resetUser();
    // }
  }, []);

  return (
    <div className="flex justify-center items-center p-1 h-[100px] bg-[#09110F4D]">
      <div className="logo w-60 mr-[228px]">
        <img src={Logo} />
      </div>
      <div className="menu items-center flex mr-[280px]">
        {menus.map(item => (
          <Link
            key={item}
            className={`px-[24px] py-[10px] mr-[48px] h-[100%] relative`}
            to={`/${item.toLowerCase()}`}
          >
            <div
              className={`${pathname.endsWith(item.toLowerCase()) ? 'text-primary' : 'text-white'} } leading-[24px] font-[700] text-[20px] hover:text-primary`}
            >
              {item.toLocaleUpperCase()}
            </div>
          </Link>
        ))}
      </div>
      <div className="connect-wallect">
        {
          // user.xAccount ?
          <Account />
          // : <OauthTwitter />
        }
      </div>
    </div>
  );
}
