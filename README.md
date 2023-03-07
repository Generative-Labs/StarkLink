# Intro

> A library of react components for Follow or chat on Web3MQ

## Feature

- Follow Button
- Chat Button

## Install

```bash
npm i starklink
```

or

```bash
yarn add starklink
```

## Usage

# FollowButton

```tsx
import React from 'react';
import {FollowButton, ChatButton} from 'starklink';

function App() {
    return (
        <div className='app_container'>
            <FollowButton targetWalletAddress='0x63dc40a92a63da67bf635bd3c8288a719a029bde' targetWalletType='eth'/>
        </div>
    );
}

export default App;
```

# ChatButton

```tsx
import React from 'react';
import {FollowButton, ChatButton} from 'starklink';

function App() {
    return (
        <div className='app_container'>
            <ChatButton targetWalletAddress='0x63dc40a92a63da67bf635bd3c8288a719a029bde' targetWalletType='eth'/>
        </div>
    );
}

export default App;
```

## Api

### ChatButton

**The properties of the ChatButton are described as follows:**

| Property            | Description    | Type                                                                                       | Default | required |
|---------------------|----------------|--------------------------------------------------------------------------------------------|---------|----------|
| targetWalletAddress | wallet address | [Wallet Address](https://docs.web3mq.com/docs/Web3MQ-SDK/JS-SDK/standards/#wallet-address) | -       | true     |
| targetWalletType    | wallet type    | [WalletType](https://docs.web3mq.com/docs/Web3MQ-SDK/JS-SDK/types/#wallettype)             | -       | true     |

### FollowButton

**The properties of the FollowButton are described as follows:**

| Property         | Description                                                             |                                                Type                                                 | Default           | required |
| ---------------- | ----------------------------------------------------------------------- |:---------------------------------------------------------------------------------------------------:| ----------------- | -------- |
| targetWalletAddress          | wallet address                                                        | [Wallet Address](https://docs.web3mq.com/docs/Web3MQ-SDK/JS-SDK/standards/#wallet-address) | -         |  true   |
| targetWalletType          | wallet type     |    [WalletType](https://docs.web3mq.com/docs/Web3MQ-SDK/JS-SDK/types/#wallettype)    | -|  true   |