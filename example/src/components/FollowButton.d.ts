import { FunctionComponent } from 'react';
import '@web3mq/react-components/dist/css/index.css';
export type FollowButtonProps = {
    username?: string;
    userid?: string;
    btnText?: string;
    address: string;
    walletType: string;
};
declare const FollowButton: FunctionComponent<FollowButtonProps>;
export default FollowButton;
