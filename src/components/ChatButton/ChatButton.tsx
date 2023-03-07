import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import {
  AppTypeEnum,
  LoginModal,
  Button,
  Modal,
  Loading,
  Chat,
  DashBoard,
  ConnectMessage,
} from '@web3mq/react-components';
import useLogin from '../../hooks/useLogin';
import '@web3mq/react-components/dist/css/index.css';
import { AddContactIcon, ErrorIcon } from '../../icons';
import { getUserPublicProfileRequest, WalletType } from '@web3mq/client';
import ss from './index.module.css';
import cx from 'classnames';
import Main from './Web3MQChat/Main';
import type { Client as ClientType } from '@web3mq/client';
import type { UserAccountType } from '@web3mq/react-components/dist/components/LoginModal/hooks/useLogin';

export type ChatButtonProps = {
  username?: string;
  userid?: string;
  btnText?: string;
  targetWalletType: WalletType;
  targetWalletAddress: string;
  chatBtn?: React.ReactNode;
};

export type ChatModalType = 'error' | 'success' | 'loading';
export const ChatButton: FunctionComponent<ChatButtonProps> = (props) => {
  const { targetWalletAddress, targetWalletType, chatBtn = null } = props;
  const [showLogin, setShowLogin] = useState(false);
  const [account, setAccount] = useState<UserAccountType>();
  const [appType, setAppType] = useState(
    window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc'],
  );
  const [errorInfo, setErrorInfo] = useState('');
  const { init, getAccount, handleLoginEvent, Client, keys, logout, mainKeys } = useLogin();
  const [readyStep, setReadyStep] = useState<string>();
  const [targetUserAccount, setTargetUserAccount] = useState<any>();
  const [modalType, setModalType] = useState<ChatModalType>();
  const [web3mqClient, setWeb3mqClient] = useState<ClientType>();

  const handleAppType = () => {
    setAppType(window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']);
  };

  useEffect(() => {
    init();
    // set component theme
    document.getElementsByTagName('body')[0].setAttribute('data-theme', 'light');
    window.addEventListener('resize', handleAppType);
  }, []);

  const handleChat = async () => {
    setReadyStep('chat');
    if (!Client.register) {
      await init();
    }
    if (!keys) {
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
      setModalType('error');
    } else {
      setModalType('loading');
      // const activeChannel = {
      //   avatar_base64: '',
      //   avatar_url: '',
      //   chat_name: userInfo.userid,
      //   chat_type: 'user',
      //   chatid: userInfo.userid,
      // };
      if (!web3mqClient) {
        console.log('set client');
        new Promise(function (resolve) {
          const client = Client.getInstance(keys);
          resolve(client);
        }).then(async function (client: any) {
          setWeb3mqClient(client);
          setModalType('success');
        });
      } else {
        setModalType('success');
      }
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
      if (readyStep === 'chat') {
        console.log('??');
        await handleChat();
      }
    }
  };

  const Web3MQChat = useCallback(() => {
    if (!web3mqClient || !keys) {
      return null;
    }

    const activeChannel = {
      avatar_base64: '',
      avatar_url: '',
      chat_name: targetUserAccount.userid,
      chat_type: 'user',
      chatid: targetUserAccount.userid,
    };
    setTimeout(() => {
      web3mqClient.channel.setActiveChannel(activeChannel)
    }, 1000)

    return (
      <div
        className={cx(ss.chatBox)}
        id={'chat-content'}
        style={{
          height: '500px',
          position: 'relative',
        }}
      >
        <Chat
          client={web3mqClient}
          appType={AppTypeEnum['h5']}
          logout={logout}
          containerId="chat-content"
        >
          {/* <ConnectMessage /> */}
          <DashBoard />
          <Main />
        </Chat>
      </div>
    );
  }, [web3mqClient, keys]);

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

  useEffect(() => {
    initRender().then();
  }, [keys]);

  return (
    <>
      <div onClick={handleChat}>{chatBtn || <Button icon={<AddContactIcon />}>Chat</Button>}</div>
      {showLogin && !keys && (
        <LoginModal
          keys={mainKeys || undefined}
          client={Client}
          containerId={appType}
          handleLoginEvent={handleLoginEvent}
          isShow={true}
          account={account}
          loginBtnNode={<></>}
        />
      )}
      <Modal
        style={{
          display: (!!modalType && keys) ? 'block' : 'none',
        }}
        appType={appType}
        visible={true}
        closeModal={() => {
          setModalType(undefined);
        }}
      >
        <Web3MQChat />
        {modalType === 'loading' && <Loading />}
        {modalType === 'error' && <RenderErrorInfo />}
      </Modal>
    </>
  );
};
