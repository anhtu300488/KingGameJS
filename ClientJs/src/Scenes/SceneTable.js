var totalNewMail = 0;
var LOAD_MORE_XUKEN = 10;
var isReloadRoom = false;
var roomType;
var orderByField = -1;
var asc = false;
var label_number_new_mail;
var sprite_new_mail;
var enableDisplayRoomList;
var scrollBkg = new cc.Sprite();
var message;
var enterRoomResponse;
var newPlayerResponse;

var SceneTableLayer = cc.Layer.extend({
    sprite:null,
    ctor:function (tempEnableDisplayRoomList, defaultRoomTypeLoad, notEnoughMoney, message) {
        //////////////////////////////
        // 1. super init first
        this._super();

        // var tempEnableDisplayRoomList = true;
        //
        // var defaultRoomTypeLoad = 0;
        //
        // setEnableDisplayRoomList(tempEnableDisplayRoomList);
        requestRoomType(defaultRoomTypeLoad);
        // setMessage(notEnoughMoney, message);

        ws.onmessage = this.ongamestatus.bind(this);
        ws.onclose = this.onclose.bind(this);
        ws.onerror = this.onerror.bind(this);

        this.init();


        return true;
    },

    init: function () {
        this._super();

        // setGameState(GAME_STATE.SCENE_TABLE);
        common.gameState  = GAME_STATE.SCENE_TABLE;

        var spriteBG = new cc.Sprite(res.COMMON_SPRITE_ITEM_BACKGROUND);

        var spriteWidth = spriteBG.getContentSize().width;

        var spriteHeight = spriteBG.getContentSize().height;

        var rows = visibleSize.width/ spriteWidth + 1;
        var cols = visibleSize.height/ spriteHeight + 1;
        for(var i = 0; i< rows; i++){
            for(var j = 0; j<cols; j++){
                var itemSpriteBG = new cc.Sprite(res.COMMON_SPRITE_ITEM_BACKGROUND);
                var centerPos = cc.p(spriteBG.x + i*spriteWidth, spriteBG.y + j*spriteHeight);
                itemSpriteBG.setPosition(centerPos);
                this.addChild(itemSpriteBG);
            }
        }

        var background_screen = MSprite.create(res.BGR_LISTGAMES, visibleSize);
        background_screen.setPosition(cc.p(originX, originY));
        this.addChild(background_screen);

        this.initMenu();

        // getUserStatusRequest(USER_STATUS_CONFIG.FILL_MAIL);

        reloadRoom(0);


    },
    menuCallBack: function(sender, type){
        if(type == ccui.Widget.TOUCH_ENDED){
            var tag = sender.tag;
            // SoundManager::getInstance().playSound("sounds/button_click.mp3");
            switch (tag) {
                case TAG.SCENE_TABLE.BTN_BACK:
                    cc.log("Button Back");
                {
                    getExitZoneMessageFromServer(common.zoneId);
                }
                    break;
                default:
                    break;
            }
        }
    },

    // showPopupPassWord: function(roomIndex){
    //     var passWordPopup = getChildByTag(POPUP.TAG_PASSWORD);
    //     if (passWordPopup == null){
    //         passWordPopup = PasswordPopup::create();
    //         passWordPopup->setTag(POPUP_TAG_PASSWORD);
    //         passWordPopup->setRoomIndex(roomIndex);
    //         addChild(passWordPopup, INDEX_POPUP);
    //         passWordPopup->appear();
    //     }
    // },

    initMenu: function(){
        //init menu
        var btn_back = MButton.create(res.TABLE_BTN_BACK,TAG.SCENE_TABLE.BTN_BACK);
        btn_back.setPosition(MVec2(padding - btn_back.getHeight()/6,
            height - padding - btn_back.getHeight()*(1.0-1.0/6)));
        btn_back.addTouchEventListener(this.menuCallBack, this);

        var btnPhone = MButton.create(res.TABLE_BTN_PHONE,TAG.SCENE_TABLE.BTN_PHONE);
        btnPhone.setPosition(MVec2(2*padding+btnPhone.getWidth(),
            height - padding - btnPhone.getHeight()));
        btnPhone.addTouchEventListener(this.menuCallBack, this);

        var btnCaiDat = MButton.create(res.TABLE_BTN_CAIDAT,TAG.SCENE_TABLE.BTN_CAIDAT);
        btnCaiDat.setPosition(MVec2(visibleSize.width-btnCaiDat.getWidth()-padding,
            visibleSize.height-btnCaiDat.getHeight()-padding));
        btnCaiDat.addTouchEventListener(this.menuCallBack, this);

        var btnHopThu = MButton.create(res.TABLE_BTN_HOPTHU,TAG.SCENE_TABLE.BTN_HOPTHU);
        btnHopThu.setPosition(cc.p(btnCaiDat.getPositionX() - btnHopThu.getWidth() - padding,
            btnCaiDat.getPositionY()));
        btnHopThu.addTouchEventListener(this.menuCallBack, this);

        sprite_new_mail = MSprite.create(res.bg_songuoixem);
        sprite_new_mail.setPosition(cc.p(btnHopThu.getWidth() - sprite_new_mail.getWidth()*0.8,
            btnHopThu.getHeight() - sprite_new_mail.getHeight()*0.8));
        btnHopThu.addChild(sprite_new_mail);

        label_number_new_mail = MLabel.create(totalNewMail, 20);
        label_number_new_mail.setAnchorPoint(cc.p(0.5,0.5));
        label_number_new_mail.setPosition(cc.p(sprite_new_mail.getWidth() / 2
            , sprite_new_mail.getHeight() / 2));

        sprite_new_mail.addChild(label_number_new_mail);
        sprite_new_mail.setVisible(false);

        //==bottom bar under
        var bar = MSprite.create(res.BGR_UNDERLINE);
        bar.setScale(width / bar.getWidth(), 1);
        bar.setPosition(MVec2(0,0));

        this.addChild(btn_back);
        this.addChild(btnCaiDat);
        this.addChild(btnHopThu);
        this.addChild(btnPhone);

        // {
        //bg avatar
        var bk_avatar = MSprite.create(res.TABLE_BK_AVATAR);
        bk_avatar.setAnchorPoint(cc.p(0,1));
        bk_avatar.setPosition(cc.p(btnPhone.getPositionX() + btnPhone.getWidth() + padding,
            btnPhone.getPositionY() + btnPhone.getHeight()));
        this.addChild(bk_avatar);

        // avartar
        var avatar_id = common.avatarId;
        var btn_avatar = MButton.create(cc.formatStr("res/avatar%d.png", avatar_id), TAG.SHOW_BTN_AVATAR);
        btn_avatar.setAnchorPoint(cc.p(0.5,0.5));
        btn_avatar.setPosition(cc.p(bk_avatar.getPositionX() + bk_avatar.getWidth() / 2,
            bk_avatar.getPositionY() - bk_avatar.getHeight() / 2));
        btn_avatar.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_avatar);

        ////info
        var label_id = MLabel.create(cc.formatStr("ID:", getUserId()),
            bk_avatar.getHeight() / 4,true);
        label_id.setAnchorPoint(cc.p(0,1));
        label_id.setPosition(cc.p(btn_avatar.getPositionX() + btn_avatar.getWidth() / 2 + padding,
            btn_avatar.getPositionY()));
        this.addChild(label_id);

        ////ten hien thi
        var userName = common.displayName;
        var label_name = MLabel.create(getDisplayNameSubText(userName), 1.2 * bk_avatar.getHeight() / 4, true);
        label_name.setPosition(cc.p(btn_avatar.getPositionX() + btn_avatar.getWidth() / 2 + padding,
            btnPhone.getPositionY() + btnPhone.getHeight() / 2));
        this.addChild(label_name);

        var widthName = label_name.getWidth() > label_id.getWidth() ? label_name.getWidth() : label_id.getWidth();

        var widthXuKen = btnHopThu.getPositionX() - (label_name.getPositionX() + widthName + 3 * padding);

        // var common = Common::getInstance();
        ////ken
        var _bgr_ken = MButton.create(res.SPRITE_BK_XUKEN);
        _bgr_ken.setTag(TAG.SHOW_BTN_NAPXU);
        _bgr_ken.addTouchEventListener(this.menuCallBack, this);
        var scale_xuken = (widthXuKen / 2) / (_bgr_ken.getWidth());
        _bgr_ken.setScaleX(scale_xuken);
        //_bgr_ken.setContentSize(Size(widthXuKen / 2, _bgr_ken.getHeight()));
        _bgr_ken.setPosition(cc.p(btnHopThu.getPositionX() - _bgr_ken.getWidth() * scale_xuken - padding,
            btnHopThu.getPositionY() + btnHopThu.getHeight() / 2 - _bgr_ken.getHeight() / 2));
        this.addChild(_bgr_ken);

        var sprite_ken = MSprite.create(res.TABLE_SPRITE_KEN);
        sprite_ken.setPosition(cc.p(_bgr_ken.getPositionX() + _bgr_ken.getWidth() * scale_xuken - sprite_ken.getWidth() - 5,
            _bgr_ken.getPositionY() + _bgr_ken.getHeight() / 2 - sprite_ken.getHeight() / 2));
        this.addChild(sprite_ken);

        var sprite_napken = MSprite.create(res.TABLE_SPRITE_NAPKEN);
        sprite_napken.setPosition(cc.p(_bgr_ken.getPositionX() + 5,
            _bgr_ken.getPositionY() + _bgr_ken.getHeight() / 2 - sprite_napken.getHeight() / 2));
        this.addChild(sprite_napken);

        var number_gold = common.gold ? common.gold : 0;
        var text_ken_scale = number_gold.toString().length > 9 ? 0.42 : 0.5;
        var label_ken = MLabel.create(number_gold,
            _bgr_ken.getHeight()*text_ken_scale, cc.color(40, 189, 212), true);
        label_ken.setAnchorPoint(cc.p(1,0));
        label_ken.setPosition(sprite_ken.getPositionX() - 5,
            _bgr_ken.getPositionY() + _bgr_ken.getHeight() / 2 - label_ken.getHeight() / 2);
        this.addChild(label_ken);

        ////xu
        var _bgr_xu = MButton.create(res.SPRITE_BK_XUKEN);
        _bgr_xu.setTag(TAG.SHOW_BTN_NAPKEN);
        _bgr_xu.addTouchEventListener(this.menuCallBack, this);
        _bgr_xu.setScaleX(scale_xuken);
        //_bgr_xu.setContentSize(Size(widthXuKen / 2, _bgr_xu.getHeight()));
        _bgr_xu.setPosition(cc.p(_bgr_ken.getPositionX() - padding - _bgr_xu.getWidth() * scale_xuken,
            btnHopThu.getPositionY() + btnHopThu.getHeight() / 2 - _bgr_ken.getHeight() / 2));
        this.addChild(_bgr_xu);

        var sprite_xu = MSprite.create(res.SPRITE_XU);
        sprite_xu.setPosition(cc.p(_bgr_xu.getPositionX() + _bgr_xu.getWidth() * scale_xuken - sprite_xu.getWidth() - 5,
            _bgr_xu.getPositionY() + _bgr_xu.getHeight() / 2 - sprite_xu.getHeight() / 2));
        this.addChild(sprite_xu);

        var sprite_napxu = MSprite.create(res.TABLE_SPRITE_NAPXU);
        sprite_napxu.setPosition(cc.p(_bgr_xu.getPosition().x + 5,
            _bgr_xu.getPositionY() + _bgr_xu.getHeight() / 2 - sprite_napxu.getHeight() / 2));
        this.addChild(sprite_napxu);

        var number_cash = common.cash ? common.cash : 0;
        var text_xu_scale = number_cash.toString().length > 9 ? 0.42 : 0.5;
        var label_xu = MLabel.create(number_cash,
            _bgr_xu.getHeight()*text_xu_scale, cc.color(255, 214, 0), true);
        label_xu.setAnchorPoint(cc.p(1,0));
        label_xu.setPosition(sprite_xu.getPosition().x - 5,
            _bgr_xu.getPosition().y + _bgr_xu.getHeight() / 2 - label_xu.getHeight() / 2);
        this.addChild(label_xu);

        var img_title_room_play = res.ICON_TITLE_ROOM_PLAY_TLMN;

        var zoneId = common.zoneId;

        if (zoneId == TAG.TIENLENMIENNAM_ZONE){
            img_title_room_play = res.ICON_TITLE_ROOM_PLAY_TLMN;
        }
        else if (zoneId == TAG.PHOM_ZONE){
            img_title_room_play = res.ICON_TITLE_ROOM_PLAY_PHOM;
        }
        else if (zoneId == TAG.BACAY_ZONE){
            img_title_room_play = res.ICON_TITLE_ROOM_PLAY_BACAY;
        }
        else if (zoneId == TAG.MAUBINH_ZONE) {
            img_title_room_play = res.ICON_TITLE_ROOM_PLAY_MAUBINH;
        }
        else if (zoneId == TAG.XOCDIA_ZONE) {
            img_title_room_play = res.ICON_TITLE_ROOM_PLAY_XOCDIA;
        }
        else if (zoneId == TAG.TLMN_SOLO_ZONE) {
            img_title_room_play = res.ICON_TITLE_ROOM_PLAY_TLMN_SOLO;
        }
        else if (zoneId == TAG.LIENG_ZONE) {
            img_title_room_play = res.ICON_TITLE_ROOM_PLAY_LIENG;
        }

        var txt_game_name = MSprite.create(img_title_room_play);
        txt_game_name.setPosition(cc.p(origin.x + width / 2 - txt_game_name.getWidth() / 2,
            _bgr_xu.getPosition().y - txt_game_name.getHeight() - 12));
        this.addChild(txt_game_name);

        var sprite_sao_trai = MSprite.create(res.TABLE_IC_SAO);
        sprite_sao_trai.setAnchorPoint(cc.p(1,0.5));
        sprite_sao_trai.setPosition(cc.p(origin.x + width / 2 - txt_game_name.getWidth() / 2 - padding,
            _bgr_xu.getPosition().y - txt_game_name.getHeight() / 2 - 12));
        this.addChild(sprite_sao_trai);

        var sprite_sao_phai = MSprite.create(res.TABLE_IC_SAO);
        sprite_sao_phai.setFlippedX(true);
        sprite_sao_phai.setAnchorPoint(cc.p(1,0.5));
        sprite_sao_phai.setPosition(cc.p(origin.x + width / 2 + txt_game_name.getWidth() / 2 + padding + sprite_sao_phai.getWidth(),
            _bgr_xu.getPosition().y - txt_game_name.getHeight() / 2 - padding));
        this.addChild(sprite_sao_phai);

        //ban choi
        var scrollHeight = txt_game_name.getPosition().y - originY - bar.getHeight() - 12;
        var scrollY = bar.getHeight() - 5;
        scrollBkg = MSprite.create(res.TABLE_BG_PHONGCHO);
        scrollBkg.setScaleX((width - 30) / scrollBkg.getWidth());
        scrollBkg.setScaleY(scrollHeight / scrollBkg.getHeight());
        scrollBkg.setContentSize(cc.size(width - 30, scrollHeight));
        scrollBkg.setPosition(MVec2(15, scrollY));
        this.addChild(scrollBkg);

        this.bg_lst_table = MSprite.create(res.TABLE_BG_LST_TABLE);
        this.bg_lst_table.setScaleX((width - 40) / this.bg_lst_table.getWidth());
        this.bg_lst_table.setScaleY((scrollHeight - 8) / this.bg_lst_table.getHeight());
        this.bg_lst_table.setContentSize(cc.size(width - 40, scrollHeight - 8));
        this.bg_lst_table.setPosition(MVec2(15 + (scrollBkg.getWidth() - this.bg_lst_table.getWidth()) / 2, scrollY));
        this.addChild(this.bg_lst_table);

        this.hightTable = this.bg_lst_table.getHeight() - 0.76 * this.bg_lst_table.getHeight() / 6;

        this.tableView = new cc.TableView(this, cc.size(this.bg_lst_table.getWidth(), this.hightTable));
        this.tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.tableView.setAnchorPoint(cc.p(0.5,0.5));
        this.tableView.setDelegate(this);
        this.tableView.setBounceable(true);
        this.tableView.setPosition(MVec2(15 + (scrollBkg.getWidth() - this.bg_lst_table.getWidth()) / 2, scrollY));

        this.addChild(this.tableView);

        this.initTitleTable(originX + 15 + (scrollBkg.getWidth() - this.bg_lst_table.getWidth()) / 2,
            this.bg_lst_table.getPosition().y + this.bg_lst_table.getHeight() - 0.76 * this.bg_lst_table.getHeight() / 12,
            this.bg_lst_table.getWidth(), this.hightTable);

        //bar
        this.addChild(bar);

        // choi ngay
        var btnChoiNgay = MButton.createExtends(res.ICON_CHOINGAY, "", 30, TAG.SCENE_TABLE.BTN_PLAYNOW);
        btnChoiNgay.setPosition(MVec2(width / 2 - btnChoiNgay.getWidth() / 2, 0));
        btnChoiNgay.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btnChoiNgay);

        // ken
        var btn_ken = MButton.createExtendsBottom(res.TABLE_BTN_MENU_KEN, "XU", 30, TAG.SCENE_TABLE.BTN_KEN);
        var labelTmp = MLabel.create("Tmp",btn_ken.getHeight() / 2.0);
        //float height = labelTmp.getContentSize().height + 5 + btn_ken.getHeight();

        btn_ken.setPosition(MVec2(width * 5 / 8, 0));
        btn_ken.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_ken);

        // cuoc ban
        var btn_cuocban = MButton.createExtendsBottom(res.TABLE_BTN_MENU_CUOCBAN, "Cược bàn", 30, TAG.SCENE_TABLE.BTN_MUCCUOC);
        btn_cuocban.setPosition(cc.p(originX + width * 6 / 8, btn_ken.getPosition().y));
        btn_cuocban.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_cuocban);

        // tao ban
        var btn_taoban = MButton.createExtendsBottom(res.TABLE_BTN_MENU_TAOBAN, "Tạo bàn", 30, TAG.SCENE_TABLE.BTN_CREATE);
        btn_taoban.setPosition(cc.p(originX + width * 7 / 8, btn_ken.getPosition().y));
        btn_taoban.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_taoban);

        //xu
        var btn_xu = MButton.createExtendsBottom(res.TABLE_BTN_MENU_XU, "KEN", 30, TAG.SCENE_TABLE.BTN_VIPXU);
        btn_xu.setPosition(cc.p(originX + width * 3 / 8 - btn_xu.getWidth(), btn_ken.getPosition().y));
        btn_xu.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_xu);

        //lam moi
        var btn_refresh = MButton.createExtendsBottom(res.TABLE_BTN_MENU_REFRESH, "Làm mới", 30, TAG.SHOW_BTN_REFRESH);
        btn_refresh.setPosition(cc.p(originX + width * 2 / 8 - btn_refresh.getWidth(), btn_ken.getPosition().y));
        btn_refresh.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_refresh);

        // luat choi
        var btn_luatchoi = MButton.createExtendsBottom(res.ICON_HELP, "Luật chơi", 30, TAG.SHOW_BTN_TROGIUP);
        btn_luatchoi.setPosition(cc.p(originX + width * 1 / 8 - btn_luatchoi.getWidth(), btn_ken.getPosition().y));
        btn_luatchoi.addTouchEventListener(this.menuCallBack, this);
        this.addChild(btn_luatchoi);
        // }

        // //add thong bao
        // notify = MNotify::create();
        // this.addChild(notify, INDEX_NOTIFY);

    },

    initTitleTable: function(posX, posY, widthObj, heightObj){
        var width = widthObj;
        var height = heightObj / 6;
        var sizeText = height / 3;

        //so ban
        var lb_soban = MLabel.create(TABLE_TXT_SOBAN, sizeText, true);
        lb_soban.setAnchorPoint(cc.p(0.5,0.5));
        lb_soban.setPosition(cc.p(posX + width / 12, posY));
        this.addChild(lb_soban);

        //muc cuoc
        var lb_muccuoc = MLabel.create(TABLE_TXT_MUCCUOC, sizeText, true);
        lb_muccuoc.setAnchorPoint(cc.p(0.5,0.5));
        lb_muccuoc.setPosition(cc.p(posX + width / 6 + 3 * width / (8 * 6) - 10, posY));
        this.addChild(lb_muccuoc);

        var btn_sort_muccuoc = MButton.create(res.TABLE_IC_SORT);
        btn_sort_muccuoc.setAnchorPoint(cc.p(0.5,0.5));
        btn_sort_muccuoc.setPosition(cc.p(posX + width / 6 + 3 * width / (4 * 6) + btn_sort_muccuoc.getWidth()/2, posY));
        //btn_sort_muccuoc.setTag(TAG_SHOW_SORT_MUCCUOC);
        //btn_sort_muccuoc.addTouchEventListener(CC_CALLBACK_2(SceneTable::menuCallBack, this));
        this.addChild(btn_sort_muccuoc);

        //bg sort muc cuoc
        var bg_sort_muccuoc = MButton.create(res.TABLE_BTN_SORT);
        bg_sort_muccuoc.setAnchorPoint(cc.p(0.5,0.5));
        bg_sort_muccuoc.setPosition(cc.p(lb_muccuoc.getPosition().x - lb_muccuoc.getWidth() / 2
            + (lb_muccuoc.getWidth()/2 + btn_sort_muccuoc.getWidth()/2 + btn_sort_muccuoc.getPosition().x - lb_muccuoc.getPosition().x) / 2
            , posY));
        bg_sort_muccuoc.setTag(TAG.SHOW_SORT_MUCCUOC);
        bg_sort_muccuoc.addTouchEventListener(this.menuCallBack, this);
        this.addChild(bg_sort_muccuoc);

        //so nguoi choi
        var lb_songuoichoi = MLabel.create(TABLE_TXT_SONGUOICHOI, sizeText, true);
        lb_songuoichoi.setAnchorPoint(cc.p(0.5,0.5));
        lb_songuoichoi.setPosition(cc.p(posX + 3 * width / 6, posY));
        this.addChild(lb_songuoichoi);

        //sort songuoichoi
        var btn_sort_songuoichoi = MButton.create(res.TABLE_IC_SORT);
        btn_sort_songuoichoi.setAnchorPoint(cc.p(0.5,0.5));
        btn_sort_songuoichoi.setPosition(cc.p(lb_songuoichoi.getPosition().x + lb_songuoichoi.getWidth()/2
            + btn_sort_songuoichoi.getWidth()/2 + 10, posY));
        //btn_sort_songuoichoi.setTag(TAG_SHOW_SORT_NUMPLAYER);
        //btn_sort_songuoichoi.addTouchEventListener(CC_CALLBACK_2(SceneTable::menuCallBack, this));
        this.addChild(btn_sort_songuoichoi);
        btn_sort_songuoichoi.setRotation(-180);

        //bg sort so nguoi choi
        var bg_sort_songuoichoi = MButton.create(res.TABLE_BTN_SORT);
        bg_sort_songuoichoi.setAnchorPoint(cc.p(0.5,0.5));
        bg_sort_songuoichoi.setPosition(cc.p(lb_songuoichoi.getPosition().x - lb_songuoichoi.getWidth() / 2
            + (lb_songuoichoi.getWidth() / 2 + btn_sort_songuoichoi.getWidth() / 2 + btn_sort_songuoichoi.getPosition().x - lb_songuoichoi.getPosition().x) / 2
            , posY));
        bg_sort_songuoichoi.setTag(TAG.SHOW_SORT_NUMPLAYER);
        bg_sort_songuoichoi.addTouchEventListener(this.menuCallBack, this);
        this.addChild(bg_sort_songuoichoi);

        //toi thieu
        var lb_toithieu = MLabel.create(TABLE_TXT_TOITHIEU, sizeText, true);
        lb_toithieu.setAnchorPoint(cc.p(0.5,0.5));
        lb_toithieu.setPosition(cc.p(posX + 4 * width / 6 + 3 * width / (8 * 6) - 10, posY));
        this.addChild(lb_toithieu);

        //sort toi thieu
        var btn_sort_toithieu = MButton.create(res.TABLE_IC_SORT);
        btn_sort_toithieu.setAnchorPoint(cc.p(0.5,0.5));
        btn_sort_toithieu.setPosition(cc.p(posX + 4 * width / 6 + 3 * width / (4 * 6) + btn_sort_toithieu.getWidth() / 2, posY));
        //btn_sort_toithieu.setTag(TAG_SHOW_SORT_TOITHIEU);
        //btn_sort_toithieu.addTouchEventListener(CC_CALLBACK_2(SceneTable::menuCallBack, this));
        // this.addChild(btn_sort_toithieu);

        //trang thai
        var lb_trangthai = MLabel.create(TABLE_TXT_TRANGTHAI, sizeText, true);
        lb_trangthai.setAnchorPoint(cc.p(0.5,0.5));
        lb_trangthai.setPosition(cc.p(posX + 5 * width / 6 + width / (2 * 6), posY));
        this.addChild(lb_trangthai);

    },
    //========================= TableView

    tableCellSizeForIndex:function (table, idx) {
        return cc.size(300,100);
    },
    tableCellAtIndex:function (table, idx) {

        // var strValue = idx.toFixed(0);
        var cell = table.dequeueCell();
        // if(cell){
        //    cell.removeAllChildrenWithCleanup();
        // }
        // var label;
        // if (!cell) {
        cell = new MTableViewCell();

        // new cell created
        var bg = MSprite.create(res.TABLE_BG_CONTENT_CELL, cc.size(this.bg_lst_table.getWidth(), this.hightTable / 6));
        bg.setTag(789);
        cell.addChild(bg);


        if(listRoomPlay.length > 0){
            var itemCell = ItemCell(listRoomPlay[idx].roomIndex, listRoomPlay[idx].passwordRequired,
                this.bg_lst_table.getWidth(), this.hightTable / 6, listRoomPlay[idx].minBet,
                listRoomPlay[idx].playingPlayer, listRoomPlay[idx].vipRoom, listRoomPlay[idx].playerSize, listRoomPlay[idx].minEnterMoney, cell);

            itemCell.setAnchorPoint(cc.p(0, 0));
            itemCell.setContentSize(cc.size(this.bg_lst_table.getWidth(), bg.getHeight()));
            // cell.addChild(itemCell);

        }

        return cell;
    },
    numberOfCellsInTableView:function (table) {
        return listRoomPlay.length;
    },

    tableCellTouched:function (table, cell) {
        var index = cell.getIdx();
        var roomIndex = listRoomPlay[index].roomIndex;

        var currentRoomTouch = listRoomPlay[index];

        cc.log("tableCellTouched");

        // if (listRoomPlay[index].passwordRequired){
        //     this.showPopupPassWord(roomIndex);
        // } else {
        getEnterRoomMessageFromServer(roomIndex, "");
        // }
    },

    ongamestatus: function(e) {
        if(e.data!==null || e.data !== 'undefined')
        {
            parseFrom(e.data, e.data.byteLength);
            while(listMessages.length > 0) {
                var buffer = listMessages.shift();
                this.exitZoneHandleMessage(buffer);
            }
        }
    },
    exitZoneHandleMessage: function(e) {
        var buffer = e;
        switch (buffer.message_id) {
            case NetworkManager.EXIT_ZONE:
                this.exitZone = buffer.response;
                this.exitZoneResponseHandler();
                break;
            case NetworkManager.FILTER_ROOM:
                this.filterRoom = buffer.response;
                this.filterRoomResponseHandler();
                break;
            case NetworkManager.USER_STATUS:
                this.userStatus = buffer.response;
                this.userStatusResponseHandler();
                break;
            case NetworkManager.ENTER_ROOM:
                this.enterRoom = buffer.response;
                this.enterRoomResponseHandler();
                break;
            case NetworkManager.PLAYER_ENTER_ROOM:
                this.playEnterRoom = buffer.response;
                this.playerEnterRoomResponseHandler();
                break;
        }
    },
    exitZoneResponseHandler : function () {
        exitZoneResponse = this.exitZone;
        if (exitZoneResponse != 0) {
            if (exitZoneResponse.responseCode) {
                // setZoneId(-1);
                common.zoneId = -1;
                // this.unscheduleUpdate();
                //
                // notify.onHideNotify();

                var scene = new ShowGameScene();
                cc.director.runScene(scene);
            }
        }

    },
    filterRoomResponseHandler : function () {
        filterRoomResponse = this.filterRoom;
        if (filterRoomResponse != 0 && filterRoomResponse.responseCode) {
            if (filterRoomResponse.roomPlays.length > 0) {
                // listRoomPlay.listData = filterRoomResponse.roomPlays;
                // setTest(filterRoomResponse.roomPlays);
                language.current = filterRoomResponse.roomPlays;
            }
        }

    },
    userStatusResponseHandler : function () {
        userStatusResponse = this.userStatus;
        if (userStatusResponse != 0) {
            if (userStatusResponse.responseCode){
                totalNewMail = userStatusResponse.unreadMailCount;

                if (totalNewMail > 0){
                    var str_total_mail = totalNewMail > 9 ? "9+" : totalNewMail;
                    label_number_new_mail.setString(str_total_mail);
                    sprite_new_mail.setVisible(true);
                }
                else {
                    sprite_new_mail.setVisible(false);
                }
            }
            // if (userStatusResponse->has_message()){
            //     PopupMessageBox* popup = new PopupMessageBox();
            //     popup->showPopup(user_status_response->message());
            // }
        }

    },
    enterRoomResponseHandler : function(){
        enterroomresponse = this.enterRoom;
        enterRoomResponse = enterroomresponse;
        if (enterroomresponse != 0) {
            if (enterroomresponse.responseCode) {
                // setOwnerUserId(enterroomresponse.ownerUserId);
                common.ownerUserId  = enterroomresponse.ownerUserId;

                for (i = 0; i < enterroomresponse.playingPlayers.length; i++) {
                    playerList.push(enterroomresponse.playingPlayers[i]);
                }
                for (i = 0; i < enterroomresponse.waitingPlayers.length; i++){
                    waitingPlayerList.push(enterroomresponse.waitingPlayers[i]);
                }

                if (enterroomresponse.roomPlay){
                    var roomPlay = enterroomresponse.roomPlay;

                    // notify->onHideNotify();  //an thong bao di

                    var is_create_room = (getUserId() == enterroomresponse.ownerUserId.low) ? true : false;
                    if (common.zoneId == Common.TIENLENMIENNAM_ZONE) {
                        var cardRemainingCount = "";
                        for (i = 0; i < enterroomresponse.args.length; i++){
                            if (enterroomresponse.args[i].key == "cardRemainingCount"){
                                var json = enterroomresponse.args[i].value;
                                cardRemainingCount = json;
                                break;
                            }
                        }
                        var response = null;
                        if (enterroomresponse.enterRoomStatus //&& enterroomresponse->enterroomstatus() == PlayerState::WAITING
                        ) {
                            response = enterroomresponse;
                        }

                        var tlmiennam = new TLMienNamScene(roomPlay.roomIndex,
                            playerList, waitingPlayerList, is_create_room, TAG.SHOW_GAME_TLMN,
                            common.enableDisplayRoomList, roomPlay.passwordRequired,
                            roomPlay.vipRoom, roomPlay.minBet, cardRemainingCount, response);
                        cc.director.runScene(tlmiennam);
                    }
                    else if (common.zoneId == Common.TLMN_SOLO_ZONE) {
                        var cardRemainingCount = "";
                        for (i = 0; i < enterroomresponse.args.length; i++){
                            if (enterroomresponse.args[i].key == "cardRemainingCount"){
                                var json = enterroomresponse.args[i].value;
                                cardRemainingCount = json;
                                break;
                            }
                        }

                        var response = null;
                        // if (enterroomresponse->has_enterroomstatus() //&& enterroomresponse->enterroomstatus() == PlayerState::WAITING
                        // ) {
                        response = enterroomresponse;
                        // }

                        var tlmiennam = new TLMienNamScene(roomPlay.roomIndex,
                            playerList, waitingPlayerList, is_create_room, TAG.SHOW_GAME_TLMN_SOLO,
                            common.enableDisplayRoomList, roomPlay.passwordRequired,
                            roomPlay.vipRoom, roomPlay.minBet, cardRemainingCount, response);
                        cc.director.runScene(tlmiennam);
                    }
                    else if (common.zoneId == Common.PHOM_ZONE) {
                        var response = null;
                        // if (enterroomresponse->has_enterroomstatus() && enterroomresponse->enterroomstatus() == PlayerState::WAITING) {
                        if (enterroomresponse.enterRoomStatus == PlayerState.WAITING) {
                            response = enterroomresponse;
                        }
                        var phom = new PhomScene(roomPlay.roomIndex,
                            playerList, waitingPlayerList, is_create_room, TAG.SHOW_GAME_PHOM,
                            common.enableDisplayRoomList, roomPlay.passwordRequired,
                            roomPlay.vipRoom, roomPlay.minBet, response);
                        cc.director.runScene(phom);
                    }
                    else if (common.zoneId == Common.BACAY_ZONE) {
                        var bacay = new ThreeCardsScene(roomPlay, playerList, waitingPlayerList, is_create_room,
                            common.enableDisplayRoomList, enterroomresponse);
                        cc.director.runScene(bacay);
                    }
                    else if (common.zoneId == Common.MAUBINH_ZONE) {
                        var maubinh = new MauBinhScene(roomPlay.roomIndex,
                            playerList, waitingPlayerList, is_create_room, TAG.SHOW_GAME_MAUBINH,
                            common.enableDisplayRoomList, roomPlay.passwordRequired,
                            roomPlay.vipRoom, roomPlay.minBet, enterroomresponse);
                        cc.director.runScene(maubinh);
                    }
                    else if (common.zoneId == Common.XOCDIA_ZONE) {
                        var currentHostId = -1;
                        if (enterroomresponse.args.length > 0) {
                            for (i = 0; i < enterroomresponse.args.length; i++) {
                                var key = enterroomresponse.args[i].key;
                                var value = enterroomresponse.args[i].value;
                                if (key == "currentHostUserId") {
                                    currentHostId = value;
                                }
                            }
                        }
                        var xocdia = new SocdiaScene(roomPlay.roomIndex, playerList, waitingPlayerList,
                            is_create_room, TAG.SHOW_GAME_XOCDIA, common.enableDisplayRoomList,
                            roomPlay.passwordRequired, roomPlay.vipRoom,
                            roomPlay.minBet, enterroomresponse, roomPlay.roomConfig, currentHostId);
                        cc.director.runScene(xocdia);
                    }
                    else if (common.zoneId == Common.LIENG_ZONE) {
                        var lieng = new LiengScene(roomPlay, playerList, waitingPlayerList, is_create_room,
                            common.enableDisplayRoomList, enterroomresponse);
                        cc.director.runScene(lieng);
                    }
                }
            }
            else {
                // if (isEnabledPurchaseCash() && !currentRoomTouch.passwordrequired() && !isEnoughEnterMoney()){
                //     EnoughMoneyOnEventListener* b = new EnoughMoneyOnEventListener();
                //     PopupMessageBox* popupMessage = new PopupMessageBox();
                //     popupMessage->setEvent(b);
                //     popupMessage->showPopup(enterroomresponse->message());
                // }
                // else {
                //     PopupMessageBox* popupMessage = new PopupMessageBox();
                //     popupMessage->showPopup(enterroomresponse->message());
                // }
            }
        }
    },
    playerEnterRoomResponseHandler : function () {
        newplayerresponse = this.playEnterRoom;
        playerEnterRoomArray.current = newplayerresponse;


    },
    onclose:function (e) {

    },
    onerror:function (e) {

    }
});

