import * as React from 'react';

import TaskList from './TaskList';
import NFTbody from './Nft';
import Store from './Store'


const Galley = React.memo(() => {
    return (
        <div className="w-full h-full flex justify-center" >
            <div className='max-w-[1920px] flex justify-center'>
                <div className='w-[425px] h-[607px] mt-[140px] mr-[120px] relative' >
                    <TaskList />
                </div>
                <div>
                    <NFTbody />
                </div>
                <div style={{ marginLeft: '7rem' }}>
                    <Store />
                </div>
            </div>
        </div >
    );
});

export default Galley;
