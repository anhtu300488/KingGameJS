/**
 * Created by MyPC on 12/12/2016.
 */
var _initialized;
var _connected = false;
var _disconnected = false;
var listening;

var _isPing = false;
var _isHandleMessage = false;
var _isRecvMessage = false;

var firstTimeDisconnect;

var lstBuffer;
var listEvent;

var NetworkManager = {
    SEND_PING_DELAY : 5000,
    DATA_DELAY : 100,
    SEND_MESSAGE_DELAY : 100,

    REGISTER : 1000,
    LOGIN : 1001,
    QUICK_PLAY : 1002,
    OPEN_ID_LOGIN : 1003,
    LOGOUT : 1004,
    ENTER_ZONE : 1005,
    FILTER_ROOM : 1006,
    CREATE_ROOM : 1007,
    ENTER_ROOM : 1008,
    ENTER_GROUP_ROOM : 1026,
    PLAYER_ENTER_ROOM : 1009,
    START_MATCH : 1010,
    TURN : 1011,
    EXIT_ROOM : 1012,
    PLAYER_EXIT_AFTER_MATCH_END : 1013,
    PLAYER_EXIT_ROOM : 1014,
    ROOM_OWNER_CHANGED : 1015,
    MATCH_BEGIN : 1016,
    MATCH_END : 1017,
    UPDATE_MONEY : 1018,
    PREPARE_NEW_MATCH : 1019,
    CANCEL_EXIT_ROOM : 1020,
    KICK_USER : 1023,
    LOCK_ROOM : 1022,
    READY_TO_PLAY : 1021,
    UPDATE_USER_INFO : 1200,
    FILTER_TOP_USER : 1201,
    FILTER_MAIL : 1202,
    SEND_MAIL : 1203,
    DELETE_MAIL : 1204,
    READED_MAIL : 1205,
    CLAIM_ATTACH_ITEM : 1206,
    FILTER_FRIEND : 1207,
    ADD_FRIEND : 1208,
    FILTER_ADD_FRIEND : 1209,
    APPROVE_ADD_FRIEND : 1210,
    FIND_USER : 1211,
    VIEW_USER_INFO : 1212,
    REMOVE_FRIEND : 1213,
    CHANGE_RULE : 1024,
    SEND_TEXT_EMOTICON : 1025,

    BET : 1031,
    EXIT_ZONE : 1032,
    CHANGE_HOST : 1033,
    EXTRA_BET : 1034,

    //invite
    LOOKUP_USER_TO_INVITE : 1027,
    INVITE_TO_ROOM : 1028,
    CANCEL_INVITE : 1030,
    RELY_INVITE : 1029,

    LOOKUP_MONEY_HISTORY : 1214,

    INSTANT_MESSAGE : 1215,
    UPDATE_USER_SETTING : 1216,

    PURCHASE_MONEY : 1217,
    FILTER_AVATAR : 1218,

    LEVEL_UP : 1219,
    MEDAL_UP : 1220,
    //admin message
    KILL_ROOM : 1300,
    //special message
    INITIALIZE : 1111,
    PING : 8888,
    EXPIRED_SESSION : 9999,
    CAPTCHA : 5555,
    //max connection
    MAX_CONNECTION : 10000,
    EPS : 1000,
//gift code
    REDEEM_GIFT_CODE : 1221,
    REDEEM_GIFT_CODE_HISTORY : 1222,

    LUCKY_WHEEL_CONFIG : 1237,
    BUY_TURN : 1238,

    //doi thuong
    ASSET_CONFIG : 1223,
    EXCHANGE_ASSET : 1224,
    EXCHANGE_CASH_TO_GOLD : 1225,
    EXCHANGE_ASSET_HISTORY : 1226,
    PURCHASE_CASH_HISTORY : 1227,
    EXCHANGE_GOLD_HISTORY : 1228,
    USER_VERIFY_CONFIG : 1231,
    USER_VERIFY : 1232,
    SMS_CONFIG : 1229,
    FIND_USER_BY_ID : 1233,
    CASH_TRANSFER_CONFIG : 1234,
    CASH_TRANSFER : 1235,
    EXCHANGE_C2G_CONFIG : 1236,
    CARD_CONFIG : 1230,
    MAX_LAG_TIME : 5000,
    MAX_KILL_MSG : 2000,
    RESET_PASSWORD : 7777,
    CLOSE_CONNECTION : 6666,
    HEAD_LINE : 2222,
    EMERGENCY_NOTIFICATION : 3333,
    JAR_REQUEST : 1239,
    LOOKUP_GAME_HISTORY : 1036,
    IAP_CONFIG : 1241,
    IAP_FINISH : 1242,

    GOLD_CONFIG : 1243,
    PURCHASE_GOLD : 1244,
    USER_STATUS : 1245
}

