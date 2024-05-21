import * as React from 'react';

import XThumb from '@assets/images/x-thumb.svg';
// import NFT from '@assets/images/nft.png';
import GalleyPoints from '@assets/images/galley-points.svg';
import { useGetPetInfo, useFeedPetForX } from '@abis/contracts/mechPet/MechContract';
import { formatEther } from 'viem';
import { BigNumber } from '@ethersproject/bignumber';

const expLimitMapper = [
  { limit: 100, base: 0, lv: 0 },
  { limit: 300, base: 100, lv: 1 },
  { limit: 600, base: 300, lv: 2 },
  { limit: 1000, base: 600, lv: 3 },
  { limit: 1500, base: 1000, lv: 4 },
  { limit: 3000, base: 1500, lv: 5 },
];

const XContent = React.memo(() => {
  const XData = [
    { icon: XThumb, current: 12, need: 20 },
    { icon: XThumb, current: 12, need: 20 },
    { icon: XThumb, current: 12, need: 20 },
  ];

  const { feedPetWithX, error, isPending, isSuccess } = useFeedPetForX();

  const handleFeedPetForFree = async () => {
    const amount = BigInt(360);
    feedPetWithX([amount]);
  };

  return (
    <div className="flex flex-row justify-between mt-[20px] border-[3px] rounded-[40px] border-[#3EE19E] px-[34px] py-[23px]">
      {XData.map((item, index) => (
        <div className="flex justify-center flex-col" key={index}>
          <img className="mb-[8px] w-[33px] h-[33px]" src={item.icon}></img>
          <span className="text-[14px] leading-[20px] text-white">
            {item.current}/{item.need}
          </span>
        </div>
      ))}
      <button
        className="px-[45px] py-[18px] rounded-[65px] bg-[#3EE19E]"
        onClick={handleFeedPetForFree}
        // disabled={isPending || !isSuccess}
      >
        Feed
      </button>
    </div>
  );
});

const NFTbody = React.memo(({ petId }: { petId?: bigint }) => {
  const [petImg, setPetImg] = React.useState('');
  const [minSlider, setMinSlider] = React.useState(0);

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
  console.log(lv?.result);
  const expNumber = Number(BigNumber.from(exp?.result ?? 0n).toNumber());
  const limitExp = expLimitMapper[lvNumber]?.limit;

  React.useEffect(() => {
    const minSlider = (expNumber / limitExp) * 7.25;
    setMinSlider(minSlider);
  }, [expNumber, limitExp]);

  const pointNumber = BigNumber.from(point?.result ?? 0n).toNumber();

  return (
    <>
      <div className="mt-[117px] w-[529px] h-[500px] relative">
        <div className="absolute -top-[40px] left-[20px] flex">
          <div className="h-[26px] w-[116px] relative text-center mr-[20px]">
            <span className="absolute left-[58px] text-white z-[20] translate-x-[-50%]">
              {expNumber} / {limitExp}
            </span>
            {/* level */}
            <div className="min-w-[26px] h-[26px] absolute left-0 top-0 z-[15] rounded-[13px] border-[2px]  border-[#00873F] bg-[#3EE19E]  text-center text-[14px]">
              {lvNumber}
            </div>
            {/* current expr */}
            <div
              className={`h-[26px] absolute left-0 top-0 z-[10] rounded-[20px] bg-[#0A4430]`}
              style={{ width: `${minSlider}rem` }}
            ></div>
            {/* need expr */}
            <div className="h-[26px] w-[116px] absolute left-0 top-0 z-[5] rounded-[20px] bg-[#063122]"></div>
          </div>

          <div className="h-[26px] w-[116px] relative text-center">
            <span className="absolute left-[58px] text-white z-[20] translate-x-[-50%]">
              {pointNumber}
            </span>
            {/* level */}
            <div className="min-w-[26px] h-[26px] absolute flex left-0 top-0 z-[15] rounded-[13px] border-[2px] border-[#00873F] bg-[#3EE19E] text-center text-[14px]">
              <img src={GalleyPoints} />
            </div>
            <div className="h-[26px] w-[116px] absolute left-0 top-0 z-[5] rounded-[20px] bg-[#063122]"></div>
          </div>
        </div>
        {petImg && <img className="w-[500px] h-[510px] mx-auto" src={petImg} />}
      </div>
      <XContent />
    </>
  );
});

export default NFTbody;
