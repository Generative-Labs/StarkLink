/// <reference types="react" />
export interface ILongPressEventsProps {
    onStartCallback: (event: React.BaseSyntheticEvent) => void;
    onEndCallback?: (event: React.BaseSyntheticEvent) => void;
    ref: React.MutableRefObject<HTMLDivElement | null>;
    ms?: number;
}
declare type ILongPressStartMethod = (event: React.TouchEvent) => void;
declare type ILongPressEndMethod = (event: React.TouchEvent) => void;
export interface RLongPressEventsReturnTypes {
    onTouchStart: ILongPressStartMethod;
    onTouchMove: ILongPressEndMethod;
    onTouchEnd: ILongPressEndMethod;
}
export declare const uselongPressEvents: ({ onStartCallback, onEndCallback, ms, ref, }: ILongPressEventsProps) => RLongPressEventsReturnTypes;
export {};
