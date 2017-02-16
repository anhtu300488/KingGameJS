
var IntroLayer = cc.Layer.extend({
    sprite:null,
    listEvent:[],
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        common.intro = true;
        common.gameState = GAME_STATE.INTRO;

        timeSchedule = 1.0;

        // if(!common.firstLogin){
        //     common.firstLogin(true);
        //
        //     timeSchedule = 3.0;
        //
        //     spriteFrameCache.addSpriteFramesWithFile("res/loading.plist");
        //     spriteFrameCache.addSpriteFramesWithFile("res/nem.plist");
        //     spriteFrameCache.addSpriteFramesWithFile("res/avatar_win_animation.plist");
        //     spriteFrameCache.addSpriteFramesWithFile("res/sprite_cards.plist");
        //     spriteFrameCache.addSpriteFramesWithFile("res/cogai_xocdia.plist");
        //     spriteFrameCache.addSpriteFramesWithFile("res/daily_gift/hom_sprite.plist");
        //     spriteFrameCache.addSpriteFramesWithFile("res/level_up/levelup_sprites.plist");
        //     spriteFrameCache.addSpriteFramesWithFile("res/xoc.plist");
        //     spriteFrameCache.addSpriteFramesWithFile("res/cangat.plist");
        //     spriteFrameCache.addSpriteFramesWithFile("res/an.plist");
        //     spriteFrameCache.addSpriteFramesWithFile("res/xocdia/chip_sprites.plist");
        //
        //     // SoundManager::getInstance().preLoadAudio(soundTLMN);
        //     // SoundManager::getInstance().preLoadAudio(soundPhom);
        //     // SoundManager::getInstance().preLoadAudio(soundSocdia);
        //     // SoundManager::getInstance().preLoadAudio(soundOther);
        // }

        var spriteBG = new cc.Sprite(res.COMMON_SPRITE_ITEM_BACKGROUND);

        var spriteWidth = spriteBG.getContentSize().width;

        var spriteHeight = spriteBG.getContentSize().height;

        var rows = visibleSize.width/ spriteWidth + 1;
        var cols = visibleSize.height/ spriteHeight + 1;
        for(var i = 0; i< rows; i++){
            for(var j = 0; j<cols; j++){
                var itemSpriteBG = new cc.Sprite(res.COMMON_SPRITE_ITEM_BACKGROUND);
                var centerPos = cc.p(spriteBG.x + i*spriteWidth, spriteBG.y + j*spriteHeight);
                itemSpriteBG.setPosition(centerPos);
                this.addChild(itemSpriteBG);
            }
        }

        var itemSpriteBGCard = MSprite.create(res.INTRO_SPRITE_BG_CARD);
        var centerPosCard = MVec2(width/2, height/2);
        itemSpriteBGCard.setPosition(centerPosCard);
        this.addChild(itemSpriteBGCard);

        var background = new cc.LayerColor(cc.Color(0,0,0,255),visibleSize.width,visibleSize.height);
        background.setOpacity(0);
        this.addChild(background);

        var label = MLabel.create("BigKen Online", 65, true);
        label.setPosition(MVec2(width/2,height/2));
        this.addChild(label);

        this.updateProgress(timeSchedule);
        
        this.scheduleOnce(this.gotoLoginScene,3,"login");
        this.scheduleUpdate();

        ws.onmessage = this.ongamestatus.bind(this);

        return true;
    },
    
    gotoLoginScene: function () {
        initConnect();
    },
    ongamestatus: function(e) {
        cc.log("data 1", e);
        if(e.data!==null || e.data !== 'undefined')
        {
            parseFrom(e.data, e.data.byteLength);
            while(listMessages.length > 0) {
                var buffer = listMessages.shift();
                this.handleMessage(buffer);
            }
        }
    },
    handleMessage: function(e) {
        var buffer = e;
        switch (buffer.message_id) {
            case NetworkManager.INITIALIZE:
                var msg = buffer.response;
                this.initialMessageResponseHandler(msg);
                break;
        }
    },
    updateProgress : function(time){
        var bg_card = MSprite.create("res/bg_card.png");
        bg_card.setPosition(MVec2(visibleSize.width / 2 - bg_card.getWidth() / 2,
            visibleSize.height / 2 - bg_card.getHeight() / 2));
        this.addChild(bg_card);
    
        // var dropletSprite = MSprite.create("intro/beer_bkg.png");
        //
        // // create the clipping node
        // var dropletClipper = new cc.ClippingNode();
        // dropletClipper.setPosition(MVec2(width/2,height*0.55));
        // dropletClipper.setStencil(dropletSprite);
        // dropletClipper.addChild(dropletSprite);
        //
        // //===========
        // var progressArr = [];
        // ProgressFromTo *progressFrom = ProgressFromTo::create(time, 0.0, 100);
        // progressArr.push(progressFrom);
        //
        // var redBar = Sprite::create("intro/beer_sprite.png");
        // ProgressTimer *redBarProgress = ProgressTimer::create(redBar);
        // redBarProgress.setMidpoint(Vec2(0.5f, 0.0f));
        // redBarProgress.setType(ProgressTimer::Type::BAR);
        // redBarProgress.setBarChangeRate(Vec2(0.0f, 1.0f));
        // redBarProgress.runAction(Sequence::create(progressArr));
        // dropletClipper.addChild(redBarProgress);
        //
        // addChild(dropletClipper,2);
        //
        // var sprite_bot = MSprite.create("res/intro/beer_bot.png");
        // sprite_bot.setVisible(false);
        // sprite_bot.runAction(Sequence::create(DelayTime::create(time-0.1),CallFunc::create([=]{
        //     sprite_bot.setVisible(true);
        // }),null));
        // dropletClipper.addChild(sprite_bot);
        //
        // var cloud = MSprite.create("res/intro/cloud.png");
        // cloud.setPosition(dropletClipper.getPosition()
        //     - Vec2(0,dropletSprite.getContentSize().height/2));
        //
        //
        // var luamach = MSprite.create("res/intro/lua_mach.png");
        // luamach.setPosition(cloud.getPosition() - cloud.getContentSize()/2);
        // addChild(luamach,2);
        // addChild(cloud,2);

    },
    update:function(dt){

        if(ws.readyState == ws.CLOSED){
            cc.sys.localStorage.removeItem(Common.KEY_SESSION_ID);
            common.sessionId = "-1";

            if(isConnected()){
                closeConnection();
                this.scheduleOnce(goToIntroScene,2,"Intro");
            }
        }

        // getEmergencyNotificationResponse();
        //
        // //level up
        // levelResponseHandler();
        //
        // //huy chuong up
        // medalResonseHandler();
        //
        // getIapCompleteResponse();
    },
    initialMessageResponseHandler : function(initialMessage) {
        if (initialMessage != 0) {
            // setInitialize(initialMessage.responseCode);
            common.initialize = initialMessage.responseCode;
            if (initialMessage.responseCode) {
                // setEnablePurchaseCash(initialMessage.enablePurchaseCash);
                common.enablePurchaseCash = initialMessage.enablePurchaseCash;
                // setEnableTopup(initialMessage.enableTopup);
                common.enableTopup = initialMessage.enableTopup;
                var serverAppVersion = initialMessage.currentAppVersion;
                // setServerAppVersion(serverAppVersion);
                common.serverAppVersion = serverAppVersion;
                // setFanpageUrl(initialMessage.fanpageUrl);
                common.fanpageUrl = initialMessage.fanpageUrl;
                // setWebsiteUrl(initialMessage.websiteUrl);
                common.websiteUrl = initialMessage.websiteUrl;
                var hotlines = [];
                cc.log("hotline size", initialMessage.hotlines.length);
                for (i = 0; i < initialMessage.hotlines.length; i++){
                    hotlines.push(initialMessage.hotlines[i]);
                }


                // setHotLines(hotlines);
                common.hotLines = hotlines;
                // setEnableCashToGold(initialMessage.enableCashToGold);
                common.enableCashToGold = initialMessage.enableCashToGold;
                // setCashToGoldRatio(initialMessage.cashToGoldRatio);
                common.cashToGoldRatio = initialMessage.cashToGoldRatio;
                // setEnableQuickPlay(initialMessage.enableQuickPlay);
                common.enableQuickPlay = initialMessage.enableQuickPlay;
                // setEnableCashTranfer(initialMessage.enableCashTransfer);
                common.enableCashTransfer = initialMessage.enableCashTransfer;
                // setEnableGiftCode(initialMessage.enableGiftCode);
                common.enableGiftCode = initialMessage.enableGiftCode;
                // setResetPwSmsSyntax(initialMessage.resetPwSmsSyntax);
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
                goGame();
                //restore session
            }else {
                // PopupMessageBox* popupMessage = new PopupMessageBox();
                // popupMessage.showPopup(init_response.message());
            }
        }
    }
});

var IntroScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new IntroLayer();
        this.addChild(layer);
    }
});

var checkEvent = function(message_id) {
    cc.log("listEvent", this.listEvent);
//     try {
// //      bool isSuccess = false;
//         var k = -1;
//         var result;
//         var rs = 0;
//
//         if (this.listEvent.length > 0) {
//             return this.listEvent[message_id];
//         }
//
//     }
//     catch (e) {
//         cc.log("error", e);
//     }
}

