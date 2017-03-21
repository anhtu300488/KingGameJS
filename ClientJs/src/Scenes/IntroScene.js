var IntroLayer = cc.Layer.extend({
    sprite:null,
    listEvent:[],
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.init();

        return true;
    },
    init:function () {
        this._super();

        if (!baseSceneConnect.init()) {
            return false;
        }

        // connect();

        common.intro = true;
        common.gameState = GAME_STATE.INTRO;

        timeSchedule = 1.0;

        if(!common.firstLogin){
            common.firstLogin = true;
            //
            //     timeSchedule = 3.0;
            //
            cc.spriteFrameCache.addSpriteFrames("res/sprite_cards.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/cidade.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/loading.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/nem.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/avatar_win_animation.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/sprite_cards.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/cogai_xocdia.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/daily_gift/hom_sprite.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/level_up/levelup_sprites.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/xoc.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/cangat.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/an.plist");
            // cc.spriteFrameCache.addSpriteFrames("res/xocdia/chip_sprites.plist");
            //
            //     // SoundManager::getInstance().preLoadAudio(soundTLMN);
            //     // SoundManager::getInstance().preLoadAudio(soundPhom);
            //     // SoundManager::getInstance().preLoadAudio(soundSocdia);
            //     // SoundManager::getInstance().preLoadAudio(soundOther);
        }

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

        this.scheduleOnce(this.gotoStartScene,3,"login");

        ws.onmessage = this.ongamestatus.bind(this);

        // this.scheduleUpdate();

    },

    onExit:function () {
        baseSceneConnect.onExit();
        // this._super();
    },

    gotoStartScene: function () {
        cc.log("connect");
        baseSceneConnect.connect();
        // initConnect();
    },
    ongamestatus: function(e) {
        cc.log("data 1", e);
        if(e.data!==null || e.data !== 'undefined')
        {
            var lstMess = parseFrom(e.data, e.data.byteLength);
            while(lstMess.length > 0) {
                var buffer = lstMess.shift();
                this.handleMessage(buffer);
            }

        }
    },
    handleMessage: function(e) {
        var buffer = e;
        switch (buffer.message_id) {
            case NetworkManager.INITIALIZE:
                var msg = buffer.response;
                baseSceneConnect.initialMessageResponseHandler(msg);
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
        baseSceneConnect.update(dt);
        // if(listMessages.length > 0) {
        //     for (i = 0; i < listMessages.length; i++) {
        //         if (listMessages[i].message_id == NetworkManager.INITIALIZE) {
        //             initialMessage = listMessages[i].response;
        //
        //             initialMessageResponseHandler(initialMessage);
        //         }
        //     }
        // }
        //
        //
        //
        // cc.log("update");
        if(ws.readyState == ws.CLOSED){
            cc.sys.localStorage.removeItem(Common.KEY_SESSION_ID);
            common.sessionId = "-1";

            if(isConnected()){
                closeConnection();
                this.scheduleOnce(baseSceneConnect.goToIntroScene,2,"Intro");
            }
        }
        //
        // // getEmergencyNotificationResponse();
        // //
        // // //level up
        // // levelResponseHandler();
        // //
        // // //huy chuong up
        // // medalResonseHandler();
        // //
        // // getIapCompleteResponse();
    }
});

var IntroScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new IntroLayer();
        this.addChild(layer);
    }
});

