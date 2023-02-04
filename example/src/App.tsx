import React from 'react';
import {FollowButton} from '../../src';

function App() {
    return (
        <div className='app_container'>
            <FollowButton targetWalletAddress='0x0D0e490E21ff5F3d3f6fEcEfd376D0e11a6b91110' targetWalletType='eth'/>
        </div>
    );
}

export default App;
