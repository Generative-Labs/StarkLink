/// <reference types="react" />
export declare const useInput: (initState: any) => {
    input: {
        value: any;
        onChange: (e: {
            target: {
                value: any;
            };
        }) => void;
    };
    setValue: import("react").Dispatch<any>;
};
