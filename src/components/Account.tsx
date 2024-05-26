import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Logout, ContentCopy, LinkOff } from '@mui/icons-material';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { normalize } from 'viem/ens';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { ellipsisHash } from '@utils/index';
import globalStore from '@states/global';
import ConnectorWallect from './Connector';

import './Account.css';

export default function Account() {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ? ensName : normalize('wevm.eth') });
  // const chainId = useChainId();

  const user = globalStore(state => state.user);
  const updateUser = globalStore(state => state.updateUser);
  const resetUser = globalStore(state => state.resetUser);

  const navigate = useNavigate();
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDisconnect = () => {
    disconnect();
    updateUser({ address: '' });
  };

  const handleControllerTip = () => {
    setOpen(open ? false : true);
  };

  const handleLogout = () => {
    resetUser();
    localStorage.removeItem('xid');
    navigate('/login');
  };

  return (
    <>
      <IconButton
        onClick={handleOpenMenu}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <div className="accountButton px-6">
          <div className="relative z-2 flex items-center">
            <Avatar sx={{ width: 32, height: 32 }} src={user.xAvatar}></Avatar>
            <span className="ml-3 text-white" style={{ textTransform: 'capitalize' }}>
              {user.xAccount}
            </span>
          </div>
        </div>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {isConnected
          ? [
              <MenuItem key="account">
                <ListItemIcon>
                  {ensAvatar ? (
                    <img
                      className="h-[40px] w-[40px] rounded-full"
                      alt="ENS Avatar"
                      src={ensAvatar}
                    />
                  ) : (
                    <Jazzicon diameter={20} seed={jsNumberForAddress(address || '')} />
                  )}
                </ListItemIcon>
                {address && <ListItemText className="mr-5">{ellipsisHash(address)}</ListItemText>}
                <ListItemIcon>
                  <CopyToClipboard text={address || ''} onCopy={handleControllerTip}>
                    <ContentCopy />
                  </CopyToClipboard>
                </ListItemIcon>
              </MenuItem>,
              <Divider key="divider" />,
              <MenuItem key="discount" onClick={handleDisconnect}>
                <ListItemIcon>
                  <LinkOff />
                </ListItemIcon>
                <ListItemText>Disconnect</ListItemText>
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>,
            ]
          : [
              <MenuItem key="connect">
                <ConnectorWallect />
              </MenuItem>,
              <MenuItem key="logout" onClick={handleLogout}>
                <ListItemIcon>
                  <Logout />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>,
            ]}
      </Menu>
    </>
  );
}
