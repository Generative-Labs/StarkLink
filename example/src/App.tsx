import React from 'react';
import {FollowButton, ChatButton} from '../../src';

function App() {
    return (
        <div className='app_container'>
            <FollowButton targetWalletAddress='0x63dc40a92a63da67bf635bd3c8288a719a029bde' targetWalletType='eth'/>
            <ChatButton targetWalletAddress='0x63dc40a92a63da67bf635bd3c8288a719a029bde' targetWalletType='eth'/>
        </div>
    );
}

export default App;
