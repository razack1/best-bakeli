import React from 'react';
import Main from '../main';
import MainRight from '../mainRight';


const Welcome = () => {
    return (
        <div className='App'> 
        <div className="top">
        <Main />
        </div>      
            <div className=' top container mainRight'>
                <MainRight />
            </div>
        </div>
    )
}

export default Welcome
