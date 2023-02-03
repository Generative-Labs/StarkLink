import React from 'react';
import type { Client } from '@web3mq/client';
declare type CreateRoomProps = {
    className?: string;
    client: Client;
    selectedContacts: Array<any>;
    onClose?: () => void;
};
export declare const CreateRoom: React.FC<CreateRoomProps>;
export {};
