/**
 * Created by MyPC on 17/01/2017.
 */


var RegisterLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        setGameState(GAME_STATE.REGISTER_SCENE);

        var spriteBG = new cc.Sprite(res.item_background);

        var spriteWidth = spriteBG.getContentSize().width;

        var spriteHeight = spriteBG.getContentSize().height;

        var rows = visibleSize.width/ spriteWidth + 1;
        var cols = visibleSize.height/ spriteHeight + 1;
        for(i = 0; i< rows; i++){
            for(j = 0; j<cols; j++){
                var itemSpriteBG = new cc.Sprite(res.item_background);
                var centerPos = cc.p(spriteBG.x + i*spriteWidth, spriteBG.y + j*spriteHeight);
                itemSpriteBG.setPosition(centerPos);
                this.addChild(itemSpriteBG);
            }
        }

        var bkg = MSprite.createWithSize("sprite_background_login.png",visibleSize);
        bkg.setPosition(MVec2(0,0));
        this.addChild(bkg);

        // initMenu();

        var sprite_card = MSprite.create(res.LOGIN_SPRITE_CARD);
        var scale = 0.9*height / sprite_card.getHeight();
        sprite_card.setScale(scale);
        sprite_card.setPosition(cc.p(originX, originY));
        this.addChild(sprite_card);

        //girl
        var girl = MSprite.create(res.LOGIN_SPRITE_GIRL);
        girl.setScale(0.9*height / girl.getHeight());
        // girl.setAnchorPoint(ANCHOR_MIDDLE_BOTTOM);
        girl.setPosition(cc.p(originX + sprite_card.getWidth() * scale / 2, originY));
        this.addChild(girl);
        //==================================== Buttons

        var sprite_edit_password = MSprite.create(res.LOGIN_EDIT_PASSWORD);
        var positionX = width / 2 + 70;

        //register Button
        var btn_register = MButton.create("res/btn_dang_ky.png", TXT.LOGIN_BTN_REGISTER, 20, TAG.REG_BTN_REGISTER);
        btn_register.setPosition(MVec2(positionX //+ sprite_edit_password->getWidth() / 2 - btn_register->getWidth() / 2
            , height / 2 - btn_register.getHeight() * 4 - 15));
        btn_register.setZoomScale(0.01);
        btn_register.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_register);

        var background_nhap_register = MSprite.create(res.LOGIN_EDIT_PASSWORD);

        // btn back
        var btn_back = MButton.create(res.btn_back_tlmn,TAG.REG_BTN_BACK);
        btn_back.setPosition(MVec2(15 - btn_back.getHeight()/6,
            height - 15 - btn_back.getHeight()*(1.0-1.0/6)));
        btn_back.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_back);

        //==================================== Text Field

        // var nhap_sdt = MEditBox.create(background_nhap_register.getContentSize(),
        //     res.LOGIN_EDIT_PASSWORD, background_nhap_register.getHeight() / 3);
        // nhap_sdt.setPosition(cc.p(originX + positionX,
        //     btn_register.getPositionY() + btn_register.getHeight() + background_nhap_register.getHeight() / 3 + 40));
        // nhap_sdt.setPlaceHolder("Nhập tên hiển thị");
        // nhap_sdt.setMaxLength(REGISTER.MAX_LENGTH_SDT);
        // nhap_sdt.setTag(TAG.REG_EDITBOX_NHAP_SDT);
        // nhap_sdt.setDelegate(this);
        // nhap_sdt.setPlaceholderFontColor(cc.color.BLACK);
        // nhap_sdt.setFont("fonts/font_title.otf", background_nhap_register.getHeight() / 3);
        // nhap_sdt.setPlaceholderFont("fonts/font_title.otf", background_nhap_register.getHeight() / 3);
        // nhap_sdt.setFontColor(cc.color.BLACK);
        // nhap_sdt.setInputMode(EditBox.EDITBOX_INPUT_MODE_SINGLELINE);
        // this.addChild(nhap_sdt);
        //
        // var nhaplai_matkhau = MEditBox.create(background_nhap_register.getContentSize(),
        //     res.LOGIN_EDIT_PASSWORD,background_nhap_register.getHeight()/3);
        // nhaplai_matkhau.setPosition(cc.p(nhap_sdt.getPositionX(),
        //     nhap_sdt.getPositionY() + nhap_sdt.getHeight() + 20));
        // nhaplai_matkhau.setPlaceHolder("Nhập lại mật khẩu");
        // nhaplai_matkhau.setMaxLength(12);
        // nhaplai_matkhau.setTag(TAG.REG_EDITBOX_NHAPLAI_MATKHAU);
        // nhaplai_matkhau.setInputFlag(EditBox.EDITBOX_INPUT_FLAG_PASSWORD);
        // nhaplai_matkhau.setDelegate(this);
        // nhaplai_matkhau.setFontColor(cc.color.BLACK);
        // this.addChild(nhaplai_matkhau);
        //
        // // editbox nhap mat khau
        //
        // var nhap_matkhau = MEditBox.create(background_nhap_register.getContentSize(),
        //     res.LOGIN_EDIT_PASSWORD,background_nhap_register.getHeight()/3);
        // nhap_matkhau.setPosition(cc.p(nhap_sdt.getPositionX(),
        //     nhaplai_matkhau.getPositionY()+nhaplai_matkhau.getHeight()+20));
        // nhap_matkhau.setPlaceHolder("Nhập mật khẩu");
        // nhap_matkhau.setMaxLength(12);
        // nhap_matkhau.setTag(TAG.REG_EDITBOX_NHAP_MATKHAU);
        // nhap_matkhau.setInputFlag(EditBox.EDITBOX_INPUT_FLAG_PASSWORD);
        // nhap_matkhau.setDelegate(this);
        // nhap_matkhau.setFontColor(cc.color.BLACK);
        // this.addChild(nhap_matkhau);
        //
        // // editbox ten dang nhap
        //
        // var nhap_ten = MEditBox.create(background_nhap_register.getContentSize(),
        //     res.LOGIN_EDIT_PASSWORD,background_nhap_register.getHeight()/3);
        // nhap_ten.setPosition(cc.p(nhap_sdt.getPositionX(),
        //     nhap_matkhau.getPositionY()+nhap_matkhau.getHeight()+20));
        // nhap_ten.setPlaceHolder("Tên đăng nhập");
        // nhap_ten.setMaxLength(REGISTER.MAX_LENGTH_USERNAME);
        // nhap_ten.setTag(TAG.REG_EDITBOX_NHAP_TEN);
        // nhap_ten.setDelegate(this);
        // nhap_ten.setFontColor(cc.color.BLACK);
        // this.addChild(nhap_ten);

        // var bigken = MSprite.create(LOGIN.SPRITE_BIGKEN);
        // bigken.setPosition(cc.p(nhap_sdt.getPositionX() + nhap_ten.getWidth() / 2 - bigken.getWidth() / 2,
        //     nhap_ten.getPositionY() + nhap_ten.getHeight() + 20));
        // this.addChild(bigken);

        // this.scheduleUpdate();

        return true;
    }
});

