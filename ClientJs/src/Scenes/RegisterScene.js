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

        cc.log("sys", cc.sys.os);

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

        var bkg = MSprite.createWithSize("res/sprite_background_login.png",visibleSize);
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
        var btn_register = MButton.createWithText("res/btn_dang_ky.png", TXT.LOGIN_BTN_REGISTER, TAG.REG_BTN_REGISTER);
        btn_register.setPosition(MVec2(positionX , height / 2 - btn_register.getHeight() * 4 - 15));
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

        // var nhap_sdt = MEditBox.create(cc.size(background_nhap_register.getContentSize()),
        //     res.LOGIN_EDIT_PASSWORD, background_nhap_register.getHeight() / 3);
        this.nhap_sdt = new cc.EditBox(cc.size(background_nhap_register.getContentSize()),
            new cc.Scale9Sprite(res.LOGIN_EDIT_PASSWORD));
        this.nhap_sdt.setPosition(cc.p(originX + positionX,
            btn_register.getPositionY() + btn_register.getHeight() + background_nhap_register.getHeight() / 3 + 40));
        this.nhap_sdt.setPlaceHolder("Nhập tên hiển thị");
        this.nhap_sdt.setMaxLength(REGISTER.MAX_LENGTH_SDT);
        this.nhap_sdt.setTag(TAG.REG_EDITBOX_NHAP_SDT);
        this.nhap_sdt.setDelegate(this);
        this.nhap_sdt.setPlaceholderFontColor(cc.color.BLACK);
        this.nhap_sdt.setFont("fonts/font_title.otf", background_nhap_register.getHeight() / 3);
        this.nhap_sdt.setPlaceholderFont("fonts/font_title.otf", background_nhap_register.getHeight() / 3);
        this.nhap_sdt.setFontColor(cc.color.BLACK);
        this.nhap_sdt.setInputMode(cc.EDITBOX_INPUT_MODE_SINGLELINE);
        this.addChild(this.nhap_sdt);

        this.nhaplai_matkhau = new cc.EditBox(cc.size(background_nhap_register.getContentSize()),
            new cc.Scale9Sprite(res.LOGIN_EDIT_PASSWORD));
        this.nhaplai_matkhau.setPosition(cc.p(this.nhap_sdt.getPositionX(),
            this.nhap_sdt.getPositionY() + this.nhap_sdt.getContentSize().height + 20));
        this.nhaplai_matkhau.setPlaceHolder("Nhập lại mật khẩu");
        this.nhaplai_matkhau.setMaxLength(12);
        this.nhaplai_matkhau.setTag(TAG.REG_EDITBOX_NHAPLAI_MATKHAU);
        this.nhaplai_matkhau.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.nhaplai_matkhau.setDelegate(this);
        this.nhaplai_matkhau.setFontColor(cc.color.BLACK);
        this.addChild(this.nhaplai_matkhau);

        // editbox nhap mat khau

        this.nhap_matkhau = new cc.EditBox(cc.size(background_nhap_register.getContentSize()),
            new cc.Scale9Sprite(res.LOGIN_EDIT_PASSWORD));
        this.nhap_matkhau.setPosition(cc.p(this.nhap_sdt.getPositionX(),
            this.nhaplai_matkhau.getPositionY()+this.nhaplai_matkhau.getContentSize().height+20));
        this.nhap_matkhau.setPlaceHolder("Nhập mật khẩu");
        this.nhap_matkhau.setMaxLength(12);
        this.nhap_matkhau.setTag(TAG.REG_EDITBOX_NHAP_MATKHAU);
        this.nhap_matkhau.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.nhap_matkhau.setDelegate(this);
        this.nhap_matkhau.setFontColor(cc.color.BLACK);
        this.addChild(this.nhap_matkhau);

        // editbox ten dang nhap

        this.nhap_ten = new cc.EditBox(cc.size(background_nhap_register.getContentSize()),
            new cc.Scale9Sprite(res.LOGIN_EDIT_PASSWORD));
        this.nhap_ten.setPosition(cc.p(this.nhap_sdt.getPositionX(),
            this.nhap_matkhau.getPositionY()+this.nhap_matkhau.getContentSize().height+20));
        this.nhap_ten.setPlaceHolder("Tên đăng nhập");
        this.nhap_ten.setMaxLength(REGISTER.MAX_LENGTH_USERNAME);
        this.nhap_ten.setTag(TAG.REG_EDITBOX_NHAP_TEN);
        this.nhap_ten.setDelegate(this);
        this.nhap_ten.setFontColor(cc.color.BLACK);
        this.addChild(this.nhap_ten);

        var bigken = MSprite.create(LOGIN.SPRITE_BIGKEN);
        bigken.setPosition(cc.p(this.nhap_sdt.getPositionX() + this.nhap_ten.getContentSize().width / 2 - bigken.getWidth() / 2,
            this.nhap_ten.getPositionY() + this.nhap_ten.getContentSize().height + 20));
        this.addChild(bigken);

        // this.scheduleUpdate();

        ws.onmessage = this.registerResponse.bind(this);

        return true;
    },
    menuCallBack : function(sender,type) {
        if(type == ccui.Widget.TOUCH_ENDED){
            var tag = sender.tag;
            cc.log("tag", tag);
            // SoundManager::getInstance()->playSound("sounds/button_click.mp3");
            switch (tag) {
                case TAG.REG_BTN_REGISTER:
                {
                    cc.log("tag", tag);
                    this.signup();
                }
                    break;
                case TAG.REG_BTN_BACK:
                {
                    var loginscene = new LoginScene();
                    cc.director.runScene(loginscene);
                }
                    break;
                default:
                    break;
            }
        }
    },
    signup: function() {

        // if (user_id_str_register.empty() || password_str_register.empty()
        //     || re_password_str_register.empty()){
        //     PopupMessageBox* popupMessage = new PopupMessageBox();
        //     popupMessage->showPopup(BLANK_USERNAME);
        //     return;
        // }
        // if (user_id_str_register.length() < MIN_LENGTH_USERNAME
        //     || user_id_str_register.length() > MAX_LENGTH_USERNAME){
        //     PopupMessageBox* popupMessage = new PopupMessageBox();
        //     popupMessage->showPopup(INVALID_USERNAME);
        //     return;
        // }
        //
        // int space_pos = (int)user_id_str_register.find(' ');
        // if (space_pos != -1) {
        //     PopupMessageBox* popupMessage = new PopupMessageBox();
        //     popupMessage->showPopup("Tài khoản không được để dấu cách!");
        //     return;
        // }
        // if (password_str_register.length() < MIN_LENGTH_PASSWORD
        //     || password_str_register.length() > MAX_LENGTH_PASSWORD){
        //     PopupMessageBox* popupMessage = new PopupMessageBox();
        //     popupMessage->showPopup(INVALID_PASSWORD);
        //     return;
        // }
        //
        // if (sdt_str_register.empty()){
        //     PopupMessageBox* popupMessage = new PopupMessageBox();
        //     popupMessage->showPopup("Vui lòng nhập tên hiển thị!");
        //     return;
        // }
        //
        // if (Common::getInstance()->iequals(sdt_str_register, user_id_str_register)){
        //     PopupMessageBox* popupMessage = new PopupMessageBox();
        //     popupMessage->showPopup("Tên hiển thị không được trùng với tên đăng nhập");
        //     return;
        // }

        var user_id_str_register = this.nhap_ten.getString();
        var password_str_register = this.nhap_matkhau.getString();
        var re_password_str_register = this.nhaplai_matkhau.getString();
        var sdt_str_register = this.nhap_sdt.getString();

        cc.log(user_id_str_register, password_str_register, re_password_str_register, sdt_str_register);

        if (password_str_register == re_password_str_register){
            getRegisterMessageFromServer(
                user_id_str_register, password_str_register, re_password_str_register, sdt_str_register, "");
        }
        else {
            // PopupMessageBox* popupMessage = new PopupMessageBox();
            // popupMessage->showPopup(PASSWORD_NOT_MATCH);
        }
    },
    registerResponse: function(e) {
        cc.log("data 1", e);
        if(e.data!==null || e.data !== 'undefined')
        {
            var listMessages = parseFrom(e.data, e.data.byteLength);
            while(listMessages.length > 0) {
                var buffer = listMessages.shift();
                this.registerhandleMessage(buffer);
            }
        }
    },
    registerhandleMessage: function(e) {
        var buffer = e;
        switch (buffer.message_id) {
            case NetworkManager.REGISTER:
                var msg = buffer.response;
                cc.log("message :" , msg);
                registerResponseHandler(msg);
                break;
        }
    }


});

