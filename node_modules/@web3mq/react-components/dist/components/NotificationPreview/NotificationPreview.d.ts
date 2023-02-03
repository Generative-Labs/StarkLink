import React from 'react';
import type { Client, NotifyResponse } from '@web3mq/client';
import type { CommonUserInfoType } from '../Chat/hooks/useQueryUserInfo';
export declare type NotificationPreviewProps = {
    client: Client;
    notification: NotifyResponse;
    userInfo?: CommonUserInfoType;
    setActiveNotification: (activeNotification: NotifyResponse) => void;
};
export declare const NotificationPreview: React.FC<NotificationPreviewProps>;
