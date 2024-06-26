import * as React from 'react';

import GalleyTaskBg from '@assets/images/gallary-task-list.png';
import TaskListIcon from '@assets/images/task-list-icon.svg';
import LineabuildIcon from '@assets/images/lineabuild-icon.png';
import HackquestIcon from '@assets/images/hackquest-icon.png';

import { useGrowPet } from '@abis/contracts/mechPet/MechContract';
import { Button } from '@mui/material';
import { useAtom } from 'jotai';
import { fedPet } from '@states/index';

const TaskItem = React.memo(
  ({ icon, title, url }: { icon: string; title: string; url: string }) => {
    const [isActive, setIsActive] = React.useState(false);
    const [_, setFedPet] = useAtom(fedPet);
    const { growPet, isSuccess, hash, isPending } = useGrowPet();

    const goX = (link: string) => {
      window.open(link, '_blank');
      setIsActive(true);
    };

    const handleGrowPet = async () => {
      await growPet([BigInt(200)]);
      setFedPet(true);
    };

    React.useEffect(() => {
      if (hash && !isPending && isSuccess) {
        setFedPet(false);
      }
    }, [hash, isSuccess, isPending]);

    return (
      <div
        className="flex items-center rounded-[8px] mb-[21px] last-of-type:mb-0 px-[22px] py-[11px] pr-[33px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(20, 196, 128, 0.1) 0%, rgba(10, 94, 61, 0.1) 100%)',
        }}
      >
        <img className="w-[40px] h-[40px] rounded-full mr-5" src={icon} />
        <span className="flex-1 truncate text-white">{title}</span>
        {isActive ? (
          <Button
            className="rounded-full"
            onClick={handleGrowPet}
            style={{ textTransform: 'initial' }}
            variant="contained"
            color="warning"
            disabled={hash && (isSuccess || isPending)}
          >
            To claim
          </Button>
        ) : (
          <Button
            className="rounded-full  text-[#134631]"
            onClick={() => goX(url)}
            style={{ textTransform: 'initial' }}
            variant="contained"
          >
            To finish
          </Button>
        )}
      </div>
    );
  },
);

const TaskList = React.memo(() => {
  const task = [
    {
      icon: LineabuildIcon,
      title: 'Follow @LineaBuild on X',
      url: 'https://twitter.com/LineaBuild',
    },
    {
      icon: HackquestIcon,
      title: 'Follow @HackQuest_ on X',
      url: 'https://twitter.com/HackQuest_',
    },
  ];

  return (
    <>
      <div
        className="absolute w-full h-full p-[20px] bg-center bg-cover bg-no-repeat z-[10]"
        style={{ backgroundImage: `url(${GalleyTaskBg})` }}
      >
        <p className="text-[32px]/[48px] ml-[25px] mb-[24px] text-white">Task List</p>
        <div className="h-[500px] overflow-y-auto">
          {task.map((item, index) => (
            <TaskItem key={index} title={item.title} icon={item.icon} url={item.url} />
          ))}
        </div>
      </div>
      <img
        className="absolute w-[228px] h-[224px] right-[0px] top-[-90px] z-[5]"
        src={TaskListIcon}
      />
    </>
  );
});

export default TaskList;
