import * as React from 'react'

import XThumb from '@assets/images/x-thumb.svg'
import NFT from '@assets/images/nft.png'

const XContent = React.memo(() => {
    const XData = [
        { icon: XThumb, current: 12, need: 20 },
        { icon: XThumb, current: 12, need: 20 },
        { icon: XThumb, current: 12, need: 20 },
    ]

    return (
        <div className='flex flex-row justify-between mt-[20px] border-[3px] rounded-[40px] border-[#3EE19E] px-[34px] py-[23px]'>
            {
                XData.map((item, index) => (
                    <div className='flex justify-center flex-col' key={index}>
                        <img className='mb-[8px] w-[33px] h-[33px]' src={item.icon}></img>
                        <span className='text-[14px] leading-[20px] text-white'>{item.current}/{item.need}</span>
                    </div>
                ))
            }
            <button className='px-[45px] py-[18px] rounded-[65px] bg-[#3EE19E]' >Feed</button>
        </div>
    )
})

const NFTbody = React.memo(() => {
    return (
        <>
            <div className='mt-[67px] w-[529px] h-[551px] relative'>
                <div className='absolute top-[47px] left-[20px] flex'>
                    <div className='relative text-center mr-[20px]'>
                        <span className='absolute left-[58px] text-white z-[20] translate-x-[-50%]'>30/120</span>
                        {/* level */}
                        <div className='min-w-[26px] h-[26px] absolute left-0 top-0 z-[15] rounded-[13px] border-[2px] border-[#3EE19E] text-center text-[14px]'>21</div>
                        {/* current expr */}
                        <div className='h-[26px] w-[52px] absolute left-0 top-0 z-[10] rounded-[20px] bg-[#0A4430]'></div>
                        {/* need expr */}
                        <div className='h-[26px] w-[116px] absolute left-0 top-0 z-[5] rounded-[20px] bg-[#063122]'></div>
                    </div>

                    <div className='relative text-center'>
                        <span className='absolute left-[58px] text-white z-[20] translate-x-[-50%]'>30/120</span>
                        {/* level */}
                        <div className='min-w-[26px] h-[26px] absolute left-0 top-0 z-[15] rounded-[13px] border-[2px] border-[#3EE19E] text-center text-[14px]'>21</div>
                        {/* current expr */}
                        <div className='h-[26px] w-[52px] absolute left-0 top-0 z-[10] rounded-[20px] bg-[#0A4430]'></div>
                        {/* need expr */}
                        <div className='h-[26px] w-[116px] absolute left-0 top-0 z-[5] rounded-[20px] bg-[#063122]'></div>
                    </div>
                </div>
                <img className='w-[529px] h-[538px]' src={NFT} />
            </div>
            <XContent />
        </>
    )
})

export default NFTbody