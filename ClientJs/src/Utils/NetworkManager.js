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
    // var ProtoBuf = dcodeIO.ProtoBuf;
    // var InitializeBuilder = ProtoBuf.newBuilder();
    //
    // ProtoBuf.loadProtoFile('res/protobuf/initialize.proto', null, InitializeBuilder);
    // var initialize = InitializeBuilder.build('bigkenInitialize');

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

    cc.log(testProto.encode());

    // var initializeSetData = new initialize.BINInitializeRequest();
    // initializeSetData.cp = cp;
    // initializeSetData.appVersion = appversion;
    // initializeSetData.deviceId = device_id;
    // initializeSetData.deviceInfo = device_info;
    // initializeSetData.country = country;
    // initializeSetData.language = language;
    // initializeSetData.pakageName = pakageName;

    // var encoded = initializeSetData.encode();
    // encoded.printDebug();
    //
    // var unencoded = initialize.BINInitializeRequest.decode(encoded);
    // cc.log(unencoded.data);
    // prints 'Hello World'

    // return initializeSetData;

    // var ByteBuffer = dcodeIO.ByteBuffer;
    //
    // var bb = new ByteBuffer()
    //     .writeIString(initializeSetData)
    //     .flip();
    var str = testProto.encode();
    // cc.log(bb.readIString()+" from bytebuffer.js");

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

    // var ProtoBuf = dcodeIO.ProtoBuf;
    // var GameInfoBuilder = ProtoBuf.newBuilder();
    //
    // ProtoBuf.loadProtoFile('res/protobuf/login.proto', null, GameInfoBuilder);
    // var Testing = GameInfoBuilder.build('bigkenLogin');
    //
    // cc.log("Testing", Testing);
    //
    // var test = new Testing.BINLoginRequest();
    // test.userName = 'tu_atula';
    // test.password = 'Buianhtu304!@#';
    //
    // // cc.log("test = ", test);
    //
    // var encoded = test.encode();
    // encoded.printDebug();
    //
    // var unencoded = Testing.BINLoginRequest.decode(encoded);
    // cc.log("data = ", unencoded.data);
    // prints 'Hello World'

    // var ProtoBuf = dcodeIO.ProtoBuf,
    //     LoginProtobuf = ProtoBuf.loadProtoFile('src/protobufObject/login.proto').build('bigkenLogin'),
    //     LoginProto = LoginProtobuf.BINLoginRequest;
    // cc.log("LoginProto:", LoginProto);
    // var loginProto = new LoginProto({
    //     userName: username,
    //     password: password
    // });

    var LoginProto = {
        userName: username,
        password: password
    }

    return LoginProto;
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
    // var ackBuf = 152375680;
    //call websocket
    // std::thread *t = new std::thread(&NetworkManager::callNetwork, this, ackBuf, size);
    // var t = new cc.thread(callNetwork, this, ackBuf, size);
    // var t = callNetwork(request, os, message_id, session_id, size);
    var t = callNetwork(ackBuf, size);

    return t;

    // if (t->joinable())
    //     t->detach();
}

var initData = function(request, os, messid, _session, len)
{

    var lenSession = 0;

    if(_session != null){
        lenSession = _session.length;
    }

    var ByteBuffer = dcodeIO.ByteBuffer;
    var bb = new ByteBuffer(request.capacity() + 11 + lenSession);

    // var osByte = bb.writeInt32(os,0);
    bb.writeInt32(os,0);

    // cc.log("osByte =  " + bb.toDebug());

    var dataSize = request.capacity() + 4;

    // var dataSizeByte = bb.writeInt32(dataSize,4);
    bb.writeInt32(dataSize,4);

    // cc.log("dataSizeByte =  " + bb.toDebug());

    // var char_len_session = bb.writeInt16(lenSession, 2);
    bb.writeInt16(lenSession, 2);

    // cc.log("char_len_session =  " + bb.toDebug());

    // cc.log("os:", os,", message id: ",messid);
    // var messidByte = bb.writeInt32(messid, 2);
    bb.writeInt32(messid, 2);

    // var sessionByte = bb.writeUTF8String("test", 16);

    // cc.log("sessionByte:", sessionByte);

    // bb.toString(request, request.capacity(), request.capacity() + 11 + lenSession);

    cc.log("ackBuf = ", bb.toDebug());

    return bb;

}

var callNetwork = function(ackBuf, size) {
    cc.log("callNetwork");
    //call websocket
    try {
        var url = "ws://"+SERVER_NAME+":"+SERVER_PORT+"/"+PATH;
        // var url = "ws://192.168.100.32:1280/bigken";
        cc.log("url =", url);
        ws = new WebSocket(url);

        ws.onopen = function() {
            cc.log("send");
            ws.send(ackBuf, size);

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

        };
    } catch (e) {
        console.error('Sorry, the web socket at "%s" is un-available', url);
    }

    // mtx.lock();
    //
    // if (!isConnected()) {
    //     NetworkManager::getInstance()->connectServer(SERVER_NAME, SERVER_PORT);
    // }
    //
    // mtx.unlock();
    //
    // DefaultSocket::getInstance()->sendData(ackBuf, size);
    // sleep(NetworkManager::SEND_MESSAGE_DELAY);

    return true;
}

function str2ab(str) {
    // cc.log("str = ", str.length);
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    // cc.log("bufView", bufView);
    for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    // cc.log("buf", bufView);
    return bufView;
}

function int2ab(number) {
    var str = number.toString();
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return bufView;
}

function toArrayBuffer(buf) {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        view[i] = buf[i];
    }
    return ab;
}
