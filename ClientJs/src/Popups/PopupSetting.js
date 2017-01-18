/**
 * Created by Black3rry on 1/18/17.
 */

var PopupSetting = Popup.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function(){
        this._super();

        this.backgroundPopup = MSprite.create(res.POPUP_SETTING_BACKGROUND);
        this.backgroundPopup.setAnchorPoint(cc.p(0.5,0.5));
        this.backgroundPopup.setPosition(cc.p(visibleSize.width/2,visibleSize.height/2));
        this.addChild(this.backgroundPopup);

        this.contentBackground = MSprite.create(res.POPUP_SETTING_CONTENT);
        this.contentBackground.setAnchorPoint(cc.p(0.5,0.5));
        this.contentBackground.setPosition(cc.p(visibleSize.width/2,visibleSize.height/2));
        this.addChild(this.contentBackground);

        var line_content = MSprite.create(res.POPUP_SETTING_CONTENT_LINE);
        line_content.setAnchorPoint(cc.p(0.5,0.5));
        line_content.setPosition(cc.p(this.contentBackground.getWidth()/2,this.contentBackground.getHeight()/2));
        this.contentBackground.addChild(line_content);

        var bg_title_popup = new cc.Sprite(res.RS_TITLE_POPUP);
        bg_title_popup.setPosition(cc.p(this.backgroundPopup.getContentSize().width / 2,
            this.backgroundPopup.getContentSize().height));
        this.backgroundPopup.addChild(bg_title_popup);

        var title = MLabel.createTitle("Cài đặt",bg_title_popup.getContentSize().height*0.6);
        title.setPosition(bg_title_popup.getContentSize().width / 2 - title.getContentSize().width / 2,
            bg_title_popup.getContentSize().height / 2 - title.getContentSize().height / 2);
        bg_title_popup.addChild(title);

        /*var ok = MButton.createWithText("res/btn_green.png", "Đồng ý", POPUP.POPUP_MESSAGE_BOX.BTN_OK);
         ok.setPosition(MVec2(this.backgroundPopup.getWidth() / 2 - ok.getWidth()*0.5,
         this.backgroundPopup.getHeight()*0.2 - ok.getHeight() / 2));
         ok.addTouchEventListener(this.menuCallBack, this);
         this.backgroundPopup.addChild(ok);*/

        var width_text = this.contentBackground.getWidth() * 0.8;
        var width_icon = this.contentBackground.getWidth() * 0.8;

        var _button_music = MButton.createExtendsIcon(res.POPUP_SETTING_MUSIC,this.getImagePrefs(pref.MUSIC),
            TXT.MUSIC_TEXT,POPUP.SETTING.BTN_MUSIC, width_text);
        var height_icon = this.contentBackground.getHeight() * 1 / 10 - _button_music.getHeight() / 2;
        var delta_height = this.contentBackground.getHeight() * 1 / 5;

        _button_music.setPosition(cc.p(width_icon, height_icon + delta_height * 4));
        _button_music.addTouchEventListener(this.menuPopupCallBack, this);
        this.contentBackground.addChild(_button_music);

        // Am thanh
        var _button_sound = MButton.createExtendsIcon(res.POPUP_SETTING_SOUND,this.getImagePrefs(pref.SOUND),
            TXT.SOUND_TEXT,POPUP.SETTING.BTN_SOUND, width_text);
        _button_sound.setPosition(cc.p(width_icon, height_icon + delta_height * 3));
        _button_sound.addTouchEventListener(this.menuPopupCallBack, this);

        this.contentBackground.addChild(_button_sound);

        // Rung
        var _button_vibrate = MButton.createExtendsIcon(res.POPUP_SETTING_VIBRATE,this.getImagePrefs(pref.VIBARTE),
            TXT.VIBARTE_TEXT,POPUP.SETTING.BTN_VIBRATE, width_text);
        _button_vibrate.setPosition(cc.p(width_icon, height_icon + delta_height * 2));
        _button_vibrate.addTouchEventListener(this.menuPopupCallBack, this);
        this.contentBackground.addChild(_button_vibrate);

        //tu dong san sang
        var _button_auto_ready = MButton.createExtendsIcon(res.POPUP_SETTING_AUTO_READY,
            this.getImagePrefs(pref.AUTOREADY),
            TXT.AUTO_READY_TEXT, POPUP.SETTING.BTN_AUTO_READY, width_text);
        _button_auto_ready.setPosition(cc.p(width_icon, height_icon + delta_height));
        _button_auto_ready.addTouchEventListener(this.menuPopupCallBack, this);
        this.contentBackground.addChild(_button_auto_ready);

        //tu choi moi choi
        var _button_deny_invite = MButton.createExtendsIcon(res.POPUP_SETTING_DENY_INVITE,
            this.getImagePrefs(pref.DENY_INVITES),
            TXT.DENY_INVITES_TEXT,POPUP.SETTING.BTN_DENY_INVITE, width_text);
        _button_deny_invite.setPosition(cc.p(width_icon, height_icon));
        _button_deny_invite.addTouchEventListener(this.menuPopupCallBack, this);
        this.contentBackground.addChild(_button_deny_invite);

        //btn close
        var exit = MButton.create(res.IMAGE_CLOSE, POPUP.SETTING.BTN_CLOSE);
        exit.setPosition(cc.p(this.backgroundPopup.getContentSize().width - exit.getContentSize().width *0.55,
            this.backgroundPopup.getContentSize().height - exit.getContentSize().height *0.55));
        exit.addTouchEventListener(this.menuPopupCallBack, this);
        this.backgroundPopup.addChild(exit);

        this.setPosition(MVec2(0,-height));
    },

    getImagePrefs: function (key) {
        return (getPrefs(key) ? res.POPUP_SETTING_ON : res.POPUP_SETTING_OFF);
    },

    menuPopupCallBack: function(sender,type){

        if(type == ccui.Widget.TOUCH_ENDED){
            switch (sender.getTag()){
                case POPUP.SETTING.BTN_AUTO_SIT :
                {
                    break;
                }
                case POPUP.SETTING.BTN_CLOSE :
                {
                    this.disappear();
                    break;
                }
                case POPUP.SETTING.BTN_DENY_INVITE :
                {
                    break;
                }
                case POPUP.SETTING.BTN_MUSIC :
                {
                    break;
                }
                case POPUP.SETTING.BTN_SOUND :
                {
                    break;
                }
                case POPUP.SETTING.BTN_VIBRATE :
                {
                    break;
                }
            }
        }
    }


});