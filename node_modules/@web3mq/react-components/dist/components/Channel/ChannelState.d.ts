import type { Reducer } from 'react';
import type { ChannelState, MessageItem } from '../../context/ChannelStateContext';
export declare const initialState: ChannelState;
export declare type ChannelStateReducerAction = {
    type: 'setMessageList';
    messageList: MessageItem[] | null;
} | {
    type: 'openThread';
    message: MessageItem | null;
} | {
    type: 'setThreadList';
    threadList: MessageItem[] | null;
} | {
    type: 'setAllThreadList';
    allThreadList: MessageItem[] | null;
} | {
    type: 'setActiveChannel';
    activeChannel: any | null;
} | {
    type: 'setOpenAllThread';
    openAllThread: boolean;
} | {
    type: 'setMsgLoading';
    msgLoading: boolean;
} | {
    type: 'setThreadLoading';
    threadLoading: boolean;
} | {
    type: 'setReplyMessage';
    replyMsgInfo: MessageItem | null;
};
export declare type ChannelStateReducer = Reducer<ChannelState, ChannelStateReducerAction>;
export declare const channelReducer: (state: ChannelState, action: ChannelStateReducerAction) => ChannelState;
