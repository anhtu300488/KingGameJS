/**
 * Created by MyPC on 13/12/2016.
 */
var padding = 12;
var ShowGameLayer = cc.Layer.extend({
    ctor: function () {
        this._super();

        this.init();

        return true;
    },

    init: function () {
        this._super();

        if (!baseSceneConnect.init()) {
            return false;
        }

        common.gameState = GAME_STATE.SHOW_GAME;
        // common.jarStatus = false;

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
        // sprite_new_mail.setPosition(cc.p(btn_hopthu.getContentSize().width -
        // sprite_new_mail.getContentSize().width*0.8,
        // btn_hopthu.getContentSize().height - sprite_new_mail.getContentSize().height*0.8));
        // btn_hopthu.addChild(sprite_new_mail);
        //
        //bg avatar
        var bk_avatar = MSprite.createWithSize(res.TABLE_BK_AVATAR,
            cc.size(btn_phone.getWidth(),btn_phone.getWidth()));
        bk_avatar.setAnchorPoint(cc.p(0,1));
        bk_avatar.setPosition(cc.p(btn_phone.getPositionX() + btn_phone.getContentSize().width + padding,
            btn_phone.getPositionY() + btn_phone.getContentSize().height));
        this.addChild(bk_avatar);

        // avartar
        // var avatar_id = 100000;
        // var avatar_id = getAvatarId() ? getAvatarId() : 100000;
        var avatar_id = common.avatarId ? common.avatarId : 100000;
        var btn_avatar = MButton.createWidthSize(cc.formatStr("res/avatar%d.png", avatar_id),
            cc.size(btn_phone.getWidth(),btn_phone.getWidth()),TAG.SHOW_BTN_AVATAR);
        btn_avatar.setAnchorPoint(cc.p(0,1));
        btn_avatar.setPosition(cc.p(bk_avatar.getPositionX(),
            bk_avatar.getPositionY()));
        // btn_avatar.addTouchEventListener();
        this.addChild(btn_avatar);

        //info
        var user_id = getUserId() ? getUserId() : '';
        var label_id = MLabel.create(cc.formatStr("ID:",user_id), bk_avatar.getContentSize().height / 4, true);
        label_id.setAnchorPoint(cc.p(0,1));
        label_id.setPosition(cc.p(btn_avatar.getPositionX() + bk_avatar.getContentSize().width,
            btn_avatar.getPositionY()));
        this.addChild(label_id);

        //ten hien thi
        // var userName = 'Tu_Atula';
        // var userName = getDisplayName() ? getDisplayName() : '';
        var userName = common.displayName ? common.displayName : '';
        var label_name = MLabel.create(userName, bk_avatar.getContentSize().height / 4, true);
        label_name.setPosition(cc.p(btn_avatar.getPositionX() + bk_avatar.getContentSize().width +
            label_name.getWidth()/2,
            btn_phone.getPositionY() + btn_phone.getContentSize().height / 2 - label_name.getHeight()/2));        this.addChild(label_name);

        var widthName = label_name.getContentSize().width > label_id.getContentSize().width ?
            label_name.getContentSize().width : label_id.getContentSize().width;

        var widthXuKen = btn_hopthu.getPositionX() - (label_name.getPositionX() + widthName + 3 * padding);



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
        sprite_ken.setPosition(cc.p(_bgr_ken.getPositionX() + _bgr_ken.getContentSize().width * scale_xuken -
            sprite_ken.getContentSize().width - 5,
            _bgr_ken.getPositionY() + _bgr_ken.getContentSize().height / 2 - sprite_ken.getContentSize().height / 2));
        this.addChild(sprite_ken);

        var sprite_napken = MSprite.create(res.TABLE_SPRITE_NAPKEN);
        sprite_napken.setPosition(cc.p(_bgr_ken.getPositionX() + 5,_bgr_ken.getPositionY() +
            _bgr_ken.getContentSize().height / 2 - sprite_napken.getContentSize().height / 2));
        this.addChild(sprite_napken);

        // var number_gold = getGold();
        var number_gold = common.gold;
        cc.log("gold", number_gold);
        var text_ken_scale = number_gold.toString().length > 9 ? 0.42 : 0.5;
        var label_ken = MLabel.create(number_gold, _bgr_ken.getHeight()*text_ken_scale, cc.color(40, 189, 212), true);
        label_ken.setAnchorPoint(cc.p(1,0));
        label_ken.setPosition(sprite_ken.getPositionX() - 5, _bgr_ken.getPositionY() + _bgr_ken.getHeight() / 2 - label_ken.getHeight() / 2);
        this.addChild(label_ken);

        //xu
        var _bgr_xu = MButton.create(res.SPRITE_BK_XUKEN,TAG.SHOW_BTN_NAPXU);
        // _bgr_xu.addTouchEventListener();
        _bgr_xu.setScaleX(scale_xuken);
        _bgr_xu.setPosition(cc.p(_bgr_ken.getPositionX() - padding - _bgr_xu.getContentSize().width * scale_xuken,
            btn_hopthu.getPositionY() + btn_hopthu.getContentSize().height / 2 - _bgr_ken.getContentSize().height / 2));
        this.addChild(_bgr_xu);

        var sprite_xu = MSprite.create(res.SPRITE_XU);
        sprite_xu.setPosition(cc.p(_bgr_xu.getPositionX() + _bgr_xu.getContentSize().width * scale_xuken -
            sprite_xu.getContentSize().width - 5,
            _bgr_xu.getPositionY() + _bgr_xu.getContentSize().height / 2 - sprite_xu.getContentSize().height / 2));
        this.addChild(sprite_xu);

        var sprite_napxu = MSprite.create(res.TABLE_SPRITE_NAPXU);
        sprite_napxu.setPosition(cc.p(_bgr_xu.getPositionX() + 5,
            _bgr_xu.getPositionY() + _bgr_xu.getContentSize().height / 2 - sprite_napxu.getContentSize().height / 2));
        this.addChild(sprite_napxu);

        // var number_cash = getCash();
        var number_cash = common.cash;
        var text_xu_scale = number_cash.toString().length > 9 ? 0.42 : 0.5;
        var label_xu = MLabel.create(number_cash, _bgr_xu.getHeight()*text_xu_scale, cc.color(255, 214, 0), true);
        label_xu.setAnchorPoint(cc.p(1,0));
        label_xu.setPosition(sprite_xu.getPositionX() - 5,
            _bgr_xu.getPositionY() + _bgr_xu.getHeight() / 2 - label_xu.getHeight() / 2);
        this.addChild(label_xu);

        var sprite_thongtin = MSprite.create(res.SPRITE_THONGTIN);
        sprite_thongtin.setAnchorPoint(cc.p(0,0));
        sprite_thongtin.setPosition(cc.p(originX + visibleSize.width / 2 - sprite_thongtin.getContentSize().width / 2,
            btn_avatar.getPositionY() - bk_avatar.getContentSize().height - padding - sprite_thongtin.getHeight()));
        this.addChild(sprite_thongtin);

        // var node_hello = new cc.Node();
        // cc.log("node_hello", getHeadLineNotify());
        // if (getHeadLineNotify().empty()){
        //     var label_hello = MLabel.create(TEXT_SHOWGAME_HELLO, _bgr_xu.getHeight()*0.32);
        //     label_hello.setColor(cc.color.WHITE);
        //     label_hello.setPosition(0,sprite_thongtin.getContentSize().height / 2 - label_hello.getHeight() / 2);
        //
        //     node_hello.setContentSize(Size(label_hello.getContentSize().width, sprite_thongtin.getContentSize().height));
        //     node_hello.addChild(label_hello);
        // } else {
        //     getNodeHello(node_hello);
        // }

        // var bg_thongtin = MSprite.create(res.SPRITE_THONGTIN);
        // var clipText = new cc.ClippingNode(bg_thongtin);
        // clipText.setPosition(cc.p(origin.x + width / 2 - bg_thongtin.getWidth() / 2,
        //     btn_avatar.getPosition().y - btn_avatar.getHeight() - padding));
        // clipText.addChild(node_hello);
        // this.addChild(clipText);
        //
        // var sprite_thongtin_hidden = MSprite.create("res/sprite_thongtin_hidden.png");
        // sprite_thongtin_hidden.setPosition(cc.p(sprite_thongtin.getPositionX(),
        //     sprite_thongtin.getPositionY()));
        // this.addChild(sprite_thongtin_hidden);

        var bkg_navigationbar = MSprite.create(res.BGR_UNDERLINE);
        bkg_navigationbar.setAnchorPoint(cc.p(0,0));
        bkg_navigationbar.setScaleX(visibleSize.width / bkg_navigationbar.getContentSize().width);
        bkg_navigationbar.setPosition(MVec2(0,0));
        this.addChild(bkg_navigationbar); //left

        // doi thuong
        // var icon_doithuong_text = res.btn_tro_giup;
        // var icon_doithuong_text = getServerAppVersion() < 0 ? "res/btn_tro_giup.png" : res.ICON_DOI_THUONG;
        var icon_doithuong_text = common.serverAppVersion < 0 ? "res/btn_tro_giup.png" : res.ICON_DOI_THUONG;
        var btn_doithuong = MButton.create(icon_doithuong_text, "", 30, TAG.SHOW_BTN_DOI_THUONG);
        btn_doithuong.setPosition(MVec2(visibleSize.width / 2 - btn_doithuong.getContentSize().width / 2, 0));
        // btn_doithuong.addTouchEventListener();
        this.addChild(btn_doithuong);

        // thong bao
        var btn_thongbao = MButton.createExtendsBottom(res.ICON_BTN_THONGBAO, "Thông báo", 30, TAG.SHOW_GAME_THONGBAO);

        btn_thongbao.setPosition(MVec2(visibleSize.width * 5 / 8, bkg_navigationbar.getContentSize().height / 2 -
            btn_thongbao.getContentSize().height / 2));
        // btn_thongbao.addTouchEventListener();
        this.addChild(btn_thongbao);


        var sprite_new_notify = MSprite.create(res.new_notify);
        sprite_new_notify.setPosition(cc.p(btn_thongbao.getContentSize().width -
            sprite_new_notify.getContentSize().width/2.0,0.75*btn_thongbao.getContentSize().height));
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
        btn_help.setPosition(cc.p(originX + visibleSize.width * 1 / 8 - btn_help.getContentSize().width,
            btn_thongbao.getPositionY()));
        // btn_help.addTouchEventListener();
        this.addChild(btn_help);

        //xep hang
        var btn_xephang = MButton.createExtendsBottom(res.ICON_TOP, "Xếp hạng", 30, TAG.SHOW_BTN_XEPHANG);
        btn_xephang.setPosition(cc.p(originX + visibleSize.width * 2 / 8 - btn_xephang.getContentSize().width,
            btn_thongbao.getPositionY()));
        // btn_xephang.addTouchEventListener();
        this.addChild(btn_xephang);

        // banbe
        var btn_friend = MButton.createExtendsBottom(res.ICON_FRINED, "Bạn bè", 30, TAG.SHOW_BTN_FRIEND);
        btn_friend.setPosition(cc.p(originX + visibleSize.width * 3 / 8 - btn_friend.getContentSize().width,
            btn_thongbao.getPositionY()));
        // btn_friend.addTouchEventListener();
        this.addChild(btn_friend);

        //==================================== scroll view - game button

        var scollFrameSize = new cc.Size(visibleSize.width,sprite_thongtin.getPositionY() +
            sprite_thongtin.getContentSize().height - bkg_navigationbar.getContentSize().height);
        this.scrollView = new ccui.ScrollView();
        this.scrollView.setContentSize(scollFrameSize);
        this.scrollView.setPosition(cc.p(originX, originY + bkg_navigationbar.getContentSize().height)); //- 10
        this.scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        // scrollView.setScrollBarEnabled(false);
        this.scrollView.setBounceEnabled(false);
        this.scrollView.setInertiaScrollEnabled(true);
        this.scrollView.setTouchEnabled(true);
        this.scrollView.addEventListener(this.scrollEvent,this);

        var containerSize = new cc.Size(scollFrameSize.width * 2.55, scollFrameSize.height);
        this.scrollView.setInnerContainerSize(containerSize);
        this.addChild(this.scrollView);
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

        var button_size = new cc.Size(visibleSize.width * 0.22, visibleSize.width * 0.22 * 356 / 270.0); //361 / 310.0f
        var distance_button = (scollFrameSize.width - 4.2*button_size.width) / 8;

        // var enableGameIds = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
        // var enableGameIds = getEnableGameIds();
        var enableGameIds = common.enableGameIds;


        if(common.enableGameIds == null){
            enableGameIds = [0,1,2,3,4,5,6,7,8,9,10];
        }


        for (var i = 0; i < nameTabButton.length; i++){
            var isFound = false;
            for (var j = 0; j < enableGameIds.length; j++) {
                if (enableGameIds[j] == zoneTagButton[i]) {
                    isFound = true;
                    break;
                }
            }

            var game_button = MButton.createWidthSize(nameTabButton[i], button_size, tagTabButton[i]);
            if (!isFound){
                //game_button.setBright(false);
            }

            game_button.setPosition(cc.p((i+1) * (button_size.width + distance_button) - button_size.width/2,
                containerSize.height*0.48));
            game_button.addTouchEventListener(this.gameItemCallBack,this);
            if (i == 2){
                game_button.setScale(1.25);
                game_button.setLocalZOrder(1);
            }
            this.scrollView.addChild(game_button);
        }

        ws.onmessage = this.ongamestatus.bind(this);
        //
        //
        // this.scheduleUpdate();
    },

    onExit:function () {
        baseSceneConnect.onExit();
    },
    scrollEvent: function () {

    },
    menuCallBack: function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED) {
            var tag = sender.tag;
            // SoundManager::getInstance().playSound("sounds/button_click.mp3");
            switch (tag) {
                case TAG.SHOW_BTN_FRIEND:
                {
                    enableTouch = false;
                    isCallMsgFilterFriend = true;
                    // NetworkManager::getInstance().getFilterAddFriendFromServer(-1,-1);
                }
                    break;
                case TAG.SHOW_BTN_BACK:
                {
                    this.onClickExit();
                }

                    break;
                case TAG.SHOW_BTN_DOI_THUONG:
                {
                    // if (Common::getInstance().isEnabledTopup()) {
                    //     if (this.getChildByTag(POPUP_TAG_MUATHE) == nullptr){
                    //         auto m_popupDoiThuong = PopupDoiThuong::create();
                    //         m_popupDoiThuong.setTag(POPUP_TAG_MUATHE);
                    //         m_popupDoiThuong.setContext(this);
                    //         addChild(m_popupDoiThuong, INDEX_POPUP);
                    //         m_popupDoiThuong.appear();
                    //     }
                    // }else {
                    //     if(Common::getInstance().getServerAppVersion() < 0){
                    //         if(this.getChildByTag(POPUP_TAG_HOTLINE) == nullptr){
                    //             auto m_popupHotLine = PopupHotLine::create();
                    //             m_popupHotLine.setTag(POPUP_TAG_HOTLINE);
                    //             addChild(m_popupHotLine,INDEX_POPUP);
                    //             m_popupHotLine.appear();
                    //         }
                    //     }else{
                    //         this.showToast(MSG_MAINTAIN, 2);
                    //     }
                    // }
                }
                    break;
                case TAG.SHOW_BTN_AVATAR:
                    // if(this.getChildByTag(POPUP_TAG_USERINFOR) == nullptr){
                    //     auto m_popupUserInfo = PopupUserInfo::create();
                    //     m_popupUserInfo.setTag(POPUP_TAG_USERINFOR);
                    //     addChild(m_popupUserInfo,INDEX_POPUP);
                    //     m_popupUserInfo.showPositionTab(1);
                    //     m_popupUserInfo.appear();
                    // }
                    break;
                case TAG.SHOW_BTN_CAIDAT:
                {

                    var popupSetting = new PopupSetting();
                    this.addChild(popupSetting);
                    popupSetting.appear();

                    // POPUP SETTING
                    // if(this.getChildByTag(POPUP_TAG_SETTING) == nullptr){
                    //     auto m_popupSetting = PopupSetting::create();
                    //     m_popupSetting.setTag(POPUP_TAG_SETTING);
                    //     addChild(m_popupSetting,INDEX_POPUP);
                    //     m_popupSetting.appear();
                    // }

                }
                    break;
                case TAG.SHOW_GAME_HOPTHU:
                {
                    // if(this.getChildByTag(POPUP_TAG_USERINFOR) == nullptr){
                    //     auto m_popupUserInfo = PopupUserInfo::create();
                    //     m_popupUserInfo.setTag(POPUP_TAG_USERINFOR);
                    //     m_popupUserInfo.showPositionTab(2);
                    //     addChild(m_popupUserInfo,INDEX_POPUP);
                    //     m_popupUserInfo.appear();
                    // }

                    break;
                }
                case TAG.SHOW_BTN_NAPKEN:
                {
                    // if(Common::getInstance().getServerAppVersion() < 0){
                    // #if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
                    //         break;
                    //         #endif
                    // }
                    // auto m_popupDoiThe = (PopupDoiThe*) this.getChildByTag(POPUP_TAG_DOITHE);
                    // if (m_popupDoiThe == nullptr){
                    //     m_popupDoiThe = PopupDoiThe::create();
                    //     m_popupDoiThe.setTag(POPUP_TAG_DOITHE);
                    //     m_popupDoiThe.addMenuNapThe();
                    //     addChild(m_popupDoiThe, INDEX_POPUP);
                    //     m_popupDoiThe.appear();
                    // }
                }
                    break;
                case TAG.SHOW_BTN_NAPXU:
                {
                    // if(Common::getInstance().getServerAppVersion() < 0){
                    // #if(CC_TARGET_PLATFORM == CC_PLATFORM_IOS)
                    //         break;
                    //         #endif
                    // }
                    // auto m_popupDoiThe = (PopupDoiThe*) this.getChildByTag(POPUP_TAG_DOITHE);
                    // if (m_popupDoiThe == nullptr){
                    //     m_popupDoiThe = PopupDoiThe::create();
                    //     m_popupDoiThe.setTag(POPUP_TAG_DOITHE);
                    //     m_popupDoiThe.showPositionTabDoiXu();
                    //     addChild(m_popupDoiThe, INDEX_POPUP);
                    //     m_popupDoiThe.appear();
                    // }
                }
                    break;
                case TAG.SHOW_BTN_TROGIUP:
                    // if (this.getChildByTag(POPUP_TAG_HELP_TO_PLAY) == nullptr){
                    //     auto m_popup = PopupHelpToPlay::create();
                    //     m_popup.setTag(POPUP_TAG_HELP_TO_PLAY);
                    //     addChild(m_popup, INDEX_POPUP);
                    //     m_popup.appear(true);
                    // }
                    break;
                case TAG.SHOW_BTN_XEPHANG:
                    // if(this.getChildByTag(POPUP_TAG_TOPUSER) == nullptr){
                    //     auto m_popup = PopupTopUser::create();
                    //     m_popup.setTag(POPUP_TAG_TOPUSER);
                    //     addChild(m_popup,INDEX_POPUP);
                    //     m_popup.requestTopUser();
                    //     m_popup.appear();
                    // }
                    break;
                case TAG.SHOW_BTN_GIFTCODE:
                    // if(Common::getInstance().isEnableGiftCode()){
                    //     if(this.getChildByTag(POPUP_TAG_GIFTCODE) == nullptr){
                    //         auto m_popupGiftCode = PopupGiftCode::create();
                    //         m_popupGiftCode.setTag(POPUP_TAG_GIFTCODE);
                    //         m_popupGiftCode.setContext(this);
                    //         addChild(m_popupGiftCode,INDEX_POPUP);
                    //         m_popupGiftCode.appear();
                    //     }
                    // }else {
                    //     if(Common::getInstance().getServerAppVersion() < 0){
                    //         this.showToast(MSG_COMMING_SOON, 2);
                    //     }else{
                    //         this.showToast(MSG_MAINTAIN, 2);
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
                    // if (this.getChildByTag(POPUP_TAG_NOTIFY) == nullptr){
                    //     auto m_popup = PopupNotify::create();
                    //     m_popup.setTag(POPUP_TAG_NOTIFY);
                    //     addChild(m_popup, INDEX_POPUP);
                    //     m_popup.appear();
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
        // var nodeConfirm = NodeConfirmCreate(ccui.Widget.TOUCH_ENDED, TXT.TITLE_POPUP_CONFIRM,
        // "Bạn có muốn Đăng xuất không?",true);
        // nodeConfirm.show(true);
        // return;
        cc.director.runScene(new LoginScene());
    },
    gameItemCallBack: function(sender, type) {
        if (type == ccui.Widget.TOUCH_BEGAN) {
            sender.runAction(cc.sequence(cc.scaleTo(0.1, 1.27),
                            cc.scaleTo(0.1, 1.1),cc.scaleTo(0.1, 1.25)));
            sender.setLocalZOrder(1);

            var children = this.scrollView.getChildren();
            for (var i = 0; i < children.length; i++) {
                var button = children[i];
                if (button != null && sender.getTag() != button.getTag()) {
                    button.runAction(cc.scaleTo(0.1, 1.0));
                    button.setLocalZOrder(0);
                }
            }
        }

        if(type == ccui.Widget.TOUCH_ENDED){
            cc.log("TOUCHED!!!");

            var gameTag = sender.tag;

            // setGameTag(gameTag);
            common.gameTag = gameTag;
            // SoundManager::getInstance().playSound("sounds/button_click.mp3");

            var isFound = false;
            // var enableGameIds = getEnableGameIds();
            var enableGameIds = common.enableGameIds;

            // if(getEnableGameIds() == null){
            //     enableGameIds = [0,1,2,3,4,5,6,7,8,9,10];
            // }
            for (var j = 0; j < enableGameIds.length; j++) {
                // if (enableGameIds[j] == getZoneId()) {
                if (enableGameIds[j] == common.zoneId) {
                    isFound = true;
                    break;
                }
            }

            cc.log("isFound", isFound);
            if (!isFound) {
                // showToast("Game sắp ra mắt", 3);
                var popupMessage = new PopupMessageBox();
                popupMessage.setMessage("Game sắp ra mắt!");
                this.addChild(popupMessage);
                popupMessage.appear();
                return;
            }
            getEnterZoneMessageFromServer(getZoneId());
        }


    },
    ongamestatus: function(e) {
        if(e.data!==null || e.data !== 'undefined')
        {
            var lstMess = parseFrom(e.data, e.data.byteLength);
            while(lstMess.length > 0) {
                var buffer = lstMess.shift();
                this.enterZoneHandleMessage(buffer);
            }
        }
    },
    enterZoneHandleMessage: function(e) {
        var buffer = e;
        switch (buffer.message_id) {
            case NetworkManager.ENTER_ZONE:
                var msg = buffer.response;
                this.enterZoneResponseHandler(msg);
                break;
        }
    },
    enterZoneResponseHandler : function (enterZoneResponse) {
        //handle login
        // if(listMessages.length > 0) {
        //     for (i = 0; i < listMessages.length; i++) {
        //         if (listMessages[i].message_id == NetworkManager.ENTER_ZONE) {
        //
        //             enterZoneResponse = listMessages[i].response;
        cc.log("enterZoneResponse", enterZoneResponse);
                    if (enterZoneResponse != 0) { //found
                        if (enterZoneResponse.responseCode) {

                            // setRequestRoomType(enterZoneResponse.defaultRoomTypeLoad);
                            common.requestRoomType = enterZoneResponse.defaultRoomTypeLoad;

                            if (enterZoneResponse.enableDisplayRoomList) {
                                /*
                                 Sau này xử lý phần người chơi click vào một mức cược cụ thể không cần hiển thị danh sách phòng chơi
                                 */
                                var cashRoomList = [];
                                var goldRoomList = [];
                                if (enterZoneResponse.cashRoomConfigs.length > 0) {
                                    for (i = 0; i < enterZoneResponse.cashRoomConfigs.length; i++) {
                                        cashRoomList.push(enterZoneResponse.cashRoomConfigs[i]);
                                    }
                                }
                                if (enterZoneResponse.goldRoomConfigs.length > 0) {
                                    for (i = 0; i < enterZoneResponse.goldRoomConfigs.length; i++) {
                                        goldRoomList.push(enterZoneResponse.goldRoomConfigs[i]);
                                    }
                                }
                                // setGoldRoomList(goldRoomList);
                                // setCashRoomList(cashRoomList);
                                common.goldRoomList = goldRoomList;
                                common.cashRoomList = cashRoomList;
                            }

                            var zoneId = common.zoneId;
                            if (zoneId == Common.TAMXINGAU_ZONE){
                                cc.log("tam_xi_ngau");
                                // var tam_xi_ngau = TamXiNgau::create(this);
                                // tam_xi_ngau.setPosition(MVec2(0, 0));
                                // this.addChild(tam_xi_ngau);
                            }
                            else if (zoneId == Common.WHEEL_ZONE) {
                                cc.log("WHEEL_ZONE");
                                // auto node = VongQuayMayMan::create(this);
                                // node.setPosition(MVec2(0, 0));
                                // this.addChild(node, INDEX_POPUP);
                            }
                            else if (zoneId == Common.MINIPOKER_ZONE) {
                                cc.log("MINIPOKER_ZONE");
                                // auto node = MiniPoker::create(this);
                                // node.setPosition(MVec2(0, 0));
                                // this.addChild(node, INDEX_POPUP);
                            }
                            // else if (zoneId == Common.MINITHREECARDS_ZONE) {
                            //     cc.log("MINITHREECARDS_ZONE");
                            //     // auto node = MiniThreeCards::create(this);
                            //     // node.setPosition(MVec2(0, 0));
                            //     // this.addChild(node, INDEX_POPUP);
                            // }
                            else {
                                // notify.onHideNotify();
                                // this.unscheduleUpdate();
                                var scenetable = new SceneTable(enterZoneResponse.enableDisplayRoomList, enterZoneResponse.defaultRoomTypeLoad);
                                cc.director.runScene(scenetable);
                            }
                            //    return;
                        } else {
                            cc.log("MINIPOKER_ZONE");
                            // setRequestRoomType(-1);
                            // setZoneId(-1);  //reset zone id
                            common.requestRoomType = -1;
                            common.zoneId = -1;  //reset zone id
                            // showToast(enter_zone_response.message().c_str(), 2);
                        }
                    }
        //         }
        //     }
        // }


    },
    update: function(dt) {
        baseSceneConnect.update(dt);
    
        // getHeadLineResponse();
    
        //=====
        // var position = node_hello.getPosition();
        // position.x -= 50 * dt;
        // if (position.x  < (-node_hello.getContentSize().width))
        //     position.x = sprite_thongtin.getContentSize().width;
        // node_hello.setPosition(position);
        //
        // getUserStatusResponse();
    
        //handle login
        if(listMessages.length > 0) {
            for (i = 0; i < listMessages.length; i++) {
                if (listMessages[i].message_id == NetworkManager.ENTER_ZONE) {

                    enterZoneResponse = listMessages[i].response;
                    this.enterZoneResponseHandler(enterZoneResponse);
                    if(listMessages.length == 1){
                        listMessages.length = 0;
                    } else {
                        listMessages.splice(i, 1);
                    }
                }
            }
        }

        //logout
    
        // //response email
        // filterEmailResponse();
        // sendMailResponse();
        // readMailResponse();
        // deleteMailResponse();
        // claimMailResponse();
        // //end
        //
        // //user_info
        // //viewUserInfoFromServer();
        //
        // //update money
        // updateMoneyResponseHandler();
        //
        // //ls doi thuong
        // lookupMoneyHistoryResponse();
        // // friend pop up
        // turnOnPopupFriendResponseHandler();
    }

});

var ShowGameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ShowGameLayer();
        this.addChild(layer);
    }
});

/*//herehere
var getNodeHello = function(node){
    // node.removeAllChildren();

    var padding_item = 5;
    var padding_node = sprite_thongtin.getContentSize().width / 10;
    vector<BINNews> lstHeadLineNotify = Common::getInstance().getHeadLineNotify();

    float size_text = 0.0f;

    for (int i = 0; i < lstHeadLineNotify.size(); i++){
        //tag
        auto lb_tag = MLabel::create("( "+lstHeadLineNotify[i].tag()+" )", _bgr_xu.getHeight()*0.32f, Color3B(255,255, 0));

        lb_tag.setPosition(Vec2(size_text, sprite_thongtin.getContentSize().height / 2 - lb_tag.getHeight() / 2));
        node.addChild(lb_tag);

        //displayName
        auto lb_displayname = MLabel::create(lstHeadLineNotify[i].displayname(), _bgr_xu.getHeight()*0.32f, Color3B(69,203,241));//Color3B(0, 255, 246)
        lb_displayname.setPosition(Vec2(lb_tag.getPosition().x + lb_tag.getWidth() + padding_item,
            sprite_thongtin.getContentSize().height / 2 - lb_displayname.getHeight()/2));
        node.addChild(lb_displayname);

        //action
        auto lb_action = MLabel::create(lstHeadLineNotify[i].action(), _bgr_xu.getHeight()*0.32f, Color3B(218,235,129));//Color3B::WHITE
        lb_action.setPosition(Vec2(lb_displayname.getPosition().x + lb_displayname.getWidth() + padding_item,
            sprite_thongtin.getContentSize().height / 2 - lb_action.getHeight() / 2));
        node.addChild(lb_action);

        //subject
        auto lb_subject = MLabel::create(lstHeadLineNotify[i].subject(), _bgr_xu.getHeight()*0.32f, Color3B(68, 235, 219));//Color3B(251, 7, 133)
        lb_subject.setPosition(Vec2(lb_action.getPosition().x + lb_action.getWidth() + padding_item,
            sprite_thongtin.getContentSize().height / 2 - lb_subject.getHeight() / 2));
        node.addChild(lb_subject);

        size_text += lb_tag.getWidth() + lb_displayname.getWidth() + lb_action.getWidth() + lb_subject.getWidth() + padding_node;
    }

    node.setContentSize(Size(size_text, sprite_thongtin.getContentSize().height));
}*/
