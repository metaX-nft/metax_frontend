import * as React from 'react';
import { useState, useEffect } from 'react'

import StakeBg from '@assets/images/stake-bg.svg'
import TaskListIcon from '@assets/images/task-list-icon.svg';
import InputIcon from '@assets/images/stake-input-icon.png'
import Staked from '@assets/images/staked.svg'
import Claim from '@assets/images/claim.svg'

import { useStakedETH, useSendStakeWork, useClaimXToken, useUnStakeETH } from '@abis/contracts/stake/StakeContract'

const Vault = React.memo(() => {
  const [inputValue, setInputValue] = useState('1')

  const { data: StakedETH } = useStakedETH()
  const { sendUnStake, unStaking } = useUnStakeETH()
  const handleUnStake = () => {
    sendUnStake();
  }

  // stake eth
  const { sendStakeInput, sending, sendSuccess, } = useSendStakeWork()
  const handleSendStakeWork = async () => {
    try {
      await sendStakeInput(inputValue)
    } catch (e) {
      console.log('e', e);
    }
  }

  useEffect(() => {
    if (sendSuccess) {
      setInputValue('1')
    }
  }, [sendSuccess])

  // claim 
  const { sendClaim, claiming } = useClaimXToken()

  const handleClaim = () => {
    if (!claiming) {
      sendClaim()
    }
  }


  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className='w-[960px] h-[616px] relative z-[10]'>
        <img src={TaskListIcon} className='absolute left-[170px] top-[-63px] w-[169px] z-[1]' />
        <div className='absolute left-[210px] top-[54px] w-[60px] h-[40px] backdrop-blur-[10px] z-[5] '></div>
        <img className='w-[960px] h-[616px]' src={StakeBg} />
        <div className='absolute top-0 left-0 w-full h-full'>
          <p className='font-[600] text-[32px] leading-[48px] px-[60px] py-[16px] text-white'>Stake</p>

          <div className='pt-[28px] pl-[60px] flex'>
            <div className='rounded-[34px] border-[2px] border-[#47E49F] w-[500px] h-[64px] flex items-center px-[22px] justify-between'>
              <img src={InputIcon} className='w-[24px] h-[24px]' />
              <input value={inputValue} onChange={e => setInputValue(e.target.value.replace(' ', ''))} className='w-[430px] bg-[unset] text-white text-right leading-[29px] text-[24px] font-[400]' />
            </div>
            <button className='rounded-[38px] w-[263px] h-[64px] bg-[#47E49F] ml-[50px]' onClick={handleSendStakeWork}>
              <span className='font-[400] text-[24px] leading-[29px]'>{sending ? 'sending' : 'Stake ETH'}</span></button>
          </div>

          <div className='flex justify-center mt-[37px]'>
            <div className='w-[380px] h-[350px] border-[2px] border-[#47E49F] rounded-[40px] mr-[47px] py-[40px] flex flex-col items-center'>
              <img src={Staked} className='w-[71px] h-[71px]' />
              <p className='mt-[19px] text-white text-[24px] leading-[29px] font-[400]'>Staked</p>
              <p className='mt-[21px] text-white text-[32px] leading-[39px] font-[700]'>{StakedETH as number}</p>
              <button className='mt-[36px] rounded-[32px] w-[264px] h-[54px] bg-[#47E49F]'>
                <span className='text-[24px] leading-[29px] font-[400]' onClick={handleUnStake}>{unStaking ? 'unStaking' : 'UnStake'}</span>
              </button>
            </div>
            <div className='w-[380px] h-[350px] border-[2px] border-[#47E49F] rounded-[40px] py-[40px] flex flex-col items-center'>
              <img src={Claim} className='w-[71px] h-[71px]' />
              <p className='mt-[19px] text-white text-[24px] leading-[29px] font-[400]'>XToken</p>
              <p className='mt-[21px] text-white text-[32px] leading-[39px] font-[700]'>1 XToken / day</p>
              <button className='mt-[36px] rounded-[32px] w-[264px] h-[54px] bg-[#47E49F]' onClick={handleClaim}>
                <span className='text-[24px] leading-[29px] font-[400]'>{claiming ? "claiming" : 'Claim'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
export default Vault;
