/// <reference types="react" />
import type { Client } from '@web3mq/client';
export declare const useSearchFollower: (client: Client) => {
    followers: any[];
    searchFollowers: any[];
    getFollowerList: () => Promise<void>;
    handleSearchFollers: (value: string) => void;
    setFollowers: import("react").Dispatch<import("react").SetStateAction<any[]>>;
};
