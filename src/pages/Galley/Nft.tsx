import * as React from 'react';

import XThumb from '@assets/images/x-thumb.svg';
import XCommunity from '@assets/images/x-community.svg';
import XStart from '@assets/images/x-start.svg';
import defaultNft from '@assets/images/default-nft.png';

import GalleyPoints from '@assets/images/galley-points.svg';
import { useGetPetInfo, useFeedPetForX } from '@abis/contracts/mechPet/MechContract';
import { BigNumber } from '@ethersproject/bignumber';
import { LoadingButton } from '@mui/lab';
import { CircularProgress } from '@mui/material';
import { useAccount } from 'wagmi';
import { fedPet } from '@states/index';
import { useAtom } from 'jotai';
import globalStore from '@states/global';

const expLimitMapper = [
  { limit: 100, base: 0, lv: 0 },
  { limit: 300, base: 100, lv: 1 },
  { limit: 600, base: 300, lv: 2 },
  { limit: 1000, base: 600, lv: 3 },
  { limit: 1500, base: 1000, lv: 4 },
  { limit: 3000, base: 1500, lv: 5 },
];

const XContent = React.memo(() => {
  const XDataDemo = [
    { icon: XThumb, current: 12, need: 20 },
    { icon: XCommunity, current: 12, need: 20 },
    { icon: XStart, current: 12, need: 20 },
  ];
  const [_, setFedPet] = useAtom(fedPet);

  const [freeFeedButtonActiveTime, setFreeFeedButtonActiveTime] = React.useState('');
  const [freeFeedButtonDisabled, setFreeFeedButtonDisabled] = React.useState(false);
  const [xData, setXData] = React.useState(XDataDemo);

  const { feedPetWithX, error, isPending, isSuccess, hash } = useFeedPetForX();
  const current = new Date().getDate();

  const { address } = useAccount();
  const user = globalStore(state => state.user);

  React.useEffect(() => {
    const currentAccountLocalTime: string = localStorage.getItem('freeFeedTime') || '';
    let [currentAccount, localTime] = currentAccountLocalTime.split('+');

    if (address === currentAccount) {
      setFreeFeedButtonActiveTime(localTime);

      if (localTime && current - Number(localTime) <= 0) {
        setFreeFeedButtonDisabled(true);
      }
    }
  }, []);

  const handleFeedPetForFree = React.useCallback(async () => {
    const xAmount = xData.reduce((prev, current) => {
      return prev + current.current;
    }, 0);

    const amount = BigInt(xAmount);
    await feedPetWithX([amount]);

    const currentDay = new Date().getDate().toString();
    localStorage.setItem('freeFeedTime', `${address}+${currentDay}`);

    setFreeFeedButtonActiveTime(currentDay);
    setFreeFeedButtonDisabled(true);
    setFedPet(true);
  }, []);

  React.useEffect(() => {
    if (freeFeedButtonActiveTime && current - Number(freeFeedButtonActiveTime) >= 1) {
      setFreeFeedButtonDisabled(false);
    }
  }, [freeFeedButtonActiveTime]);

  React.useEffect(() => {
    if (hash && isSuccess && !isPending) {
      setFedPet(false);
    }
  }, [hash, isSuccess, isPending]);

  React.useEffect(() => {
    fetch(`${process.env.HTTPURL}/api/v1/tweets/${user.xId}}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml,application/json', // 设置 Accept 头，指定期望的响应格式
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  }, []);

  return (
    <div className="flex flex-row justify-between mt-[20px] border-[3px] rounded-[40px] border-[#3EE19E] px-[34px] py-[23px]">
      {xData.map((item, index) => (
        <div className="flex justify-center flex-col" key={index}>
          <img className="mb-[8px] w-[33px] h-[33px]" src={item.icon}></img>
          <span className="text-[14px] leading-[20px] text-white">
            {item.current}/{item.need}
          </span>
        </div>
      ))}
      <LoadingButton
        className="px-[45px] py-[18px] rounded-[65px] bg-primary text-black hover:text-white text-[24px] font-normal w-[146px] h-[64px] disabled:text-white disabled:cursor-not-allowed disabled:bg-opacity-50"
        onClick={handleFeedPetForFree}
        loading={hash && (isPending || !isSuccess)}
        style={{ textTransform: 'capitalize' }}
        disabled={(hash && (isPending || isSuccess)) || freeFeedButtonDisabled}
        loadingIndicator={
          <span className="flex items-center">
            <CircularProgress color="info" size={16} style={{ color: 'black' }} />
            <span className="text-[16px] ml-2 text-black">Loading</span>
          </span>
        }
      >
        {hash && (isPending || !isSuccess) ? '' : 'Feed'}
      </LoadingButton>
    </div>
  );
});

const NFTbody = React.memo(({ petId }: { petId?: bigint }) => {
  const [petImg, setPetImg] = React.useState('');
  const [minSlider, setMinSlider] = React.useState(0);
  const [isFedPet, _] = useAtom(fedPet);
  const petInfo = useGetPetInfo(petId);

  React.useEffect(() => {
    let nftUrl: string = petInfo?.petURI?.result ?? '';

    if (nftUrl) {
      nftUrl = nftUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');

      fetch(nftUrl)
        .then(res => res.json())
        .then(data => {
          if (data.image) {
            const petImgUrl = data.image.replace('ipfs://', 'https://ipfs.io/ipfs/');
            setPetImg(petImgUrl);
          }
        });
    }
  }, [petInfo]);

  const { lv, point, exp } = petInfo;

  const lvNumber = BigNumber.from(lv?.result ?? 0n).toNumber();
  const expNumber = BigNumber.from(exp?.result ?? 0n).toString();
  const limitExp = expLimitMapper[lvNumber]?.limit;

  React.useEffect(() => {
    const minSlider = (expNumber / limitExp) * 9.25;
    setMinSlider(minSlider);
  }, [expNumber, limitExp]);

  const pointNumber = BigNumber.from(point?.result ?? 0n).toNumber();

  return (
    <>
      <div className="mt-[117px] w-[529px] h-[500px] relative">
        <div className="absolute -top-[40px] left-[20px] flex">
          <div className="h-[26px] w-[150px] relative text-center mr-[20px]">
            <div className="flex gap-2 z-[20] relative items-center">
              <span className="min-w-[26px] h-[26px] rounded-[13px] border-[2px]  border-[#00873F] bg-[#3EE19E]  text-center text-[14px]">
                {lvNumber}
              </span>
              <span className="text-white">
                {expNumber} / {limitExp}
              </span>
            </div>
            <div
              className={`h-[26px] absolute left-0 top-0 z-[10] rounded-[20px] bg-[#0d5d41]`}
              style={{ width: `${minSlider}rem` }}
            ></div>
            <div className="h-[26px] w-[9.25rem] absolute left-0 top-0 z-[5] rounded-[20px] bg-[#063122]"></div>
          </div>

          <div className="h-[26px] w-[116px] relative text-center">
            <div className="flex gap-2  z-[20] relative items-center">
              <img
                src={GalleyPoints}
                className="min-w-[26px] h-[26px] rounded-[13px] border-[2px] border-[#00873F] bg-[#3EE19E] "
              />
              <span className=" text-white ">{pointNumber}</span>
            </div>
            <div className="h-[26px] w-[116px] absolute left-0 top-0 z-[5] rounded-[20px] bg-[#063122]"></div>
          </div>
        </div>
        <img className="w-[500px] h-[510px] mx-auto" src={petImg || defaultNft} />
      </div>
      <XContent />
    </>
  );
});

export default NFTbody;
