
var IntroLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();


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

        var itemSpriteBGCard = MSprite.create(res.bg_card_png);
        var centerPosCard = MVec2(width/2, height/2);
        itemSpriteBGCard.setPosition(centerPosCard);
        this.addChild(itemSpriteBGCard);

        // var target = MSprite.create(res.beer_bkg_png); /*child to clip*/
        // var mask = MSprite.create(res.beer_sprite_png); /*mask*/
        //
        // var maskedFill = new cc.ClippingNode(mask);
        // maskedFill.setAlphaThreshold(0.9);
        // maskedFill.addChild(target);
        // maskedFill.setPosition(cc.p(winsize.width/2, winsize.height*0.55));
        //
        // // var progressArr = new cc.FiniteTimeAction(cc.ProgressFromTo(3,0,100));
        // // // var progressFrom = new cc.ProgressFromTo(3,0,100);
        // // // // progressArr.pushBackElement(progressFrom);
        // //
        // // var redBar = new cc.Sprite(res.beer_sprite_png);
        // // var redBarProgress = new cc.ProgressTimer(redBar);
        // // redBarProgress.setMidpoint(0.5,0);
        // // redBarProgress.setType(cc.ProgressTimer.TYPE_BAR);
        // // redBarProgress.setBarChangeRate(0,1);
        // // redBarProgress.runAction(new cc.Sequence(progressArr));
        // // maskedFill.addChild(redBarProgress);
        //
        // this.addChild(maskedFill,0);
        //
        // // cc.director.runScene(new LoginScene());
        //
        // var sprite_bot = MSprite.create(res.beer_bot_png);
        // sprite_bot.setVisible(false);
        // sprite_bot.runAction(new cc.Sequence(new cc.DelayTime(2.9), new cc.CallFunc(sprite_bot.setVisible(true), this)));
        // maskedFill.addChild(sprite_bot);
        //
        //
        // var cloud = MSprite.create(res.cloud_png);
        // cloud.setPosition(cc.p(maskedFill.getPositionX(), maskedFill.getPositionY() - mask.getContentSize().height/2));
        //
        // var luamach = MSprite.create(res.lua_mach_png);
        // cc.log("lua mach: ", cc.p(cloud.getPositionX(),maskedFill.getPositionY() - luamach.getContentSize().height/10));
        // luamach.setPosition(cc.p(cloud.getPositionX(),maskedFill.getPositionY() - luamach.getContentSize().height/10));
        // this.addChild(luamach);
        // this.addChild(cloud);
        //
        // cc.log("intro layer");

        var background = new cc.LayerColor(cc.Color(0,0,0,255),visibleSize.width,visibleSize.height);
        background.setOpacity(0);
        this.addChild(background);

        var label = MLabel.create("BigKen Online", 65, true);
        label.setPosition(MVec2(width/2,height/2));
        this.addChild(label);

        //check init
        // cc.log("start connection");
        // cc.director.runScene(new IntroScene());
        // var cp = getCp(),
        //     appversion = getVersionCode(),
        //     device_id = getDeviceId(),
        //     device_info = getDeviceInfo(),
        //     country = getCountry(),
        //     language = getLanguage(),
        //     pakageName = getPackageName();
        //
        // getInitializeMessageFromServer(cp, appversion , device_id, device_info, country, language, pakageName);
        
        this.scheduleOnce(this.gotoLoginScene,3,"login");
        ws.onmessage = this.ongamestatus.bind(this);

        return true;
    },
    
    gotoLoginScene: function () {
        BaseScene_connect();
        // cc.director.runScene(new LoginScene());
    },
    ongamestatus: function(e) {
        cc.log("data 1", e);
        if(e.data!==null || e.data !== 'undefined')
        {
            var listMessages = parseFrom(e.data, e.data.byteLength);
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
                initialMessageResponseHandler(msg);
                // cc.log("message :" , msg);
                // if(msg.responseCode) {
                //     cc.director.runScene(new LoginScene());
                // }
                break;
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

