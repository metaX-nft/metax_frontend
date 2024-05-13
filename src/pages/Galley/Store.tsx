import * as React from 'react'

import StoreBg from '@assets/images/store-bg.svg'
import StoreIcon from '@assets/images/store-icon.svg'
import GoStoreIcon from '@assets/images/go-store-icon.svg'
import GoStoreRight from '@assets/images/go-store-right.svg'

const Store = React.memo(() => {
    return (
        <div className='w-[412px] h-[290px] mt-[467px] bg-cover bg-no-repeat relative' style={{ backgroundImage: `url(${StoreBg})` }}>
            <img className='absolute w-[224px] h-[258px] left-[48px] top-[-98px]' src={StoreIcon} />
            <button className='w-[335px] h-[60px] px-[11px] py-[8px] flex items-center rounded-[58px] absolute bottom-[31px] left-[35px] bg-[#EBFCF5] bg-opacity-10'>
                <img src={GoStoreIcon}/>
                <span className='flex-1 text-white text-[24px] leading-[33.6px]'>Go To Store</span>
                <img className='mr-[6px]' src={GoStoreRight}/>
            </button>
        </div>
    )
})

export default Store