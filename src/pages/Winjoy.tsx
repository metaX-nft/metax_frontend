import * as React from 'react';
import FlipCountdown from '@rumess/react-flip-countdown';
import winJoyBg from '@assets/images/winJoy-bg.png'
import moment from 'moment'

const WinJoy = React.memo(() => {
  const nextDay = moment(new Date()).add(1, 'day')
  const today = moment(new Date())
  const isBefore = moment(new Date()).isBefore(`${today.format('YYYY-MM-DD')} 12:00:00`)

  return (
    <div className='w-full h-full flex justify-center items-center'>
      <div className='w-[960px] h-[460px] flex justify-center items-center flex-col bg-cover' style={{ backgroundImage: `url(${winJoyBg})` }}>
        <FlipCountdown hideYear hideMonth theme='light' titlePosition='bottom'
          endAt={
            isBefore
              ?
              `${today.format('YYYY-MM-DD')} 12:00:00` :
              `${nextDay.format('YYYY-MM-DD')} 12:00:00`
          } />
        <button className='w-[263px] h-[64px] mt-[61px] text-[#47E49F] font-[24px] leading-[29px] rounded-[38px] border-[2px] border-[#47E49F]'>
          Register
        </button>
      </div>
    </div>
  )
});
export default WinJoy;