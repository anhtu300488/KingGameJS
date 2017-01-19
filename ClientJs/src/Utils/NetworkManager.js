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
    cc.log("getInitializeMessageFromServer");
    var request = initInitializeMessage(cp, appversion, country, language, device_id, device_info, pakageName);

    cc.log("request = ", request);

    var requestMess = requestMessage(request, getOS(), NetworkManager.INITIALIZE, "");

    return requestMess;
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
    cc.log("getLoginMessageFromServer");
    var request = initLoginMessage(username, password);

    var requestMess = requestMessage(request, getOS(), NetworkManager.LOGIN, "");

    return requestMess;
}

var initLoginMessage = function(username, password) {
    cc.log("initLoginMessage");

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
    request = initRegisterMessage(username, password, confirm_password, full_name, sdt);
    requestMessage(request, getOS(), NetworkManager.REGISTER, "");
}

var initRegisterMessage = function(username, password, confirm_password, full_name, sdt) {
    cc.log("initRegisterMessage");

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
    cc.log("requestMessage");
    var size = 32;

    // if (message_id != NETWORK.INITIALIZE && message_id != NETWORK.TURN
    //     && message_id != NETWORK.INSTANT_MESSAGE && message_id != NETWORK.LOOKUP_MONEY_HISTORY
    //     && message_id != NETWORK.FILTER_MAIL && message_id != NETWORK.BET  && message_id != NETWORK.FILTER_FRIEND) {
    //     LoadingManager::getInstance()->showLoading();
    //     cocos2d::Director::getInstance()->getEventDispatcher()->setEnabled(false);
    // }

    var ackBuf = initData(request, os, message_id, session_id, size);

    cc.log("ackBuf", ackBuf);

    // if(NetworkManager::getInstance()->_disconnected) {
    //     Director::getInstance()->getScheduler()->performFunctionInCocosThread([&]{
    //         /*MToast* toast = MToast::create();
    //          toast->show("Kết nối chậm,vui lòng chờ trong giây lát...",1);
    //          auto visibleSize = Director::getInstance()->getVisibleSize();
    //          auto origin = Director::getInstance()->getVisibleOrigin();
    //          toast->setPosition(Vec2(origin + visibleSize/2));
    //          auto scene = cocos2d::Director::getInstance()->getRunningScene();
    //          if (scene != nullptr) {
    //          scene->addChild(toast,INDEX_TOAST);
    //          }*/
    //     });
    // } else {
        callNetwork(ackBuf);

    // }
}

var initData = function(request, os, messid, _session, len)
{

    cc.log("request = ", request);
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

    // cc.log("bb =  " + bb.toDebug());

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
    cc.log("status", ws.readyState);
    ws.send(ackBuf);
}

