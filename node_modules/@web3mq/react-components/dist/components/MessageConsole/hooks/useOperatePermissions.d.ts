import type { Client } from '@web3mq/client';
declare type PermissionType = Record<string, {
    type: string;
    value: string;
}>;
declare type UserPermissionsType = {
    permissions: PermissionType;
    follow_status: 'follower' | 'following' | 'follow_each' | '';
    target_userid: string;
};
export declare const useOperatePermissions: (client: Client) => {
    targetUserPermissions: UserPermissionsType;
    toChatTargetUser: boolean;
    getTargetUserPermissions: (userId: string) => Promise<void>;
    updateTargetUserPermissions: (type: 'permissions' | 'follow_status' | 'target_userid', newValue: PermissionType | UserPermissionsType['follow_status'] | string) => void;
};
export {};
