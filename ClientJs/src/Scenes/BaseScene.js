/**
 * Created by MyPC on 12/12/2016.
 */
var visibleSize = cc.size(1280,768);//cc.director.getVisibleSize();
var width = visibleSize.width;
var height = visibleSize.height;

var origin = cc.director.getVisibleOrigin();
var originX = origin.x;
var originY = origin.y;

var ZERO = cc.p(0.0, 0.0);
var ONE = cc.p(1.0, 1.0);
var UNIT_X= cc.p(1.0, 0.0);
var UNIT_Y= cc.p(0.0, 1.0);
var ANCHOR_MIDDLE= cc.p(0.5, 0.5);
var ANCHOR_BOTTOM_LEFT= cc.p(0.0, 0.0);
var ANCHOR_TOP_LEFT= cc.p(0.0, 1.0);
var ANCHOR_BOTTOM_RIGHT= cc.p(1.0, 0.0);
var ANCHOR_TOP_RIGHT= cc.p(1.0, 1.0);
var ANCHOR_MIDDLE_RIGHT= cc.p(1.0, 0.5);
var ANCHOR_MIDDLE_LEFT= cc.p(0.0, 0.5);
var ANCHOR_MIDDLE_TOP= cc.p(0.5, 1.0);
var ANCHOR_MIDDLE_BOTTOM= cc.p(0.5, 0.0);

cc.log("ox/oy:" + originX + "/" +originY);

var MVec2 = function (x,y) {
    return cc.p(originX+x, originY+y);
}

var Vec2 = function (x,y) {
    return cc.p(x, y);
}

var BaseScene_connect = function() {
    if (isConnected()) {
        closeConnection();
    }
    // if(ws.readyState === ws.OPEN){
        setConnected(true);
    // }
    // connect();

    if (isConnected()) {
        // if(ws.readyState === ws.OPEN){
            getInitializeMessageFromServer(getCp(), getVersionCode(), getDeviceId(), getDeviceInfo(), getCountry(), getLanguage(), getPackageName());
        // }
        // getPingMessageFromServer(0);
    } else {
        // var scene = cocos2d::Director::getInstance()->getRunningScene();
        // if(scene->getChildByTag(TAG_POPUP_RECONNECT) == nullptr){
        //     auto reconnect = PopupReconnect::create();
        //     scene->addChild(reconnect);
        //     reconnect->showPopup();
        // }else{
        //     auto reconnect = (PopupReconnect*)scene->getChildByTag(TAG_POPUP_RECONNECT);
        //     reconnect->showPopup();
        // }
    }
}

//global
var initConnect = function () {
    //check if connected
    if(isConnected()){
        closeConnection();
    }

    setConnected(true);

    if (isConnected()) {
        if(ws.readyState === ws.OPEN){
            getInitializeMessageFromServer(getCp(), getVersionCode(), getDeviceId(), getDeviceInfo(), getCountry(), getLanguage(), getPackageName());
            // ws.send(ackBuf);
        }
        // getPingMessageFromServer(0);
    } else {
        // var scene = cocos2d::Director::getInstance()->getRunningScene();
        // if(scene->getChildByTag(TAG_POPUP_RECONNECT) == nullptr){
        //     auto reconnect = PopupReconnect::create();
        //     scene->addChild(reconnect);
        //     reconnect->showPopup();
        // }else{
        //     auto reconnect = (PopupReconnect*)scene->getChildByTag(TAG_POPUP_RECONNECT);
        //     reconnect->showPopup();
        // }
    }
}

var goToIntroScene = function() {
    var scene = new IntroScene();
    cc.director.runScene(scene);
}

var goGame = function() {
    cc.log("gogame");
    // if (getGameState() == GAME_STATE.INTRO) {
    //     var scene = new LoginScene();
        cc.director.runScene(new LoginScene());
    // }
    // else {
    //     sendPingAndReceiveMessage(
    //         getDisconnectedTime());
    // }
}



// var
