/**
 * Created by MyPC on 13/12/2016.
 */

var ShowGameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();
        this.init();
    },

    init: function () {
        this._super();

        var padding = 12;

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

        var bkg_x = MSprite.createWithSize(res.BGR_LISTGAMES,visibleSize);
        bkg_x.setPosition(MVec2(0,0));
        this.addChild(bkg_x);

        var btn_back = MButton.create(res.btn_back_tlmn,TAG.SHOW_BTN_BACK);
        btn_back.setPosition(MVec2(padding - btn_back.getContentSize().height/6,
            visibleSize.height - padding - btn_back.getContentSize().height*(1-1/6)));
        btn_back.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_back);

        //phone
        var btn_phone = MButton.create(res.TABLE_BTN_PHONE,TAG.SHOW_BTN_PHONE);
        btn_phone.setPosition(MVec2(padding + btn_phone.getContentSize().width + padding,
            visibleSize.height - padding - btn_phone.getContentSize().height));
        btn_phone.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_phone);

        //btn cai dat
        var btn_caidat = MButton.create(res.btn_caidat, TAG.SHOW_BTN_CAIDAT);
        btn_caidat.setPosition(MVec2(visibleSize.width - padding - btn_caidat.getContentSize().width,
            visibleSize.height - padding - btn_caidat.getContentSize().height));
        btn_caidat.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_caidat);

        //btn hop thu
        var btn_hopthu = MButton.create(res.TABLE_BTN_HOPTHU, TAG.SHOW_GAME_HOPTHU);
        btn_hopthu.setPosition(cc.p(btn_caidat.getPositionX() - padding - btn_hopthu.getContentSize().width,
            originY + visibleSize.height - padding - btn_hopthu.getContentSize().height));
        btn_hopthu.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_hopthu);

        // var sprite_new_mail = new cc.Sprite(res.bg_songuoixem);
        // sprite_new_mail.setPosition(cc.p(btn_hopthu.getContentSize().width - sprite_new_mail.getContentSize().width*0.8,
        // btn_hopthu.getContentSize().height - sprite_new_mail.getContentSize().height*0.8));
        // btn_hopthu.addChild(sprite_new_mail);
        //
        //bg avatar
        var bk_avatar = MSprite.create(res.TABLE_BK_AVATAR);
        bk_avatar.setAnchorPoint(cc.p(0,1));
        bk_avatar.setPosition(cc.p(btn_phone.getPositionX() + btn_phone.getContentSize().width + padding,
            btn_phone.getPositionY() + btn_phone.getContentSize().height));
        this.addChild(bk_avatar);

        // avartar
        // var avatar_id = 100000;
        var avatar_id = getAvatarId() ? getAvatarId() : 100000;
        var btn_avatar = MButton.create( cc.formatStr("res/avatar%d.png", avatar_id), TAG.SHOW_BTN_AVATAR);
        btn_avatar.setAnchorPoint(cc.p(0.5,0.5));
        btn_avatar.setPosition(cc.p(bk_avatar.getPositionX() + bk_avatar.getContentSize().width / 2,
            bk_avatar.getPositionY() - bk_avatar.getContentSize().height / 2));
        // btn_avatar.addTouchEventListener();
        this.addChild(btn_avatar);

        //info
        var user_id = 1;
        var label_id = MLabel.create(cc.formatStr("ID: %d", user_id), bk_avatar.getContentSize().height / 4, true);
        label_id.setAnchorPoint(cc.p(0,1));
        label_id.setPosition(cc.p(btn_avatar.getPositionX() + bk_avatar.getContentSize().width + padding, btn_avatar.getPositionY()));
        this.addChild(label_id);

        //ten hien thi
        // var userName = 'Tu_Atula';
        var userName = getDisplayName() ? getDisplayName() : 'Tu_Atula';
        var label_name = MLabel.create(userName, bk_avatar.getContentSize().height / 4, true);
        label_name.setPosition(cc.p(btn_avatar.getPositionX() + bk_avatar.getContentSize().width + padding,
            btn_phone.getPositionY() + btn_phone.getContentSize().height / 2));
        this.addChild(label_name);



        var widthName = label_name.getContentSize().width > label_id.getContentSize().width ? label_name.getContentSize().width : label_id.getContentSize().width;

        var widthXuKen = btn_hopthu.getPositionX() - (label_name.getPositionX() + widthName + 3 * padding);

        cc.log("widthXuKen x: ", widthXuKen);


        //ken
        var _bgr_ken = MButton.create(res.SPRITE_BK_XUKEN,TAG.SHOW_BTN_NAPKEN);
        _bgr_ken.setTag(TAG.SHOW_BTN_NAPXU);
        // _bgr_ken.addTouchEventListener();
        var scale_xuken = (widthXuKen / 2) / (_bgr_ken.getContentSize().width);
        _bgr_ken.setScaleX(scale_xuken);
        _bgr_ken.setPosition(cc.p(btn_hopthu.getPositionX() - _bgr_ken.getContentSize().width * scale_xuken - padding,
            btn_hopthu.getPositionY() + btn_hopthu.getContentSize().height / 2 - _bgr_ken.getContentSize().height / 2));
        this.addChild(_bgr_ken);

        var sprite_ken = MSprite.create(res.TABLE_SPRITE_KEN);
        sprite_ken.setPosition(cc.p(_bgr_ken.getPositionX() + _bgr_ken.getContentSize().width * scale_xuken - sprite_ken.getContentSize().width - 5,
            _bgr_ken.getPositionY() + _bgr_ken.getContentSize().height / 2 - sprite_ken.getContentSize().height / 2));
        this.addChild(sprite_ken);

        var sprite_napken = MSprite.create(res.TABLE_SPRITE_NAPKEN);
        sprite_napken.setPosition(cc.p(_bgr_ken.getPositionX() + 5,
            _bgr_ken.getPositionY() + _bgr_ken.getContentSize().height / 2 - sprite_napken.getContentSize().height / 2));
        this.addChild(sprite_napken);

        //xu
        var _bgr_xu = MButton.create(res.SPRITE_BK_XUKEN,TAG.SHOW_BTN_NAPXU);
        // _bgr_xu.addTouchEventListener();
        _bgr_xu.setScaleX(scale_xuken);
        _bgr_xu.setPosition(cc.p(_bgr_ken.getPositionX() - padding - _bgr_xu.getContentSize().width * scale_xuken,
            btn_hopthu.getPositionY() + btn_hopthu.getContentSize().height / 2 - _bgr_ken.getContentSize().height / 2));
        this.addChild(_bgr_xu);

        var sprite_xu = MSprite.create(res.SPRITE_XU);
        sprite_xu.setPosition(cc.p(_bgr_xu.getPositionX() + _bgr_xu.getContentSize().width * scale_xuken - sprite_xu.getContentSize().width - 5,
            _bgr_xu.getPositionY() + _bgr_xu.getContentSize().height / 2 - sprite_xu.getContentSize().height / 2));
        this.addChild(sprite_xu);

        var sprite_napxu = MSprite.create(res.TABLE_SPRITE_NAPXU);
        sprite_napxu.setPosition(cc.p(_bgr_xu.getPositionX() + 5,
            _bgr_xu.getPositionY() + _bgr_xu.getContentSize().height / 2 - sprite_napxu.getContentSize().height / 2));
        this.addChild(sprite_napxu);

        var sprite_thongtin = MSprite.create(res.SPRITE_THONGTIN);
        sprite_thongtin.setAnchorPoint(cc.p(0,0));
        sprite_thongtin.setPosition(cc.p(originX + visibleSize.width / 2 - sprite_thongtin.getContentSize().width / 2,
            btn_avatar.getPositionY() - bk_avatar.getContentSize().height - padding));
        this.addChild(sprite_thongtin);

        var bkg_navigationbar = MSprite.create(res.BGR_UNDERLINE);
        bkg_navigationbar.setAnchorPoint(cc.p(0,0));
        bkg_navigationbar.setScaleX(visibleSize.width / bkg_navigationbar.getContentSize().width);
        bkg_navigationbar.setPosition(MVec2(0,0));
        this.addChild(bkg_navigationbar); //left

        // doi thuong
        // var icon_doithuong_text = res.btn_tro_giup;
        var icon_doithuong_text = getServerAppVersion() < 0 ? "res/btn_tro_giup.png" : res.ICON_DOI_THUONG;
        var btn_doithuong = MButton.create(icon_doithuong_text, "", 30, TAG.SHOW_BTN_DOI_THUONG);
        btn_doithuong.setPosition(MVec2(visibleSize.width / 2 - btn_doithuong.getContentSize().width / 2, 0));
        // btn_doithuong.addTouchEventListener();
        this.addChild(btn_doithuong);

        // thong bao
        var btn_thongbao = MButton.createExtendsBottom(res.ICON_BTN_THONGBAO, "Thông báo", 30, TAG.SHOW_GAME_THONGBAO);

        btn_thongbao.setPosition(MVec2(visibleSize.width * 5 / 8, bkg_navigationbar.getContentSize().height / 2 - btn_thongbao.getContentSize().height / 2));
        // btn_thongbao.addTouchEventListener();
        this.addChild(btn_thongbao);


        var sprite_new_notify = MSprite.create(res.new_notify);
        sprite_new_notify.setPosition(cc.p(btn_thongbao.getContentSize().width - sprite_new_notify.getContentSize().width/2.0,0.75*btn_thongbao.getContentSize().height));
        btn_thongbao.addChild(sprite_new_notify);

        // chat
        var btn_chat = MButton.createExtendsBottom(res.ICON_CHAT, "Chat", 30, TAG.SHOW_BTN_MESSAGE);
        btn_chat.setPosition(cc.p(originX + visibleSize.width * 6 / 8, btn_thongbao.getPositionY()));
        // btn_chat.addTouchEventListener();
        this.addChild(btn_chat);

        // giftcode
        var btn_giftcode = MButton.createExtendsBottom(res.ICON_GIFTCODE, "Quà tặng", 30, TAG.SHOW_BTN_GIFTCODE);
        btn_giftcode.setPosition(cc.p(originX + visibleSize.width * 7 / 8 + 10, btn_thongbao.getPositionY()));
        // btn_giftcode.addTouchEventListener();
        this.addChild(btn_giftcode);

        //huong dan
        var btn_help = MButton.createExtendsBottom(res.ICON_HELP, "Hướng dẫn", 30, TAG.SHOW_BTN_TROGIUP);
        btn_help.setZoomScale(0.2);
        btn_help.setPosition(cc.p(originX + visibleSize.width * 1 / 8 - btn_help.getContentSize().width, btn_thongbao.getPositionY()));
        // btn_help.addTouchEventListener();
        this.addChild(btn_help);

        //xep hang
        var btn_xephang = MButton.createExtendsBottom(res.ICON_TOP, "Xếp hạng", 30, TAG.SHOW_BTN_XEPHANG);
        btn_xephang.setPosition(cc.p(originX + visibleSize.width * 2 / 8 - btn_xephang.getContentSize().width, btn_thongbao.getPositionY()));
        // btn_xephang.addTouchEventListener();
        this.addChild(btn_xephang);

        // banbe
        var btn_friend = MButton.createExtendsBottom(res.ICON_FRINED, "Bạn bè", 30, TAG.SHOW_BTN_FRIEND);
        btn_friend.setPosition(cc.p(originX + visibleSize.width * 3 / 8 - btn_friend.getContentSize().width, btn_thongbao.getPositionY()));
        // btn_friend.addTouchEventListener();
        this.addChild(btn_friend);

        //==================================== scroll view - game button

        var scollFrameSize = new cc.Size(visibleSize.width,sprite_thongtin.getPositionY() + sprite_thongtin.getContentSize().height - bkg_navigationbar.getContentSize().height);
        cc.log("scollFrameSize", scollFrameSize);
        var scrollView = new ccui.ScrollView();
        scrollView.setContentSize(scollFrameSize);
        scrollView.setPosition(cc.p(originX, originY + bkg_navigationbar.getContentSize().height)); //- 10
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        // scrollView.setScrollBarEnabled(false);
        scrollView.setBounceEnabled(false);
        scrollView.setInertiaScrollEnabled(true);
        scrollView.setTouchEnabled(true);
        scrollView.addEventListener(this.scrollEvent,this);

        var containerSize = new cc.Size(scollFrameSize.width * 2.55, scollFrameSize.height);
        scrollView.setInnerContainerSize(containerSize);
        this.addChild(scrollView);
        var scrollPage = 0;

        var nameTabButton = [res.ICON_TLMN_SOLO_ACTIVE, res.ICON_TLMN_ACTIVE,
            res.ICON_XOC_DIA_ACTIVE, res.ICON_TAMXINGAU_ACTIVE, res.ICON_MINI_POKER_ACTIVE,
            res.ICON_WHEEL_ACTIVE, res.ICON_PHOM_ACTIVE, res.ICON_MAU_BINH_ACTIVE,
            res.ICON_BACAY_ACTIVE,  res.ICON_LIENG_ACTIVE, res.ICON_XITO_ACTIVE ];

        var tagTabButton = [TAG.SHOW_GAME_TLMN_SOLO, TAG.SHOW_GAME_TLMN,
            TAG.SHOW_GAME_XOCDIA, TAG.SHOW_GAME_TAMXINGAU, TAG.SHOW_GAME_MINI_POKER,
            TAG.SHOW_GAME_WHEEL, TAG.SHOW_GAME_PHOM, TAG.SHOW_GAME_MAUBINH,
            TAG.SHOW_GAME_BACAY, TAG.SHOW_GAME_LIENG, TAG.SHOW_GAME_XITO ];

        var zoneTagButton = [Common.TLMN_SOLO_ZONE, Common.TIENLENMIENNAM_ZONE,
            Common.XOCDIA_ZONE, Common.TAMXINGAU_ZONE, Common.MINIPOKER_ZONE,
            Common.WHEEL_ZONE, Common.PHOM_ZONE, Common.MAUBINH_ZONE,
            Common.BACAY_ZONE, Common.LIENG_ZONE,Common.XITO_ZONE];

        var button_size = new cc.Size(visibleSize.width * 0.22, visibleSize.width * 0.22 * 356 / 270.0);  //361 / 310.0f
        var distance_button = (scollFrameSize.width - 4.2*button_size.width) / 8;

        // var enableGameIds = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
        var enableGameIds = getEnableGameIds();

        cc.log("enableGameIds", enableGameIds);

        for (i = 0; i < nameTabButton.length; i++){
            var isFound = false;
            for ( j = 0; j < enableGameIds.length; j++) {
                if (enableGameIds[j] == zoneTagButton[i]) {
                    isFound = true;
                    break;
                }
            }

            var game_button = MButton.createWidthSize(nameTabButton[i], button_size, tagTabButton[i]);
            if (!isFound){
                game_button.setBright(false);
            }

            game_button.setPosition(cc.p((i+1) * (button_size.width + distance_button) - button_size.width/2,containerSize.height*0.48));
            // game_button.addTouchEventListener();
            if (i == 2){
                game_button.setScale(1.25);
                game_button.setLocalZOrder(1);
            }
            scrollView.addChild(game_button);
        }

        return true;
    },
    scrollEvent: function () {

    },
    menuCallBack: function(sender, type){
        cc.log("TAG.SHOW_BTN_FRIEND");
        if(type == ccui.Widget.TOUCH_ENDED) {
            var tag = sender.tag;
            // SoundManager::getInstance()->playSound("sounds/button_click.mp3");
            switch (tag) {
                case TAG.SHOW_BTN_FRIEND:
                {
                    enableTouch = false;
                    isCallMsgFilterFriend = true;
                    // NetworkManager::getInstance()->getFilterAddFriendFromServer(-1,-1);
                }
                    break;
                case TAG.SHOW_BTN_BACK:
                {
                    this.onClickExit();
                }

                    break;
                case TAG.SHOW_BTN_DOI_THUONG:
                {
                    // if (Common::getInstance()->isEnabledTopup()) {
                    //     if (this->getChildByTag(POPUP_TAG_MUATHE) == nullptr){
                    //         auto m_popupDoiThuong = PopupDoiThuong::create();
                    //         m_popupDoiThuong->setTag(POPUP_TAG_MUATHE);
                    //         m_popupDoiThuong->setContext(this);
                    //         addChild(m_popupDoiThuong, INDEX_POPUP);
                    //         m_popupDoiThuong->appear();
                    //     }
                    // }else {
                    //     if(Common::getInstance()->getServerAppVersion() < 0){
                    //         if(this->getChildByTag(POPUP_TAG_HOTLINE) == nullptr){
                    //             auto m_popupHotLine = PopupHotLine::create();
                    //             m_popupHotLine->setTag(POPUP_TAG_HOTLINE);
                    //             addChild(m_popupHotLine,INDEX_POPUP);
                    //             m_popupHotLine->appear();
                    //         }
                    //     }else{
                    //         this->showToast(MSG_MAINTAIN, 2);
                    //     }
                    // }
                }
                    break;
                case TAG.SHOW_BTN_AVATAR:
                    // if(this->getChildByTag(POPUP_TAG_USERINFOR) == nullptr){
                    //     auto m_popupUserInfo = PopupUserInfo::create();
                    //     m_popupUserInfo->setTag(POPUP_TAG_USERINFOR);
                    //     addChild(m_popupUserInfo,INDEX_POPUP);
                    //     m_popupUserInfo->showPositionTab(1);
                    //     m_popupUserInfo->appear();
                    // }
                    break;
                case TAG.SHOW_BTN_CAIDAT:
                {
                    enableTouch = false;
                    // POPUP SETTING
                    // if(this->getChildByTag(POPUP_TAG_SETTING) == nullptr){
                    //     auto m_popupSetting = PopupSetting::create();
                    //     m_popupSetting->setTag(POPUP_TAG_SETTING);
                    //     addChild(m_popupSetting,INDEX_POPUP);
                    //     m_popupSetting->appear();
                    // }

                }
                    break;
                case TAG.SHOW_GAME_HOPTHU:
                {
                    // if(this->getChildByTag(POPUP_TAG_USERINFOR) == nullptr){
                    //     auto m_popupUserInfo = PopupUserInfo::create();
                    //     m_popupUserInfo->setTag(POPUP_TAG_USERINFOR);
                    //     m_popupUserInfo->showPositionTab(2);
                    //     addChild(m_popupUserInfo,INDEX_POPUP);
                    //     m_popupUserInfo->appear();
                    // }

                    break;
                }
                case TAG.SHOW_BTN_NAPKEN:
                {
                    // if(Common::getInstance()->getServerAppVersion() < 0){
                    // #if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
                    //         break;
                    //         #endif
                    // }
                    // auto m_popupDoiThe = (PopupDoiThe*) this->getChildByTag(POPUP_TAG_DOITHE);
                    // if (m_popupDoiThe == nullptr){
                    //     m_popupDoiThe = PopupDoiThe::create();
                    //     m_popupDoiThe->setTag(POPUP_TAG_DOITHE);
                    //     m_popupDoiThe->addMenuNapThe();
                    //     addChild(m_popupDoiThe, INDEX_POPUP);
                    //     m_popupDoiThe->appear();
                    // }
                }
                    break;
                case TAG.SHOW_BTN_NAPXU:
                {
                    // if(Common::getInstance()->getServerAppVersion() < 0){
                    // #if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
                    //         break;
                    //         #endif
                    // }
                    // auto m_popupDoiThe = (PopupDoiThe*) this->getChildByTag(POPUP_TAG_DOITHE);
                    // if (m_popupDoiThe == nullptr){
                    //     m_popupDoiThe = PopupDoiThe::create();
                    //     m_popupDoiThe->setTag(POPUP_TAG_DOITHE);
                    //     m_popupDoiThe->showPositionTabDoiXu();
                    //     addChild(m_popupDoiThe, INDEX_POPUP);
                    //     m_popupDoiThe->appear();
                    // }
                }
                    break;
                case TAG.SHOW_BTN_TROGIUP:
                    // if (this->getChildByTag(POPUP_TAG_HELP_TO_PLAY) == nullptr){
                    //     auto m_popup = PopupHelpToPlay::create();
                    //     m_popup->setTag(POPUP_TAG_HELP_TO_PLAY);
                    //     addChild(m_popup, INDEX_POPUP);
                    //     m_popup->appear(true);
                    // }
                    break;
                case TAG.SHOW_BTN_XEPHANG:
                    // if(this->getChildByTag(POPUP_TAG_TOPUSER) == nullptr){
                    //     auto m_popup = PopupTopUser::create();
                    //     m_popup->setTag(POPUP_TAG_TOPUSER);
                    //     addChild(m_popup,INDEX_POPUP);
                    //     m_popup->requestTopUser();
                    //     m_popup->appear();
                    // }
                    break;
                case TAG.SHOW_BTN_GIFTCODE:
                    // if(Common::getInstance()->isEnableGiftCode()){
                    //     if(this->getChildByTag(POPUP_TAG_GIFTCODE) == nullptr){
                    //         auto m_popupGiftCode = PopupGiftCode::create();
                    //         m_popupGiftCode->setTag(POPUP_TAG_GIFTCODE);
                    //         m_popupGiftCode->setContext(this);
                    //         addChild(m_popupGiftCode,INDEX_POPUP);
                    //         m_popupGiftCode->appear();
                    //     }
                    // }else {
                    //     if(Common::getInstance()->getServerAppVersion() < 0){
                    //         this->showToast(MSG_COMMING_SOON, 2);
                    //     }else{
                    //         this->showToast(MSG_MAINTAIN, 2);
                    //     }
                    // }

                    break;
                case TAG.SHOW_BTN_PHONE:
                    if(this.getChildByTag(POPUP.TAG_HOTLINE) == null){
                        cc.log("TAG.SHOW_BTN_PHONE");

                        var pop = new PopupHotLine();
                        pop.setPosition(MVec2(0,-height));
                        pop.appear();
                        this.addChild(pop);

                    }
                    break;
                case TAG.SHOW_GAME_THONGBAO:
                    // if (this->getChildByTag(POPUP_TAG_NOTIFY) == nullptr){
                    //     auto m_popup = PopupNotify::create();
                    //     m_popup->setTag(POPUP_TAG_NOTIFY);
                    //     addChild(m_popup, INDEX_POPUP);
                    //     m_popup->appear();
                    // }
                    break;
                case TAG.SHOW_BTN_MESSAGE:
                {
                    // showToast(TEXT_NOTIFY_FUNCTION_FUTURE, 2);
                }
                    break;
                default:
                    break;
            }
        }
    },
    onClickExit: function(){
        // cc.log("onClickExit");
        // var nodeConfirm = NodeConfirmCreate(ccui.Widget.TOUCH_ENDED, TXT.TITLE_POPUP_CONFIRM, "Bạn có muốn Đăng xuất không?",true);
        // nodeConfirm.show(true);
        // return;
        cc.director.runScene(new LoginScene());
    }, gameItemCallBack: function(sender, type) {
        // if (type == ccui.Widget.TOUCH_BEGAN) {
        //     auto btnSelect = ((MButton*) sender);
        //     btnSelect->runAction(Sequence::create(ScaleTo::create(0.1f, 1.27f),
        //     ScaleTo::create(0.1f, 1.1f),ScaleTo::create(0.1f, 1.25f),NULL));
        //     btnSelect->setLocalZOrder(1);
        //
        //     Vector<Node*> children = scrollView->getChildren();
        //     for (int i = 0; i < children.size(); i++) {
        //         MButton* button = dynamic_cast<MButton*>(children.at(i));
        //         if (button != nullptr && btnSelect->getTag() != button->getTag()) {
        //             button->runAction(ScaleTo::create(0.1f, 1.0f));
        //             button->setLocalZOrder(0);
        //         }
        //     }
        // }

        if(type == ccui.Widget.TOUCH_ENDED){
            var gameTag = sender.tag;
            setGameTag(gameTag);
            // SoundManager::getInstance()->playSound("sounds/button_click.mp3");
            var isFound = false;
            // for (game_id : Common::getInstance()->getEnableGameIds()) {
            //     if (Common::getInstance()->getZoneId() == game_id) {
            //         isFound = true;
            //         break;
            //     }
            // }
            var isFound = false;
            var enableGameIds = getEnableGameIds();
            for ( j = 0; j < enableGameIds.length; j++) {
                if (enableGameIds[j] == getZoneId()) {
                    isFound = true;
                    break;
                }
            }
            if (!isFound) {
                // showToast("Game sắp ra mắt", 3);
                return;
            }
            getEnterZoneMessageFromServer(getZoneId());
        }
    }
});

var ShowGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ShowGameLayer();
        this.addChild(layer);
    }
});