var parseFrom = function(read_str, len)
{
    cc.log("read_str", read_str);
    cc.log("len", len);
    var ByteBuffer = dcodeIO.ByteBuffer;
    var bb = new ByteBuffer(len);

    bb.append(read_str);


    var listMessages = [];

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

        /*if is_compress = 1 */
        if (is_compress == 1) {
            cc.log("zip");
            var left_block = bb.copy(_offset);
            var dataUnzip = cc.unzip(left_block);
            // google::protobuf::io::CodedInputStream::Limit msgLimit =
            //     codedIn.PushLimit(left_byte_size); //limit compressed size
            // //read data compressed
            // char *data_compressed = new char[left_byte_size];
            //
            // codedIn.ReadRaw(data_compressed, left_byte_size);
            // codedIn.PopLimit(msgLimit);
            // vector<char> result = Common::getInstance()->decompress_gzip2(
            //         data_compressed, (int)left_byte_size);
            // char* data_uncompressed = reinterpret_cast<char*>(result.data());
            //
            // int length = (int)result.size();
            // int index = 0;
            // while (index < length) {
            //     //read datablocksize
            //     int data_size_block = ((data_uncompressed[index] & 0xFF) << 8) + ((data_uncompressed[index + 1] & 0xFF) << 0);
            //     //read messageid
            //     int messageid = ((data_uncompressed[index + 2] & 0xFF) << 8) + ((data_uncompressed[index + 3] & 0xFF) << 0);
            //     //read protobuf message
            //
            //     response = getTypeMessage(response, messageid);
            //
            //     if (response == 0) {
            //         CCLOG("unknown message");
            //         throw std::runtime_error("");
            //     }
            //
            //     bool isRead = response->ParseFromArray(&data_uncompressed[index + 4], data_size_block - 2);
            //     index += (data_size_block + 2);
            //     if (isRead)
            //         listMessages.push_back(std::make_pair(response, messageid));
            // }
        }
        else {
            cc.log("unzip");
            /* if is_compression = 0 */
            while (left_byte_size > 0) {
                //read protobuf + data_size_block + mid
                //read datasizeblock
                // var offset = 0;
                var data_size_block = bb.readInt16(_offset);
                _offset+= 2;


                // read messageid

                var messageid = bb.readInt16(_offset);
                _offset+= 2;


                left_byte_size -= (data_size_block + 2);

                //read protobuf


                var protoBufVar = bb.copy(_offset, data_size_block + _offset - 2);

                cc.log("protoBufVar = ", protoBufVar);

                cc.log("messageid:" + messageid);

                response = getTypeMessage(response, messageid, protoBufVar);

                cc.log("response: " + response + ", messageid:" + messageid);

                if (response != 0) {
                    left_byte_size -= (data_size_block + 2);
                    cc.log("response: " + response + ", messageid:" + messageid);
                    var pair = {
                        message_id: messageid,
                        response: response
                    };
                    listMessages.push(pair);
                    cc.log("list message size: " + listMessages.length);
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

    return listMessages;
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
        // case NetworkManager.EXPIRED_SESSION:
        //     msg = new BINSessionExpiredResponse();
        //     break;
        // case NetworkManager.ENTER_ROOM:
        //     msg = new BINEnterRoomResponse();
        //     break;
        // case NetworkManager.ENTER_GROUP_ROOM:
        //     msg = new BINEnterRoomResponse();
        //     break;
        // case NetworkManager.PLAYER_ENTER_ROOM:
        //     msg = new BINPlayerEnterRoomResponse();
        //     break;
        // case NetworkManager.ENTER_ZONE:
        //     msg = new BINEnterZoneResponse();
        //     break;
        // case NetworkManager.PING:
        //     msg = new BINPingResponse();
        //     break;
        // case NetworkManager.FILTER_ROOM:
        //     msg = new BINFilterRoomResponse();
        //     break;
        // case NetworkManager.START_MATCH:
        //     msg = new BINStartMatchResponse();
        //     break;
        // case NetworkManager.CREATE_ROOM:
        //     msg = new BINCreateRoomResponse();
        //     break;
        // case NetworkManager.TURN:
        //     msg = new BINTurnResponse();
        //     break;
        // case NetworkManager.MATCH_BEGIN:
        //     msg = new BINMatchBeginResponse();
        //     break;
        // case NetworkManager.MATCH_END:
        //     msg = new BINMatchEndResponse();
        //     break;
        // case NetworkManager.PLAYER_EXIT_AFTER_MATCH_END:
        //     msg = new BINPlayerExitAfterMatchEndResponse();
        //     break;
        // case NetworkManager.PLAYER_EXIT_ROOM:
        //     msg = new BINPlayerExitRoomResponse();
        //     break;
        // case NetworkManager.UPDATE_MONEY:
        //     msg = new BINUpdateMoneyResponse();
        //     break;
        // case NetworkManager.EXIT_ROOM:
        //     msg = new BINExitRoomResponse();
        //     break;
        // case NetworkManager.PREPARE_NEW_MATCH:
        //     msg = new BINPrepareNewMatchResponse();
        //     break;
        // case NetworkManager.ROOM_OWNER_CHANGED:
        //     msg = new BINRoomOwnerChangedResponse();
        //     break;
        // case NetworkManager.CANCEL_EXIT_ROOM:
        //     msg = new BINCancelExitAfterMatchEndResponse();
        //     break;
        // case NetworkManager.READY_TO_PLAY:
        //     msg = new BINReadyToPlayResponse();
        //     break;
        // case NetworkManager.UPDATE_USER_INFO:
        //     msg = new BINUpdateUserInfoResponse();
        //     break;
        // case NetworkManager.LOGOUT:
        //     msg = new BINLogoutResponse();
        //     break;
        // case NetworkManager.KICK_USER:
        //     msg = new BINKickPlayerOutResponse();
        //     break;
        // case NetworkManager.LOCK_ROOM:
        //     msg = new BINLockRoomResponse();
        //     break;
        // case NetworkManager.FILTER_TOP_USER:
        //     msg = new BINFilterTopUserResponse();
        //     break;
        // case NetworkManager.FILTER_FRIEND:
        //     msg = new BINFilterFriendResponse();
        //     break;
        // case NetworkManager.ADD_FRIEND:
        //     msg = new BINAddFriendResponse();
        //     break;
        // case NetworkManager.FILTER_ADD_FRIEND:
        //     msg = new BINFilterAddFriendResponse();
        //     break;
        // case NetworkManager.APPROVE_ADD_FRIEND:
        //     msg = new BINApproveAddFriendResponse();
        //     break;
        // case NetworkManager.FIND_USER:
        //     msg = new BINFindUserResponse();
        //     break;
        // case NetworkManager.VIEW_USER_INFO:
        //     msg = new BINViewUserInfoResponse();
        //     break;
        // case NetworkManager.REMOVE_FRIEND:
        //     msg = new BINRemoveFriendResponse();
        //     break;
        // case NetworkManager.CHANGE_RULE:
        //     msg = new BINChangeRuleResponse();
        //     break;
        // case NetworkManager.LOOKUP_MONEY_HISTORY:
        //     msg = new BINLookUpMoneyHistoryResponse();
        //     break;
        // case NetworkManager.SEND_TEXT_EMOTICON:
        //     msg = new BINSendTextEmoticonResponse();
        //     break;
        // case NetworkManager.INSTANT_MESSAGE:
        //     msg = new BINInstantMessageResponse();
        //     break;
        // case NetworkManager.UPDATE_USER_SETTING:
        //     msg = new BINUpdateUserSettingResponse();
        //     break;
        // case NetworkManager.FILTER_MAIL:
        //     msg = new BINFilterMailResponse();
        //     break;
        // case NetworkManager.SEND_MAIL:
        //     msg = new BINSendMailResponse();
        //     break;
        // case NetworkManager.DELETE_MAIL:
        //     msg = new BINDeleteMailResponse();
        //     break;
        // case NetworkManager.READED_MAIL:
        //     msg = new BINReadedMailResponse();
        //     break;
        // case NetworkManager.CLAIM_ATTACH_ITEM:
        //     msg = new BINClaimAttachItemResponse();
        //     break;
        // case NetworkManager.LEVEL_UP:
        //     msg = new BINLevelUpResponse();
        //     break;
        // case NetworkManager.MEDAL_UP:
        //     msg = new BINMedalUpResponse();
        //     break;
        // case NetworkManager.CAPTCHA:
        //     msg = new BINCaptchaResponse();
        //     break;
        // case NetworkManager.PURCHASE_MONEY:
        //     msg = new BINPurchaseMoneyResponse();
        //     break;
        // case NetworkManager.KILL_ROOM:
        //     msg = new BINKillRoomResponse();
        //     break;
        // case NetworkManager.EXIT_ZONE:
        //     msg = new BINExitZoneResponse();
        //     break;
        // case NetworkManager.BET:
        //     msg = new BINBetResponse();
        //     break;
        // case NetworkManager.CHANGE_HOST:
        //     msg = new BINChangeHostResponse();
        //     break;
        // case NetworkManager.EXTRA_BET:
        //     msg = new BINExtraBetResponse();
        //     break;
        // case NetworkManager.HOST_REGISTRATION:
        //     msg = new BINHostRegistrationResponse();
        //     break;
        // case NetworkManager.LOOKUP_USER_TO_INVITE:
        //     msg = new BINLookUpUserToInviteResponse();
        //     break;
        // case NetworkManager.INVITE_TO_ROOM:
        //     msg = new BINInviteToRoomResponse();
        //     break;
        // case NetworkManager.CANCEL_INVITE:
        //     msg = new BINCancelInvitationResponse();
        //     break;
        // case NetworkManager.RELY_INVITE:
        //     msg = new BINRelyInvitationResponse();
        //     break;
        // case NetworkManager.REDEEM_GIFT_CODE:
        //     msg = new BINRedeemGiftCodeResponse();
        //     break;
        // case NetworkManager.REDEEM_GIFT_CODE_HISTORY:
        //     msg = new BINRedeemGiftCodeHistoryResponse();
        //     break;
        // case NetworkManager.ASSET_CONFIG:
        //     msg = new BINAssetConfigResponse();
        //     break;
        // case NetworkManager.EXCHANGE_ASSET:
        //     msg = new BINExchangeAssetResponse();
        //     break;
        // case NetworkManager.EXCHANGE_CASH_TO_GOLD:
        //     msg = new BINExchangeCashToGoldResponse();
        //     break;
        // case NetworkManager.EXCHANGE_ASSET_HISTORY:
        //     msg = new BINExchangeAssetHistoryResponse();
        //     break;
        // case NetworkManager.PURCHASE_CASH_HISTORY:
        //     msg = new BINPurchaseCashHistoryResponse();
        //     break;
        // case NetworkManager.EXCHANGE_GOLD_HISTORY:
        //     msg = new BINExchangeGoldHistoryResponse();
        //     break;
        // case NetworkManager.SMS_CONFIG:
        //     msg = new BINSmsConfigResponse();
        //     break;
        // case NetworkManager.USER_VERIFY_CONFIG:
        //     msg = new BINUserVerifyConfigResponse();
        //     break;
        // case NetworkManager.USER_VERIFY:
        //     msg = new BINUserVerifyResponse();
        //     break;
        // case NetworkManager.CASH_TRANSFER:
        //     msg = new BINCashTransferResponse();
        //     break;
        // case NetworkManager.CASH_TRANSFER_CONFIG:
        //     msg = new BINCashTransferConfigResponse();
        //     break;
        // case NetworkManager.RESET_PASSWORD:
        //     msg = new BINResetPasswordResponse();
        //     break;
        // case NetworkManager.FIND_USER_BY_ID:
        //     msg = new BINFindUserByIdResponse();
        //     break;
        // case NetworkManager.EXCHANGE_C2G_CONFIG:
        //     msg = new BINExchangeC2GConfigResponse();
        //     break;
        // case NetworkManager.CARD_CONFIG:
        //     msg = new BINCardConfigResponse();
        //     break;
        // case NetworkManager.HEAD_LINE:
        //     msg = new BINHeadLineResponse();
        //     break;
        // case NetworkManager.EMERGENCY_NOTIFICATION:
        //     msg = new BINEmergencyNotificationResponse();
        //     break;
        // case NetworkManager.LUCKY_WHEEL_CONFIG:
        //     msg = new BINLuckyWheelConfigResponse();
        //     break;
        // case NetworkManager.BUY_TURN:
        //     msg = new BINBuyTurnResponse();
        //     break;
        // case NetworkManager.JAR_REQUEST:
        //     msg = new BINJarResponse();
        //     break;
        // case NetworkManager.LOOKUP_GAME_HISTORY:
        //     msg = new BINLookUpGameHistoryResponse();
        //     break;
        // case NetworkManager.IAP_CONFIG:
        //     msg = new BINIAPConfigResponse();
        //     break;
        // case NetworkManager.IAP_FINISH:
        //     msg = new BINCompleteIAPResponse();
        //     break;
        // case NetworkManager.GOLD_CONFIG:
        //     msg = new BINGoldConfigResponse();
        //     break;
        // case NetworkManager.PURCHASE_GOLD:
        //     msg = new BINPurchaseGoldResponse();
        //     break;
        // case NetworkManager.USER_STATUS:
        //     msg = new BINUserStatusResponse();
        //     break;
        default:
            msg = 0;
            break;
    }
    return msg;
}

var getPingMessageFromServer = function(disconnect_time) {
    var request = initPingMessage(disconnect_time);
    var size;
    var ackBuf = initData(request, 1,
        NetworkManager.PING, "", size);

    // if (!_isPing) {
    //     std::thread *t = new std::thread(&NetworkManager::sendPing, this, ackBuf, size);
    //     if (t->joinable())
    //         t->detach();
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
    var request = new BINEnterZoneRequest();
    request.setZoneId(zoneId);
    requestMessage(request, getOS(),NetworkManager.ENTER_ZONE, getSessionId());
}

// var getFilterRoomMessageFromServer = function(zone_id, roomType,
//     int first_result, int max_result, int orderByField, bool asc) {
//     google::protobuf::Message *request = initFilterRoomMessage(zone_id,
//         roomType, first_result, max_result, orderByField, asc);
//     requestMessage(request, Common::getInstance()->getOS(),
//         NetworkManager::FILTER_ROOM, Common::getInstance()->getSessionId());
// }