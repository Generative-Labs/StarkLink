declare const useToggle: (isShow?: boolean) => {
    visible: boolean;
    show: () => void;
    hide: () => void;
    toggle: () => void;
};
export default useToggle;
