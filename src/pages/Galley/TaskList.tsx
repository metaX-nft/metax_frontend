import * as React from 'react'

import GalleyTaskBg from "@assets/images/gallary-task-list.png"
import TaskListIcon from '@assets/images/task-list-icon.svg'
import TaskItemImg from '@assets/images/task-item-img.svg'

const TaskItem = React.memo(({ icon, title, url }: { icon: string, title: string, url: string }) => {
    const goX = (link: string) => {
        window.open(link, '_blank')
    }

    return (
        <div className='flex items-center rounded-[8px] mb-[21px] last-of-type:mb-0 px-[22px] py-[11px] pr-[33px]' style={{ background: 'linear-gradient(90deg, rgba(20, 196, 128, 0.1) 0%, rgba(10, 94, 61, 0.1) 100%)' }}>
            <img className='rounded-full' src={icon} />
            <span className='flex-1 truncate'>{title}</span>
            <button className='rounded-full bg-[#47E49F] text-[#134631] px-[15px] py-[9px]' onClick={() => goX(url)}>To finish</button>
        </div>
    )
})

const TaskList = React.memo(() => {
    const task =
        [
            { icon: TaskItemImg, title: "Follow @chainlink", accountId: "63727313", url: "https://twitter.com/chainlink" },
            { icon: TaskItemImg, title: "Follow @CoinMarketCap", accountId: "483472302", url: "https://twitter.com/CoinMarketCap" },
            { icon: TaskItemImg, title: "Follow @Binance", accountId: "3274824", url: "https://twitter.com/binance" }
        ];

    return (
        <>
            <div className='absolute w-full h-full p-[20px] bg-center bg-cover bg-no-repeat z-[10]' style={{ backgroundImage: `url(${GalleyTaskBg})` }}>
                <p className='text-[32px]/[48px] ml-[25px] mb-[24px] text-white'>Task List</p>
                <div className='h-[500px] overflow-y-auto'>
                    {
                        task.map((item, index) => (
                            <TaskItem key={index} title={item.title} icon={item.icon} url={item.url} />
                        ))
                    }
                </div>
            </div>
            <img className='absolute w-[228px] h-[224px] right-[0px] top-[-90px] z-[5]' src={TaskListIcon} />
        </>
    )
})

export default TaskList