import type { EventTypes, Client } from '@web3mq/client';
export declare const useSelectedContacts: (client: Client) => {
    contacts: any[];
    selectedContacts: any[];
    handleCleanSelected: () => void;
    handleEvent: (props: {
        type: EventTypes;
    }) => void;
    handleDeleteContact: (delContact: any) => void;
    handleSelectedContact: (contact: any) => void;
};