var getInitializeMessageFromServer = function(cp, appversion , country, language, device_id, device_info, pakageName) {
    var request = initInitializeMessage(cp, appversion, country, language, device_id, device_info, pakageName);


    requestMessage(request, getOS(), NetworkManager.INITIALIZE, "");

}

var initInitializeMessage = function(cp, appversion, country, language, device_id, device_info, pakageName) {

    var ProtoBuf = dcodeIO.ProtoBuf,
        TestProtobuf = ProtoBuf.loadProtoFile('res/protobuf/initialize.proto').build('bigken.initialize'),
        TestProto = TestProtobuf.BINInitializeRequest;

    // var TestProto = initializeProto.BINInitializeRequest;

    var testProto = new TestProto({
        cp : cp,
        appVersion : appversion,
        deviceId : device_id,
        deviceInfo : device_info,
        country : country,
        language : language,
        pakageName : pakageName
    });

    var str = testProto.encode();

    return str;

}


var getLoginMessageFromServer = function(username, password)
{
    var request = initLoginMessage(username, password);

    requestMessage(request, getOS(), NetworkManager.LOGIN, "");

}

var initLoginMessage = function(username, password) {

    var ProtoBuf = dcodeIO.ProtoBuf,
        LoginProtobuf = ProtoBuf.loadProtoFile('res/protobuf/login.proto').build('bigken.login'),
        LoginProto = LoginProtobuf.BINLoginRequest;

    // var LoginProto = loginProto.BINLoginRequest;

    var loginProto = new LoginProto({
        userName: username,
        password: password
    });

    return loginProto.encode();
}

var getRegisterMessageFromServer = function(username, password, confirm_password, full_name, sdt) {
    var request = initRegisterMessage(username, password, confirm_password, full_name, sdt);
    requestMessage(request, getOS(), NetworkManager.REGISTER, "");
}

var initRegisterMessage = function(username, password, confirm_password, full_name, sdt) {

    var ProtoBuf = dcodeIO.ProtoBuf,
        RegisterProtobuf = ProtoBuf.loadProtoFile('res/protobuf/register.proto').build('bigken.register'),
        RegisterProto = RegisterProtobuf.BINRegisterRequest;

    var registerProto = new RegisterProto({
        userName: username,
        password: password,
        confirmPassword: confirm_password,
        displayName: full_name,
        mobile: sdt
    });

    return registerProto.encode();
}

