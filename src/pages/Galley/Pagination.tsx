import * as React from 'react'

import Arrow from '@assets/images/gallery-arrow.svg'

interface Pagination {
  total: number;
  current: number;
  updateCurrent(current: number): void;
}

const Pagination = React.memo(({ total, current, updateCurrent }: Pagination) => {
  let [totals] = React.useState(() => {
    return new Array(total).fill(1)
  })

  const handlePrePage = () => {
    if (current > 1) {
      updateCurrent(current - 1)
    }
  }

  const nextPage = () => {
    if (current < total) {
      updateCurrent(current + 1)
    }
  }

  return total > 0 && (
    <div className='flex mt-[48px] items-center'>
      <img className='mr-[30px] h-[15px] w-[15px]' src={Arrow} onClick={handlePrePage}/>
      <ul className='flex '>
        {
          totals.map((item, index) => (
            <li key={index} className='mr-[30px] font-[400] text-[18px] leading-[22px] text-white cursor-pointer' style={
              current === index ? { marginRight: '22px' } :
                current === index + 1 ? { minWidth: '27px', minHeight: '27px', marginRight: '22px', borderRadius: '15px', backgroundColor: '#3EE19E', textAlign: 'center' }
                  :
                  {}
            }
              onClick={() => updateCurrent(index + 1)}
            >
              <span>{index + 1}</span>
            </li>
          ))
        }
      </ul>
      <img className='ml-[30px] rotate-180 h-[15px] w-[15px]' src={Arrow} onClick={nextPage} />
    </div>
  )
})

export default Pagination