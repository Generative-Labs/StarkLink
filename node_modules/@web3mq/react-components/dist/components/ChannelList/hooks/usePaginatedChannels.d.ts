/// <reference types="react" />
import type { Client, EventTypes, NotifyResponse } from '@web3mq/client';
import { AppTypeEnum } from '../../../context';
import type { CommonUserInfoType, SearchDidType } from '../../Chat/hooks/useQueryUserInfo';
declare type StatusType = {
    error: boolean;
    loading: boolean;
};
export declare const usePaginatedChannels: (client: Client, appType: AppTypeEnum, getUserInfo: (didValue: string, didType: SearchDidType) => Promise<CommonUserInfoType | null>, setActiveNotification: (activeNotification: NotifyResponse | null) => void) => {
    status: StatusType;
    channels: any[];
    refreshing: boolean;
    loadNextPage: () => void;
    handleEvent: (props: {
        type: EventTypes;
    }) => Promise<void>;
    activeChannel: any;
    changeActiveChannelEvent: (channel: any) => Promise<void>;
    setActiveChannel: import("react").Dispatch<any>;
};
export {};
