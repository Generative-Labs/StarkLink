import React, { FC } from 'react';
export declare type DashBoardProps = {
    defaultType?: string;
    PCTabMaps?: TabType[];
    MobileTabMaps?: TabType[];
    ChannelHead?: React.ComponentType<any>;
};
export declare type TabType = {
    title: string;
    icon: React.ReactNode;
    type: string;
    component: React.ReactNode;
};
export declare const DashBoard: FC<DashBoardProps>;
