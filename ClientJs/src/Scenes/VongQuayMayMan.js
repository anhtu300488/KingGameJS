var numberChance = 0;
var VongQuayMayManLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.init();
    },

    init: function () {
        this._super();

        var bkg = cc.LayerColor.create(cc.color(0,0,0,200));
        bkg.setContentSize(visibleSize);
        bkg.setPosition(cc.p(0,0));
        this.addChild(bkg);

        // var touchListener = cocos2d.EventListenerTouchOneByOne.create();
        // touchListener.setSwallowTouches(true);
        // touchListener.onTouchBegan = [&](cocos2d.Touch* touch, cocos2d.Event* event) {
        //     return true;
        // };
        // _eventDispatcher.addEventListenerWithSceneGraphPriority(touchListener, bkg);



        var under_arrow = MSprite.create(res.under_arrow);
        under_arrow.setAnchorPoint(cc.p(0.5,0.5));

        var vongquay = MSprite.create(res.vong_nhap_nhay);
        vongquay.setAnchorPoint(cc.p(0.5,0.5));
        vongquay.setPosition(cc.p(width/2,height/2));

        var vong2 = MSprite.create(res.vong_ngoai);
        vong2.setAnchorPoint(cc.p(0.5,0.5));
        vong2.setPosition(cc.p(width/2,height/2));

        var vong1 = MSprite.create(res.vong_trong);
        vong1.setAnchorPoint(cc.p(0.5,0.5));
        vong1.setPosition(cc.p(width/2,height/2));

        var btn_back = MButton.create(res.cloud_png,TAG.VQMM_SCENE.BTN_BACK);
        btn_back.setPosition(cc.p(vongquay.getWidth() - btn_back.getWidth()*1.5,
        vongquay.getHeight() - btn_back.getHeight()*0.7));
        btn_back.addTouchEventListener(this.menuCallBack, this);
        vongquay.addChild(btn_back);


        var buttonQuay = MButton.create(res.icon_quay,TAG.VQMM_SCENE.BTN_QUAY);
        buttonQuay.setZoomScale(0.1);
        buttonQuay.setPosition(cc.p(width/2 - buttonQuay.getWidth()/2,
            height/2 - buttonQuay.getHeight()/2));
        buttonQuay.addTouchEventListener(this.menuCallBack,this);

        var so_vong_quay = MSprite.create(res.so_vong_quay);
        so_vong_quay.setPosition(buttonQuay.getWidth()/2 - so_vong_quay.getWidth()/2,
            buttonQuay.getHeight()/2 - so_vong_quay.getHeight()*2);
        buttonQuay.addChild(so_vong_quay);

        var lblVongQuay = MLabel.create(cc.formatStr("%d",numberChance), so_vong_quay.getHeight()*0.8,true);
        lblVongQuay.setAnchorPoint(cc.p(0.5,0.5));
        lblVongQuay.setPosition(so_vong_quay.getWidth()/2,so_vong_quay.getHeight()/2);
        so_vong_quay.addChild(lblVongQuay);

        var btn_mua1 = MButton.create(res.btn_mualuot, "1", cc.color.BLACK, TAG.VQMM_SCENE.BTN_MUA_1);
        var btn_mua2 = MButton.create(res.btn_mualuot, "2", cc.color.BLACK, TAG.VQMM_SCENE.BTN_MUA_2);
        var btn_mua3 = MButton.create(res.btn_mualuot, "3", cc.color.BLACK, TAG.VQMM_SCENE.BTN_MUA_3);

        btn_mua1.setPosition(cc.p(width - btn_mua1.getWidth()*1.2,
        height/2 + btn_mua1.getHeight()*2));
        btn_mua2.setPosition(cc.p(width - btn_mua2.getWidth()*1.2,
        height/2 + btn_mua2.getHeight()*0.5));
        btn_mua3.setPosition(cc.p(width - btn_mua3.getWidth()*1.2,
        height/2 - btn_mua3.getHeight()*1));

        btn_mua1.addTouchEventListener(this.menuCallBack,this);
        btn_mua2.addTouchEventListener(this.menuCallBack,this);
        btn_mua3.addTouchEventListener(this.menuCallBack,this);

        var sprite_hu = MSprite.create(res.hu);
        sprite_hu.setPosition(cc.p(0,0));

        var sprite_tienhu = MSprite.create(res.sprite_tienhu);
        sprite_tienhu.setPosition(cc.p(sprite_hu.getWidth()/2 - sprite_tienhu.getWidth()*0.5,
        sprite_hu.getHeight()/2 - sprite_tienhu.getHeight()*1.9));
        sprite_hu.addChild(sprite_tienhu);

        var lbl_hu = MLabel.create("",sprite_tienhu.getHeight()*0.4,true);
        lbl_hu.setAnchorPoint(cc.p(0.5,0.5));
        lbl_hu.setPosition(cc.p(sprite_tienhu.getWidth()/2,sprite_tienhu.getHeight()/2));
        sprite_tienhu.addChild(lbl_hu);

        var sprite_coin_left = MSprite.create(res.coin_left);
        sprite_coin_left.setPosition(cc.p(0,0));

        under_arrow.setPosition(vongquay.getPosition()
            + cc.p(0,vongquay.getHeight()/2 - under_arrow.getHeight()*0.25));
        var arrow = MSprite.create(res.arrow);
        arrow.setAnchorPoint(cc.p(0.5,0.5));
        arrow.setPosition(under_arrow.getPosition());

        var btn_history = MButton.create(res.MINIPOKER_BTN_HISTORY,TAG.POPUP_VQMM.BTN_HISTORY);
        btn_history.setPosition(cc.p(width -btn_history.getWidth()*1.2,
        height - btn_history.getHeight()*1.2));
        btn_history.addTouchEventListener(this.historyCallBack,this);
        this.addChild(btn_history);

        this.addChild(under_arrow);

        this.addChild(vongquay);
        this.addChild(vong2);
        this.addChild(vong1);
        this.addChild(buttonQuay);
        this.addChild(arrow);
        //this.addChild(vqmm_text);

        this.addChild(btn_mua1);
        this.addChild(btn_mua2);
        this.addChild(btn_mua3);

        this.addChild(sprite_hu);
        this.addChild(sprite_coin_left);

        var btn_sweepTurn = MButton.create(res.btn_canquet,"Quay liên tiếp", cc.color.BLACK, TAG.VQMM_SCENE.BTN_SWEEP_TURN);
        btn_sweepTurn.setPosition(cc.p(width - btn_sweepTurn.getWidth()*1.2,
        height/2 - btn_sweepTurn.getHeight()*3.0));
        btn_sweepTurn.addTouchEventListener(this.menuCallBack,this);
        this.addChild(btn_sweepTurn);

        addAvatar(height,btn_sweepTurn.getPositionX() + btn_sweepTurn.getWidth()/2, this);

        indexV1 = 0;
        indexV2 = 0;
        vongQuay = 3;
        numberChance = 0;
        jarValue = 0;
        preJarValue = 0;
        delta_time_jar = 0.0;        

        return true;
    }
});

