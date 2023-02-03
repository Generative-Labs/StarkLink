import React from 'react';
import type { Client } from '@web3mq/client';
declare type FollowRequestButtonGroupProps = {
    client: Client;
    containerId?: string;
    followDisabled?: boolean;
    warnText?: string;
    showFollow?: boolean;
    showBlockBtn?: boolean;
    userId?: string;
    onFollow?: () => void;
    onCancel?: () => void;
};
export declare const FollowRequestButtonGroup: React.FC<FollowRequestButtonGroupProps>;
export {};