var registerResponseHandler = function(loginresponse) {
    if (loginresponse != 0) {
        cc.log("login response: ", loginresponse);
        if (loginresponse.responseCode) {
            var session_id = loginresponse.sessionId;
            // setStringForKey(
            //     Common.KEY_SESSION_ID, loginresponse.sessionId);
            //
            // setIntegerForKey(
            //     Common.KEY_USER_ID, loginresponse.userInfo.userId);
            cc.log("userInfo", loginresponse.userInfo);
            // if (loginresponse.has_userinfo()) {
                saveUserInfo(loginresponse.userInfo);
            // }
            // if (loginresponse.has_usersetting()) {
                saveUserSetting(loginresponse.userSetting);
            // }
            if (!loginresponse.hasplayingmatch()) {
                // setPrefString(USER_NAME, user_id_str_register);
                // setPrefString(USER_PASSWORD, password_str_register);
                var showgame = ShowGameScene();
                cc.Director.run(showgame);
            }
        }
        else {
            //cocos2d::MessageBox(loginresponse->message().c_str(), "Đăng ký");
            // PopupMessageBox* popupMessage = new PopupMessageBox();
            // popupMessage->showPopup(loginresponse->message().c_str());
        }
    }
}

var RegisterScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new RegisterLayer();
        this.addChild(layer);
    }
});


