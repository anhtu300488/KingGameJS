/**
 * Created by MyPC on 12/12/2016.
 */

var LoginLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.init();

    },
    init:function(){
        this._super();

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

        var sprite_card = MSprite.createWithSize(res.sprite_background_login,visibleSize);
        sprite_card.setAnchorPoint(cc.p(0,0));
        sprite_card.setPosition(cc.p(0, 0));
        this.addChild(sprite_card);

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
            imageView.loadTexture(res.sprite_cogai);
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
        pageView.addEventListener(this.pageViewEvent, this);
        this.addChild(pageView);

        var btn_login_facebook = MButton.createWithText(res.btn_facebook,TXT.LOGIN_BTN_FACEBOOK,TAG.LOGIN.BTN_LOGIN_FB);
        btn_login_facebook.setPosition(MVec2(width-btn_login_facebook.getWidth() *5/4, height/2-btn_login_facebook.getHeight() *3-20*3));
        btn_login_facebook.setZoomScale(0.01);
        btn_login_facebook.addTouchEventListener(this.touchEvent, this);
        this.addChild(btn_login_facebook);

        //choi ngay
        var btn_playnow = MButton.createWithText(res.btn_choingay_login,TXT.LOGIN_BTN_PLAYNOW,TAG.LOGIN.BTN_LOGIN_GOOGLE);
        btn_playnow.setPosition(cc.p(btn_login_facebook.getPosition().x, btn_login_facebook.getPosition().y + btn_login_facebook.getHeight()+15));
        btn_playnow.setBright(false);
        // btn_playnow.addTouchEventListener(this.touchEvent, this);
        this.addChild(btn_playnow);

        //đăng nhập
        var btn_login = MButton.createWithText(res.btn_dangnhap,TXT.LOGIN_BTN_LOGIN ,TAG.LOGIN.BTN_LOGIN);
        btn_login.setPosition(cc.p(btn_playnow.getPosition().x, btn_playnow.getPosition().y + btn_playnow.getHeight()+15));
        btn_login.addTouchEventListener(this.touchEvent, this);
        this.addChild(btn_login);

        //đăng ký
        var btn_register = MButton.createWithText(res.btn_dang_ky, TXT.LOGIN_BTN_REGISTER , TAG.LOGIN.BTN_REGISTER);
        btn_register.setPosition(cc.p(btn_playnow.getPosition().x + btn_playnow.getWidth() - btn_register.getWidth(), btn_login.getPosition().y));
        // btn_register.addTouchEventListener(this.touchEvent, this);
        this.addChild(btn_register);

        //quen mk
        var fogotPassword = MButton.createTextSizeTag("Quên mật khẩu?",20,TAG.LOGIN.BTN_FORGET_PASSWORD);
        cc.log("fogotPassword", fogotPassword.getWidth());
        fogotPassword.setPosition(cc.p(btn_playnow.getPosition().x + btn_playnow.getWidth() - fogotPassword.getWidth()-5, btn_register.getPosition().y+btn_register.getHeight()+15));
        // fogotPassword.addTouchEventListener( this.touchEvent, this);
        this.addChild(fogotPassword);

        //========================= Text Field

        // Textfield mat khau
        var editBackgroundMatKhau = MSprite.create(res.edit_password);
        editBackgroundMatKhau.setPosition(cc.p(btn_playnow.getPositionX(),
            btn_playnow.getPositionY() + btn_playnow.getHeight() + 100));
        this.addChild(editBackgroundMatKhau);

        var fontSize = editBackgroundMatKhau.getContentSize().height / 3;

        this.eboxNhapMK = new cc.EditBox(cc.size(453, 73), cc.Scale9Sprite.create(res.edit_login_null), cc.Scale9Sprite.create(res.edit_login_null));
        this.eboxNhapMK.setPlaceHolder("Nhập Mật Khẩu");
        this.eboxNhapMK.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.eboxNhapMK.setPosition(cc.p(editBackgroundMatKhau.getPositionX() + editBackgroundMatKhau.getWidth() - btn_register.getWidth() * 2,
            editBackgroundMatKhau.getPositionY()));
        this.eboxNhapMK.setPlaceholderFontSize(fontSize);
        this.eboxNhapMK.setFontSize(fontSize);
        this.eboxNhapMK.setMaxLength(12);
        this.eboxNhapMK.setFontColor({"r": 50, "g": 50, "b": 50});
        this.eboxNhapMK.setDelegate(this);
        this.addChild(this.eboxNhapMK,1);

        cc.log("x =", editBackgroundMatKhau.getPositionX());

        cc.log("y =", editBackgroundMatKhau.getPositionY());

        var editBackgroundTaiKhoan = MSprite.create(res.edit_password);
        editBackgroundTaiKhoan.setPosition(cc.p(btn_playnow.getPosition().x,
            btn_playnow.getPosition().y + btn_playnow.getHeight() + 200));
        this.addChild(editBackgroundTaiKhoan);

        this.eboxNhapTK = new cc.EditBox(cc.size(453, 73), cc.Scale9Sprite.create(res.edit_login_null), cc.Scale9Sprite.create(res.edit_login_null));
        this.eboxNhapTK.setPlaceHolder("Nhập Tài Khoản");
        this.eboxNhapTK.setPlaceholderFontSize(fontSize);
        this.eboxNhapTK.setFontSize(fontSize);
        this.eboxNhapTK.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.eboxNhapTK.setPosition(cc.p(editBackgroundTaiKhoan.getPositionX() + editBackgroundTaiKhoan.getWidth() - btn_register.getWidth() * 2,
            editBackgroundTaiKhoan.getPositionY()));
        this.eboxNhapTK.setMaxLength(12);
        this.eboxNhapTK.setFontColor({"r": 50, "g": 50, "b": 50});
        this.eboxNhapTK.setDelegate(this);
        this.addChild(this.eboxNhapTK,1);

        // Textfield mat khau
        // var background_matkhau = MSprite.create(res.edit_password);
        //
        // cc.log("background_matkhau", background_matkhau.getContentSize());
        //
        // var edit_matkhau = new cc.EditBox(cc.size(453, 73), cc.Scale9Sprite.create(res.edit_password), cc.Scale9Sprite.create(res.edit_password));
        // edit_matkhau.setPosition(cc.p(btn_playnow.getPosition().x, fogotPassword.getPosition().y+fogotPassword.getHeight()+10));
        // edit_matkhau.setPlaceHolder("  Nhập mật khẩu");
        // edit_matkhau.setMaxLength(12);
        // edit_matkhau.setTag(TAG.LOGIN.EDIT_BOX_PASSWORD);
        // edit_matkhau.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        // edit_matkhau.setDelegate(this);
        // // edit_matkhau.setName("user_password");
        //
        // // Textfield tai khoan
        // var edit_user = new cc.EditBox(cc.size(453, 73), cc.Scale9Sprite.create(res.edit_password), cc.Scale9Sprite.create(res.edit_password));
        // edit_user.setPosition(cc.p(edit_matkhau.getPosition().x,
        //     edit_matkhau.getPosition().y+background_matkhau.getHeight()+10));
        // edit_user.setPlaceHolder("  Nhập tên");
        // edit_user.setTag(TAG.LOGIN.EDIT_BOX_USER_NAME);
        // edit_user.setMaxLength(12);
        // edit_user.setDelegate(this);
        // // edit_user.setName("user_name");
        //
        // var bigken = MSprite.create(res.LOGIN_SPRITE_BIGKEN);
        // bigken.setPosition(btn_playnow.getPosition().x+btn_playnow.getWidth()/2-bigken.getWidth()/2,
        //     edit_user.getPosition().y+edit_user.getContentSize().height+25);
        //
        // this.addChild(edit_matkhau);
        // this.addChild(edit_user);
        // this.addChild(bigken);

        return true;

    },
    touchEvent: function(sender, type)
    {
        if (type == ccui.Widget.TOUCH_ENDED){
            switch(sender.tag) {
                case 1:
                    this.login();
                    break;
                case 2:
                    this.loginFacebook();
                    break;
                default:
                    break;
            }

        }

    },
    login: function (sender) {
        var txtUserName = this.eboxNhapTK.getString();
        var txtPassword = this.eboxNhapMK.getString();

        cc.log("txtUserName: ",txtUserName);

        // if (txtUserName.isEmpty()) {
        //     cc.log("txtUserName: ",txtUserName);
        //     this.popupMessage = new cc.popupMessage();
        //     this.popupMessage.showPopup("Tài khoản không được để trống!");
        //     return;
        // }
        //
        // var space_pos = txtUserName.find(' ');
        // if (space_pos != -1) {
        //     this.popupMessage = new cc.popupMessage();
        //     this.popupMessage.showPopup("Tài khoản không được để dấu cách!");
        //     return;
        // }
        //
        // if (txtPassword == null) {
        //     this.popupMessage = new cc.popupMessage();
        //     this.popupMessage.showPopup("Mật khẩu không được để trống!");
        //     return;
        // }
        //
        // if (txtUserName.length < 3 || txtUserName.length > 12) {
        //     // cc.log("length");
        //     // cc.director.popScene(new PopupScene());
        //
        //     // this.popupMessage = new cc.popup();
        //     // this.popupMessage.showPopup("Tài khoản phải có độ dài 3-12 ký tự!");
        //     // this.popScene(this.popupMessage);
        //     // var alert = new CCAlert.create();
        //     // alert.show("Title", "Text", "Yes", "No", this, alert_selector(this.AlertCallback));
        //     var message = "Tài khoản phải có độ dài 3-12 ký tự!";
        //     this.ShowMessageBoxOK(this, message, this);
        //     return;
        // }
        //
        // if (txtPassword.length() < 6 || txtPassword.length() > 12) {
        //     this.popupMessage = new cc.popupMessage();
        //     this.popupMessage.showPopup("Mật khẩu phải có độ dài 6-12 ký tự!");
        //     return;
        // }
        getLoginMessageFromServer(txtUserName, txtPassword);
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

    }
});

var LoginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }
});