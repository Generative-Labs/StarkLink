import React from 'react';
import {FollowButton, ChatButton} from '../../src';

function App() {
    return (
        <div className='app_container'>
            <FollowButton targetWalletAddress='0x7236b0F4F1409AFdC7C9fC446943A7b84b6513a1' targetWalletType='eth'/>
            <ChatButton targetWalletAddress='0x7236b0F4F1409AFdC7C9fC446943A7b84b6513a1' targetWalletType='eth'/>
        </div>
    );
}

export default App;