// var initMenu = function(){
//
//     var sprite_card = MSprite.create(res.LOGIN_SPRITE_CARD);
//     var scale = 0.9*height / sprite_card.getHeight();
//     sprite_card.setScale(scale);
//     sprite_card.setPosition(cc.p(originX, originY));
//     this.addChild(sprite_card);
//
//     //girl
//     var girl = MSprite.create(res.LOGIN_SPRITE_GIRL);
//     girl.setScale(0.9*height / girl.getHeight());
//     // girl.setAnchorPoint(ANCHOR_MIDDLE_BOTTOM);
//     girl.setPosition(cc.p(originX + sprite_card.getWidth() * scale / 2, originY));
//     this.addChild(girl);
//     //==================================== Buttons
//
//     var sprite_edit_password = MSprite.create(res.LOGIN_EDIT_PASSWORD);
//     var positionX = width / 2 + 70;
//
//     //register Button
//     var btn_register = MButton.create("res/btn_dang_ky.png", TXT.LOGIN_BTN_REGISTER, 20, TAG.REG_BTN_REGISTER);
//     btn_register.setPosition(MVec2(positionX //+ sprite_edit_password->getWidth() / 2 - btn_register->getWidth() / 2
//         , height / 2 - btn_register.getHeight() * 4 - 15));
//     btn_register.setZoomScale(0.01);
//     btn_register.addTouchEventListener(this.menuCallBack, this);
//     this.addChild(btn_register);
//
//     var background_nhap_register = MSprite.create(res.LOGIN_EDIT_PASSWORD);
//
//     // btn back
//     var btn_back = MButton.create(res.btn_back_tlmn,TAG.REG_BTN_BACK);
//     btn_back.setPosition(MVec2(15 - btn_back.getHeight()/6,
//         height - 15 - btn_back.getHeight()*(1.0-1.0/6)));
//     btn_back.addTouchEventListener(this.menuCallBack, this);
//     this.addChild(btn_back);
//
//     /*auto text_notify = MLabel::create(TXT_REGISTER_LABEL_NOTIFY, btn_register->getHeight() / 4);
//      text_notify->setPosition(Vec2(originX + positionX + sprite_edit_password->getWidth() / 2 - text_notify->getWidth() / 2,
//      btn_register->getPosition().y + btn_register->getHeight() + 20));
//      this->addChild(text_notify);*/
//
//     //==================================== Text Field
//
//     var nhap_sdt = MEditBox.create(background_nhap_register.getContentSize(),
//         res.LOGIN_EDIT_PASSWORD, background_nhap_register.getHeight() / 3);
//     nhap_sdt.setPosition(cc.p(originX + positionX,
//         btn_register.getPositionY() + btn_register.getHeight() + background_nhap_register.getHeight() / 3 + 40));
//     nhap_sdt.setPlaceHolder("Nhập tên hiển thị");
//     nhap_sdt.setMaxLength(REGISTER.MAX_LENGTH_SDT);
//     nhap_sdt.setTag(TAG.REG_EDITBOX_NHAP_SDT);
//     nhap_sdt.setDelegate(this);
//     nhap_sdt.setPlaceholderFontColor(cc.color.BLACK);
//     nhap_sdt.setFont("fonts/font_title.otf", background_nhap_register.getHeight() / 3);
//     nhap_sdt.setPlaceholderFont("fonts/font_title.otf", background_nhap_register.getHeight() / 3);
//     nhap_sdt.setFontColor(cc.color.BLACK);
//     nhap_sdt.setInputMode(EditBox.EDITBOX_INPUT_MODE_SINGLELINE);
//     this.addChild(nhap_sdt);
//
//     var nhaplai_matkhau = MEditBox.create(background_nhap_register.getContentSize(),
//         res.LOGIN_EDIT_PASSWORD,background_nhap_register.getHeight()/3);
//     nhaplai_matkhau.setPosition(cc.p(nhap_sdt.getPositionX(),
//         nhap_sdt.getPositionY() + nhap_sdt.getHeight() + 20));
//     nhaplai_matkhau.setPlaceHolder("Nhập lại mật khẩu");
//     nhaplai_matkhau.setMaxLength(12);
//     nhaplai_matkhau.setTag(TAG.REG_EDITBOX_NHAPLAI_MATKHAU);
//     nhaplai_matkhau.setInputFlag(EditBox.EDITBOX_INPUT_FLAG_PASSWORD);
//     nhaplai_matkhau.setDelegate(this);
//     nhaplai_matkhau.setFontColor(cc.color.BLACK);
//     this.addChild(nhaplai_matkhau);
//
//     // editbox nhap mat khau
//
//     var nhap_matkhau = MEditBox.create(background_nhap_register.getContentSize(),
//         res.LOGIN_EDIT_PASSWORD,background_nhap_register.getHeight()/3);
//     nhap_matkhau.setPosition(cc.p(nhap_sdt.getPositionX(),
//         nhaplai_matkhau.getPositionY()+nhaplai_matkhau.getHeight()+20));
//     nhap_matkhau.setPlaceHolder("Nhập mật khẩu");
//     nhap_matkhau.setMaxLength(12);
//     nhap_matkhau.setTag(TAG.REG_EDITBOX_NHAP_MATKHAU);
//     nhap_matkhau.setInputFlag(EditBox.EDITBOX_INPUT_FLAG_PASSWORD);
//     nhap_matkhau.setDelegate(this);
//     nhap_matkhau.setFontColor(cc.color.BLACK);
//     this.addChild(nhap_matkhau);
//
//     // editbox ten dang nhap
//
//     var nhap_ten = MEditBox.create(background_nhap_register.getContentSize(),
//         res.LOGIN_EDIT_PASSWORD,background_nhap_register.getHeight()/3);
//     nhap_ten.setPosition(cc.p(nhap_sdt.getPositionX(),
//         nhap_matkhau.getPositionY()+nhap_matkhau.getHeight()+20));
//     nhap_ten.setPlaceHolder("Tên đăng nhập");
//     nhap_ten.setMaxLength(REGISTER.MAX_LENGTH_USERNAME);
//     nhap_ten.setTag(TAG.REG_EDITBOX_NHAP_TEN);
//     nhap_ten.setDelegate(this);
//     nhap_ten.setFontColor(cc.color.BLACK);
//     this.addChild(nhap_ten);
//
//     var bigken = MSprite.create(LOGIN.SPRITE_BIGKEN);
//     bigken.setPosition(cc.p(nhap_sdt.getPositionX() + nhap_ten.getWidth() / 2 - bigken.getWidth() / 2,
//         nhap_ten.getPositionY() + nhap_ten.getHeight() + 20));
//     this.addChild(bigken);
// }

var RegisterScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new RegisterLayer();
        this.addChild(layer);
    }
});


