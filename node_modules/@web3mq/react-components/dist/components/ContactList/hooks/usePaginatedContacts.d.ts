import type { EventTypes, Client } from '@web3mq/client';
import type { CommonUserInfoType, SearchDidType } from '../../Chat/hooks/useQueryUserInfo';
declare type StatusType = {
    error: boolean;
    loading: boolean;
};
export declare const usePaginatedContacts: (client: Client, getUserInfo: (didValue: string, didType: SearchDidType) => Promise<CommonUserInfoType | null>) => {
    status: StatusType;
    contacts: any[];
    refreshing: boolean;
    loadNextPage: () => void;
    handleEvent: (props: {
        type: EventTypes;
    }) => Promise<void>;
    queryContacts: () => Promise<void>;
    changeActiveContactEvent: (contact: any) => void;
    activeContact: any;
};
export {};
