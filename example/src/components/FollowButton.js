import { __awaiter, __generator } from "tslib";
import React, { useEffect, useState } from 'react';
import { AppTypeEnum, LoginModal, Button, Loading, Modal } from '@web3mq/react-components';
import useLogin from '../../../src/hooks/useLogin';
import '@web3mq/react-components/dist/css/index.css';
import { AddContactIcon } from '../../../src/components/icons/AddContactIcon';
import { Client, getUserPublicProfileRequest } from '@web3mq/client';
var FollowButton = function (props) {
    var address = props.address, walletType = props.walletType;
    var _a = useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = useState(false), showModal = _b[0], setShowModal = _b[1];
    var _c = useState(null), loginAccount = _c[0], setLoginAccount = _c[1];
    var _d = useState(null), account = _d[0], setAccount = _d[1];
    var _e = useState(window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']), appType = _e[0], setAppType = _e[1];
    var _f = useLogin(), fastestUrl = _f.fastestUrl, keys = _f.keys, init = _f.init, getAccount = _f.getAccount, handleLoginEvent = _f.handleLoginEvent;
    var handleAppType = function () {
        setAppType(window.innerWidth <= 600 ? AppTypeEnum['h5'] : AppTypeEnum['pc']);
    };
    useEffect(function () {
        init();
        // set component theme
        document.getElementsByTagName('body')[0].setAttribute('data-theme', 'light');
        window.addEventListener('resize', handleAppType);
        (function () {
            window.removeEventListener('resize', handleAppType);
        });
    }, []);
    useEffect(function () {
        if (keys && fastestUrl) {
            getTargetUserInfo();
            initRender();
        }
        ;
    }, [keys, fastestUrl]);
    var getUserInfo = function (didValue, didType) { return __awaiter(void 0, void 0, void 0, function () {
        var web3MqInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!keys) return [3 /*break*/, 2];
                    return [4 /*yield*/, getUserPublicProfileRequest({
                            did_type: didType,
                            did_value: didValue,
                            timestamp: Date.now(),
                            my_userid: keys.userid
                        })];
                case 1:
                    web3MqInfo = _a.sent();
                    return [2 /*return*/, web3MqInfo.data];
                case 2: return [2 /*return*/];
            }
        });
    }); };
    var getTargetUserInfo = function () { return __awaiter(void 0, void 0, void 0, function () {
        var info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getUserInfo(address, walletType)];
                case 1:
                    info = _a.sent();
                    setAccount(info);
                    return [2 /*return*/];
            }
        });
    }); };
    var initRender = function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, myProfile, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!keys) return [3 /*break*/, 3];
                    client = Client.getInstance(keys);
                    return [4 /*yield*/, client.user.getMyProfile()];
                case 1:
                    myProfile = _a.sent();
                    if (!(myProfile && myProfile.wallet_address)) return [3 /*break*/, 3];
                    return [4 /*yield*/, getUserInfo(myProfile.wallet_address, myProfile.wallet_type)];
                case 2:
                    info = _a.sent();
                    setLoginAccount(info);
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var followUser = function () { return __awaiter(void 0, void 0, void 0, function () {
        var client, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(keys && loginAccount && account)) return [3 /*break*/, 4];
                    console.log('0', loginAccount);
                    setIsLoading(true);
                    client = Client.getInstance(keys);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, client.contact.followOperation({
                            target_userid: account.userid,
                            address: loginAccount.wallet_address,
                            action: 'follow',
                            did_type: loginAccount.wallet_type
                        })];
                case 2:
                    _a.sent();
                    setIsLoading(false);
                    setShowModal(true);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    setIsLoading(false);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (!fastestUrl)
        return null;
    return (React.createElement(React.Fragment, null,
        !keys ? (React.createElement(LoginModal, { containerId: appType, handleLoginEvent: handleLoginEvent, 
            // isShow={true}
            // account={account}
            loginBtnNode: React.createElement(Button, null, "Follow") })) : (React.createElement(React.Fragment, null, isLoading ? (React.createElement(Loading, null)) : (React.createElement(Button, { icon: React.createElement(AddContactIcon, null), onClick: function () { return followUser(); } }, "Follow")))),
        React.createElement(Modal, { appType: appType, visible: showModal, closeModal: function () {
                setShowModal(false);
            } },
            React.createElement("div", null))));
};
export default FollowButton;
//# sourceMappingURL=FollowButton.js.map