var VongQuayMayMan = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new VongQuayMayManLayer();
        this.addChild(layer);
    }
});

var addAvatar = function(screenHeight,x, thisObj){
    var background_avatar = MSprite.create(res.MINIPOKER_BACKGROUND_AVATAR);
    background_avatar.setPosition(cc.p(x - background_avatar.getWidth()/2,
        background_avatar.getHeight()*0.2));
    thisObj.addChild(background_avatar);

    //ken
    var _bgr_ken = MButton.create(res.SPRITE_BK_XUKEN);
    _bgr_ken.setTag(TAG.POPUP_VQMM.BTN_NAP_KEN);
    var scaleX_xuken = background_avatar.getWidth()*0.6/_bgr_ken.getWidth();
    var scaleY_xuken = background_avatar.getHeight()*0.5/_bgr_ken.getHeight();
    _bgr_ken.setScale(scaleX_xuken,scaleY_xuken);
    //_bgr_ken.addTouchEventListener(CC_CALLBACK_2(VongQuayMayMan.menuCallBack, this));
    _bgr_ken.setPosition(cc.p(background_avatar.getWidth() - _bgr_ken.getWidth() * scaleX_xuken
        - _bgr_ken.getHeight()*scaleX_xuken*0.3,
    background_avatar.getHeight()*0.48));
    background_avatar.addChild(_bgr_ken);

    var sprite_ken = MSprite.create(res.SPRITE_XU);
    sprite_ken.setScale( _bgr_ken.getHeight()*0.4/sprite_ken.getHeight());
    sprite_ken.setPosition(cc.p(_bgr_ken.getPositionX() + _bgr_ken.getWidth() * scaleX_xuken - sprite_ken.getWidth()*sprite_ken.getScale() - 5,
        _bgr_ken.getPositionY() + _bgr_ken.getHeight() * scaleY_xuken / 2 - sprite_ken.getHeight()*sprite_ken.getScale() / 2));
    background_avatar.addChild(sprite_ken);

    /*auto sprite_napken = MSprite.create(TABLE_SPRITE_NAPXU);
     sprite_napken.setScale(_bgr_ken.getHeight()*0.4f/sprite_ken.getHeight());
     sprite_napken.setPosition(_bgr_ken.getPosition()
     + cc.p(5,_bgr_ken.getHeight()*scaleY_xuken / 2
     - sprite_napken.getHeight()*sprite_napken.getScale() / 2));
     background_avatar.addChild(sprite_napken);*/

    var number_cash = getCash();
    var label_ken = MLabel.create(number_cash, _bgr_ken.getHeight()*0.25, cc.color(255, 214, 0), true);
    label_ken.setAnchorPoint(ANCHOR_BOTTOM_RIGHT);
    label_ken.setPosition(sprite_ken.getPosition().x - 5,
        _bgr_ken.getPosition().y + _bgr_ken.getHeight()*scaleY_xuken / 2 - label_ken.getHeight() / 2);
    background_avatar.addChild(label_ken);

    // avartar
    var avatar_id = getAvatarId();
    var btn_avatar = MButton.create(cc.formatStr("avatar%d.png", avatar_id));
    btn_avatar.setAnchorPoint(ANCHOR_MIDDLE);
    btn_avatar.setScale(background_avatar.getHeight()*0.9/btn_avatar.getHeight());
    btn_avatar.setPosition(cc.p(btn_avatar.getWidth()*0.6,
    background_avatar.getHeight()/2));
    background_avatar.addChild(btn_avatar);

    //xu
    var _bgr_xu = MButton.create(res.SPRITE_BK_XUKEN);
    _bgr_xu.setTag(TAG.POPUP_VQMM.BTN_NAP_XU);
    _bgr_xu.setScale(scaleX_xuken,scaleY_xuken);
    //_bgr_xu.addTouchEventListener(CC_CALLBACK_2(VongQuayMayMan.menuCallBack, this));
    _bgr_xu.setPosition(cc.p(background_avatar.getWidth() - _bgr_xu.getWidth() * scaleX_xuken
        - _bgr_xu.getHeight()*scaleX_xuken*0.3,
    background_avatar.getHeight()*0.52 - _bgr_xu.getHeight()*scaleY_xuken));
    background_avatar.addChild(_bgr_xu);

    var sprite_xu = MSprite.create(res.TABLE_SPRITE_KEN);
    sprite_xu.setScale( _bgr_xu.getHeight()*0.4/sprite_xu.getHeight());
    sprite_xu.setPosition(cc.p(_bgr_xu.getPositionX() + _bgr_xu.getWidth() * scaleX_xuken - sprite_xu.getWidth()*sprite_xu.getScale() - 5,
        _bgr_xu.getPositionY() + _bgr_xu.getHeight() * scaleY_xuken / 2 - sprite_xu.getHeight()*sprite_xu.getScale() / 2));
    background_avatar.addChild(sprite_xu);

    /*auto sprite_napxu = MSprite.create(TABLE_SPRITE_NAPXU);
     sprite_napxu.setScale(_bgr_xu.getHeight()*0.4f/sprite_xu.getHeight());
     sprite_napxu.setPosition(_bgr_xu.getPosition()
     + cc.p(5,_bgr_xu.getHeight()*scaleY_xuken / 2
     - sprite_napxu.getHeight()*sprite_napxu.getScale() / 2));
     background_avatar.addChild(sprite_napxu);*/

    var number_xu = getGold();
    var label_xu = MLabel.create(number_xu, _bgr_xu.getHeight()*0.25, cc.color(255, 214, 0), true);
    label_xu.setAnchorPoint(ANCHOR_BOTTOM_RIGHT);
    label_xu.setPosition(sprite_xu.getPosition().x - 5,
        _bgr_xu.getPosition().y + _bgr_xu.getHeight()*scaleY_xuken / 2 - label_xu.getHeight() / 2);
    background_avatar.addChild(label_xu);
}