//function request message
var requestMessage = function(request, os, message_id, session_id) {
    var size = 32;

    // if (message_id != NETWORK.INITIALIZE && message_id != NETWORK.TURN
    //     && message_id != NETWORK.INSTANT_MESSAGE && message_id != NETWORK.LOOKUP_MONEY_HISTORY
    //     && message_id != NETWORK.FILTER_MAIL && message_id != NETWORK.BET  && message_id != NETWORK.FILTER_FRIEND) {
    //     LoadingManager::getInstance().showLoading();
    //     cocos2d::Director::getInstance().getEventDispatcher().setEnabled(false);
    // }

    var ackBuf = initData(request, os, message_id, session_id, size);


    // if(NetworkManager::getInstance()._disconnected) {
    //     Director::getInstance().getScheduler().performFunctionInCocosThread([&]{
    //         /*MToast* toast = MToast::create();
    //          toast.show("Kết nối chậm,vui lòng chờ trong giây lát...",1);
    //          auto visibleSize = Director::getInstance().getVisibleSize();
    //          auto origin = Director::getInstance().getVisibleOrigin();
    //          toast.setPosition(Vec2(origin + visibleSize/2));
    //          auto scene = cocos2d::Director::getInstance().getRunningScene();
    //          if (scene != nullptr) {
    //          scene.addChild(toast,INDEX_TOAST);
    //          }*/
    //     });
    // } else {
    callNetwork(ackBuf);

    // }

    // return ackBuf;
}

var initData = function(request, os, messid, _session, len)
{

    var lenSession = 0;

    if(_session != null){
        lenSession = _session.length;
    }

    var ByteBuffer = dcodeIO.ByteBuffer;
    var size = request.limit + 9 + lenSession;
    var bb = new ByteBuffer(size);

    var _offset = 0;

    bb.writeUint8(os, _offset);
    _offset++;


    var dataSize = request.limit + 4;

    bb.writeUint32(dataSize, _offset);
    _offset+= 4;


    bb.writeUint16(lenSession, _offset);
    _offset+= 2;

    var sessionByte = bb.writeUTF8String(_session, _offset);
    _offset+= lenSession;

    bb.writeUint16(messid, _offset);
    _offset+= 2;

    //insert request into bytebuffer

    bb.append(request, "", _offset);

    // _offset+= request.limit;
    //
    // var endParam = "\r\n";
    //
    // bb.writeUTF8String(endParam, _offset);



    return bb.toBuffer();

}

var callNetwork = function(ackBuf) {
    ws.send(ackBuf);
}

var listMessages = [];

var parseFrom = function(read_str, len)
{

    var ByteBuffer = dcodeIO.ByteBuffer;
    var bb = new ByteBuffer(len);

    bb.append(read_str);

    var lenPacket = len;
    while (lenPacket > 0) {
        var _offset = 0;
        var bytes_size = bb.readInt32(_offset);
        _offset+= 4;

        //read compress
        var is_compress = bb.readInt8(_offset);
        _offset+= 1;

        var left_byte_size = bytes_size - 1;
        lenPacket -= (bytes_size + 4);
        var response = 0;

        bb = bb.copy(_offset);


        /*if is_compress = 1 */
        if (is_compress == 1) {
            // var left_block = bb.copy(_offset);
            var byteArray = new Uint8Array(bb);
            var bufArr = bb.view;

            var dataUnzip = cc.unzipBase64AsArray(bb.toString('base64'));

            var _offsetZip = 0;


            var bbZip = new ByteBuffer(dataUnzip.length);

            bbZip.append(dataUnzip, "", 0);


            var data_size_block_zip = bbZip.readInt16(_offsetZip);
            _offsetZip+= 2;


            // read messageid

            var messageidZip = bbZip.readInt16(_offsetZip);
            _offsetZip+= 2;


            left_byte_size -= (data_size_block_zip + 2);

            //read protobuf


            var protoBufVarZip = bbZip.copy(_offsetZip, data_size_block_zip + _offsetZip - 2);

            response = getTypeMessage(response, messageidZip, protoBufVarZip);


            if (response != 0) {
                left_byte_size -= (data_size_block_zip + 2);
                var pairZip = {
                    message_id: messageidZip,
                    response: response
                };
                listMessages.push(pairZip);
            }
            else {
                cc.error("unknown message");
            }


        }
        else {

            while (left_byte_size > 0) {
                //read protobuf + data_size_block + mid
                //read datasizeblock

                var _offsetUnzip = 0;


                var data_size_block = bb.readInt16(_offsetUnzip);
                    _offsetUnzip+= 2;


                // if(data_size_block != bb.limit - _offset){
                //     data_size_block = bb.limit - _offset;
                // }

                // read messageid
                var messageid = bb.readInt16(_offsetUnzip);
                    _offsetUnzip+= 2;


                //read protobuf

                var protoBufVar = bb.copy(_offsetUnzip, data_size_block + _offsetUnzip - 2);


                response = getTypeMessage(response, messageid, protoBufVar);


                if (response != 0) {
                    left_byte_size -= (data_size_block + 2);
                    bb = bb.copy(data_size_block + _offsetUnzip - 2);

                    var pair = {
                        message_id: messageid,
                        response: response
                    };
                    listMessages.push(pair);
                }
                else {
                    cc.error("unknown message");
                }

            }
        }
    }

    if (lenPacket > 0) {
        cc.log("NetworkManager: error packet length = 0");
    }


    // return listMessages;
}

