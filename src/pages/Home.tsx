// import Connector from '@components/Connector';
// import { useMetaMask } from '@hooks/index';
import React from 'react';
import { ethers } from "ethers";

const Home = () => {
  console.log(ethers)
  // const {
  //   provider,
  //   signer,
  //   chainId,
  //   account,
  //   connet,
  //   changeNetwork,
  // } = useMetaMask()

  return (
    <div className="app">
      {/* <Connector chainId={chainId} account={account} onConnect={connet} onChangeNetwork={changeNetwork} /> */}
    </div>
  );
};
export default React.memo(Home);
