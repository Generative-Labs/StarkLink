import React from 'react';
export declare enum StepTitleEnum {
    ADDFRIENDS = "Add friends",
    CREATEROOM = "Create room"
}
export declare type StepType = {
    id: string;
    title: string;
    Component: React.ComponentType<any>;
};
export declare const useSteps: () => {
    steps: StepType[];
    current: number;
    handleCleanSteps: () => void;
    handleUpdateSteps: (type: StepTitleEnum) => void;
    handleNext: () => void;
    handlePrev: () => void;
    setCurrent: React.Dispatch<React.SetStateAction<number>>;
};
