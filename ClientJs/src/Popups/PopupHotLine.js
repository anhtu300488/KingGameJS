/**
 * Created by MyPC on 15/12/2016.
 */

var INITIALIZE_POPUPHOTLINE = false;

var origin = cc.director.getVisibleOrigin();

var PopupHotLineLayer = cc.LayerColor.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.init();

    },
    init:function(){
        this._super(cc.color(0, 0, 0, 180));

        // var popup = new PopupLayer();
        //
        // popup.init();

        var visibleSize =cc.director.getWinSize();

        // var origin = cc.director.getVisibleOrigin();

        // var backgroundLayer = new cc.LayerColor.create();
        // backgroundLayer.changeWidthAndHeight(visibleSize.width, visibleSize.height);
        // backgroundLayer.setColor(cc.color(0, 0, 220));
        // backgroundLayer.setPosition(cc.p(0, 0));
        // backgroundLayer.setOpacity(0.5);
        // this.addChild(backgroundLayer);

        //create color layer as parameter (color, width and height )
        // var colorLayer = new cc.LayerColor(cc.color(255, 32, 32, 0), visibleSize.width, visibleSize.height);
        // colorLayer.ignoreAnchorPointForPosition(false);
        //
        // //Set Position
        // colorLayer.x = visibleSize.width / 2;
        // colorLayer.y = visibleSize.height / 2;
        //
        // //Add to scene
        // this.addChild(colorLayer);

        // var background = new cc.LayerColor(cc.color(0, 0, 0, 220));
        // background.setOpacity(0);
        // this.addChild(background, 0);


        // var background = new cc.Sprite(cc.color.RED);
        // // background.setContentSize(visibleSize);
        // // background.setPosition(cc.p(0,0));
        // // background.setOpacity(0);
        //
        // this.addChild(background);

        // auto touchListener = cocos2d::EventListenerTouchOneByOne::create();
        // touchListener->setSwallowTouches(true);
        // touchListener->onTouchBegan = [&](cocos2d::Touch* touch, cocos2d::Event* event) {
        //     return true;
        // };
        // _eventDispatcher->addEventListenerWithSceneGraphPriority(touchListener, background);

        // var m_popupLayer = new cc.Layer();
        // //m_popupLayer->setAnchorPoint(Vec2::ANCHOR_MIDDLE);
        // m_popupLayer.setPosition(cc.p(origin.x,origin.y - visibleSize.height));
        // this.addChild(m_popupLayer);


        var backgroundPopup = new cc.Sprite(res.bg_popup);
        backgroundPopup.setPosition(cc.p(visibleSize.width/2, visibleSize.height/2));

        this.addChild(backgroundPopup);

        var bg_title_popup = new cc.Sprite(res.RS_TITLE_POPUP);
        bg_title_popup.setPosition(cc.p(backgroundPopup.getContentSize().width / 2,
            backgroundPopup.getContentSize().height));
        backgroundPopup.addChild(bg_title_popup);

        var backgroundContentSize = backgroundPopup.getContentSize();

        var title = MLabelCreateTitle("HOTLINE",bg_title_popup.getContentSize().height*0.6);
        title.setColor(cc.color.BLACK);
        title.setPosition(bg_title_popup.getContentSize().width / 2 - title.getContentSize().width / 2, bg_title_popup.getContentSize().height / 2 - title.getContentSize().height / 2);
        bg_title_popup.addChild(title);

        var girl_hotline = new cc.Sprite(res.popup_girl_hotline);

        girl_hotline.setPosition(cc.p(girl_hotline.getContentSize().width/2, backgroundPopup.getContentSize().height / 2));
        backgroundPopup.addChild(girl_hotline);

        var width_content = backgroundPopup.getContentSize().width - girl_hotline.getContentSize().width;

        var hotlines = ['0967905505', '0975802329'];

        if (hotlines.length > 0) {
            if(hotlines.length == 1){
                var btn_call1 = MButtonCreate4(res.popup_btn_call, hotlines.length > 0 ? hotlines[0] : "", bg_title_popup.getContentSize().height*0.7, TAG.POPUP_HOTLINE_CALL_SUPPORT1);
                btn_call1.setPosition(cc.p(backgroundPopup.getContentSize().width - width_content / 2 - btn_call1.getContentSize().width/2,
                    backgroundPopup.getContentSize().height / 2 - btn_call1.getContentSize().height / 2));

                // btn_call1.addTouchEventListener(this.menuPopupCallBack, this);
                backgroundPopup.addChild(btn_call1);
            }

            if(hotlines.length == 2){
                var btn_call1 = MButtonCreate4(res.popup_btn_call, hotlines.length > 0 ? hotlines[0] : "",
                    bg_title_popup.getContentSize().height*0.7, TAG.POPUP_HOTLINE_CALL_SUPPORT1);
                btn_call1.setPosition(cc.p(backgroundPopup.getContentSize().width - width_content / 2 - 5 - btn_call1.getContentSize().width,
                    backgroundPopup.getContentSize().height / 2 - btn_call1.getContentSize().height / 2));

                // btn_call1.addTouchEventListener(this.menuPopupCallBack, this);
                backgroundPopup.addChild(btn_call1);

                var btn_call2 = MButtonCreate4(res.popup_btn_call, hotlines.length > 1 ? hotlines[1] : "",
                    bg_title_popup.getContentSize().height*0.7, TAG.POPUP_HOTLINE_CALL_SUPPORT2);
                btn_call2.setPosition(cc.p(backgroundPopup.getContentSize().width - width_content / 2 + 5,
                    backgroundPopup.getContentSize().height / 2 - btn_call2.getContentSize().height / 2));
                // btn_call2.addTouchEventListener(this.menuPopupCallBack, this);
                backgroundPopup.addChild(btn_call2);
            }

        }

        var lb_notify = MLabelCreateTitle("Hỗ trợ chăm sóc khách hàng qua điện thoại viên", bg_title_popup.getContentSize().height / 2);
        lb_notify.setAnchorPoint(cc.p(0.5,0.5));
        lb_notify.setPosition(cc.p(backgroundPopup.getContentSize().width - width_content / 2, 3.0 * backgroundPopup.getContentSize().height / 4));
        backgroundPopup.addChild(lb_notify);

        // var lb_facebook = new cc.Sprite("res/popup_hotline/bg_link_bigken.png");
        // lb_facebook.setAnchorPoint(cc.p(0.5,0.5));
        // lb_facebook.setPosition(cc.p(backgroundPopup.getContentSize().width - width_content / 2, backgroundPopup.getContentSize().height / 4));
        // //backgroundPopup->addChild(lb_facebook);

        // var btn_info = MButtonCreate4("res/popup_hotline/bg_link_bigken.png","KING GAME",bg_title_popup.getContentSize().height/2, TAG.POPUP_HOTLINE_FANPAGE);
        // btn_info.setAnchorPoint(cc.p(0.5,0.5));
        // btn_info.setPosition(cc.p(backgroundPopup.getContentSize().width - width_content / 2, backgroundPopup.getContentSize().height / 4));
        // // btn_info.addTouchEventListener(this.menuPopupCallBack, this);
        // backgroundPopup.addChild(btn_info);

        //btn close
        var exit = MButtonCreate(res.IMAGE_CLOSE, TAG.POPUP_HOTLINE_EXIT);
        exit.setPosition(cc.p(backgroundPopup.getContentSize().width - exit.getContentSize().width *0.6,
        backgroundPopup.getContentSize().height - exit.getContentSize().height *0.6));
        // exit.addTouchEventListener(this.menuPopupCallBack, this);
        backgroundPopup.addChild(exit);

        return true;

    },
    onEnter:function() {
        //this._super() call cc.Node.onEnter()
        // this.setPosition(600,Math.random()*320);
        var spriteAction = new cc.MoveTo(0.15, cc.p(origin.x,origin.y));
        var spriteSequence = new cc.Sequence(spriteAction, null, null);
        this.runAction(spriteSequence);
    }
});

var PopupHotLineScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PopupHotLineLayer();
        this.addChild(layer);
    }
});