var getTypeMessage = function(msg, messageid, protoBufVar) {
    switch (messageid) {
        case NetworkManager.INITIALIZE:
            msg = BINInitializeResponse(protoBufVar);
            break;
        case NetworkManager.REGISTER:
            msg = new BINRegisterResponse(protoBufVar);
            break;
        case NetworkManager.LOGIN:
            msg = new BINLoginResponse(protoBufVar);
            break;
        case NetworkManager.EXPIRED_SESSION:
            msg = new BINSessionExpiredResponse(protoBufVar);
            break;
        case NetworkManager.ENTER_ROOM:
            msg = new BINEnterRoomResponse(protoBufVar);
            break;
        case NetworkManager.ENTER_GROUP_ROOM:
            msg = new BINEnterRoomResponse(protoBufVar);
            break;
        case NetworkManager.PLAYER_ENTER_ROOM:
            msg = new BINPlayerEnterRoomResponse(protoBufVar);
            break;
        case NetworkManager.ENTER_ZONE:
            msg = new BINEnterZoneResponse(protoBufVar);
            break;
        case NetworkManager.PING:
            msg = new BINPingResponse(protoBufVar);
            break;
        case NetworkManager.FILTER_ROOM:
            msg = new BINFilterRoomResponse(protoBufVar);
            break;
        case NetworkManager.START_MATCH:
            msg = new BINStartMatchResponse(protoBufVar);
            break;
        case NetworkManager.CREATE_ROOM:
            msg = new BINCreateRoomResponse(protoBufVar);
            break;
        case NetworkManager.TURN:
            msg = new BINTurnResponse(protoBufVar);
            break;
        case NetworkManager.MATCH_BEGIN:
            msg = new BINMatchBeginResponse(protoBufVar);
            break;
        case NetworkManager.MATCH_END:
            msg = new BINMatchEndResponse(protoBufVar);
            break;
        case NetworkManager.PLAYER_EXIT_AFTER_MATCH_END:
            msg = new BINPlayerExitAfterMatchEndResponse(protoBufVar);
            break;
        case NetworkManager.PLAYER_EXIT_ROOM:
            msg = new BINPlayerExitRoomResponse(protoBufVar);
            break;
        case NetworkManager.UPDATE_MONEY:
            msg = new BINUpdateMoneyResponse(protoBufVar);
            break;
        case NetworkManager.EXIT_ROOM:
            msg = new BINExitRoomResponse(protoBufVar);
            break;
        case NetworkManager.PREPARE_NEW_MATCH:
            msg = new BINPrepareNewMatchResponse(protoBufVar);
            break;
        case NetworkManager.ROOM_OWNER_CHANGED:
            msg = new BINRoomOwnerChangedResponse(protoBufVar);
            break;
        case NetworkManager.CANCEL_EXIT_ROOM:
            msg = new BINCancelExitAfterMatchEndResponse(protoBufVar);
            break;
        case NetworkManager.READY_TO_PLAY:
            msg = new BINReadyToPlayResponse(protoBufVar);
            break;
        case NetworkManager.UPDATE_USER_INFO:
            msg = new BINUpdateUserInfoResponse(protoBufVar);
            break;
        case NetworkManager.LOGOUT:
            msg = new BINLogoutResponse(protoBufVar);
            break;
        case NetworkManager.KICK_USER:
            msg = new BINKickPlayerOutResponse(protoBufVar);
            break;
        case NetworkManager.LOCK_ROOM:
            msg = new BINLockRoomResponse(protoBufVar);
            break;
        case NetworkManager.FILTER_TOP_USER:
            msg = new BINFilterTopUserResponse(protoBufVar);
            break;
        case NetworkManager.FILTER_FRIEND:
            msg = new BINFilterFriendResponse(protoBufVar);
            break;
        case NetworkManager.ADD_FRIEND:
            msg = new BINAddFriendResponse(protoBufVar);
            break;
        case NetworkManager.FILTER_ADD_FRIEND:
            msg = new BINFilterAddFriendResponse(protoBufVar);
            break;
        case NetworkManager.APPROVE_ADD_FRIEND:
            msg = new BINApproveAddFriendResponse(protoBufVar);
            break;
        case NetworkManager.FIND_USER:
            msg = new BINFindUserResponse(protoBufVar);
            break;
        case NetworkManager.VIEW_USER_INFO:
            msg = new BINViewUserInfoResponse(protoBufVar);
            break;
        case NetworkManager.REMOVE_FRIEND:
            msg = new BINRemoveFriendResponse(protoBufVar);
            break;
        case NetworkManager.CHANGE_RULE:
            msg = new BINChangeRuleResponse(protoBufVar);
            break;
        case NetworkManager.LOOKUP_MONEY_HISTORY:
            msg = new BINLookUpMoneyHistoryResponse(protoBufVar);
            break;
        case NetworkManager.SEND_TEXT_EMOTICON:
            msg = new BINSendTextEmoticonResponse(protoBufVar);
            break;
        case NetworkManager.INSTANT_MESSAGE:
            msg = new BINInstantMessageResponse(protoBufVar);
            break;
        case NetworkManager.UPDATE_USER_SETTING:
            msg = new BINUpdateUserSettingResponse(protoBufVar);
            break;
        case NetworkManager.FILTER_MAIL:
            msg = new BINFilterMailResponse(protoBufVar);
            break;
        case NetworkManager.SEND_MAIL:
            msg = new BINSendMailResponse(protoBufVar);
            break;
        case NetworkManager.DELETE_MAIL:
            msg = new BINDeleteMailResponse(protoBufVar);
            break;
        case NetworkManager.READED_MAIL:
            msg = new BINReadedMailResponse(protoBufVar);
            break;
        case NetworkManager.CLAIM_ATTACH_ITEM:
            msg = new BINClaimAttachItemResponse(protoBufVar);
            break;
        case NetworkManager.LEVEL_UP:
            msg = new BINLevelUpResponse(protoBufVar);
            break;
        case NetworkManager.MEDAL_UP:
            msg = new BINMedalUpResponse(protoBufVar);
            break;
        case NetworkManager.CAPTCHA:
            msg = new BINCaptchaResponse(protoBufVar);
            break;
        case NetworkManager.PURCHASE_MONEY:
            msg = new BINPurchaseMoneyResponse(protoBufVar);
            break;
        case NetworkManager.KILL_ROOM:
            msg = new BINKillRoomResponse(protoBufVar);
            break;
        case NetworkManager.EXIT_ZONE:
            msg = new BINExitZoneResponse(protoBufVar);
            break;
        case NetworkManager.BET:
            msg = new BINBetResponse(protoBufVar);
            break;
        case NetworkManager.CHANGE_HOST:
            msg = new BINChangeHostResponse(protoBufVar);
            break;
        case NetworkManager.EXTRA_BET:
            msg = new BINExtraBetResponse(protoBufVar);
            break;
        case NetworkManager.HOST_REGISTRATION:
            msg = new BINHostRegistrationResponse(protoBufVar);
            break;
        case NetworkManager.LOOKUP_USER_TO_INVITE:
            msg = new BINLookUpUserToInviteResponse(protoBufVar);
            break;
        case NetworkManager.INVITE_TO_ROOM:
            msg = new BINInviteToRoomResponse(protoBufVar);
            break;
        case NetworkManager.CANCEL_INVITE:
            msg = new BINCancelInvitationResponse(protoBufVar);
            break;
        case NetworkManager.RELY_INVITE:
            msg = new BINRelyInvitationResponse(protoBufVar);
            break;
        case NetworkManager.REDEEM_GIFT_CODE:
            msg = new BINRedeemGiftCodeResponse(protoBufVar);
            break;
        case NetworkManager.REDEEM_GIFT_CODE_HISTORY:
            msg = new BINRedeemGiftCodeHistoryResponse(protoBufVar);
            break;
        case NetworkManager.ASSET_CONFIG:
            msg = new BINAssetConfigResponse(protoBufVar);
            break;
        case NetworkManager.EXCHANGE_ASSET:
            msg = new BINExchangeAssetResponse(protoBufVar);
            break;
        case NetworkManager.EXCHANGE_CASH_TO_GOLD:
            msg = new BINExchangeCashToGoldResponse(protoBufVar);
            break;
        case NetworkManager.EXCHANGE_ASSET_HISTORY:
            msg = new BINExchangeAssetHistoryResponse(protoBufVar);
            break;
        case NetworkManager.PURCHASE_CASH_HISTORY:
            msg = new BINPurchaseCashHistoryResponse(protoBufVar);
            break;
        case NetworkManager.EXCHANGE_GOLD_HISTORY:
            msg = new BINExchangeGoldHistoryResponse(protoBufVar);
            break;
        case NetworkManager.SMS_CONFIG:
            msg = new BINSmsConfigResponse(protoBufVar);
            break;
        case NetworkManager.USER_VERIFY_CONFIG:
            msg = new BINUserVerifyConfigResponse(protoBufVar);
            break;
        case NetworkManager.USER_VERIFY:
            msg = new BINUserVerifyResponse(protoBufVar);
            break;
        case NetworkManager.CASH_TRANSFER:
            msg = new BINCashTransferResponse(protoBufVar);
            break;
        case NetworkManager.CASH_TRANSFER_CONFIG:
            msg = new BINCashTransferConfigResponse(protoBufVar);
            break;
        case NetworkManager.RESET_PASSWORD:
            msg = new BINResetPasswordResponse(protoBufVar);
            break;
        case NetworkManager.FIND_USER_BY_ID:
            msg = new BINFindUserByIdResponse(protoBufVar);
            break;
        case NetworkManager.EXCHANGE_C2G_CONFIG:
            msg = new BINExchangeC2GConfigResponse(protoBufVar);
            break;
        case NetworkManager.CARD_CONFIG:
            msg = new BINCardConfigResponse(protoBufVar);
            break;
        case NetworkManager.HEAD_LINE:
            msg = new BINHeadLineResponse(protoBufVar);
            break;
        case NetworkManager.EMERGENCY_NOTIFICATION:
            msg = new BINEmergencyNotificationResponse(protoBufVar);
            break;
        case NetworkManager.LUCKY_WHEEL_CONFIG:
            msg = new BINLuckyWheelConfigResponse(protoBufVar);
            break;
        case NetworkManager.BUY_TURN:
            msg = new BINBuyTurnResponse(protoBufVar);
            break;
        case NetworkManager.JAR_REQUEST:
            msg = new BINJarResponse(protoBufVar);
            break;
        case NetworkManager.LOOKUP_GAME_HISTORY:
            msg = new BINLookUpGameHistoryResponse(protoBufVar);
            break;
        case NetworkManager.IAP_CONFIG:
            msg = new BINIAPConfigResponse(protoBufVar);
            break;
        case NetworkManager.IAP_FINISH:
            msg = new BINCompleteIAPResponse(protoBufVar);
            break;
        case NetworkManager.GOLD_CONFIG:
            msg = new BINGoldConfigResponse(protoBufVar);
            break;
        case NetworkManager.PURCHASE_GOLD:
            msg = new BINPurchaseGoldResponse(protoBufVar);
            break;
        case NetworkManager.USER_STATUS:
            msg = new BINUserStatusResponse(protoBufVar);
            break;
        default:
            msg = 0;
            break;
    }
    return msg;
}

