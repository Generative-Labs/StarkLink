import React, { PropsWithChildren } from 'react';
import { AppTypeEnum } from '../../context/ChatContext';
interface IProps {
    visible: boolean;
    appType?: AppTypeEnum;
    closeModal: () => void;
    containerId?: string;
    modalHeader?: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    dialogClassName?: string;
    title?: string;
    leftBtn?: React.ReactNode;
}
export declare const Modal: React.MemoExoticComponent<(props: PropsWithChildren<IProps>) => React.ReactPortal | null>;
export {};
