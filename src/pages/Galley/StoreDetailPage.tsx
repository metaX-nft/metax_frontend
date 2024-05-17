import { useState, useCallback, useRef } from 'react';
import { useAtom } from 'jotai';
import { Button, InputBase } from '@mui/material';
import { KeyboardBackspace } from '@mui/icons-material';

import { activePageAtom } from './index';
import StoreListBg from '@assets/images/store-list-bg.png';
import StoreIcon from '@assets/images/store-icon.svg';

import VegtableIcon from '@assets/images/vegtable.png';
import DrinkIcon from '@assets/images/drink.png';
import CandyIcon from '@assets/images/candy.png';
import Biscult from '@assets/images/biscult.png';
import PowerIcon from '@assets/images/power.png';

import './storeDetailPage.css';

function StoreDetailListItem({ row, index, data }) {
  const { picture, name, price, feature, totalPrice } = row;
  const input = useRef<HTMLInputElement>(null);

  return (
    <div
      className="grid h-[60px] text-white grid-cols-7 gap-4 items-center"
      style={{
        border: '1px solid #47E49F',
        backgroundColor: 'rgba(71, 228, 159, 0.1)',
        gridTemplateColumns: '1.5fr 3fr 3fr 3fr 3fr 3fr 3fr',
      }}
    >
      <span className="list-item">
        <img
          src={picture}
          className="w-[32px] h-[32px]"
          style={{ border: '1px solid #47E49F', backgroundColor: 'rgba(71, 228, 159, 0.1)' }}
        />
      </span>
      <span className="list-item">{name}</span>
      <span className="list-item">{price}</span>
      <span className="list-item">+{feature}</span>
      <span className="list-item">
        <InputBase inputRef={input} inputProps={{ min: 0 }} defaultValue={0} type="number" />
      </span>
      <span className="list-item">{totalPrice}</span>
      <span className="list-item">
        <Button
          size="small"
          variant="contained"
          className="text-black rounded-full font-bold"
          onClick={() => {
            console.log(input?.current?.value);
          }}
        >
          buy
        </Button>
      </span>
    </div>
  );
}

export default function StoreDetailPage() {
  const [_, setActivePage] = useAtom(activePageAtom);

  const goToBack = useCallback(() => {
    setActivePage('1');
  }, []);

  const columns = [
    { field: 'picture', headerName: 'Picture' },
    { field: 'name', headerName: 'Name' },
    { field: 'price', headerName: 'Price' },
    { field: 'feature', headerName: 'Feature' },
    {
      field: 'quantity',
      headerName: 'Quantity',
    },
    { field: 'totalPrice', headerName: 'TotalPrice' },
    { field: '', headerName: '' },
  ];

  const [tableData, setTableData] = useState([
    {
      picture: VegtableIcon,
      name: 'Vegtable',
      price: '0.002',
      feature: '5 exp',
      totalPrice: '0.006',
    },
    {
      picture: DrinkIcon,
      name: 'Drink',
      price: '0.04',
      feature: '60 exp',
      totalPrice: '0',
    },
    {
      picture: CandyIcon,
      name: 'Candy',
      price: '0.1',
      feature: '230 exp',
      totalPrice: '0',
    },
    {
      picture: Biscult,
      name: 'Biscult',
      price: '0.3',
      feature: '680 exp',
      totalPrice: '0',
    },
    {
      picture: PowerIcon,
      name: 'Power potion',
      price: '0.8',
      feature: '1800 exp',
      totalPrice: '0',
    },
  ]);

  return (
    <div className="w-full h-full py-[132px]">
      <div className="flex items-center flex-col py-[30px]">
        <div
          className="w-[1440px] h-[540px] bg-contain relative bg-no-repeat px-[30px]"
          style={{ backgroundImage: `url(${StoreListBg})` }}
        >
          <div className="absolute left-14 -top-5 flex items-center">
            <div className="text-white text-[36px] font-bold mr-[62px]">Store</div>
            <img className="w-[90] h-[104px] " src={StoreIcon} />
          </div>
          <div className="mt-20 w-[100%]">
            <div
              className="grid grid-cols-7 gap-4"
              style={{ gridTemplateColumns: '1.5fr 3fr 3fr 3fr 3fr 3fr 3fr' }}
            >
              {columns.map((item, index) => (
                <span
                  key={index}
                  className="px-[19px] py-[16px] text-[#3EE19E] text-[18px] text-left leading-[24px] font-bold"
                >
                  {`${item.headerName}`}
                </span>
              ))}
            </div>
            <div className="grid gap-4 h-[380px] overflow-y-auto">
              {tableData.map((item, index) => (
                <StoreDetailListItem key={index} row={item} index={index} data={tableData} />
              ))}
            </div>
          </div>
        </div>

        <div
          className="mt-[42px] text-white flex items-center gap-2 cursor-pointer"
          onClick={goToBack}
        >
          <span className="w-[45px] h-[45px] rounded-full bg-primary text-black flex items-center justify-end">
            <KeyboardBackspace fontSize="large" />
          </span>
          <span className="text-[24px]">Back</span>
        </div>
      </div>
    </div>
  );
}
