import React, { FunctionComponent, useEffect, useState } from 'react';
import { AppTypeEnum, LoginModal, Button, Loading, Modal } from '@web3mq/react-components';
import useLogin from '../hooks/useLogin';
import '@web3mq/react-components/dist/css/index.css';
import { AddContactIcon } from './icons/AddContactIcon';
import { SuccessIcon } from './icons/SuccessIcon';
import { SkeletonIcon } from './icons/SkeletonIcon';
// import { UserAccountType } from '@web3mq/react-components/dist/components/LoginModal/hooks/useLogin';
import { Client, getUserPublicProfileRequest } from '@web3mq/client';
// import './FollowButton.css';
import { RightIcon } from './icons/RightIcon';

export type FollowButtonProps = {
  username?: string;
  userid?: string;
  btnText?: string;
  address: string;
  walletType: string;
};
const styles = {
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '24px',
  },
  successWrap: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: '16px',
  },
  followContent: {
    fontFamily: "'Inter', sans-serif",
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '22px',
    textAlign: 'center',
    color: '#1AC057',
  },
  pendContent: {
    fontFamily: `'Inter', sans-serif`,
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#71717A',
  },
  skeletonIcon: {
    padding: '8px 0',
  },
};
const getShortAddress = (address = '', num = 5, endNum = 4) => {
  const strLength = address.length;
  return address.substring(0, num) + '...' + address.substring(strLength - endNum, strLength);
};
const FollowButton: FunctionComponent<FollowButtonProps> = (props) => {
  const { address, walletType } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [loginAccount, setLoginAccount] = useState<any>(null);
  const [account, setAccount] = useState<any>(null);
  const [appType, setAppType] = useState(window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']);
  const { fastestUrl, keys, init, handleLoginEvent } = useLogin();

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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '24px',
          }}
        >
          <SuccessIcon />
          <div style={styles.successWrap}>
            <RightIcon />
            <div style={{ marginLeft: '16px' }}>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: '600',
                  fontSize: '18px',
                  lineHeight: '22px',
                  textAlign: 'center',
                  color: '#1AC057',
                }}
              >
                Follow {account && getShortAddress(account.userid)}
              </div>
              <div style={styles.pendContent}>Pending To: {account && getShortAddress(account.wallet_address)}</div>
            </div>
          </div>
          <SkeletonIcon style={styles.skeletonIcon} />
          <SkeletonIcon style={styles.skeletonIcon} />
          <SkeletonIcon style={styles.skeletonIcon} />
        </div>
      </Modal>
    </>
  );
};

export default FollowButton;
