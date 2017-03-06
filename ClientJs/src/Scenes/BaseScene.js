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

var MVec2 = function (x,y) {
    return cc.p(originX+x, originY+y);
}

var Vec2 = function (x,y) {
    return cc.p(x, y);
}

// var BaseScene_connect = function() {
//     if (isConnected()) {
//         closeConnection();
//     }
//     // if(ws.readyState === ws.OPEN){
//         setConnected(true);
//     // }
//     // connect();
//
//     if (isConnected()) {
//         // if(ws.readyState === ws.OPEN){
//             getInitializeMessageFromServer(getCp(), getVersionCode(), getDeviceId(), getDeviceInfo(), getCountry(), getLanguage(), getPackageName());
//         // }
//         // getPingMessageFromServer(0);
//     } else {
//         // var scene = cocos2d::Director::getInstance().getRunningScene();
//         // if(scene.getChildByTag(TAG_POPUP_RECONNECT) == nullptr){
//         //     auto reconnect = PopupReconnect::create();
//         //     scene.addChild(reconnect);
//         //     reconnect.showPopup();
//         // }else{
//         //     auto reconnect = (PopupReconnect*)scene.getChildByTag(TAG_POPUP_RECONNECT);
//         //     reconnect.showPopup();
//         // }
//     }
// }
//
// //global
// var initConnect = function () {
//     //check if connected
//     if(isConnected()){
//         closeConnection();
//     }
//
//     setConnected(true);
//
//     if (isConnected()) {
//         if(ws.readyState === ws.OPEN){
//             var ackBuf = getInitializeMessageFromServer(getCp(), getVersionCode(), getDeviceId(), getDeviceInfo(), getCountry(), getLanguage(), getPackageName());
//             doSend(ackBuf);
//         }
//         // getPingMessageFromServer(0);
//     } else {
//         // var scene = cocos2d::Director::getInstance().getRunningScene();
//         // if(scene.getChildByTag(TAG_POPUP_RECONNECT) == nullptr){
//         //     auto reconnect = PopupReconnect::create();
//         //     scene.addChild(reconnect);
//         //     reconnect.showPopup();
//         // }else{
//         //     auto reconnect = (PopupReconnect*)scene.getChildByTag(TAG_POPUP_RECONNECT);
//         //     reconnect.showPopup();
//         // }
//     }
// }
//
// var goToIntroScene = function() {
//     var scene = new IntroScene();
//     cc.director.runScene(scene);
// }
//
// var goGame = function() {
//     cc.log("gogame");
//     // if (getGameState() == GAME_STATE.INTRO) {
//     //     var scene = new LoginScene();
//         cc.director.runScene(new LoginScene());
//     // }
//     // else {
//     //     sendPingAndReceiveMessage(
//     //         getDisconnectedTime());
//     // }
// }
//
// var initialMessageResponseHandler = function(initialMessage) {
//     // if(listMessages.length > 0){
//     //     for(i = 0; i < listMessages.length; i++){
//     //         if(listMessages[i].message_id == NetworkManager.INITIALIZE){
//     //             initialMessage = listMessages[i].response;
//     if (initialMessage != 0) {
//         // setInitialize(initialMessage.responseCode);
//         common.initialize = initialMessage.responseCode;
//         if (initialMessage.responseCode) {
//             // setEnablePurchaseCash(initialMessage.enablePurchaseCash);
//             common.enablePurchaseCash = initialMessage.enablePurchaseCash;
//             // setEnableTopup(initialMessage.enableTopup);
//             common.enableTopup = initialMessage.enableTopup;
//             var serverAppVersion = initialMessage.currentAppVersion;
//             // setServerAppVersion(serverAppVersion);
//             common.serverAppVersion = serverAppVersion;
//             // setFanpageUrl(initialMessage.fanpageUrl);
//             common.fanpageUrl = initialMessage.fanpageUrl;
//             // setWebsiteUrl(initialMessage.websiteUrl);
//             common.websiteUrl = initialMessage.websiteUrl;
//             var hotlines = [];
//             cc.log("hotline size", initialMessage.hotlines.length);
//             for (i = 0; i < initialMessage.hotlines.length; i++){
//                 hotlines.push(initialMessage.hotlines[i]);
//             }
//
//
//             // setHotLines(hotlines);
//             common.hotLines = hotlines;
//             // setEnableCashToGold(initialMessage.enableCashToGold);
//             common.enableCashToGold = initialMessage.enableCashToGold;
//             // setCashToGoldRatio(initialMessage.cashToGoldRatio);
//             common.cashToGoldRatio = initialMessage.cashToGoldRatio;
//             // setEnableQuickPlay(initialMessage.enableQuickPlay);
//             common.enableQuickPlay = initialMessage.enableQuickPlay;
//             // setEnableCashTranfer(initialMessage.enableCashTransfer);
//             common.enableCashTransfer = initialMessage.enableCashTransfer;
//             // setEnableGiftCode(initialMessage.enableGiftCode);
//             common.enableGiftCode = initialMessage.enableGiftCode;
//             // setResetPwSmsSyntax(initialMessage.resetPwSmsSyntax);
//             common.resetPwSmsSyntax = initialMessage.resetPwSmsSyntax;
//             /*Set enable game ids*/
//             var _gameIds = [];
//             for (i = 0; i < initialMessage.enableGameIds.length; i++) {
//                 _gameIds.push(initialMessage.enableGameIds[i]);
//             }
//             // setEnableGameIds(_gameIds);
//             common.enableGameIds = _gameIds;
//
//             var app_version = getVersionCode();
//
//             // if (app_version < serverAppVersion) {
//             //     class InitializeOnEventListener : public OnEvenListener<BINInitializeResponse*> {
//             //         public:
//             //             void onEvent(int eventType, BINInitializeResponse* sender) override {
//             //         if (eventType == OnEvenListener::EVENT_CONFIRM_OK) {
//             //             Common::getInstance().openUrl(url);
//             //         }
//             //         else if (eventType == OnEvenListener::EVENT_CANCEL_CONFIRM) {
//             //             BaseScene::goGame();
//             //         }
//             //     };
//             //     void onEventClickMessageBox(int enventType) override {
//             //
//             //     };  //su kien khi an vao nut ok cua popupm essage box
//             //
//             //     void setUrl(string url) { this.url = url; }
//             //     private:
//             //         string url;
//             // } *b = new InitializeOnEventListener();
//             //     b.setUrl(init_response.downloadurl());
//             //     bool force_update = init_response.forceupdate();
//             //     if (force_update) {
//             //         Common::getInstance().setForceUpdate(true);
//             //         NodeConfirm<BINInitializeResponse*> *nodeConfirm =
//             //             NodeConfirm<BINInitializeResponse*>::create(b, "Cập nhật",
//             //                 init_response.message(),
//             //                 NodeConfirm<BINInitializeResponse*>::MESSAGEBOX_TYPE);
//             //         nodeConfirm.setSender(init_response);
//             //         nodeConfirm.showDlg();
//             //         return;
//             //     }
//             //     else {
//             //         Common::getInstance().setUpdateMessage(init_response.message());
//             //     }
//             // }
//             goGame();
//             //restore session
//         }else {
//             // PopupMessageBox* popupMessage = new PopupMessageBox();
//             // popupMessage.showPopup(init_response.message());
//         }
//     }
//     //         }
//     //     }
//     // }
// }

var BaseLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.init();

        return true;
    },
    init: function(){
        // if(!Layer::init()) {
        //     return false;
        // }

        common.intro = false;
        var _visibleSize = cc.director.getVisibleSize();
        visibleSize = _visibleSize;
        width = _visibleSize.width;
        height = _visibleSize.height;

        var _origin = cc.director.getVisibleOrigin();
        origin = _origin;
        originX = _origin.x;
        originY = _origin.y;

        // ws.onmessage = this.ongamestatus.bind(this);

        // this.scheduleUpdate();
        return true;
    },
    // showToast: function(message, duration) {
    //     this.removeChildByTag(TAG_TOAST);
    //
    //     //show toast moi
    //     MToast* mToast = MToast::create();
    //     mToast.setTag(TAG_TOAST);
    //     mToast.setPosition(MVec2(width/2,height*0.5));
    //     mToast.show(message, duration);
    //     mToast.setLocalZOrder(INDEX_TOAST);
    //     this.addChild(mToast);
    // },
    // showMessageChat: function(emoticonId, message, avatar, duration){
    //     MChat* mChat = MChat::create();
    //     mChat.getBackground().setAnchorPoint(Vec2(0, 0));
    //     Vec2 posMessageChat;
    //     int positionIndex = avatar.getPositionIndex();
    //     auto common = Common::getInstance();
    //     if (emoticonId == 0){
    //         //ban choi 4 cho
    //         if (common.getZoneId() == Common::TIENLENMIENNAM_ZONE || common.getZoneId() == Common::PHOM_ZONE
    //             || common.getZoneId() == Common::MAUBINH_ZONE) {
    //             if (positionIndex == 3 || positionIndex == 2){
    //                 mChat.getBackground().setAnchorPoint(Point::ANCHOR_TOP_LEFT);
    //             }
    //             else if (positionIndex == 0) {
    //                 mChat.getBackground().setAnchorPoint(Point::ANCHOR_BOTTOM_LEFT);
    //             }
    //             else {
    //                 mChat.getBackground().setAnchorPoint(Point::ANCHOR_TOP_RIGHT);
    //             }
    //         }
    //         else { //ban choi 8 hoac 10 cho
    //             if (positionIndex == 1 || positionIndex == 0){
    //                 mChat.getBackground().setAnchorPoint(Point::ANCHOR_BOTTOM_LEFT);
    //             }
    //             else if (positionIndex == 9 || positionIndex == 8 || positionIndex == 7 || positionIndex == 6){
    //                 mChat.getBackground().setAnchorPoint(Point::ANCHOR_TOP_LEFT);
    //             }
    //             else {
    //                 mChat.getBackground().setAnchorPoint(Point::ANCHOR_TOP_RIGHT);
    //             }
    //         }
    //
    //         posMessageChat = Vec2(avatar.getPosition().x + avatar.avatar.getWidth() / 2, avatar.getPosition().y
    //             + avatar.avatar.getHeight() / 2);
    //
    //         mChat.setPosition(posMessageChat);
    //         mChat.initParams();
    //         mChat.showWithWrap(message, duration);
    //         this.addChild(mChat, INDEX_MSG_CHAT);
    //     }
    //     else {
    //         MSprite* emoticon = MSprite::create(StringUtils::format("chat/emoticon/%02d.png", emoticonId));
    //         emoticon.setPosition(Vec2(avatar.getPosition().x + avatar.avatar.getWidth() / 2 - emoticon.getWidth()/2, avatar.getPosition().y
    //             + avatar.avatar.getHeight() / 2 - emoticon.getHeight()/2));
    //         this.addChild(emoticon, INDEX_MSG_CHAT);
    //
    //         //hieu ung chuyen dong
    //         ActionInterval *vibrateAction = Sequence::create(MoveBy::create(0.4f, Vec2(0, 10)), MoveBy::create(0.4f, Vec2(0, -10)), NULL);
    //         auto repeateVibrate = Repeat::create(vibrateAction, 3);
    //
    //         emoticon.runAction(Sequence::create(repeateVibrate, FadeOut::create(1.0f),
    //         RemoveSelf::create(), NULL));
    //     }
    // },
    removeOutTablePlay: function(avatar){
        this.removeChild(avatar, true);
    },
    onExit: function() {
        this._super();
    },
    // closeApp: function(){
    //     NetworkManager::getInstance().closeConnection();
    //     #if (CC_TARGET_PLATFORM == CC_PLATFORM_WINRT) || (CC_TARGET_PLATFORM == CC_PLATFORM_WP8)
    //             cocos2d::MessageBox("You pressed the close button. Windows Store Apps do not implement a close button.", "Alert");
    //     #else
    //             Director::getInstance().end();
    //     #if (CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
    //                 exit(0);
    //     #endif
    //     #endif
    // },
    initialMessageResponseHandler: function(initialMessage) {
        cc.log("initialMessage", initialMessage);
        if (initialMessage != 0) {
            common.initialize = initialMessage.responseCode;
            if (initialMessage.responseCode) {
                common.enablePurchaseCash = initialMessage.enablePurchaseCash;
                common.enableTopup = initialMessage.enableTopup;
                var serverAppVersion = initialMessage.currentAppVersion;
                common.serverAppVersion = serverAppVersion;
                common.fanpageUrl = initialMessage.fanpageUrl;
                common.websiteUrl = initialMessage.websiteUrl;
                var hotlines = [];
                cc.log("hotline size", initialMessage.hotlines.length);
                for (i = 0; i < initialMessage.hotlines.length; i++){
                    hotlines.push(initialMessage.hotlines[i]);
                }

                common.hotLines = hotlines;
                common.enableCashToGold = initialMessage.enableCashToGold;
                common.cashToGoldRatio = initialMessage.cashToGoldRatio;
                common.enableQuickPlay = initialMessage.enableQuickPlay;
                common.enableCashTransfer = initialMessage.enableCashTransfer;
                common.enableGiftCode = initialMessage.enableGiftCode;
                common.resetPwSmsSyntax = initialMessage.resetPwSmsSyntax;
                /*Set enable game ids*/
                var _gameIds = [];
                for (i = 0; i < initialMessage.enableGameIds.length; i++) {
                    _gameIds.push(initialMessage.enableGameIds[i]);
                }
                // setEnableGameIds(_gameIds);
                common.enableGameIds = _gameIds;

                var app_version = getVersionCode();

                // if (app_version < serverAppVersion) {
                //     class InitializeOnEventListener : public OnEvenListener<BINInitializeResponse*> {
                //         public:
                //             void onEvent(int eventType, BINInitializeResponse* sender) override {
                //         if (eventType == OnEvenListener::EVENT_CONFIRM_OK) {
                //             Common::getInstance().openUrl(url);
                //         }
                //         else if (eventType == OnEvenListener::EVENT_CANCEL_CONFIRM) {
                //             BaseScene::goGame();
                //         }
                //     };
                //     void onEventClickMessageBox(int enventType) override {
                //
                //     };  //su kien khi an vao nut ok cua popupm essage box
                //
                //     void setUrl(string url) { this.url = url; }
                //     private:
                //         string url;
                // } *b = new InitializeOnEventListener();
                //     b.setUrl(init_response.downloadurl());
                //     bool force_update = init_response.forceupdate();
                //     if (force_update) {
                //         Common::getInstance().setForceUpdate(true);
                //         NodeConfirm<BINInitializeResponse*> *nodeConfirm =
                //             NodeConfirm<BINInitializeResponse*>::create(b, "Cập nhật",
                //                 init_response.message(),
                //                 NodeConfirm<BINInitializeResponse*>::MESSAGEBOX_TYPE);
                //         nodeConfirm.setSender(init_response);
                //         nodeConfirm.showDlg();
                //         return;
                //     }
                //     else {
                //         Common::getInstance().setUpdateMessage(init_response.message());
                //     }
                // }
                this.goGame();
                //restore session
            }else {
                // PopupMessageBox* popupMessage = new PopupMessageBox();
                // popupMessage.showPopup(init_response.message());
            }
        }
    },
    goGame: function() {
        cc.log("common.gameState", common.gameState);
        if (common.gameState == GAME_STATE.INTRO) {
            var scene = new LoginScene();
            cc.director.runScene(scene);
        }
        else {
            // NetworkManager::getInstance().sendPingAndReceiveMessage(
            //     (int)NetworkManager::getInstance().getDisconnectedTime());
        }
    },
    update: function(delta) {
        if(listMessages.length > 0) {
            for (i = 0; i < listMessages.length; i++) {
                if (listMessages[i].message_id == NetworkManager.INITIALIZE) {
                    initialMessage = listMessages[i].response;

                    this.initialMessageResponseHandler(initialMessage);
                    if(listMessages.length == 1){
                        listMessages.length = 0;
                    } else {
                        listMessages.splice(i, 1);
                    }
                }
            }
        }
        // this.initialMessageResponseHandler();

        // BINPingResponse *pingresponse = (BINPingResponse*)Common::getInstance().checkEvent(NetworkManager::PING);
        // if (pingresponse != 0) {
        //     CCLOG("ping response: %s", pingresponse.DebugString().c_str());
        //     if (pingresponse.disconnect()) {
        //         cocos2d::UserDefault::getInstance().deleteValueForKey(Common::getInstance()
        //             .KEY_SESSION_ID);
        //         Common::getInstance().setSessionId("-1");
        //         this.showToast(pingresponse.message().c_str(), 2);
        //         //close connection
        //         if (NetworkManager::getInstance().isConnected())
        //             NetworkManager::getInstance().closeConnection();
        //         this.scheduleOnce(schedule_selector(BaseScene::goToIntroScene), 2.0f);
        //     }
        //     else {
        //         //TODO:SangLX
        //     }
        // }
        //
        // getEmergencyNotificationResponse();
        //
        // //level up
        // levelResponseHandler();
        //
        // //huy chuong up
        // medalResonseHandler();
        //
        // getIapCompleteResponse();
        //
        // if (this.getChildByTag(POPUP_TAG_USERINFOR) == nullptr){
        //     getUserVerifyResponse();
        // }
    },
    // getUserVerifyResponse: function(){
    //     BINUserVerifyResponse* response = (BINUserVerifyResponse *)Common::getInstance().checkEvent(NetworkManager::USER_VERIFY);
    //     if (response != 0) {
    //         CCLOG("user verify response: %s", response.DebugString().c_str());
    //         if (response.responsecode()){
    //             Common::getInstance().setAccountVerify(response.userverified()); //xet lai trang thai da xac thuc tai khoan
    //             getUserVerifyCallBack();
    //         }
    //         if (response.has_message()) {
    //             PopupMessageBox* popupMessage = new PopupMessageBox();
    //             popupMessage.showPopup(response.message());
    //         }
    //     }
    // },
    // getIapCompleteResponse: function(){
    //     BINCompleteIAPResponse* response = (BINCompleteIAPResponse*)
    //     Common::getInstance().checkEvent(NetworkManager::IAP_FINISH);
    //     if (response != 0){
    //         log("iap complete response %s", response.DebugString().c_str());
    //         if (response.has_message()){
    //             PopupMessageBox* popupMessage = new PopupMessageBox();
    //             popupMessage.showPopup(response.message());
    //         }
    //     }
    // },
    // levelResponseHandler: function() {
    //     BINLevelUpResponse *response = (BINLevelUpResponse *)Common::getInstance()
    //     .checkEvent(NetworkManager::LEVEL_UP);
    //     if (response != 0) {
    //         CCLOG("level up response: %s", response.DebugString().c_str());
    //         if (response.responsecode() && response.levelup()) {
    //             NodeLevelUp* nodeLevelUp = new NodeLevelUp(response.newlevel().level());
    //             this.addChild(nodeLevelUp, INDEX_NOTIFY);
    //         }
    //         else if(response.has_message()){
    //             this.showToast(response.message().c_str(), 2.0f);
    //         }
    //     }
    // },
    // medalResonseHandler: function() {
    //     BINMedalUpResponse *response = (BINMedalUpResponse *)Common::getInstance()
    //     .checkEvent(NetworkManager::MEDAL_UP);
    //     if (response != 0) {
    //         CCLOG("medal up response: %s", response.DebugString().c_str());
    //         if (response.responsecode()) {
    //
    //         }
    //         if (response.has_message()){
    //             this.showToast(response.message().c_str(), 2.0f);
    //         }
    //     }
    // },
    // getHeadLineResponse: function(){
    //     BINHeadLineResponse* response = (BINHeadLineResponse*) Common::getInstance().checkEvent(NetworkManager::HEAD_LINE);
    //     if (response != 0 && response.responsecode() && response.headlines_size() > 0){
    //         vector<BINNews> headline_notify;
    //         for (int i = 0; i < response.headlines_size(); i++){
    //             headline_notify.push_back(response.headlines(i));
    //         }
    //         Common::getInstance().setHeadLineNotify(headline_notify);
    //     }
    // },
    // getEmergencyNotificationResponse: function(){
    //     BINEmergencyNotificationResponse* response = (BINEmergencyNotificationResponse*)
    //     Common::getInstance().checkEvent(NetworkManager::EMERGENCY_NOTIFICATION);
    //     if (response != 0 && response.responsecode()){
    //         string notifications = "";
    //         if (response.notifications_size() > 0){
    //             for (int i = 0; i < response.notifications_size(); i++){
    //                 notifications += response.notifications(i) + " ";
    //             }
    //         }
    //         Common::getInstance().setNotifycationEmergency(notifications);
    //
    //         if (response.headlines_size() > 0){
    //             vector<BINNews> headline_notify;
    //             for (int i = 0; i < response.headlines_size(); i++){
    //                 headline_notify.push_back(response.headlines(i));
    //             }
    //             Common::getInstance().setHeadLineEmergency(headline_notify);
    //         }
    //
    //         if (this.getChildByTag(TAG_NOTIFY_EMERGENCY) != nullptr){
    //             MNotify* notify = (MNotify*) this.getChildByTag(TAG_NOTIFY_EMERGENCY);
    //             if (!notifications.empty()){
    //                 notify.show(notifications.c_str());
    //             } else if (response.headlines_size() > 0){
    //                 notify.showHeadLine();
    //             }
    //         }
    //     }
    // },
    connect: function() {
        cc.log("baseconnect");
        //check if connected
        if(isConnected()){
            closeConnection();
        }

        setConnected(true);

        if (isConnected()) {
            if(ws.readyState === ws.OPEN){
                getInitializeMessageFromServer(getCp(), getVersionCode(), getDeviceId(), getDeviceInfo(), getCountry(), getLanguage(), getPackageName());
            }
            // getPingMessageFromServer(0);
        } else {
            // var scene = cocos2d::Director::getInstance().getRunningScene();
            // if(scene.getChildByTag(TAG_POPUP_RECONNECT) == nullptr){
            //     auto reconnect = PopupReconnect::create();
            //     scene.addChild(reconnect);
            //     reconnect.showPopup();
            // }else{
            //     auto reconnect = (PopupReconnect*)scene.getChildByTag(TAG_POPUP_RECONNECT);
            //     reconnect.showPopup();
            // }
        }
    },
    goToIntroScene: function(dt) {
        var scene = new IntroScene();
        cc.director.runScene(scene);
    }
});

var BaseScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new BaseLayer();
        this.addChild(layer);
    }
});

var baseSceneConnect = new BaseLayer();
