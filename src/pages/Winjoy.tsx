import * as React from 'react';
// import {useState, useEffect } from 'react';
import CountdownPage from '@components/Countdown';
import LotteryList from '@components/LotteryList';

const Winjoy = React.memo(() => {
  const initialCount = 3600;

  const items = [];

  for (let i = 1; i <= 8; i++) {
    items.push({ id: i, content: `Item ${i}`, number: 10 * i });
  }

  const handleRegisterClick = () => {
    console.log(`Register button clicked`);
  };
  return (
    <div className='text-center mt-10'>

      <div className='flex justify-end pr-5'>
        <div className='timer' style={{marginRight:"21%"}}>
          <CountdownPage initialCount={initialCount}></CountdownPage>
          <div
            className="mx-auto flex justify-center items-center mt-5 rounded border border-gray-400 w-72 h-16"
            onClick={handleRegisterClick}
          >
            Register
          </div>
        </div>

        <div className='reward'>
          <div>reward</div>
          <div
            className="mx-auto flex justify-center items-center mt-5 rounded border border-gray-400 w-72 h-16"
          >
            奖品列表
          </div>
        </div>
      </div>


      <div className='mx-auto mt-16'>
        <div className='mb-7'>用户抽奖券列表</div>
        <LotteryList items={items}></LotteryList>
      </div>
    </div>
  )
});
export default Winjoy;