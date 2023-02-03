import type { Client } from '@web3mq/client';
export declare const usePaginatedMembers: (client: Client, visible: boolean) => {
    memberList: any[];
    memberListloading: boolean;
    loadMoreLoading: boolean;
    loadNextPage: () => Promise<void>;
};
