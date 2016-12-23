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

        var rows = width/ spriteWidth + 1;
        var cols = height/ spriteHeight + 1;
        for(i = 0; i< rows; i++){
            for(j = 0; j<cols; j++){
                var itemSpriteBG = MSprite.create(res.item_background);
                var centerPos = cc.p(spriteBG.x + i*spriteWidth, spriteBG.y + j*spriteHeight);
                itemSpriteBG.setPosition(centerPos);
                this.addChild(itemSpriteBG);
            }
        }

        var sprite_card = new cc.Sprite(res.sprite_background_login);
        sprite_card.setAnchorPoint(cc.p(0,0));
        sprite_card.setPosition(cc.p(0, 0));
        sprite_card.setContentSize(visibleSize);
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

        var btn_login_facebook = MButton.create(res.btn_facebook,"Login Facebook",2);
        btn_login_facebook.setPosition(cc.p(width-btn_login_facebook.getWidth() *5/4,
            height/2-btn_login_facebook.getHeight() *3-20*3));
        btn_login_facebook.addTouchEventListener(this.touchEvent, this);
        this.addChild(btn_login_facebook);

        //choi ngay
        var btn_playnow = MButton.create(res.btn_choingay_login,"Play Nows",3);
        btn_playnow.setPosition(cc.p(btn_login_facebook.getPosition().x,
            btn_login_facebook.getPosition().y
            +btn_login_facebook.getHeight()+15));
        // btn_playnow.addTouchEventListener(this.touchEvent, this);
        this.addChild(btn_playnow);

        //đăng nhập
        var btn_login = MButton.create(res.btn_dangnhap,"Đăng nhập",1);
        btn_login.setPosition(cc.p(btn_playnow.getPosition().x,
            btn_playnow.getPosition().y+btn_playnow.getHeight()+15));
        btn_login.addTouchEventListener(this.touchEvent, this);
        this.addChild(btn_login);

        //đăng ký
        var btn_register = new ccui.Button(res.btn_dang_ky);
        btn_register.setAnchorPoint(cc.p(0,0));
        btn_register.setTitleText("Đăng Ký");
        btn_register.setTitleFontSize(btn_login_facebook.getContentSize().height*0.4);
        btn_register.setPosition(cc.p(btn_playnow.getPosition().x+btn_playnow.getContentSize().width
            -btn_register.getContentSize().width,
            btn_login.getPosition().y));
        // btn_register.addTouchEventListener(this.touchEvent, this);
        this.addChild(btn_register);

        var editBackgroundMatKhau = MSprite.create(res.edit_password);
        editBackgroundMatKhau.setPosition(cc.p(btn_register.getPosition().x,
            btn_register.getPosition().y + btn_register.getContentSize().height + 100));
        this.addChild(editBackgroundMatKhau);

        var fontSize = editBackgroundMatKhau.getContentSize().height / 3;

        this.eboxNhapMK = cc.EditBox.create(cc.size(350, 100), cc.Scale9Sprite.create(res.edit_login_null), cc.Scale9Sprite.create(res.edit_login_null));
        this.eboxNhapMK.setPlaceHolder("Nhập Mật Khẩu");
        this.eboxNhapMK.setInputFlag(cc.EDITBOX_INPUT_FLAG_PASSWORD);
        this.eboxNhapMK.setPosition(cc.p(editBackgroundMatKhau.getPosition().x + editBackgroundMatKhau.getContentSize().width - btn_register.getContentSize().width * 2,
            editBackgroundMatKhau.getPosition().y));
        this.eboxNhapMK.setPlaceholderFontSize(fontSize);
        this.eboxNhapMK.setFontSize(fontSize);
        this.eboxNhapMK.setMaxLength(12);
        this.eboxNhapMK.setFontColor({"r": 50, "g": 50, "b": 50});
        this.eboxNhapMK.setDelegate(this);
        this.addChild(this.eboxNhapMK,1);

        var editBackgroundTaiKhoan = new cc.Sprite(res.edit_password);
        editBackgroundTaiKhoan.setPosition(cc.p(btn_register.getPosition().x,
            btn_register.getPosition().y + btn_register.getContentSize().height + 200));
        this.addChild(editBackgroundTaiKhoan);

        this.eboxNhapTK = cc.EditBox.create(cc.size(350, 100), cc.Scale9Sprite.create(res.edit_login_null), cc.Scale9Sprite.create(res.edit_login_null));
        this.eboxNhapTK.setPlaceHolder("Nhập Tài Khoản");
        this.eboxNhapTK.setPlaceholderFontSize(fontSize);
        this.eboxNhapTK.setFontSize(fontSize);
        this.eboxNhapTK.setInputFlag(cc.EDITBOX_INPUT_FLAG_INITIAL_CAPS_ALL_CHARACTERS);
        this.eboxNhapTK.setPosition(cc.p(editBackgroundTaiKhoan.getPosition().x + editBackgroundTaiKhoan.getContentSize().width - btn_register.getContentSize().width * 2,
            editBackgroundTaiKhoan.getPosition().y));
        this.eboxNhapTK.setMaxLength(12);
        this.eboxNhapTK.setFontColor({"r": 50, "g": 50, "b": 50});
        this.eboxNhapTK.setDelegate(this);
        this.addChild(this.eboxNhapTK,1);

        return true;

    },
    touchEvent: function(sender, type)
    {
        cc.log("sender:", sender.tag);
        if (type == ccui.Widget.TOUCH_ENDED){
            switch(sender.tag) {
                case 1:
                    this.login();
                    // cc.director.runScene(new PlayScene());
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
        /*var facebook = plugin.FacebookAgent.getInstance();

        facebook.login(["public_profile"], function(code, response){
            cc.log("code:", code);
            if(code == plugin.FacebookAgent.CODE_SUCCEED){
                // cc.log("login succeeded");
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
        });*/
    }
});

var LoginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoginLayer();
        this.addChild(layer);
    }
});