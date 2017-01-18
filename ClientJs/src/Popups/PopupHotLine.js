/**
 * Created by MyPC on 15/12/2016.
 */

var PopupHotLine = Popup.extend({
    ctor:function () {
        this._super();
        this.init();
    },
    init:function(){
        this._super();

        this.backgroundPopup = cc.Sprite.create(res.bg_popup);
        this.backgroundPopup.setPosition(cc.p(visibleSize.width/2,visibleSize.height/2));
        this.addChild(this.backgroundPopup);

        var bg_title_popup = new cc.Sprite(res.RS_TITLE_POPUP);
        bg_title_popup.setPosition(cc.p(this.backgroundPopup.getContentSize().width / 2,
            this.backgroundPopup.getContentSize().height));
        this.backgroundPopup.addChild(bg_title_popup);

        var backgroundContentSize = this.backgroundPopup.getContentSize();

        var title = MLabel.createTitle("HOTLINE",bg_title_popup.getContentSize().height*0.6);
        title.setPosition(bg_title_popup.getContentSize().width / 2 - title.getContentSize().width / 2,
            bg_title_popup.getContentSize().height / 2 - title.getContentSize().height / 2);
        bg_title_popup.addChild(title);

        var girl_hotline = new cc.Sprite(res.popup_girl_hotline);
        girl_hotline.setPosition(cc.p(girl_hotline.getContentSize().width/2,
            this.backgroundPopup.getContentSize().height / 2));
        this.backgroundPopup.addChild(girl_hotline);

        var width_content = this.backgroundPopup.getContentSize().width - girl_hotline.getContentSize().width;

        var hotlines = ['0967905505', '0975802329'];

        if (hotlines.length > 0) {
            if(hotlines.length == 1){
                var btn_call1 = MButton.createWithText(res.popup_btn_call, hotlines.length > 0 ? hotlines[0] : "",
                    POPUP.HOT_LINE.BTN_HOT_LINE_1);
                btn_call1.setPosition(cc.p(this.backgroundPopup.getContentSize().width - width_content / 2 -
                    btn_call1.getContentSize().width/2,
                    this.backgroundPopup.getContentSize().height / 2 - btn_call1.getContentSize().height / 2));

                // btn_call1.addTouchEventListener(this.menuPopupCallBack, this);
                this.backgroundPopup.addChild(btn_call1);
            }

            if(hotlines.length == 2){
                var btn_call1 = MButton.createWithText(res.popup_btn_call, hotlines.length > 0 ? hotlines[0] : "",
                    bg_title_popup.getContentSize().height*0.7, POPUP.POPUP_HOT_LINE.BTN_HOT_LINE_1);
                btn_call1.setPosition(cc.p(this.backgroundPopup.getContentSize().width - width_content / 2 - 5 -
                    btn_call1.getContentSize().width,
                    this.backgroundPopup.getContentSize().height / 2 - btn_call1.getContentSize().height / 2));

                btn_call1.addTouchEventListener(this.touchEvent, this);
                this.backgroundPopup.addChild(btn_call1);

                var btn_call2 = MButton.createWithText(res.popup_btn_call, hotlines.length > 1 ? hotlines[1] : "",
                    POPUP.HOT_LINE.BTN_HOT_LINE_1);
                btn_call2.setPosition(cc.p(this.backgroundPopup.getContentSize().width - width_content / 2 + 5,
                    this.backgroundPopup.getContentSize().height / 2 - btn_call2.getContentSize().height / 2));
                btn_call2.addTouchEventListener(this.touchEvent, this);
                this.backgroundPopup.addChild(btn_call2);
            }

        }

        var lb_notify = MLabel.createTitle("Hỗ trợ chăm sóc khách hàng qua điện thoại viên",
            bg_title_popup.getContentSize().height / 2);
        lb_notify.setAnchorPoint(cc.p(0.5,0.5));
        lb_notify.setPosition(cc.p(this.backgroundPopup.getContentSize().width -
            width_content / 2, 3.0 * this.backgroundPopup.getContentSize().height / 4));
        this.backgroundPopup.addChild(lb_notify);

        //btn close
        var exit = MButton.create(res.IMAGE_CLOSE, POPUP.HOT_LINE.BTN_CLOSE);
        exit.setPosition(cc.p(this.backgroundPopup.getContentSize().width - exit.getContentSize().width *0.6,
        this.backgroundPopup.getContentSize().height - exit.getContentSize().height *0.6));
        exit.addTouchEventListener(this.touchEvent, this);
        this.backgroundPopup.addChild(exit);
    },

    touchEvent: function(sender,type){
        if(type == ccui.Widget.TOUCH_ENDED){
            switch (type){
                case POPUP.HOT_LINE.BTN_HOT_LINE_1 :
                {

                }
                case POPUP.HOT_LINE.BTN_HOT_LINE_2 :
                {

                }
                case POPUP.HOT_LINE.BTN_FAN_PAGE :
                {

                }
                case POPUP.HOT_LINE.BTN_CLOSE :
                {
                    this.disappear();
                }
            }
        }
    }
});
