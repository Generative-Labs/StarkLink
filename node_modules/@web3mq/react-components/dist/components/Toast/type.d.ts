/// <reference types="react" />
export declare type Message = JSX.Element | string | null;
export declare type ToastOptions = {
    duration: number;
};
export declare type ToastType = 'success' | 'error' | 'loading';
export declare type ToastHandler = (message: Message, options?: ToastOptions) => void;
export declare type ToastPosition = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
export interface ToasterProps {
    style?: React.CSSProperties;
    className?: string;
    message: Message;
    position?: ToastPosition;
    type?: ToastType;
}
declare type SvgEle = Message;
export declare type SvgFormat = {
    [key in ToastType]?: SvgEle;
};
export {};
