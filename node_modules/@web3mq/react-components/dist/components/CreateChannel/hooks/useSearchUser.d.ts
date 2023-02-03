/// <reference types="react" />
import type { Client } from '@web3mq/client';
export declare const useSearchUser: (client: Client) => {
    content: string;
    setContent: import("react").Dispatch<import("react").SetStateAction<string>>;
    searchResult: any[];
    selectedUsers: any[];
    selectedSearchUser: (user: any) => void;
    deleteSelectUser: (delUser: any) => void;
    resetSearchUser: () => void;
};
