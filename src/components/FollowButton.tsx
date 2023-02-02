import React, { FunctionComponent, useState } from 'react';
import { AppTypeEnum, LoginModal } from '@web3mq/react-components';
import styled from 'styled-components';
import useLogin from '../hooks/useLogin';
import '@web3mq/react-components/dist/css/index.css';

export type FollowButtonProps = {
  username?: string;
  userid?: string;
  btnText?: string;
};

const FollowButton: FunctionComponent<FollowButtonProps> = ({}: FollowButtonProps) => {
  const [isLoggedId, setIsLoggedIn] = useState(false);
  const [isRegistering, setRegistering] = useState(false);
  const [account, setAccount] = useState<any>(null);
  // @ts-ignore
  const [appType, setAppType] = useState(window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']);
  const { keys, init, getAccount, handleLoginEvent } = useLogin();

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
    console.log('mainKeys', mainKeys);
  }

  const followUser = () => {
    if (!isLoggedId) {
      init().then(() => {
        getAccount().then((data) => {
          setAccount(data);
          if (data.userExist) {
            setIsLoggedIn(true);
          } else {
            setRegistering(true);
          }
        });
      });
    }
  };

  return (
    <>
      <ButtonStyled onClick={() => followUser()}>Follow</ButtonStyled>
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

export const ButtonStyled = styled.button``;