var getPingMessageFromServer = function(disconnect_time) {
    var request = initPingMessage(disconnect_time);
    var size;
    var ackBuf = initData(request, getOS(),
        NetworkManager.PING, "", size);

    // if (!_isPing) {
    //     std::thread *t = new std::thread(&NetworkManager::sendPing, this, ackBuf, size);
    //     if (t.joinable())
    //         t.detach();
    // }

}

var isConnected = function(){
    return _connected;
}


var setConnected = function(_connect) {
    _connected = _connect;
}

var setDisconnected = function(_disconnected) {
    _disconnected = _disconnected;
}

var isDisconnected = function() {
    return _disconnected;
}

var closeConnection = function() {
    _connected = false;
    ws.onclose();
    setDisconnected(true);
}

var setInitialize = function(is_initialized) {
    _initialized = is_initialized;
}

var isInitialized = function() {
    return _initialized;
}

var getEnterZoneMessageFromServer = function(zoneId) {

    var ProtoBuf = dcodeIO.ProtoBuf,
        BinParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/enter_zone.proto').build('bigken.enterzone'),
        BinParamProto = BinParamProtobuf.BINEnterZoneRequest;

    var request = new BinParamProto({
        zoneId : zoneId
    }).encode();

    requestMessage(request, getOS(),NetworkManager.ENTER_ZONE, getSessionId());

}

