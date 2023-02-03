import { KeyPairsType } from '@web3mq/client';
declare const useLogin: () => {
    keys: KeyPairsType | null;
    fastestUrl: string | null;
    init: () => Promise<void>;
    getAccount: () => Promise<{
        address: string;
        userid: string;
        userExist: boolean;
    }>;
    logout: () => void;
    handleLoginEvent: (eventData: any) => void;
};
export default useLogin;
