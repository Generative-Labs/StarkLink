import React from 'react';
// import { FollowButton } from '../../dist/esm/index';
import FollowButton from '../../src/components/FollowButton';
function App() {
  return (
    <div className='app_container'>
      <FollowButton address='0x0D0e490E21ff5F3d3f6fEcEfd376D0e11a6b9110' walletType='eth' />
    </div>
  );
}

export default App;
