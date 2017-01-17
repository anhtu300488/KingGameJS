/**
 * Created by MyPC on 12/12/2016.
 */

var LoginLayer = cc.Layer.extend({
    loginType:null,
    eboxNhapTK:null,
    eboxNhapMK:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.init();

    },
    init:function(){
        this._super();

        var spriteBG = new cc.Sprite(res.COMMON.SPRITE_ITEM_BACKGROUND);

        var spriteWidth = spriteBG.getContentSize().width;

        var spriteHeight = spriteBG.getContentSize().height;

        var rows = visibleSize.width/ spriteWidth + 1;
        var cols = visibleSize.height/ spriteHeight + 1;
        for(var i = 0; i< rows; i++){
            for(var j = 0; j<cols; j++){
                var itemSpriteBG = new cc.Sprite(res.COMMON.SPRITE_ITEM_BACKGROUND);
                var centerPos = cc.p(spriteBG.x + i*spriteWidth, spriteBG.y + j*spriteHeight);
                itemSpriteBG.setPosition(centerPos);
                this.addChild(itemSpriteBG);
            }
        }

        var light_bkg = MSprite.createWithSize(res.SPRITE_LIGHT,visibleSize);
        light_bkg.setAnchorPoint(cc.p(0,0));
        light_bkg.setPosition(cc.p(0, 0));
        this.addChild(light_bkg);

        var pageView = new ccui.PageView();
        pageView.setTouchEnabled(true);
        pageView.setContentSize(cc.size(400, 800));
        pageView.setAnchorPoint(cc.p(0.5, 0.5));
        pageView.x = pageView.getContentSize().width - 70;
        pageView.y = width - pageView.getContentSize().height - 135;

        for (var i = 0; i < 5; i++)
        {
            var layout = new ccui.Layout();

            var imageView = new ccui.ImageView();
            imageView.loadTexture(res.LOGIN.SPRITE_GIRL);
            imageView.x = pageView.width / 2;
            imageView.y = pageView.height / 2;
            layout.addChild(imageView);

            var  text = new ccui.Text();
            text.String = "Page" + (i+1);
            text.font = "30px 'Marker Felt'";
            text.color = cc.color(0, 0, 0);
            text.x = pageView.width / 2;
            text.y = pageView.height / 2 + 100;
            layout.addChild(text, 10);

            pageView.addPage(layout);
        }
        this.addChild(pageView);

        var btn_login_facebook = MButton.createWithText(res.LOGIN.BTN_FACEBOOK,TXT.LOGIN_BTN_FACEBOOK,TAG.LOGIN.BTN_LOGIN_FB);
        btn_login_facebook.setPosition(MVec2(width-btn_login_facebook.getWidth() *5/4,
            height/2-btn_login_facebook.getHeight()*(3 + 3*0.2)));
        btn_login_facebook.setZoomScale(0.01);
        btn_login_facebook.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_login_facebook);

        //choi ngay
        var btn_playnow = MButton.createWithText(res.LOGIN.BTN_CHOI_NGAY,TXT.LOGIN_BTN_PLAYNOW,TAG.LOGIN.BTN_LOGIN_GOOGLE);
        btn_playnow.setPosition(cc.p(btn_login_facebook.getPosition().x,
            btn_login_facebook.getPosition().y + btn_login_facebook.getHeight()*1.2));
        btn_playnow.addTouchEventListener( this.menuCallBack,this);
        this.addChild(btn_playnow);

        //đăng nhập
        var btn_login = MButton.createWithText(res.LOGIN.BTN_LOGIN,TXT.LOGIN_BTN_LOGIN ,TAG.LOGIN.BTN_LOGIN);
        btn_login.setPosition(cc.p(btn_playnow.getPosition().x,
            btn_playnow.getPosition().y + btn_playnow.getHeight()*1.2));
        btn_login.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_login);

        //đăng ký
        var btn_register = MButton.createWithText(res.LOGIN.BTN_REGISTER, TXT.LOGIN_BTN_REGISTER , TAG.LOGIN.BTN_REGISTER);
        btn_register.setPosition(cc.p(btn_playnow.getPosition().x + btn_playnow.getWidth() - btn_register.getWidth(),
            btn_login.getPosition().y));
        btn_register.addTouchEventListener( this.menuCallBack,this);
        this.addChild(btn_register);

        //quen mk
        var fogotPassword = MButton.createTextSizeTag("Quên mật khẩu?",btn_register.getHeight()*0.25,TAG.LOGIN.BTN_FORGET_PASSWORD);
        cc.log("fogotPassword", fogotPassword.getContentSize().width);
        fogotPassword.setPosition(cc.p(btn_playnow.getPosition().x + btn_playnow.getWidth() -
            fogotPassword.getContentSize().width*1.1,
            btn_register.getPosition().y+btn_register.getHeight()*1.15));
        fogotPassword.addTouchEventListener( this.menuCallBack,this);
        this.addChild(fogotPassword);

        //========================= Text Field

        // Textfield mat khau
        /*var editBackgroundMatKhau = MSprite.create(res.LOGIN.SPRITE_EDIT_BOX);
        editBackgroundMatKhau.setPosition(cc.p(btn_playnow.getPositionX(),
            btn_playnow.getPositionY() + btn_playnow.getHeight()*2.75));
        this.addChild(editBackgroundMatKhau);

        var fontSize = editBackgroundMatKhau.getContentSize().height / 3;

        this.eboxNhapMK = new cc.EditBox(editBackgroundMatKhau.getContentSize()*0.8,
            cc.Scale9Sprite.create(res.LOGIN.SPRITE_EDIT_BOX_NULL), cc.Scale9Sprite.create(res.LOGIN.SPRITE_EDIT_BOX_NULL));
        this.eboxNhapMK.setPlaceHolder("Nhập Mật Khẩu");
        this.eboxNhapMK.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.eboxNhapMK.setPosition(cc.p(editBackgroundMatKhau.getPositionX() +
            editBackgroundMatKhau.getContentSize().width*0.05,
            editBackgroundMatKhau.getPositionY() + editBackgroundMatKhau.getHeight()/2));
        this.eboxNhapMK.setPlaceholderFontSize(fontSize);
        this.eboxNhapMK.setFontSize(fontSize);
        this.eboxNhapMK.setMaxLength(12);
        this.eboxNhapMK.setFontColor(cc.Color(50,50,50,255));
        this.eboxNhapMK.setDelegate(this);
        this.addChild(this.eboxNhapMK);

        cc.log("x =", editBackgroundMatKhau.getPositionX());

        cc.log("y =", editBackgroundMatKhau.getPositionY());

        var editBackgroundTaiKhoan = MSprite.create(res.LOGIN.SPRITE_EDIT_BOX);
        editBackgroundTaiKhoan.setPosition(cc.p(btn_playnow.getPosition().x,
            btn_playnow.getPosition().y + btn_playnow.getHeight()*2.75 + 15 + editBackgroundTaiKhoan.getHeight()));
        this.addChild(editBackgroundTaiKhoan);

        this.eboxNhapTK = new cc.EditBox(editBackgroundMatKhau.getContentSize()*0.8,
            cc.Scale9Sprite.create(res.LOGIN.SPRITE_EDIT_BOX_NULL), cc.Scale9Sprite.create(res.LOGIN.SPRITE_EDIT_BOX_NULL));
        this.eboxNhapTK.setPlaceHolder("Nhập Tài Khoản");
        this.eboxNhapTK.setPlaceholderFontSize(fontSize);
        this.eboxNhapTK.setFontSize(fontSize);
        this.eboxNhapTK.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.eboxNhapTK.setPosition(cc.p(editBackgroundTaiKhoan.getPositionX() +
            editBackgroundTaiKhoan.getContentSize().width*0.05,
            editBackgroundTaiKhoan.getPositionY() + editBackgroundTaiKhoan.getHeight()/2));
        this.eboxNhapTK.setMaxLength(12);
        this.eboxNhapTK.setFontColor(cc.Color(50,50,50,255));
        this.eboxNhapTK.setDelegate(this);
        this.addChild(this.eboxNhapTK);*/

         // Textfield mat khau

        var editBackgroundMatKhau = MSprite.create(res.edit_password);
        editBackgroundMatKhau.setPosition(cc.p(btn_playnow.getPositionX(),
            btn_playnow.getPositionY() + btn_playnow.getHeight()*2.75));
        this.addChild(editBackgroundMatKhau);

        var fontSize = editBackgroundMatKhau.getContentSize().height / 3;

        this.eboxNhapMK = new cc.EditBox(editBackgroundMatKhau.getContentSize()*0.8,
            cc.Scale9Sprite.create(res.edit_login_null), cc.Scale9Sprite.create(res.edit_login_null));
        this.eboxNhapMK.setPlaceHolder("Nhập Mật Khẩu");
        this.eboxNhapMK.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.eboxNhapMK.setPosition(cc.p(editBackgroundMatKhau.getPositionX() +
            editBackgroundMatKhau.getContentSize().width*0.05,
            editBackgroundMatKhau.getPositionY() + editBackgroundMatKhau.getHeight()/2));
        this.eboxNhapMK.setPlaceholderFontSize(fontSize);
        this.eboxNhapMK.setFontSize(fontSize);
        this.eboxNhapMK.setMaxLength(12);
        this.eboxNhapMK.setFontColor({"r": 50, "g": 50, "b": 50});
        this.eboxNhapMK.setDelegate(this);
        this.addChild(this.eboxNhapMK);

        cc.log("x =", editBackgroundMatKhau.getPositionX());

        cc.log("y =", editBackgroundMatKhau.getHeight());

        var editBackgroundTaiKhoan = MSprite.create(res.edit_password);
        editBackgroundTaiKhoan.setPosition(cc.p(btn_playnow.getPosition().x,
            btn_playnow.getPosition().y + btn_playnow.getHeight()*2.75 + 15 + editBackgroundTaiKhoan.getHeight()));
        this.addChild(editBackgroundTaiKhoan);

        this.eboxNhapTK = new cc.EditBox(editBackgroundTaiKhoan.getContentSize()*0.8,
            cc.Scale9Sprite.create(res.edit_login_null), cc.Scale9Sprite.create(res.edit_login_null));
        this.eboxNhapTK.setPlaceHolder("Nhập Tài Khoản");
        this.eboxNhapTK.setPlaceholderFontSize(fontSize);
        this.eboxNhapTK.setFontSize(fontSize);
        this.eboxNhapTK.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.eboxNhapTK.setPosition(cc.p(editBackgroundTaiKhoan.getPositionX() +
            editBackgroundTaiKhoan.getContentSize().width*0.05,
            editBackgroundTaiKhoan.getPositionY() + editBackgroundTaiKhoan.getHeight()/2));
        this.eboxNhapTK.setMaxLength(12);
        this.eboxNhapTK.setFontColor({"r": 50, "g": 50, "b": 50});
        this.eboxNhapTK.setDelegate(this);
        this.addChild(this.eboxNhapTK);


        var bigken = MSprite.create(res.LOGIN_SPRITE_BIGKEN);
        bigken.setPosition(btn_playnow.getPosition().x+btn_playnow.getWidth()/2-bigken.getWidth()/2,
            this.eboxNhapTK.getPosition().y+this.eboxNhapTK.getContentSize().height+25);

        this.addChild(bigken);

        cc.log("version ", getAppVersion());
        //version
        var version_txt = MLabel.create("version " + getAppVersion(),editBackgroundMatKhau.getHeight()/3);
        cc.log("version_txt", version_txt.getWidth());
        version_txt.setPosition(MVec2(width-version_txt.getWidth(),
            height-version_txt.getHeight()));

        //hotline
        var hotlines = getHotLines();
        var hotline = MButton.createTextSizeTag("Hotline : " + "0983555555",//(hotlines.length > 0 ? hotlines[0] : ""),
            btn_register.getHeight()*0.25, TAG.LOGIN.BTN_HOT_LINE);
        //auto hotline_txt = MLabel::create("Hotline : " + (hotlines.size() > 0 ? hotlines[0] : ""), background_matkhau->getHeight() / 3);
        hotline.setPosition(MVec2(hotline.getContentSize().height,height-hotline.getContentSize().height*2));
        hotline.setTitleFontName(res.FONT_THIN);
        hotline.setTitleFontSize(editBackgroundMatKhau.getHeight()/3);
        hotline.addTouchEventListener( this.menuCallBack,this);

        this.addChild(hotline);
        this.addChild(version_txt);

        ws.onmessage = this.loginongamestatus.bind(this);

        return true;

    },
    menuCallBack: function(sender, type)
    {
        if (type == ccui.Widget.TOUCH_ENDED){
            switch(sender.tag) {
                case TAG.LOGIN.BTN_LOGIN:
                    this.login();
                    break;
                case TAG.LOGIN.BTN_LOGIN_FB:
                    this.loginFacebook();
                    break;
                case TAG.LOGIN.BTN_REGISTER:
                    cc.director.runScene(new RegisterScene());
                    break;
                default:
                    break;
            }

        }

    },

    editBoxEditingDidEnd: function (editBox) {
        if (this.eboxNhapMK == editBox) {
            this.login();
        } else if (this.eboxNhapTK == editBox) {
            return;
        }
    },

    login: function () {
        var user_name = this.eboxNhapTK.getString();
        var pass_word = this.eboxNhapMK.getString();
        cc.log("txtUserName:" + user_name);
        cc.log("txtPassWord:" + pass_word);
        var space_pos = user_name.search(' ');
        if (user_name.length == 0) {
            var popupMessage = new PopupMessageBox();
            popupMessage.setMessage("Tài khoản không được để trống!");
            this.addChild(popupMessage);
            popupMessage.appear();
            return;
        }
        else if (space_pos != -1) {

            var popupMessage = new PopupMessageBox();
            popupMessage.setMessage("Mật khẩu không được để trống!");
            this.addChild(popupMessage);
            popupMessage.appear();
            return;
        }

        else if (pass_word.length == 0) {
            var popupMessage = new PopupMessageBox();
            popupMessage.setMessage("Mật khẩu không được để trống!");
            this.addChild(popupMessage);
            popupMessage.appear();
            return;
        }

        else if (user_name.length < 3 || user_name.length > 12) {
            var popupMessage = new PopupMessageBox();
            popupMessage.setMessage("Tài khoản phải có độ dài 3-12 ký tự!");
            this.addChild(popupMessage);
            popupMessage.appear();
            return;
        }

        else if (pass_word.length < 6 || pass_word.length > 12) {
            var popupMessage = new PopupMessageBox();
            popupMessage.setMessage("Mật khẩu phải có độ dài 6-12 ký tự!");
            this.addChild(popupMessage);
            popupMessage.appear();
            return;
        }
        loginType = LOGIN_STATE.NORMAL_LOGIN;
        getLoginMessageFromServer(user_name, pass_word);
    },
    loginFacebook: function () {
        var facebook = plugin.FacebookAgent.getInstance();

        facebook.login(["public_profile"], function(code, response){
            cc.log("code:", code);
            if(code == plugin.FacebookAgent.CODE_SUCCEED){
                cc.log("login succeeded");
                // cc.log("AccessToken: " + response["accessToken"]);
                // var permissions = response["permissions"];
                // var str = "Permissions: ";
                // for (var i = 0; i < permissions.length; ++i) {
                //     str += permissions[i] + " ";
                // }
                // cc.log("Permissions: " + str);
                // cc.director.runScene(new PlayScene());
                cc.director.runScene(new ShowGameScene());

            } else {
                cc.log("Login failed, error #" + code + ": " + response);
            }
        });

    },
    loginongamestatus: function(e) {
        cc.log("data 1", e);
        if(e.data!==null || e.data !== 'undefined')
        {
            var listMessages = parseFrom(e.data, e.data.byteLength);
            while(listMessages.length > 0) {
                var buffer = listMessages.shift();
                this.loginhandleMessage(buffer);
            }
        }
    },
    loginhandleMessage: function(e) {
        var buffer = e;
        switch (buffer.message_id) {
            case NetworkManager.LOGIN:
                var msg = buffer.response;
                loginResponseHandler(msg);
                break;
        }
    }
});

var LoginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }
});

var loginResponseHandler = function(loginresponse) {
    // BINLoginResponse* loginresponse = (BINLoginResponse *)Common::getInstance()->checkEvent(NetworkManager::LOGIN);
    if (loginresponse != 0) {
        cc.log("loginresponse", loginresponse);
        if (loginresponse.responseCode) {
            // if (loginType == FB_LOGIN)
            //     tryLoginFacebook = false;
            var session_id = loginresponse.sessionId;
            // setStringForKey(Common.KEY_SESSION_ID,
            //     loginresponse.sessionId);
            setSessionId(session_id);

            // setIntegerForKey(Common.KEY_USER_ID,
            //     loginresponse.userInfo.userId);


            setHasPlayingMatch(loginresponse.hasPlayingMatch);
            // if (loginresponse.has_userinfo) {
                saveUserInfo(loginresponse.userInfo);
            // }
            // if (loginresponse.has_usersetting) {
                saveUserSetting(loginresponse.userSetting);
            // }

            if (!isHasPlayingMatch()) {
                // setPrefString(USER_NAME, edit_user->getText());
                // setPrefString(USER_PASSWORD, edit_matkhau->getText());
                var showgame = new ShowGameScene();
                cc.director.runScene(showgame);
                // var showgame = ShowGame::createScene(loginresponse.message, true);
                // REPLACESCENE(0.1, showgame);
            }
        }
        else {
            // if (loginType == FB_LOGIN) {
            //     cocos2d::UserDefault::getInstance()->deleteValueForKey(FB_ACCESS_TOKEN);
            //     cocos2d::UserDefault::getInstance()->deleteValueForKey(FB_ID);
            //     cocos2d::UserDefault::getInstance()->deleteValueForKey(FB_FIRST_NAME);
            //     cocos2d::UserDefault::getInstance()->deleteValueForKey(FB_LAST_NAME);
            //     if (tryLoginFacebook) {
            //         PopupMessageBox* popupMessage = new PopupMessageBox();
            //         popupMessage->showPopup(loginresponse->message().c_str());
            //     }
            //     else {
            //         tryLoginFacebook = true;
            //         Common::getInstance()->loginFacebook();
            //     }
            //     return;
            // }
            //
            // PopupMessageBox* popupMessage = new PopupMessageBox();
            // popupMessage->showPopup(loginresponse->message().c_str());
        }
        // // Code kill room index
        // if (Common::getInstance()->getUserName() == "sanglx") {
        //     NetworkManager::getInstance()->getKillRoomMessageFromServer(4, 10);
        // }
    }
}

