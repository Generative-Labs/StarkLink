import type { Message, ToastOptions, ToastHandler } from './type';
export declare const toast: {
    (message: Message, opts?: ToastOptions | undefined): void;
    error: ToastHandler;
    success: ToastHandler;
    loading: ToastHandler;
};
