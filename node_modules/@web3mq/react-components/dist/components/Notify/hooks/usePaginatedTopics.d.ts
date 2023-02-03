import type { EventTypes, Client } from '@web3mq/client';
declare type StatusType = {
    error: boolean;
    loading: boolean;
};
export declare const usePaginatedTopics: (client: Client) => {
    status: StatusType;
    createTopicList: any[];
    refreshing: boolean;
    loadNextPage: () => void;
    handleEvent: (props: {
        type: EventTypes;
    }) => void;
};
export {};
