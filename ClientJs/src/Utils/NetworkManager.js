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

var getLoginMessageFromServer = function(username, password)
{
    cc.log("getLoginMessageFromServer");
    var request = initLoginMessage(username, password);

    cc.log("initLoginMessage", request);

    var requestMessage = requestMessageFunc(request, 2, NetworkManager.LOGIN, "");

    return requestMessage;
}

var initLoginMessage = function(username, password) {
    cc.log("initLoginMessage");

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
var requestMessageFunc = function(request, os, message_id, session_id) {
    cc.log("requestMessage");
    var size = 32;

    // if (message_id != NETWORK.INITIALIZE && message_id != NETWORK.TURN
    //     && message_id != NETWORK.INSTANT_MESSAGE && message_id != NETWORK.LOOKUP_MONEY_HISTORY
    //     && message_id != NETWORK.FILTER_MAIL && message_id != NETWORK.BET  && message_id != NETWORK.FILTER_FRIEND) {
    //     LoadingManager::getInstance()->showLoading();
    //     cocos2d::Director::getInstance()->getEventDispatcher()->setEnabled(false);
    // }

    // var ackBuf = initData(request, os, message_id, session_id, size);
    var ackBuf = 163572080;
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
    // std::vector<char> bytes(_session.begin(), _session.end());
    var bytes = [ _session ];
    bytes.push('\0');
    // //N byte session
    var session = bytes[0];
    //2 byte lenSession
    var lenSession = session.length;
    cc.log("session:", session);
    var size = request.size + 11 + lenSession;
    var ackBuf = new char[size];

    var arrayOut = new ArrayOutputStream(ackBuf, size);
    var codedOut = new CodedOutputStream(arrayOut);

    var buf = new char[1];
    buf[0] = os;
    codedOut.WriteRaw(buf, 1); //write os
    var dataSize = new char[4];
    //data size: protobuf + eot + messageid

    var data_size = request.byteLength + 4;
    dataSize[0] = (data_size >> 24) & 0xFF;
    dataSize[1] = (data_size >> 16) & 0xFF;
    dataSize[2] = (data_size >> 8) & 0xFF;
    dataSize[3] = (data_size >> 0) & 0xFF;

    //4 byte data size
    codedOut.WriteRaw(dataSize, 4);
    //write data size
    var char_len_session = new char[2];
    char_len_session[0] = (lenSession >> 8) & 0xFF;
    char_len_session[1] = (lenSession >> 0) & 0xFF;
    //2 byte length session
    codedOut.WriteRaw(char_len_session, 2);
    //n byte session
    codedOut.WriteRaw(session, lenSession);
    // loginRequest->SerializeToCodedStream(&codedOut);
    //2 byte messid
    var mid = new char[2];
    mid[0] = (messid >> 8) & 0xFF;
    mid[1] = (messid >> 0) & 0xFF;

    codedOut.WriteRaw(mid, 2);
    //protobuf
    // request.SerializeToCodedStream(codedOut);
    request.XMLSerializer(codedOut);

    /*char *eot = new char[2];
     eot[0] = '\r';
     eot[1] = '\n';*/

    codedOut.WriteRaw("\r\n", 2);
    len = size;
    return ackBuf;

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
