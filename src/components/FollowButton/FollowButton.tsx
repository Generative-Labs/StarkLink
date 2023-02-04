import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { AppTypeEnum, LoginModal, Button, Modal, Loading } from '@web3mq/react-components';
import useLogin from '../../hooks/useLogin';
import '@web3mq/react-components/dist/css/index.css';
import { AddContactIcon } from '../../icons/AddContactIcon';
import { getUserPublicProfileRequest, WalletType } from '@web3mq/client';
import { SuccessIcon } from '../../icons/SuccessIcon';
import { RightIcon } from '../../icons/RightIcon';
import { SkeletonIcon } from '../../icons/SkeletonIcon';
import { getShortAddress } from '../../utils';
import ss from './index.module.css';

export type FollowButtonProps = {
  username?: string;
  userid?: string;
  btnText?: string;
  targetWalletType: WalletType;
  targetWalletAddress: string;
  followBtn?: React.ReactNode;
};

export type UserAccountType = {
  userid: string;
  address: string;
  walletType: WalletType;
  userExist: boolean;
};

export type ReadyStepType = 'follow';
export type ModalType = 'error' | 'success' | 'loading';
export const FollowButton: FunctionComponent<FollowButtonProps> = (props) => {
  const { targetWalletAddress, targetWalletType, followBtn = null } = props;
  const [showLogin, setShowLogin] = useState(false);
  const [account, setAccount] = useState<UserAccountType>();
  const [appType, setAppType] = useState(
    window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc'],
  );
  const [errorInfo, setErrorInfo] = useState('');
  const { init, getAccount, handleLoginEvent, Client, keys } = useLogin();
  const [readyStep, setReadyStep] = useState<ReadyStepType>();
  const [targetUserAccount, setTargetUserAccount] = useState<any>();
  const [modalType, setModalType] = useState<ModalType>();

  const handleAppType = () => {
    setAppType(window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']);
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
      fontFamily: '\'Inter\', sans-serif',
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '22px',
      textAlign: 'center',
      color: '#1AC057',
    },
    pendContent: {
      fontFamily: '\'Inter\', sans-serif',
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

  useEffect(() => {
    init();
    // set component theme
    document.getElementsByTagName('body')[0].setAttribute('data-theme', 'light');
    window.addEventListener('resize', handleAppType);
  }, []);

  const followUser = async () => {
    console.log(targetUserAccount, 'targetUserAccount');
    if (targetUserAccount && targetUserAccount.is_my_following) {
      setModalType('success');
      return;
    }
    setReadyStep('follow');
    if (!Client.register) {
      console.log('init  init ');
      await init();
    }
    if (!keys) {
      console.log('go to login');
      // go to login
      const userAccount = await getAccount();
      setAccount({
        ...userAccount,
        walletType: 'starknet',
      });
      setShowLogin(true);
      return;
    }
    let userInfo = {
      userid: targetUserAccount ? targetUserAccount.userid : '',
      userExist: !!targetUserAccount,
    };
    if (!targetUserAccount) {
      userInfo = await Client.register.getUserInfo({
        did_value: targetWalletAddress,
        did_type: targetWalletType,
      });
    }
    // follow
    if (!userInfo.userExist) {
      console.log('user not register');
      setErrorInfo('user not register');
      setModalType('error');
    } else {
      setModalType('loading');
      new Promise(function (resolve) {
        const client = Client.getInstance(keys);
        resolve(client);
      }).then(async function (client: any) {
        const myProfile = await client.user.getMyProfile();
        console.log(myProfile, 'myProfile');
        //todo follow func
        const followRes = await client.contact.followOperation({
          target_userid: userInfo.userid,
          address: myProfile.wallet_address,
          action: 'follow',
          did_type: myProfile.wallet_type as WalletType,
        });
        console.log(followRes, 'followRes');
        setModalType('success');
      });
    }
  };

  const getUserInfo = async (didType: WalletType, didValue: string) => {
    if (keys) {
      try {
        const web3MqInfo = await getUserPublicProfileRequest({
          did_type: didType,
          did_value: didValue,
          timestamp: Date.now(),
          my_userid: keys.userid,
        });
        return web3MqInfo.data;
      } catch (e) {
        console.log(e);
      }
      return null;
    }
  };

  const initRender = async () => {
    if (keys) {
      if (!targetUserAccount) {
        const userInfo = await getUserInfo(targetWalletType, targetWalletAddress.toLowerCase());
        console.log(userInfo, 'userInfo');
        setTargetUserAccount(userInfo);
      }
      if (readyStep === 'follow') {
        await followUser();
      }
    }
  };

  const RenderFollowSuccess = useCallback(() => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '24px',
        }}
      >
        <SuccessIcon />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            marginTop: '16px',
          }}
        >
          <RightIcon />
          <div style={{ marginLeft: '16px' }}>
            <div
              style={{
                fontFamily: '\'Inter\', sans-serif',
                fontWeight: '600',
                fontSize: '18px',
                lineHeight: '22px',
                textAlign: 'center',
                color: '#1AC057',
              }}
            >
              Follow {getShortAddress(targetWalletAddress)}
            </div>
            <div className={ss.pendContent}>
              Pending To: {keys && getShortAddress(keys.address)}
            </div>
          </div>
        </div>
        <SkeletonIcon style={styles.skeletonIcon} />
        <SkeletonIcon style={styles.skeletonIcon} />
        <SkeletonIcon style={styles.skeletonIcon} />
      </div>
    );
  }, []);

  const RenderErrorInfo = useCallback(() => {
    return (
      <div>
        <div>{errorInfo}</div>
      </div>
    );
  }, [errorInfo]);

  useEffect(() => {
    initRender().then();
  }, [keys]);

  return (
    <>
      <div onClick={followUser}>
        {followBtn || (
          <Button icon={<AddContactIcon />}>
            {targetUserAccount?.is_my_following ? 'Following' : 'Follow'}
          </Button>
        )}
      </div>
      {showLogin && !keys && (
        <LoginModal
          client={Client}
          containerId={appType}
          handleLoginEvent={handleLoginEvent}
          isShow={true}
          account={account}
        />
      )}
      <Modal
        appType={appType}
        visible={!!modalType}
        closeModal={() => {
          setModalType(undefined);
        }}
      >
        {modalType === 'success' && <RenderFollowSuccess />}
        {modalType === 'error' && <RenderErrorInfo />}
        {modalType === 'loading' && <Loading />}
      </Modal>
    </>
  );
};
