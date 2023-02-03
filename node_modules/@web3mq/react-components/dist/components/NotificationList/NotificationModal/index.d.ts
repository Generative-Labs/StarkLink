import React from 'react';
import { AppTypeEnum } from '../../../context';
declare type NotificationModalProps = {
    appType?: AppTypeEnum;
    btnNode?: React.ReactNode;
    isShow?: boolean;
    title?: string;
};
export declare const NotificationModal: React.FC<NotificationModalProps>;
export {};
