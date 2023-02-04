import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { AppTypeEnum, LoginModal, Button, Modal, Loading, Popover } from '@web3mq/react-components';
import cx from 'classnames';
import useLogin from '../../hooks/useLogin';
import '@web3mq/react-components/dist/css/index.css';
import { AddContactIcon } from '../../icons/AddContactIcon';
import { getUserPublicProfileRequest, WalletType } from '@web3mq/client';
import { ErrorIcon } from '../../icons/ErrorIcon';
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
  const [isBtnLoad, setIsBtnLoad] = useState<boolean>(false);
  const handleAppType = () => {
    setAppType(window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']);
  };

  useEffect(() => {
    init();
    // set component theme
    document.getElementsByTagName('body')[0].setAttribute('data-theme', 'light');
    window.addEventListener('resize', handleAppType);
  }, []);

  const followUser = async () => {
    setIsBtnLoad(true);
    if (targetUserAccount && targetUserAccount.is_my_following) {
      setModalType('success');
      setIsBtnLoad(false);
      return;
    }
    setReadyStep('follow');
    if (!Client.register) {
      await init();
    }
    if (!keys) {
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
      setErrorInfo('user not register');
      setIsBtnLoad(false);
      setModalType('error');
    } else {
      setModalType('loading');
      new Promise(function (resolve) {
        const client = Client.getInstance(keys);
        resolve(client);
      }).then(async function (client: any) {
        const myProfile = await client.user.getMyProfile();
        //todo follow func
        try {
          const followRes = await client.contact.followOperation({
            target_userid: userInfo.userid,
            address: myProfile.wallet_address,
            action: 'follow',
            did_type: myProfile.wallet_type as WalletType,
          });
          setIsBtnLoad(false);
          setModalType('success');
        } catch (error) {
          setIsBtnLoad(false);
          setModalType(undefined);
        }
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
        className={ss.successContainer}
      >
        <SuccessIcon />
        <div className={ss.sucesstitle}>Follow Successfully</div>
        <div className={ss.successWrap}>
          <RightIcon />
          <div style={{ marginLeft: '16px' }}>
            <Popover className={ss.followContent} content={targetWalletAddress}>
              Follow {getShortAddress(targetWalletAddress)}
            </Popover>
            <div className={ss.pendContent}>
              Pending To: {keys && getShortAddress(keys.address)}
            </div>
          </div>
        </div>
        {/* <SkeletonIcon className={ss.skeletonIcon} />
        <SkeletonIcon className={ss.skeletonIcon} />
        <SkeletonIcon className={ss.skeletonIcon} /> */}
      </div>
    );
  }, []);

  const RenderErrorInfo = useCallback(() => {
    return (
      <div className={ss.errorContainer}>
        <ErrorIcon className={ss.errorIcon} />
        {/* <div className={ss.errorTitle}>Follow Failed</div> */}
        <div className={ss.errorTitle}>{errorInfo}</div>
        <div className={ss.errorTip}>
          Share the link to your invited users. &nbsp;
          <a href='https://web3-mq-react-example.pages.dev/' target='_blank'>Invite Now &gt;</a>
        </div>
      </div>
    );
  }, [errorInfo]);

  const RenderLoading = useCallback(() => {
    return (
      <>
        <Loading />
        <div className={ss.loadText}>Loading...</div>
      </>
    );
  }, []);

  useEffect(() => {
    initRender().then();
  }, [keys]);

  return (
    <>
      <div onClick={followUser}>
        {followBtn || (
          <Button icon={<AddContactIcon />} disabled={isBtnLoad}>
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
        dialogClassName={cx({
          [ss.loadContainer]: modalType === 'loading'
        })}
        visible={!!modalType}
        closeModal={() => {
          setModalType(undefined);
        }}
        modalHeader={modalType === 'loading' ? <></> : undefined}
      >
        {modalType === 'success' && <RenderFollowSuccess />}
        {modalType === 'error' && <RenderErrorInfo />}
        {modalType === 'loading' && <RenderLoading />}
      </Modal>
    </>
  );
};
