/// <reference types="react" />
import type { Client } from '@web3mq/client';
import type { CommonUserInfoType, SearchDidType } from '../../Chat/hooks/useQueryUserInfo';
export declare const usePaginatedMessages: (props: {
    client: Client;
    loginUserInfo: CommonUserInfoType;
    scrollBottom: () => void;
    getUserInfo: (didValue: string, didType: SearchDidType) => Promise<CommonUserInfoType | null>;
}) => {
    msgListloading: boolean;
    loadMoreLoading: boolean;
    messageList: any[];
    loadNextPage: () => Promise<void>;
    setMessages: import("react").Dispatch<import("react").SetStateAction<any[]>>;
};
