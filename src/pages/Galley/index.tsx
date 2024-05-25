import TaskList from './TaskList';
import NFTbody from './Nft';
import Store from './Store';
import Pagination from './Pagination';
import StoreDetailPage from './StoreDetailPage';
import NextPageIcon from '@assets/images/galley-nextpage.svg';
import { atom, useAtom } from 'jotai';
import { usePetId, useClaimFreePet } from '@abis/contracts/mechPet/MechContract';
import { BigNumber } from '@ethersproject/bignumber';
import { Button } from '@mui/material';
import { useAccount } from 'wagmi';
import { useEffect, memo, useState } from 'react';
import ConnectorWallect from '@components/Connector';

export const activePageAtom = atom('1');

const FirstPage = memo(() => {
  const [_, setActivePage] = useAtom(activePageAtom);
  const [petIdNumber, setPetIdNumber] = useState(0);

  const { id: petId } = usePetId();
  const { claimFreePet, error: claimError, isPending, isSuccess, hash } = useClaimFreePet();

  useEffect(() => {
    const petIdToNumber = BigNumber.from(petId).toNumber();
    setPetIdNumber(petIdToNumber);
  }, [petId]);

  const { isConnected } = useAccount();

  const handleClaimFreePet = async () => {
    await claimFreePet();
  };

  if (petIdNumber <= 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center">
        <Button
          className="w-30 h-10 mx-auto text-[24px]"
          variant="text"
          onClick={handleClaimFreePet}
          disabled={(hash && (isPending || !isSuccess)) || !isConnected}
        >
          Claim Pet
        </Button>
        {!isConnected && (
          <div className="text-center text-[18px] mt-2 text-gray-200">
            Please <ConnectorWallect /> first
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <div className="max-w-[1920px] flex justify-center">
        <div className="w-[425px] h-[607px] mt-[140px] mr-[120px] relative">
          <TaskList />
        </div>
        <div>
          <NFTbody petId={BigInt(petIdNumber)} />
        </div>
        <div style={{ marginLeft: '7rem' }}>
          <Store />
        </div>
      </div>
      {/* <div className="flex justify-center mt-[73px] cursor-pointer">
        <img src={NextPageIcon} onClick={() => setActivePage('2')} />
      </div> */}
    </div>
  );
});

const SecondPage = memo(() => {
  const [tableData, setTableData] = useState([
    {
      date: '2023-8-12',
      token: 'usdc',
      amount: '1000',
      type: 'stake',
      outcome: '10exp',
    },
    {
      date: '2023-8-12',
      token: 'usdc',
      amount: '1000',
      type: 'stake',
      outcome: '10exp',
    },
    {
      date: '2023-8-12',
      token: 'usdc',
      amount: '1000',
      type: 'stake',
      outcome: '10exp',
    },
    {
      date: '2023-8-12',
      token: 'usdc',
      amount: '1000',
      type: 'stake',
      outcome: '10exp',
    },
    {
      date: '2023-8-12',
      token: 'usdc',
      amount: '1000',
      type: 'stake',
      outcome: '10exp',
    },
    {
      date: '2023-8-12',
      token: 'usdc',
      amount: '1000',
      type: 'stake',
      outcome: '10exp',
    },
    {
      date: '2023-8-12',
      token: 'usdc',
      amount: '1000',
      type: 'stake',
      outcome: '10exp',
    },
    {
      date: '2023-8-12',
      token: 'usdc',
      amount: '1000',
      type: 'stake',
      outcome: '10exp',
    },
  ]);
  const [_, setActivePage] = useAtom(activePageAtom);

  const columns = Object.keys(tableData[0]);
  const [current, setCurrent] = useState(1);

  return (
    <div className="w-full h-full flex flex-col ">
      <div className="flex justify-center mt-[65px] cursor-pointer ">
        <img className="rotate-180" src={NextPageIcon} onClick={() => setActivePage('1')} />
      </div>
      <div className="flex justify-center mt-[46px]">
        <table>
          <thead className="border-[3EE19E] border-x-[1px]">
            <tr>
              {columns.map((item, index) => (
                <th
                  key={index}
                  className="w-[288px] px-[19px] py-[16px] bg-[#3EE19E] text-[20px] text-left leading-[24px] font-[700] border-r-[1px] border-[#fff] last-of-type:border-[unset]"
                >
                  {item.toUpperCase()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="border-[#fff] border-x-[1px]">
            {tableData.map((row: Record<string, string>, index) => {
              return (
                <tr key={index} className="border-[#fff] border-b-[1px]">
                  {columns.map((col, colIndex) => (
                    <th
                      className="w-[288px] px-[19px] py-[16px] text-white text-left leading-[22px] text-[18px] font-[400] border-r-[1px] last-of-type:border-[unset]"
                      key={colIndex}
                    >
                      {row[col]}
                    </th>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center">
        <Pagination total={6} current={current} updateCurrent={setCurrent} />
      </div>
    </div>
  );
});

const Galley = memo(() => {
  const [activePage, setActivePage] = useAtom(activePageAtom);

  useEffect(() => {
    if (activePage !== '1') {
      setActivePage('1');
    }
  }, []);

  return activePage === '1' ? (
    <FirstPage />
  ) : activePage === '2' ? (
    <SecondPage />
  ) : (
    <StoreDetailPage />
  );
});

export default Galley;