var getExitZoneMessageFromServer = function(zoneId) {
    var request = initExitZoneMessage(zoneId);
    requestMessage(request, getOS(),
        NetworkManager.EXIT_ZONE, getSessionId());
}

var initExitZoneMessage = function(zoneId) {

    var ProtoBuf = dcodeIO.ProtoBuf,
        ExitZoneProtobuf = ProtoBuf.loadProtoFile('res/protobuf/enter_zone.proto').build('bigken.enterzone'),
        ExitZoneProto = ExitZoneProtobuf.BINExitZoneRequest;

    var exitZoneProto = new ExitZoneProto({
        zoneId: zoneId
    });

    return exitZoneProto.encode();
}

var getFilterRoomMessageFromServer = function(zone_id, roomType, first_result, max_result, orderByField, asc) {
    var request = initFilterRoomMessage(zone_id, roomType, first_result, max_result, orderByField, asc);
    requestMessage(request, getOS(), NetworkManager.FILTER_ROOM, getSessionId());
}

var initFilterRoomMessage = function(zone_id, roomType, first_result, max_result, orderByField, asc) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        FilterRoomProtobuf = ProtoBuf.loadProtoFile('res/protobuf/filter_room.proto').build('bigken.filterroom'),
        FilterRoomProto = FilterRoomProtobuf.BINFilterRoomRequest;
    var request = new FilterRoomProto({
        zoneId : zone_id,
        roomType: roomType,
        firstResult: first_result,
        maxResult: max_result,
        orderByField: orderByField,
        asc: asc
    });

    return request.encode();
}

