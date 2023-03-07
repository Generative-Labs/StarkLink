import { useMemo, useState } from 'react';
import { Client } from '@web3mq/client';

type KeyPairsType = {
  PrivateKey: string;
  PublicKey: string;
  userid: string;
  address: string;
};

type MainKeyPairstype = {
  publicKey: string 
  privateKey: string;
  walletAddress: string;
}

const useLogin = () => {
  const hasKeys = useMemo(() => {
    const PrivateKey = localStorage.getItem('PRIVATE_KEY') || '';
    const PublicKey = localStorage.getItem('PUBLIC_KEY') || '';
    const userid = localStorage.getItem('userid') || '';
    const address = localStorage.getItem('WALLET_ADDRESS') || '';
    if (PrivateKey && PublicKey && userid && address) {
      return { PrivateKey, PublicKey, userid, address };
    }
    return null;
  }, []);
  const hasMainKeys = useMemo(() => {
    const privateKey = localStorage.getItem('MAIN_PRIVATE_KEY') || '';
    const publicKey = localStorage.getItem('MAIN_PUBLIC_KEY') || '';
    const walletAddress = localStorage.getItem('WALLET_ADDRESS') || '';
    if (publicKey && privateKey && walletAddress) {
      return { publicKey, privateKey, walletAddress };
    }
    return null;
  }, []);
  const [keys, setKeys] = useState<KeyPairsType | null>(hasKeys);
  const [mainKeys, setMainKeys] = useState<MainKeyPairstype | null>(hasMainKeys);
  const [fastestUrl, setFastUrl] = useState<string | null>(null);

  const init = async () => {
    const tempPubkey = localStorage.getItem('PUBLIC_KEY') || '';
    const didKey = localStorage.getItem('DID_KEY') || '';
    const fastUrl = await Client.init({
      connectUrl: localStorage.getItem('FAST_URL'),
      app_key: 'vAUJTFXbBZRkEDRE',
      didKey,
      tempPubkey,
    });
    localStorage.setItem('FAST_URL', fastUrl);
    setFastUrl(fastUrl);
  };

  const getAccount = async () => {
    const { address } = await Client.register.getAccount('starknet');
    const { userid, userExist } = await Client.register.getUserInfo({
      did_value: address,
      did_type: 'starknet',
    });
    return { address, userid, userExist };
  };

  const logout = () => {
    localStorage.setItem('PRIVATE_KEY', '');
    localStorage.setItem('PUBLIC_KEY', '');
    localStorage.setItem('DID_KEY', '');
    localStorage.setItem('userid', '');
    setKeys(null);
  };

  const handleLoginEvent = (eventData: any) => {
    if (eventData.data) {
      if (eventData.type === 'login') {
        const {
          privateKey,
          publicKey,
          tempPrivateKey,
          tempPublicKey,
          didKey,
          userid,
          address,
          pubkeyExpiredTimestamp,
        } = eventData.data;
        localStorage.setItem('userid', userid);
        localStorage.setItem('PRIVATE_KEY', tempPrivateKey);
        localStorage.setItem('PUBLIC_KEY', tempPublicKey);
        localStorage.setItem('WALLET_ADDRESS', address);
        localStorage.setItem('MAIN_PRIVATE_KEY', privateKey);
        localStorage.setItem('MAIN_PUBLIC_KEY', publicKey);
        localStorage.setItem('DID_KEY', didKey);
        localStorage.setItem('PUBKEY_EXPIRED_TIMESTAMP', String(pubkeyExpiredTimestamp));
        setKeys({
          PrivateKey: tempPrivateKey,
          PublicKey: tempPublicKey,
          userid,
          address
        });
      }
      if (eventData.type === 'register') {
        const { privateKey, publicKey, address } = eventData.data;
        localStorage.setItem('WALLET_ADDRESS', address);
        localStorage.setItem('MAIN_PRIVATE_KEY', privateKey);
        localStorage.setItem('MAIN_PUBLIC_KEY', publicKey);
      }
    }
  };

  return { mainKeys, keys, fastestUrl, init, getAccount, logout, handleLoginEvent, Client };
};

export default useLogin;
