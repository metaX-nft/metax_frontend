import { useState, useCallback } from 'react';
import StoreListBg from '@assets/images/store-list-bg.png';
import StoreIcon from '@assets/images/store-icon.svg';
import { useAtom } from 'jotai';
import { activePageAtom } from './index';

export default function StoreDetailPage() {
  const [_, setActivePage] = useAtom(activePageAtom);

  const goToBack = useCallback(() => {
    setActivePage('1');
  }, []);

  const [tableData, setTableData] = useState([
    {
      picture: '2023-8-12',
      name: 'usdc',
      price: '1000',
      feature: 'stake',
      quantity: '10exp',
      totalPrice: '',
    },
  ]);

  const columns = Object.keys(tableData[0]);

  return (
    <div className="w-full h-full">
      <div className="flex items-end mt-[132px] flex-col">
        <div
          className="w-[1440px] h-[540px] bg-contain relative"
          style={{ backgroundImage: `url(${StoreListBg})` }}
        >
          <div className="absolute left-14 -top-5 flex items-center">
            <div className="text-white text-[36px] font-bold mr-[62px]">Store</div>
            <img className="w-[90] h-[104px] " src={StoreIcon} />
          </div>
          <table className="mt-[]">
            <thead>
              <tr>
                {columns.map((item, index) => (
                  <th
                    key={index}
                    className="w-[288px] px-[19px] py-[16px] text-[#3EE19E] text-[18px] text-left leading-[24px] font-[700]"
                  >
                    {`${item.slice(0, 1).toUpperCase()}${item.slice(1)}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>

        <div className="mt-[42px] text-white" onClick={goToBack}>
          <span></span>back
        </div>
      </div>
    </div>
  );
}
