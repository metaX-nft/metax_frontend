import * as React from 'react';
import { useEffect, useState } from 'react'
import moment from 'moment'
import FlipCountdown from '@rumess/react-flip-countdown';
import { useAccount } from 'wagmi'

import winJoyBg from '@assets/images/winJoy-bg.png'

import { useGetJoyResult, useJoinJoy, useClaimResult } from '@abis/contracts/wonJoy/contract'
// images
import LeftCoins1 from '@assets/images/left-coins-1.svg'
import LeftCoins2 from '@assets/images/left-coins-2.svg'
import LeftCoins3 from '@assets/images/left-coins-3.svg'
import LeftCoins4 from '@assets/images/left-coins-4.svg'
import RightCoins1 from '@assets/images/right-coins-1.svg'
import RightCoins2 from '@assets/images/right-coins-2.svg'
import RightCoins3 from '@assets/images/right-coins-3.svg'
import RightCoins4 from '@assets/images/right-coins-4.svg'

const WinJoy = React.memo(() => {
  const { address } = useAccount();
  const today = moment(new Date());
  const nextDay = moment(today).add(1, 'day');
  const isBeforeTodayResultDate = today.isBefore(`${today.format('YYYY-MM-DD')} 12:00:00`);

  // get raffle result
  const { result } = useGetJoyResult();
  const { isPending, isConfirmed, isConfirming, buyATicket } = useJoinJoy()

  const belongDate = localStorage.getItem('winJoy-joined-date') ?? '';
  const [hasJoined, setJoined] = useState(() => {
    return belongDate !== ''
  })

  const resultBelongToday = isBeforeTodayResultDate ? moment(today) : moment(nextDay);

  const [waitingResult] = useState(() => {
    if (belongDate) {
      return resultBelongToday.isBefore(`${belongDate} 12:00:00`);
    }
    return false
  })

  const [viewResult, setViewResult] = useState(false)

  useEffect(() => {
    if (isConfirmed) {
      const partInDate = isBeforeTodayResultDate ? today.format('YYYY-MM-DD') : nextDay.format('YYYY-MM-DD');
      localStorage.setItem('winJoy-joined-date', partInDate);
      setJoined(true)
      setViewResult(false)
    }
  }, [isConfirmed, isConfirming])

  const { winnerResult, isConfirming: isGeting, isConfirmed: getSuccess } = useClaimResult()
  const handleSorryOrClaim = () => {
    if (hasJoined && result !== address) {
      setViewResult(true)
      localStorage.removeItem('winJoy-joined-date')
    } else {
      winnerResult()
    }
  }

  useEffect(() => {
    if (getSuccess) {
      localStorage.removeItem('winJoy-joined-date')
      setViewResult(true)
      setJoined(false)
    }
  }, [isGeting, getSuccess])

  const buttonClass = 'w-[263px] h-[64px] mt-[61px] text-[#47E49F] font-[24px] leading-[29px] rounded-[38px] border-[2px] border-[#47E49F]'
  return (
    <div className='w-full h-full relative flex justify-center items-center'>
      <img src={LeftCoins1} className='absolute left-[64px] top-[72px] w-[173px] h-[139px]' />
      <img src={LeftCoins2} className='absolute left-[0px] top-[342px] w-[143px] h-[212px]' />
      <img src={LeftCoins3} className='absolute left-[0px] bottom-[0px] w-[234px] h-[177px]' />
      <img src={LeftCoins4} className='absolute left-[287px] top-[399px]w-[105px] h-[92px]' />

      <div className='w-[960px] h-[460px] flex justify-center items-center flex-col bg-cover z-10' style={{ backgroundImage: `url(${winJoyBg})` }}>
        <FlipCountdown hideYear hideMonth theme='light' titlePosition='bottom'
          endAt={
            isBeforeTodayResultDate
              ?
              `${today.format('YYYY-MM-DD')} 12:00:00` :
              `${nextDay.format('YYYY-MM-DD')} 12:00:00`
          } />

        {
          (hasJoined && !viewResult) ? (
            <button className={waitingResult ? `${buttonClass} disabled:cursor-not-allowed` : buttonClass} disabled={waitingResult || isGeting} onClick={handleSorryOrClaim}>
              {waitingResult ? 'Waiting Result...' : result === address ? 'Claim' : "Sorry"}
            </button>
          ) : (
            <button className='w-[263px] h-[64px] mt-[61px] text-[#47E49F] font-[24px] leading-[29px] rounded-[38px] border-[2px] border-[#47E49F]' onClick={buyATicket}>
              {
                isPending ? 'loading...' : isConfirming ? 'confirming...' : "Register"
              }
            </button>
          )
        }
      </div>

      <img src={RightCoins1} className='absolute right-[78px] top-[38px] w-[225px] h-[182px]' />
      <img src={RightCoins2} className='absolute right-[0px] top-[373px] w-[121px] h-[121px]' />
      <img src={RightCoins3} className='absolute right-[0px] bottom-[0px] w-[231px] h-[272px]' />
      <img src={RightCoins4} className='absolute right-[276px] top-[471px] w-[107px] h-[87px]' />

    </div >
  )
});
export default WinJoy;