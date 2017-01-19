/**
 * Created by MyPC on 12/12/2016.
 */
var visibleSize = cc.size(1280,768);//cc.director.getVisibleSize();
var width = visibleSize.width;
var height = visibleSize.height;

var origin = cc.director.getVisibleOrigin();
var originX = origin.x;
var originY = origin.y;



cc.log("ox/oy:" + originX + "/" +originY);

var MVec2 = function (x,y) {
    return cc.p(originX+x, originY+y);
}

var BaseScene_connect = function() {
    if (isConnected()) {
        closeConnection();
    }
    if(ws.readyState === ws.OPEN){
        setConnected(true);
    }
    // connect();

    if (isConnected()) {
        cc.log("isConnected", isConnected());
        cc.log("status", ws.readyState);
        if(ws.readyState === ws.OPEN){
            getInitializeMessageFromServer(getCp(), getVersionCode(), getDeviceId(), getDeviceInfo(), getCountry(), getLanguage(), getPackageName());
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

var initialMessageResponseHandler = function(listMessages) {
    // var init_response = BINInitializeResponse();
    //get list event
    // checkEvent(NetworkManager.INITIALIZE);
    cc.log("get list message", listMessages.responseCode);

    if (listMessages != 0) {
        setInitialize(listMessages.responseCode);
        if (listMessages.responseCode) {
            setEnablePurchaseCash(listMessages.enablePurchaseCash);
            setEnableTopup(listMessages.enableTopup);
            var serverAppVersion = listMessages.currentAppVersion;
            setServerAppVersion(serverAppVersion);
            setFanpageUrl(listMessages.fanpageUrl);
            setWebsiteUrl(listMessages.websiteUrl);
            var hotlines = [];
            cc.log("hotline size", listMessages.hotlines.length);
            for (i = 0; i < listMessages.hotlines.length; i++){
                hotlines.push(listMessages.hotlines[i]);
            }


            setHotLines(hotlines);
            setEnableCashToGold(listMessages.enableCashToGold);
            setCashToGoldRatio(listMessages.cashToGoldRatio);
            setEnableQuickPlay(listMessages.enableQuickPlay);
            setEnableCashTranfer(listMessages.enableCashTransfer);
            setEnableGiftCode(listMessages.enableGiftCode);
            setResetPwSmsSyntax(listMessages.resetPwSmsSyntax);

            /*Set enable game ids*/
            var _gameIds = [];
            for (i = 0; i < listMessages.enableGameIds.length; i++) {
                _gameIds.push(listMessages.enableGameIds[i]);
            }
            setEnableGameIds(_gameIds);

            var app_version = getVersionCode();
            cc.log("app version code: ", app_version);
            cc.log("app version serverAppVersion: ", serverAppVersion);

            // if (app_version < serverAppVersion) {
            //     class InitializeOnEventListener : public OnEvenListener<BINInitializeResponse*> {
            //         public:
            //             void onEvent(int eventType, BINInitializeResponse* sender) override {
            //         if (eventType == OnEvenListener::EVENT_CONFIRM_OK) {
            //             Common::getInstance()->openUrl(url);
            //         }
            //         else if (eventType == OnEvenListener::EVENT_CANCEL_CONFIRM) {
            //             BaseScene::goGame();
            //         }
            //     };
            //     void onEventClickMessageBox(int enventType) override {
            //
            //     };  //su kien khi an vao nut ok cua popupm essage box
            //
            //     void setUrl(string url) { this->url = url; }
            //     private:
            //         string url;
            // } *b = new InitializeOnEventListener();
            //     b->setUrl(init_response->downloadurl());
            //     bool force_update = init_response->forceupdate();
            //     if (force_update) {
            //         Common::getInstance()->setForceUpdate(true);
            //         NodeConfirm<BINInitializeResponse*> *nodeConfirm =
            //             NodeConfirm<BINInitializeResponse*>::create(b, "Cập nhật",
            //                 init_response->message(),
            //                 NodeConfirm<BINInitializeResponse*>::MESSAGEBOX_TYPE);
            //         nodeConfirm->setSender(init_response);
            //         nodeConfirm->showDlg();
            //         return;
            //     }
            //     else {
            //         Common::getInstance()->setUpdateMessage(init_response->message());
            //     }
            // }
            goGame();
            //restore session
        }else {
            // PopupMessageBox* popupMessage = new PopupMessageBox();
            // popupMessage->showPopup(init_response->message());
        }
    }
}

// var update = function(delta) {
//     initialMessageResponseHandler();
//
//     var pingresponse = (BINPingResponse*)Common::getInstance()->checkEvent(NetworkManager.PING);
//     if (pingresponse != 0) {
//         cc.log("ping response: %s", pingresponse->DebugString().c_str());
//         if (pingresponse->disconnect()) {
//             cocos2d::UserDefault::getInstance()->deleteValueForKey(Common::getInstance()
//                 ->KEY_SESSION_ID);
//             Common::getInstance()->setSessionId("-1");
//             this->showToast(pingresponse->message().c_str(), 2);
//             //close connection
//             if (NetworkManager::getInstance()->isConnected())
//                 NetworkManager::getInstance()->closeConnection();
//             this->scheduleOnce(schedule_selector(BaseScene::goToIntroScene), 2.0f);
//         }
//         else {
//             //TODO:SangLX
//         }
//     }
//
//     getEmergencyNotificationResponse();
//
//     //level up
//     levelResponseHandler();
//
//     //huy chuong up
//     medalResonseHandler();
//
//     getIapCompleteResponse();
// }

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
