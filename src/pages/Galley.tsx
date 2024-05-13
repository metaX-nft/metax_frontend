import * as React from 'react';
import GalleyTaskBg from "@assets/images/gallary-task-list.png"
import TaskListIcon from '@assets/images/task-list-icon.svg'
import TaskItemImg from '@assets/images/task-item-img.svg'

const TaskItem = React.memo(({ icon, name }: { icon: string, name: string }) => {
  return (
    <div className='flex items-center rounded-[8px] mb-[21px] px-[22px] py-[11px] pr-[33px]' style={{ background: 'linear-gradient(90deg, rgba(20, 196, 128, 0.1) 0%, rgba(10, 94, 61, 0.1) 100%)' }}>
      <img className='rounded-full' src={icon} />
      <span className='flex-1 truncate'>{name}</span>
      <button className='rounded-full bg-[#47E49F] text-[#134631] px-[15px] py-[9px]'>To finish</button>
    </div>
  )
})

const NFTbody = React.memo(() => {
  return (
    <>
      <div className='mt-[67px] w-[529px] h-[551px]'>nft</div>
      <div className='mt-[20px] border-[3px] rounded-[40px] border-[#3EE19E] px-[34px] py-[23px]'>X data</div>
    </>
  )
})

const Galley = React.memo(() => {
  const task = [
    { icon: TaskItemImg, name: 'Follow @0xChar69' },
    { icon: TaskItemImg, name: 'Follow @0xChar69' },
    { icon: TaskItemImg, name: 'Follow @0xChar69' },
    { icon: TaskItemImg, name: 'Follow @0xChar69' },
    { icon: TaskItemImg, name: 'Follow @0xChar69' },
  ]

  return (
    <div className="w-full h-full flex justify-center" >
      <div className='max-w-[1920px] flex justify-center'>
        <div className='w-[425px] h-[607px] mt-[140px] mr-[120px] relative' >
          <div className='absolute w-full h-full p-[20px] bg-center bg-cover z-[10]' style={{ backgroundImage: `url(${GalleyTaskBg})` }}>
            <p className='text-[32px]/[48px] ml-[25px] mb-[24px] text-white'>Task List</p>
            <div>
              {
                task.map((item, index) => (
                  <TaskItem key={index} name={item.name} icon={item.icon} />
                ))
              }
            </div>
          </div>
          <img className='absolute right-[0px] top-[-90px] z-[5]' src={TaskListIcon} />
        </div>
        <div className='w-[31.1rem]'>
          <NFTbody />
        </div>
        <div className='w-[23.8rem]' style={{ marginLeft: '7rem' }}>
          right
        </div>
      </div>
    </div >
  );
});
export default Galley;
