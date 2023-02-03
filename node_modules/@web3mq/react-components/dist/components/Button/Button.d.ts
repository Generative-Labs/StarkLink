import React, { PropsWithChildren, MouseEvent } from 'react';
export declare type ButtonSize = 'large' | 'default' | 'small';
export declare type ButtonType = 'primary' | 'default' | 'danger' | 'ghost';
export declare type ButtonProps = {
    block?: boolean;
    className?: string;
    disabled?: boolean;
    icon?: React.ReactNode;
    size?: ButtonSize;
    type?: ButtonType;
    onClick?: (event: MouseEvent) => void;
    style?: React.CSSProperties;
};
export declare const Button: React.FC<PropsWithChildren<ButtonProps>>;
