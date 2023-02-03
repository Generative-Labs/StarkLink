import type { Client } from '@web3mq/client';
import { ACCOUNT_CONNECT_TYPE, WEB3_MQ_DID_TYPE } from '../../../types/enum';
export declare type SearchDidType = 'eth' | 'starknet' | 'web3mq';
export declare const PROVIDER_ID_CONFIG: Record<ACCOUNT_CONNECT_TYPE, any>;
export declare type DidValueType = {
    did_type: WEB3_MQ_DID_TYPE;
    did_value: string;
    provider_id: string;
    detail: any;
};
export declare type CommonUserInfoType = {
    defaultUserName: string;
    defaultUserAvatar: string;
    address: string;
    didValues: DidValueType[];
    userid: string;
    stats: {
        total_followers: number;
        total_following: number;
    };
    wallet_type: string;
    wallet_address: string;
    permissions?: any;
    didValueMap: Record<WEB3_MQ_DID_TYPE, string>;
};
export declare const useQueryUserInfo: (client: Client) => {
    getUserInfo: (didValue: string, didType: SearchDidType, bindDid?: boolean) => Promise<CommonUserInfoType | null>;
    loginUserInfo: CommonUserInfoType | null;
    getLoginUserInfo: () => Promise<void>;
};
