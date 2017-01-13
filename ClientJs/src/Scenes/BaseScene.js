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

var databuf;

var setDataBuf = function(is_databuf) {
    databuf = is_databuf;
}

var getDataBuf = function() {
    return databuf;
}

// var protoBuf = {
//     _databuf : 123,
//     get dataBuf() {
//         return this._databuf;
//     },
//     set dataBuf (_databuf) {
//         cc.log("2");
//         this.dataBuf = _databuf;
//     }
// };

// var protoBuf = function()
// {
//     this.databuf = false;
//     this.getDataBuffer = function() { return this.databuf; }
//     this.setDataBuffer = function(val) { this.databuf = val; }
// }



// var loadAllProto = function () {
    var ProtoBuf = dcodeIO.ProtoBuf;
    var ProtoBufBuilder = ProtoBuf.newBuilder();
    // if (cc.sys.isNative) {
    //     // load .proto
    //     ProtoBuf.protoFromContents("res/protobuf/administrator.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/administrator.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/bet.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/bet.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/buy_chip.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/buy_chip.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/buy_turn.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/buy_turn.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/captcha.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/captcha.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/cash_transfer.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/cash_transfer.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/change_host.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/change_host.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/change_rule.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/change_rule.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/close_connection.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/close_connection.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/create_room.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/create_room.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/enter_room.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/enter_room.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/enter_zone.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/enter_zone.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/exchange.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/exchange.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/exit_room.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/exit_room.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/filter_avatar.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/filter_avatar.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/filter_room.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/filter_room.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/filter_top_user.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/filter_top_user.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/friend.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/friend.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/game_config.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/game_config.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/gift.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/gift.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/iap.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/iap.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/initialize.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/initialize.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/instant_message.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/instant_message.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/invite_to_play.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/invite_to_play.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/jar.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/jar.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/kick_player_out.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/kick_player_out.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/level.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/level.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/lock_room.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/lock_room.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/login.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/login.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/logout.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/logout.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/lookup_game_history.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/lookup_game_history.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/lookup_money_history.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/lookup_money_history.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/mail.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/mail.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/map_field_entry.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/map_field_entry.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/match_begin.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/match_begin.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/match_end.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/match_end.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/notification.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/notification.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/open_id_login.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/open_id_login.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/ping.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/ping.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/player.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/player.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/prepare_new_match.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/prepare_new_match.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/purchase_money.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/purchase_money.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/quick_play.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/quick_play.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/ready_to_play.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/ready_to_play.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/register.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/register.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/reset_password.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/reset_password.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/room_owner_changed.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/room_owner_changed.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/send_text_emoticon.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/send_text_emoticon.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/session_expired.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/session_expired.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/start_match.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/start_match.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/text_emoticon.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/text_emoticon.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/turn.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/turn.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/update_money.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/update_money.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/update_user_info.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/update_user_info.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/update_user_setting.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/update_user_setting.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/user_info.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/user_info.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/user_status.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/user_status.proto"));
    //     ProtoBuf.protoFromContents("res/protobuf/verify.proto", ProtoBufBuilder, jsb.fileUtils.getStringFromFile("res/protobuf/verify.proto"));
    // }

    // ProtoBuf.loadProtoFile("res/protobuf/administrator.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/bet.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/buy_chip.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/buy_turn.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/captcha.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/cash_transfer.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/change_host.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/change_rule.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/close_connection.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/create_room.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/enter_room.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/enter_zone.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/exchange.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/exit_room.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/filter_avatar.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/filter_room.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/filter_top_user.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/friend.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/game_config.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/gift.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/iap.proto");
    ProtoBuf.loadProtoFile("res/protobuf/initialize.proto", null, ProtoBufBuilder);
    var initializeProto = ProtoBufBuilder.build("bigken.initialize");
    // ProtoBuf.loadProtoFile("res/protobuf/instant_message.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/invite_to_play.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/jar.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/kick_player_out.proto");
    ProtoBuf.loadProtoFile("res/protobuf/level.proto", null, ProtoBufBuilder);
    var levelProto = ProtoBufBuilder.build("bigken.level");
    // ProtoBuf.loadProtoFile("res/protobuf/lock_room.proto");
    ProtoBuf.loadProtoFile("res/protobuf/login.proto", null, ProtoBufBuilder);
    var loginProto = ProtoBufBuilder.build("bigken.login");
    // ProtoBuf.loadProtoFile("res/protobuf/logout.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/lookup_game_history.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/lookup_money_history.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/mail.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/map_field_entry.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/match_begin.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/match_end.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/notification.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/open_id_login.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/ping.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/player.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/prepare_new_match.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/purchase_money.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/quick_play.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/ready_to_play.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/register.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/reset_password.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/room_owner_changed.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/send_text_emoticon.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/session_expired.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/start_match.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/text_emoticon.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/turn.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/update_money.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/update_user_info.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/update_user_setting.proto");
    ProtoBuf.loadProtoFile("res/protobuf/user_info.proto", null, ProtoBufBuilder);
    var userInfoProto = ProtoBufBuilder.build("bigken.userinfo");
    // ProtoBuf.loadProtoFile("res/protobuf/user_status.proto");
    // ProtoBuf.loadProtoFile("res/protobuf/verify.proto");



    // var TestProto = Bigken.initialize.BINInitializeRequest;

//     return Bigken;
//
// }

var BaseScene_connect = function() {
    cc.log("isConnected", isConnected());
    if (isConnected()) {
        cc.log("isConnected", isConnected());
        closeConnection();
    }
    if(ws.readyState === ws.OPEN){
        setConnected(true);
    }
    // connect();

    if (isConnected()) {
        cc.log("isConnected", isConnected());
        // setListening(true);
        // listenData();
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
    // if (getGameState() == GAME_STATE.INTRO) {
        var scene = new LoginScene();
        cc.director.runScene(scene);
    // }
    // else {
    //     sendPingAndReceiveMessage(
    //         getDisconnectedTime());
    // }
}
