import React from 'react';
export declare type ConnectMessageProps = {
    btnNode?: React.ReactNode;
    connectDescription?: string | React.ReactNode;
    connectIcon?: React.ReactNode;
    closedDescription?: string | React.ReactNode;
    closedIcon?: React.ReactNode;
    openDescription?: string | React.ReactNode;
    openIcon?: React.ReactNode;
    isShow?: boolean;
};
export declare const ConnectMessage: React.FC<ConnectMessageProps>;