var getUserStatusRequest = function(type){
    var request = initUserStatusRequest(type);
    requestMessage(request, getOS(),
        NetworkManager.USER_STATUS, getSessionId());
}

var initUserStatusRequest = function(type){
    var ProtoBuf = dcodeIO.ProtoBuf,
        FilterRoomProtobuf = ProtoBuf.loadProtoFile('res/protobuf/user_status.proto').build('bigken.userstatus'),
        FilterRoomProto = FilterRoomProtobuf.BINUserStatusRequest;
    var request = new FilterRoomProto({
        type : type
    });

    return request.encode();
}

var getEnterRoomMessageFromServer = function(room_index, password) {
    cc.log("getEnterRoomMessageFromServer");
    var request = initEnterRoomMessage(room_index, password);
    requestMessage(request, getOS(), NetworkManager.ENTER_ROOM, getSessionId());
}

var initEnterRoomMessage = function(room_index, password) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        FilterRoomProtobuf = ProtoBuf.loadProtoFile('res/protobuf/enter_room.proto').build('bigken.enterroom'),
        FilterRoomProto = FilterRoomProtobuf.BINEnterRoomRequest;
    var request = new FilterRoomProto({
        roomIndex : room_index,
        password : password
    });

    return request.encode();
}

var getStartMatchMessageFromServer = function(room_index) {
    var request = initStartMatchMessage(room_index);
    requestMessage(request, getOS(), NetworkManager.START_MATCH, getSessionId());
}