var saveUserInfo = function(userInfo) {
    setUserName(userInfo.userName);
    // if (userInfo.displayName) {
        setDisplayName(userInfo.displayName);
    // }

    // if (userInfo.has_level()) {
        setLevel(userInfo.level);
    // }

    // if (userInfo.has_cash()) {
        setCash(userInfo.cash);
    // }

    // if (userInfo.has_gold()) {
        setGold(userInfo.gold);
    // }

    // if (userInfo.has_avatarid()) {
        setAvatarId(userInfo.avatarId);
    // }

    // if (userInfo.has_mobile()){
        setPhoneNunber(userInfo.mobile);
    // }

    // if (userInfo.has_accountverified()){
        setAccountVerify(userInfo.accountVerified);
    // }

    // if (userInfo.has_disablecashtransaction()){
        setDisableCashTransaction(userInfo.disableCashTransaction);
    // }

    // if (userInfo.has_securitykeyset()){
        setSecurityKeySeted(userInfo.securityKeySet);
    // }
}

var saveUserSetting = function(userSetting) {
    // if (userSetting.has_autoready()) {
        setAutoReady(userSetting.autoReady);
        // setPrefs(AUTOREADY, userSetting.autoReady);
    // }

    // if (userSetting.has_autodenyinvitation()) {
        setAutoDenyInvitation(userSetting.autoDenyInvitation);
        // setPrefs(DENY_INVITES, userSetting.autoDenyInvitation);
    // }
}