/**
 * Created by MyPC on 12/12/2016.
 */

var PlayLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        this._super();

        var padding = 10;

        var size = cc.winSize;

        var winsize = cc.director.getWinSize();

        //create the background image and position it at the center of screen

        var spriteBG = new cc.Sprite(res.item_background);

        var spriteWidth = spriteBG.getContentSize().width;

        var spriteHeight = spriteBG.getContentSize().height;

        var rows = winsize.width/ spriteWidth + 1;
        var cols = winsize.height/ spriteHeight + 1;
        for(i = 0; i< rows; i++){
            for(j = 0; j<cols; j++){
                var itemSpriteBG = new cc.Sprite(res.item_background);
                var centerPos = cc.p(spriteBG.x + i*spriteWidth, spriteBG.y + j*spriteHeight);
                itemSpriteBG.setPosition(centerPos);
                this.addChild(itemSpriteBG);
            }
        }

        var btnBack = MCreate(res.btn_back_tlmn, TAG.TLMN_BTN_BACK);
        btnBack.setPosition(MVec2(padding - btnBack.getContentSize().height/6, winsize.height - padding - btnBack.getContentSize().height*(1 - 1/6)));
        // btnBack.addTouchEventListener();

        var btnInvitePlay = new MCreate(res.btn_moichoi, TAG.BTN_INVITE_TO_PLAY);
        btnInvitePlay.setPosition(MVec2(padding, winsize.height - 2*padding - btnInvitePlay.getContentSize().height*2));
        btnInvitePlay.addTouchEventListener();

        // var icon_lock = passwordRequired ? "btn_mokhoa.png" : "btn_khoa.png";
        var icon_lock = res.btn_mokhoa;

        var btnKhoa = MCreate(icon_lock, TAG.TLMN_BTN_KHOA);
        btnKhoa.setPosition(MVec2(2*padding + btnKhoa.getContentSize().width, winsize.height - padding - btnKhoa.getContentSize().height));
        // btnKhoa.addTouchEventListener();
        // btnKhoa.setVisible(is_create_room);

        // var title_game = getTitleGame();
        //
        // var lb_title_game = new MLabelCreate(title_game, btnKhoa.getContentSize().height*0.35, cc.p(10,175,244), true);
        // lb_title_game.setAnchorPoint(cc.p(0,1));
        // var posx_titlegame = is_create_room ? (btnKhoa.getPositionX() + btnKhoa.getContentSize().width + padding) : (btnInvitePlay.getPositionX() + btnKhoa.getContentSize().width + padding);
        // lb_title_game.setPosition(cc.p(posx_titlegame, originY + winsize.height - padding));
        // this.addChild(lb_title_game);

        var btn_caidat = MCreate(res.btn_caidat, TAG.TLMN_BTN_CAIDAT);
        btn_caidat.setPosition(MVec2(winsize.width - padding - btn_caidat.getContentSize().width, winsize.height - btn_caidat.getContentSize().height - padding));
        // btn_caidat.addTouchEventListener();

        var btn_menu = MCreate(res.btn_menu, TAG.TLMN_BTN_MENU);
        btn_menu.setPosition(cc.p(originX+padding, originY+winsize.height - btn_menu.getContentSize().height - padding));
        // btn_menu.addTouchEventListener();

        var btn_message = MCreate(res.btn_message, TAG.TLMN_BTN_MESSAGE);
        btn_message.setPosition(MVec2(winsize.width - btn_message.getContentSize().width - padding, padding));
        // btn_message.addTouchEventListener();

        var btn_purcharse = MCreate(res.btn_purcharse, TAG.TLMN_BTN_PURCHASE);
        btn_purcharse.setPosition(cc.p(btn_caidat.getPositionX() - padding - btn_purcharse.getContentSize().width,
            btn_caidat.getPositionY()));
        // btn_purcharse.addTouchEventListener();

        var btn_facebook = MCreate(res.btn_facebook, TAG.TLMN_BTN_FACEBOOK);
        btn_facebook.setPosition(cc.p(btn_purcharse.getPositionX() - padding - btn_facebook.getContentSize().width,
            btn_purcharse.getPositionY()));
        // btn_facebook.addTouchEventListener();


        this.addChild(btnBack);
        this.addChild(btnKhoa);
        this.addChild(btnInvitePlay);
        this.addChild(btn_message);
        this.addChild(btn_purcharse);
        this.addChild(btn_caidat);

        // var scrollView = new ccui.ScrollView();
        // scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        // scrollView.setContentSize(cc.size(1280, 720));
        // scrollView.setInnerContainerSize(cc.size(2560, 720));
        // scrollView.setBackGroundColorOpacity(0);
        // scrollView.setBounceEnabled(true);
        // scrollView.setTouchEnabled(true);
        // scrollView.setAnchorPoint(cc.p(0.5, 0.5));
        // scrollView.setPosition(cc.p(size.width / 2, size.height/ 2));
        // for (var i = 0; i < 12; i++){
        //     var gamephom = new ccui.Button(res.btn_phom)
        //     gamephom.setPosition(cc.p(gamephom.getContentSize().width *1.7,
        //         size.height - gamephom.getContentSize().height * 1.3));
        //     gamephom.addTouchEventListener(this.touchEvent, this);
        //     scrollView.addChild(gamephom);
        //
        //     var gameTLMN = new ccui.Button(res.btn_tlmn)
        //     gameTLMN.setPosition(cc.p(gamephom.getContentSize().width *1.7,
        //         size.height - gamephom.getContentSize().height*2.3));
        //     gameTLMN.addTouchEventListener(this.touchEvent, this);
        //     scrollView.addChild(gameTLMN);
        //
        //     var gamexocdia = new ccui.Button(res.btn_xocdia);
        //     gamexocdia.setPosition(cc.p(gamephom.getContentSize().width * 4,
        //         size.height - gamephom.getContentSize().height*2.3));
        //     gamexocdia.addTouchEventListener(this.touchEvent, this);
        //     scrollView.addChild(gamexocdia);
        //
        //     var gamesam = new ccui.Button(res.btn_sam);
        //     gamesam.setPosition(cc.p(gamephom.getContentSize().width *2.9,
        //         size.height - gamephom.getContentSize().height*2.3));
        //     gamesam.addTouchEventListener(this.touchEvent, this);
        //     scrollView.addChild(gamesam);
        //
        //     var gametala = new ccui.Button(res.btn_tala);
        //     gametala.setPosition(cc.p( gamephom.getContentSize().width * 4,
        //         size.height - gamephom.getContentSize().height * 1.3));
        //     gametala.addTouchEventListener(this.touchEvent, this);
        //     scrollView.addChild(gametala);
        //
        //     var gamexito = new ccui.Button(res.btn_xito);
        //     gamexito.setPosition(cc.p(gamephom.getContentSize().width *2.9,
        //         size.height - gamephom.getContentSize().height * 1.3));
        //     gamexito.addTouchEventListener(this.touchEvent, this);
        //     scrollView.addChild(gamexito);
        // }
        // this.addChild(scrollView, 1);
        //
        // var chaomung = new cc.Sprite(res.chaomung);
        // chaomung.setPosition(cc.p(size.width /2,
        //     size.height - chaomung.getContentSize().height));
        // chaomung.setScaleX(1.35)
        // this.addChild(chaomung, 2);
        //
        // var loa = new  cc.Sprite(res.loa);
        // loa.setPosition(cc.p(chaomung.getContentSize().width / 2.5, size.height - chaomung.getContentSize().height));
        // this.addChild(loa, 2);
        //
        // var label = new cc.LabelTTF("Chào mừng bạn đã đến với Game Bài Đổi Thưởng BigKen Online", "Arial");
        // label.setPosition(cc.p(chaomung.getContentSize().width, size.height - chaomung.getContentSize().height));
        // label.setColor(cc.color(255, 255, 255));
        // label.setFontSize(25);
        // this.addChild(label,100);
        //
        // var menu = new cc.Sprite(res.menu);
        // menu.setPosition(cc.p(size.width / 2, menu.getContentSize().height / 2));
        // this.addChild(menu, 2);
        //
        // var back = new ccui.Button(res.btn_back);
        // back.setPosition(cc.p(back.getContentSize().width / 2,
        //     size.height - back.getContentSize().height / 2));
        // back.setTag(1);
        // back.addTouchEventListener(this.touchEvent, this);
        // this.addChild(back, 2);
        //
        // var phone = new ccui.Button(res.btn_phone);
        // phone.setPosition(cc.p(phone.getContentSize().width / 1.55,
        //     size.height - back.getContentSize().height / 2 + 5));
        // phone.setTag(2);
        // phone.addTouchEventListener(this.touchEvent, this);
        // this.addChild(phone, 2);
        //
        // var homthu = new ccui.Button(res.btn_homthu);
        // homthu.setPosition(cc.p(size.width - homthu.getContentSize().width / 2,
        //     size.height - homthu.getContentSize().height / 2));
        // homthu.addTouchEventListener(this.touchEvent, this);
        // this.addChild(homthu, 2);
        //
        // var DoiThuong = new ccui.Button(res.btn_doithuong);
        // DoiThuong.setPosition(cc.p(size.width / 2, DoiThuong.getContentSize().height / 2));
        // // DoiThuong.addTouchEventListener(this.touchEvent, this);
        // this.addChild(DoiThuong, 2);
        //
        // var caidat = new ccui.Button(res.btn_caidat);
        // caidat.setPosition(cc.p(size.width - caidat.getContentSize().width / 2,
        //     caidat.getContentSize().height / 2));
        // this.addChild(caidat, 2);
        //
        // var banbe = new ccui.Button(res.btn_banbe);
        // banbe.setPosition(cc.p(size.width - caidat.getContentSize().width - banbe.getContentSize().width * 1.5,
        //     banbe.getContentSize().height / 2));
        // this.addChild(banbe, 2);
        //
        // var xephang = new ccui.Button(res.btn_xephang);
        // xephang.setPosition(cc.p(size.width - caidat.getContentSize().width - banbe.getContentSize().width
        //     - xephang.getContentSize().width*1.7, xephang.getContentSize().height / 2));
        // this.addChild(xephang, 2);
        //
        // var napxu = new ccui.Button(res.btn_napxu);
        // napxu.setPosition(cc.p(size.width - caidat.getContentSize().width - banbe.getContentSize().width
        //     - xephang.getContentSize().width - napxu.getContentSize().width*3, napxu.getContentSize().height / 2));
        // this.addChild(napxu, 2);
        //
        // var khungavatar= new cc.Sprite(res.btn_avatar);
        // khungavatar.setPosition(cc.p( khungavatar.getContentSize().width / 2,
        //     khungavatar.getContentSize().height / 2));
        // this.addChild(khungavatar, 2);
        //
        // var label1 = new cc.LabelTTF("NganNguyen", "Arial");
        // label1.setFontSize(30);
        // label1.setPosition(cc.p(khungavatar.getContentSize().width + label1.getContentSize().width / 1.8,
        //     khungavatar.getContentSize().height - label1.getContentSize().height / 2));
        // this.addChild(label1, 100);
        //
        // var label2 = new cc.LabelTTF("ID:25251325", "Arial");
        // label2.setFontSize(25);
        // label2.setPosition(cc.p(khungavatar.getContentSize().width + label1.getContentSize().width / 1.8,
        //     label2.getContentSize().height / 1.5));
        // this.addChild(label2,100);
        //
        // var vip = new cc.Sprite(res.vip);
        // vip.setPosition(cc.p( khungavatar.getContentSize().width + label1.getContentSize().width / 1.8,
        //     menu.getContentSize().height / 2));
        // this.addChild(vip, 2);
        //
        // var tienken = new cc.Sprite(res.xu);
        // tienken.setPosition(cc.p(size.width / 2 - tienken.getContentSize().width * 1.2,
        //     tienken.getContentSize().height * 2));
        // tienken.setScale(0.8);
        // this.addChild(tienken, 2);
        //
        // var tienxu = new cc.Sprite(res.xu);
        // tienxu.setPosition(cc.p(size.width / 2 - tienxu.getContentSize().width * 1.2,
        //     tienxu.getContentSize().height / 1.5));
        // tienxu.setScale(0.8);
        // this.addChild(tienxu, 2);
        //
        //
        // var nextleft = new ccui.Button(res.btn_next1);
        // nextleft.setPosition(cc.p( nextleft.getContentSize().width,
        //     size.height / 2));
        // this.addChild(nextleft, 2);
        //
        // var nextright = new ccui.Button(res.btn_next);
        // nextright.setPosition(cc.p(size.width - nextright.getContentSize().width / 2,
        //     size.height / 2));
        // this.addChild(nextright, 2);

        return true;
    },

    touchEvent:function (sender, type) {
        if(type == ccui.Widget.TOUCH_ENDED){
            switch (sender.tag){
                case 1:
                    cc.director.runScene(new LoginScene());
                    break;
                case 2:
                    cc.log("phone");
                    cc.director.pushScene(new PopupScene());
                    break;
                default:
                    break;
            }
        }
        // switch (type){
        //     case ccui.Widget.TOUCH_BEGAN:
        //         cc.log("Touch Began");
        //         break;
        //     case  ccui.Widget.TOUCH_ENDED:
        //         cc.director.runScene(new LoginScene());
        //         break;
        //     case ccui.Widget.TOUCH_MOVED:
        //         cc.log("Touch Moved");
        //         break;
        //     case ccui.Widget.TOUCH_CANCELED:
        //         cc.log("Touch Cancel");
        //         break;
        // }

    }

});

var PlayScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PlayLayer();
        this.addChild(layer);
    }
});