var MTableViewCell = cc.TableViewCell.extend({
    draw:function (ctx) {
        this._super(ctx);
    }
});

var SceneTable = cc.Scene.extend({
    ctor:function (tempEnableDisplayRoomList, defaultRoomTypeLoad, notEnoughMoney, message)
    {
        this._super();
        this.init(tempEnableDisplayRoomList, defaultRoomTypeLoad, notEnoughMoney, message);
    },

    init:function (tempEnableDisplayRoomList, defaultRoomTypeLoad, notEnoughMoney, message)
    {
        var layer = new SceneTableLayer(tempEnableDisplayRoomList, defaultRoomTypeLoad, notEnoughMoney, message);

        this.addChild(layer);
    }
});

// var setMessage = function(notEnoughMoney, message) {
//     this.message = message;
//     if (message != null){
//         if (notEnoughMoney){
//             EnoughMoneyOnEventListener* b = new EnoughMoneyOnEventListener();
//             PopupMessageBox* popupMessage = new PopupMessageBox();
//             popupMessage->setEvent(b);
//             popupMessage->setMessageText(message);
//             this->addChild(popupMessage, INDEX_POPUP);
//         }
//         else {
//             this->showToast(message.c_str(), 2);
//         }
//     }
// }

var reloadRoom = function(dt){
    //neu co ket noi thi gui reload room
    if (ws.readyState == ws.OPEN) {
        //tim index dau tien trong danh sach hien thi cua tableview
        // var posCurrTableView = this.tableView.getContentOffset();
        var posCurrTableView = 0;
        var numLineHiddenInTableView = -posCurrTableView / (this.hightTable / 6);  //so dong duoi cung bi an trong tableview

        var indexRemain = listRoomPlay.length - numLineHiddenInTableView;
        var index = indexRemain >= 7 ? (indexRemain - 7) : 0;


        roomType = ROOM_TYPE.TONG_HOP ? 2 * LOAD_MORE_XUKEN : LOAD_MORE_XUKEN;

        isReloadRoom = true;
        getFilterRoomMessageFromServer(common.zoneId,
            roomType, index, LOAD_MORE_XUKEN, orderByField, asc);
        // hideLoading();
    }
}


