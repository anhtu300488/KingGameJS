/**
 * Created by MyPC on 12/12/2016.
 */
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
    EPS : 1000
}

var getInitializeMessageFromServer = function(cp, appversion , country, language, device_id, device_info, pakageName) {
    cc.log("getInitializeMessageFromServer");
    var request = initInitializeMessage(cp, appversion, country, language, device_id, device_info, pakageName);

    cc.log("request = ", request);

    var requestMess = requestMessage(request, 2, NetworkManager.INITIALIZE, "");

    return requestMess;
}

var initInitializeMessage = function(cp, appversion, country, language, device_id, device_info, pakageName) {

    var ProtoBuf = dcodeIO.ProtoBuf,
        TestProtobuf = ProtoBuf.loadProtoFile('res/protobuf/initialize.proto').build('bigkenInitialize'),
        TestProto = TestProtobuf.BINInitializeRequest;

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

    var requestMess = requestMessage(request, 2, NetworkManager.LOGIN, "");

    return requestMess;
}

var initLoginMessage = function(username, password) {
    cc.log("initLoginMessage");

    var ProtoBuf = dcodeIO.ProtoBuf,
        LoginProtobuf = ProtoBuf.loadProtoFile('res/protobuf/login.proto').build('bigkenLogin'),
        LoginProto = LoginProtobuf.BINLoginRequest;
    cc.log("LoginProto:", LoginProto);
    var loginProto = new LoginProto({
        userName: username,
        password: password
    });

    return loginProto.encode();
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
    cc.log("buffer = ", ackBuf);

    var t = callNetwork(ackBuf);

    return t;
}

var initData = function(request, os, messid, _session, len)
{
    var lenSession = 0;

    if(_session != null){
        lenSession = _session.length;
    }

    var ByteBuffer = dcodeIO.ByteBuffer;
    var size = request.capacity() + 11 + lenSession;
    var bb = new ByteBuffer(size);

    var _offset = 0;

    bb.writeInt8(os, _offset);
    _offset++;


    var dataSize = request.capacity() + 4;

     bb.writeInt32(dataSize, _offset);
     _offset+= 4;

    // cc.log("bb =  " + bb.toDebug());

    bb.writeInt16(lenSession, _offset);
    _offset+= 2;

    var sessionByte = bb.writeUTF8String(_session, _offset);
    _offset+= lenSession;

    bb.writeInt16(messid, _offset);
    _offset+= 2;

    //insert request into bytebuffer

    bb.append(request, "", _offset);
    _offset+= request.capacity();

    var endParam = "\r\n";

    bb.writeUTF8String(endParam, _offset);


    return bb.toString("binary");

}

var callNetwork = function(ackBuf) {
    cc.log("callNetwork");
    //call websocket
    try {
        var url = "ws://"+SERVER_NAME+":"+SERVER_PORT+"/"+PATH;
        // var url = "ws://192.168.100.32:1280/bigken";
        ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";
        cc.log("url", url);
        ws.onopen = function() {
            cc.log("send");
            ws.send(ackBuf);
        };
        ws.onmessage = function (e) {
            console.log("app->srv.ws.onmessage():"+e.data);
            if(e.data!==null || e.data !== 'undefined')
            {
                // var jsonFromClient = Decode(e.data);
                // if(jsonFromClient.event === Events.LOGIN_DONE)
                // {
                //     enterWorldScene = new EnterWorldScene(jsonFromClient);
                //     cc.director.runScene(enterWorldScene);
                // }
                cc.director.runScene(new ShowGameScene());
            }
        };
        ws.onclose = function (e) {

        };
        ws.onerror = function (e) {
            cc.log("error: ", e);
        };
    } catch (e) {
        cc.log("error: ", e);
        cc.error('Sorry, the web socket at "%s" is un-available', url);
    }
}
