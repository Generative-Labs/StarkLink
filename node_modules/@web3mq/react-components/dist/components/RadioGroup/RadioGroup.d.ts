import React from 'react';
export declare type IValueType = {
    id: string;
    name: string;
};
declare type IProps = {
    className?: string;
    style?: React.CSSProperties;
    value: IValueType[];
    onChange: (data: IValueType) => void;
};
export declare const RadioGroup: React.NamedExoticComponent<IProps>;
export {};
