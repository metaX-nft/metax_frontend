import * as React from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';
import FlipCountdown from '@rumess/react-flip-countdown';
import { useAccount } from 'wagmi';

import winJoyBg from '@assets/images/winJoy-bg.png';

import { useGetJoyResult, useJoinJoy, useClaimResult } from '@abis/contracts/wonJoy/contract';
// images
import LeftCoins1 from '@assets/images/left-coins-1.svg';
import LeftCoins2 from '@assets/images/left-coins-2.svg';
import LeftCoins3 from '@assets/images/left-coins-3.svg';
import LeftCoins4 from '@assets/images/left-coins-4.svg';
import RightCoins1 from '@assets/images/right-coins-1.svg';
import RightCoins2 from '@assets/images/right-coins-2.svg';
import RightCoins3 from '@assets/images/right-coins-3.svg';
import RightCoins4 from '@assets/images/right-coins-4.svg';
import { BigNumber } from '@ethersproject/bignumber';

const WinJoy = React.memo(() => {
  const { address } = useAccount();
  const today = moment(new Date());
  const nextDay = moment(today).add(1, 'day');
  const isBeforeTodayResultDate = today.isBefore(`${today.format('YYYY-MM-DD')} 12:00:00`);

  // get raffle result
  const { result } = useGetJoyResult();
  const [hasOpened, setHasOpened] = useState(!!result);

  const [hasJoin, setHasJoin] = useState(() => {
    const localJoin = JSON.parse(localStorage.getItem('x-token-winJoy-joined') ?? 'false');
    return Boolean(localJoin);
  });

  const { buyATicket, isPending, isSuccess, hash, error } = useJoinJoy();
  const { winnerResult, isConfirming: isGetting, isConfirmed: getSuccess } = useClaimResult();

  const handleByTicket = async () => {
    await buyATicket();
  };

  const handleSorryOrClaim = () => {
    if (result && BigNumber.from(result).toString() === address) {
      winnerResult();
    } else {
      setHasOpened(false);
    }
  };

  console.log(error);

  useEffect(() => {
    if (isSuccess) {
      setHasJoin(true);
      localStorage.setItem('x-token-winJoy-joined', 'true');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (getSuccess) {
      setHasJoin(false);
    }
  }, [getSuccess]);

  const claimText = isGetting ? 'claiming...' : 'claim';

  const buttonClass =
    'w-[263px] h-[64px] mt-[61px] text-[#47E49F] font-[24px] leading-[29px] rounded-[38px] border-[2px] border-[#47E49F] disabled:text-[#888] disabled:border-[#888]';

  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <img src={LeftCoins1} className="absolute left-[64px] top-[72px] w-[173px] h-[139px]" />
      <img src={LeftCoins2} className="absolute left-[0px] top-[342px] w-[143px] h-[212px]" />
      <img src={LeftCoins3} className="absolute left-[0px] bottom-[0px] w-[234px] h-[177px]" />
      <img src={LeftCoins4} className="absolute left-[287px] top-[399px]w-[105px] h-[92px]" />

      <div
        className="w-[960px] h-[460px] flex justify-center items-center flex-col bg-cover z-10"
        style={{ backgroundImage: `url(${winJoyBg})` }}
      >
        <FlipCountdown
          hideYear
          hideMonth
          theme="light"
          titlePosition="bottom"
          endAt={
            isBeforeTodayResultDate
              ? `${today.format('YYYY-MM-DD')} 12:00:00`
              : `${nextDay.format('YYYY-MM-DD')} 12:00:00`
          }
        />

        {hasOpened ? (
          <button className={buttonClass} onClick={handleSorryOrClaim}>
            {result === address ? claimText : 'Sorry'}
          </button>
        ) : hasJoin ? (
          <button className={buttonClass} disabled>
            Register
          </button>
        ) : (
          <button
            className={buttonClass}
            onClick={handleByTicket}
            disabled={hash && (isPending || isSuccess)}
          >
            {isPending ? 'loading...' : isSuccess ? 'confirming...' : 'Register'}
          </button>
        )}
      </div>

      <img src={RightCoins1} className="absolute right-[78px] top-[38px] w-[225px] h-[182px]" />
      <img src={RightCoins2} className="absolute right-[0px] top-[373px] w-[121px] h-[121px]" />
      <img src={RightCoins3} className="absolute right-[0px] bottom-[0px] w-[231px] h-[272px]" />
      <img src={RightCoins4} className="absolute right-[276px] top-[471px] w-[107px] h-[87px]" />
    </div>
  );
});
export default WinJoy;
