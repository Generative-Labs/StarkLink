import React from 'react';
import type { Client } from '@web3mq/client';
declare type AddFriendsProps = {
    className?: string;
    client: Client;
    disabled?: boolean;
    userId?: string;
    onSubmit?: () => void;
};
export declare const AddFriends: React.FC<AddFriendsProps>;
export {};