var initStartMatchMessage = function(room_index) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        FilterRoomProtobuf = ProtoBuf.loadProtoFile('res/protobuf/start_match.proto').build('bigken.startmatch'),
        FilterRoomProto = FilterRoomProtobuf.BINStartMatchRequest;
    var request = new FilterRoomProto({
        roomIndex : room_index
    });

    return request.encode();
}

var getReadyToPlayMessageFromServer = function(roomIndex, tableIndex){
    var request = initReadyMessage(roomIndex, tableIndex);

    requestMessage(request, getOS(), NetworkManager.READY_TO_PLAY, getSessionId());
}

var initReadyMessage = function(roomIndex, tableIndex){
    var ProtoBuf = dcodeIO.ProtoBuf,
        FilterRoomProtobuf = ProtoBuf.loadProtoFile('res/protobuf/ready_to_play.proto').build('bigken.readytoplay'),
        FilterRoomProto = FilterRoomProtobuf.BINReadyToPlayRequest;
    var request = new FilterRoomProto({
        roomIndex : roomIndex,
        tableIndex: tableIndex
    });

    return request.encode();
}

var getExitRoomMessageFromServer = function(roomIndex) {
    var request = initExitRoomLoginMessage(roomIndex);
    requestMessage(request, getOS(),
        NetworkManager.EXIT_ROOM, getSessionId());
}
var getCancelExitRoomMessageFromServer = function(roomIndex) {
    var request = initCancelExitRoomLoginMessage(roomIndex);
    requestMessage(request, getOS(),
        NetworkManager.CANCEL_EXIT_ROOM, getSessionId());
}

var initExitRoomLoginMessage = function(room_index) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        FilterRoomProtobuf = ProtoBuf.loadProtoFile('res/protobuf/exit_room.proto').build('bigken.exitroom'),
        FilterRoomProto = FilterRoomProtobuf.BINExitRoomRequest;
    var request = new FilterRoomProto({
        roomIndex : room_index
    });

    return request.encode();
}
var initCancelExitRoomLoginMessage = function(room_index) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        FilterRoomProtobuf = ProtoBuf.loadProtoFile('res/protobuf/exit_room.proto').build('bigken.exitroom'),
        FilterRoomProto = FilterRoomProtobuf.BINCancelExitAfterMatchEndRequest;
    var request = new FilterRoomProto({
        roomIndex : room_index
    });

    return request.encode();
}