import { __awaiter, __generator } from "tslib";
import { useMemo, useState } from 'react';
import { Client } from '@web3mq/client';
var useLogin = function () {
    var hasKeys = useMemo(function () {
        var PrivateKey = localStorage.getItem('PRIVATE_KEY') || '';
        var PublicKey = localStorage.getItem('PUBLIC_KEY') || '';
        var userid = localStorage.getItem('userid') || '';
        if (PrivateKey && PublicKey && userid) {
            return { PrivateKey: PrivateKey, PublicKey: PublicKey, userid: userid };
        }
        return null;
    }, []);
    var _a = useState(hasKeys), keys = _a[0], setKeys = _a[1];
    var _b = useState(null), fastestUrl = _b[0], setFastUrl = _b[1];
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        var tempPubkey, didKey, fastUrl;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tempPubkey = localStorage.getItem('PUBLIC_KEY') || '';
                    didKey = localStorage.getItem('DID_KEY') || '';
                    return [4 /*yield*/, Client.init({
                            connectUrl: localStorage.getItem('FAST_URL'),
                            app_key: 'vAUJTFXbBZRkEDRE',
                            env: 'dev',
                            didKey: didKey,
                            tempPubkey: tempPubkey
                        })];
                case 1:
                    fastUrl = _a.sent();
                    localStorage.setItem('FAST_URL', fastUrl);
                    setFastUrl(fastUrl);
                    return [2 /*return*/];
            }
        });
    }); };
    var getAccount = function () { return __awaiter(void 0, void 0, void 0, function () {
        var address, _a, userid, userExist;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, Client.register.getAccount('starknet')];
                case 1:
                    address = (_b.sent()).address;
                    console.log('address', address);
                    return [4 /*yield*/, Client.register.getUserInfo({
                            did_value: address,
                            did_type: 'starknet'
                        })];
                case 2:
                    _a = _b.sent(), userid = _a.userid, userExist = _a.userExist;
                    return [2 /*return*/, { address: address, userid: userid, userExist: userExist }];
            }
        });
    }); };
    var logout = function () {
        localStorage.setItem('PRIVATE_KEY', '');
        localStorage.setItem('PUBLIC_KEY', '');
        localStorage.setItem('DID_KEY', '');
        localStorage.setItem('userid', '');
        setKeys(null);
    };
    var handleLoginEvent = function (eventData) {
        if (eventData.data) {
            if (eventData.type === 'login') {
                var _a = eventData.data, privateKey = _a.privateKey, publicKey = _a.publicKey, tempPrivateKey = _a.tempPrivateKey, tempPublicKey = _a.tempPublicKey, didKey = _a.didKey, userid = _a.userid, address = _a.address, pubkeyExpiredTimestamp = _a.pubkeyExpiredTimestamp;
                localStorage.setItem('userid', userid);
                localStorage.setItem('PRIVATE_KEY', tempPrivateKey);
                localStorage.setItem('PUBLIC_KEY', tempPublicKey);
                localStorage.setItem('WALLET_ADDRESS', address);
                localStorage.setItem("MAIN_PRIVATE_KEY", privateKey);
                localStorage.setItem("MAIN_PUBLIC_KEY", publicKey);
                localStorage.setItem("DID_KEY", didKey);
                localStorage.setItem('PUBKEY_EXPIRED_TIMESTAMP', String(pubkeyExpiredTimestamp));
                setKeys({
                    PrivateKey: tempPrivateKey,
                    PublicKey: tempPublicKey,
                    userid: userid
                });
            }
            if (eventData.type === 'register') {
                var _b = eventData.data, privateKey = _b.privateKey, publicKey = _b.publicKey, address = _b.address;
                localStorage.setItem('WALLET_ADDRESS', address);
                localStorage.setItem("MAIN_PRIVATE_KEY", privateKey);
                localStorage.setItem("MAIN_PUBLIC_KEY", publicKey);
            }
        }
    };
    return { keys: keys, fastestUrl: fastestUrl, init: init, getAccount: getAccount, logout: logout, handleLoginEvent: handleLoginEvent };
};
export default useLogin;
//# sourceMappingURL=useLogin.js.map