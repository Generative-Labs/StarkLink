import React, { FunctionComponent, useEffect, useState } from 'react';
import { AppTypeEnum, LoginModal, Button } from '@web3mq/react-components';
import useLogin from '../hooks/useLogin';
import '@web3mq/react-components/dist/css/index.css';
import { AddContactIcon } from './icons/AddContactIcon';
import { UserAccountType } from '@web3mq/react-components/dist/components/LoginModal/hooks/useLogin';

export type FollowButtonProps = {
  username?: string;
  userid?: string;
  btnText?: string;
};

const FollowButton: FunctionComponent<FollowButtonProps> = ({}: FollowButtonProps) => {
  const [isLoggedId, setIsLoggedIn] = useState(false);
  const [isRegistering, setRegistering] = useState(false);
  const [account, setAccount] = useState<UserAccountType>();
  const [appType, setAppType] = useState(window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']);
  const { keys, init, getAccount, handleLoginEvent } = useLogin();

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

  const followUser = () => {
    if (!isLoggedId) {
      init().then(() => {
        getAccount().then((data) => {
          console.log('data', data);
          setAccount({ ...data, walletType: 'starknet' });
          if (data.userExist) {
            setIsLoggedIn(true);
          } else {
            if (!keys) {
              let mainKeys: any = null;
              const mainPrivateKey = localStorage.getItem(`MAIN_PRIVATE_KEY`);
              const mainPublicKey = localStorage.getItem(`MAIN_PUBLIC_KEY`);
              const address = localStorage.getItem('WALLET_ADDRESS');
              if (mainPublicKey && mainPrivateKey && address) {
                mainKeys = {
                  publicKey: mainPublicKey,
                  privateKey: mainPrivateKey,
                  walletAddress: address,
                };
              }
              setRegistering(true);
            }
          }
        });
      });
    }
  };

  return (
    <>
      <Button icon={<AddContactIcon />} onClick={() => followUser()}>
        Follow
      </Button>
      {isRegistering && (
        <LoginModal
          containerId={appType}
          handleLoginEvent={handleLoginEvent}
          isShow={true}
          account={account}
          loginBtnNode={<></>}
        />
      )}
    </>
  );
};

export default FollowButton;
