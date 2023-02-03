import React, { FunctionComponent, useEffect, useState } from 'react';
import { AppTypeEnum, LoginModal, Button, Loading, Modal } from '@web3mq/react-components';
import useLogin from '../hooks/useLogin';
import '@web3mq/react-components/dist/css/index.css';
import { AddContactIcon } from './icons/AddContactIcon';
import { SuccessIcon } from './icons/SuccessIcon';
import { SkeletonIcon } from './icons/SkeletonIcon';
import { UserAccountType } from '@web3mq/react-components/dist/components/LoginModal/hooks/useLogin';
import { Client, getUserPublicProfileRequest } from '@web3mq/client';
import './FollowButton.css';
import { RightIcon } from './icons/RightIcon';
import Right from './Right.jpg';
export type FollowButtonProps = {
  username?: string;
  userid?: string;
  btnText?: string;
  address: string;
  walletType: string;
};
const getShortAddress = (address = '', num = 5, endNum = 4) => {
  const strLength = address.length;
  return address.substring(0, num) + '...' + address.substring(strLength - endNum, strLength);
};
const FollowButton: FunctionComponent<FollowButtonProps> = (props) => {
  const { address, walletType } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loginAccount, setLoginAccount] = useState<any>(null);
  const [account, setAccount] = useState<any>(null);
  const [appType, setAppType] = useState(window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']);
  const { fastestUrl, keys, init, getAccount, handleLoginEvent } = useLogin();

  const handleAppType = () => {
    setAppType(window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']);
  };
  useEffect(() => {
    init();
    // set component theme
    document.getElementsByTagName('body')[0].setAttribute('data-theme', 'light');
    window.addEventListener('resize', handleAppType);
    () => {
      window.removeEventListener('resize', handleAppType);
    };
  }, []);
  useEffect(() => {
    if (keys && fastestUrl) {
      getTargetUserInfo();
      initRender();
    };
  }, [keys, fastestUrl]);
  const getUserInfo = async (didValue: string, didType: string) => {
    if (keys) {
      const web3MqInfo = await getUserPublicProfileRequest({
        did_type: didType,
        did_value: didValue,
        timestamp: Date.now(),
        my_userid: keys.userid,
      });
      return web3MqInfo.data;
    }
  };
  const getTargetUserInfo = async () => {
    const info = await getUserInfo(address, walletType);
    setAccount(info);
  };
  const initRender = async () => {
    if (keys) {
      const client = Client.getInstance(keys);
      const myProfile = await client.user.getMyProfile();
      if (myProfile && myProfile.wallet_address) {
        const info = await getUserInfo(myProfile.wallet_address, myProfile.wallet_type);
        setLoginAccount(info);
      }
    }
  };

  const followUser = async () => {
    if (keys && loginAccount && account) {
      console.log('0', loginAccount);
      setIsLoading(true);
      const client = Client.getInstance(keys as any);
      try {
        await client.contact.followOperation({
          target_userid: account.userid,
          address: loginAccount.wallet_address,
          action: 'follow',
          did_type: loginAccount.wallet_type,
        });
        setIsLoading(false);
        setShowModal(true);
      } catch (error) {
        setIsLoading(false);
      }
    }
  };
  if (!fastestUrl) return null;
  return (
    <>
      {!keys ? (
        <LoginModal
          containerId={appType}
          handleLoginEvent={handleLoginEvent}
          // isShow={true}
          // account={account}
          loginBtnNode={<Button>Follow</Button>}
        />
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <Button
              icon={<AddContactIcon />}
              disabled={account && account.is_my_following}
              onClick={() => followUser()}
            >
              {account && account.is_my_following ? 'following' : 'follow'}
            </Button>
          )}
        </>
      )}
      <Modal
        appType={appType}
        visible={showModal}
        closeModal={() => {
          setShowModal(false);
        }}
      >
        <div className='successContainer'>
          <SuccessIcon className='successIcon' />
          <div className='successWrap'>
            <img src={Right} alt='' />
            <div className='successUserInfo'>
              <div className='followContent'>Follow {account && getShortAddress(account.userid)}</div>
              <div className='pendContent'>Pending To: {account && getShortAddress(account.wallet_address)}</div>
            </div>
          </div>
          <SkeletonIcon className='skeletonIcon' />
          <SkeletonIcon className='skeletonIcon' />
          <SkeletonIcon className='skeletonIcon' />
        </div>
      </Modal>
    </>
  );
};

export default FollowButton;
