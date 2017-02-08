/**
 * Created by MyPC on 12/12/2016.
 */

var btnInvitePlay;
var passwordRequired = false;
var is_create_room = false;
var is_vip_room = false;
var roomIndex;
var padding = 10;
var btn_message = new ccui.Button();
var btn_caidat =   new ccui.Button();
var check_exit_room = false;
var avatars = [];
var lstDisplayWaitingPlayer = [];

//hien thi nut moi choi (neu so luong nguoi choi numPlaying >= capacity_size thi an nut moi choi di)
var showInvitePlayer = function(numPlaying){
    btnInvitePlay.setVisible(numPlaying < capacity_size);
}

var setRoomIndex = function(roomIndex){
    this.roomIndex = roomIndex;
}

var getRoomIndex = function() {
    return this.roomIndex;
}

var setPassWordRequired = function(passwordRequired){
    this.passwordRequired = passwordRequired;
}

var getPassWordRequired = function() {
    return this.passwordRequired;
}

var setPlayerList = function(player_list){
    this.player_list = player_list;
}

var getPlayerList = function(){
    return this.player_list;
}

var setWaitingPlayerList = function(waiting_player_list){
    this.waiting_player_list = waiting_player_list;
}

var getWaitingPlayerList = function(){
    return this.waiting_player_list;
}

var setEnterRoomResponse = function(reEnterRoomResponse){
    this.enter_room_response = reEnterRoomResponse;
}

var getEnterRoomResponse = function(){
    return this.enter_room_response;
}

var setCreateRoom = function(is_create_room){
    this.is_create_room = is_create_room;
}

var isCreateRoom = function(){
    return this.is_create_room;
}

var setVipRoom = function(is_vip_room){
    this.is_vip_room = is_vip_room;
}

var isVipRoom = function(){
    return this.is_vip_room;
}

var PlayLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        this.init();

    },
    init:function () {
        this._super();


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

        // var bkg = MSprite.create("res/item_background_game.png");
        //
        // var rows = width / bkg.getWidth() + 1;
        // var cols = height / bkg.getHeight() + 1;
        // for (i = 0; i<rows; i++) {
        //     for (j = 0; j<cols; j++) {
        //         var itemBackground = MSprite.create("res/item_background_game.png");
        //         itemBackground.setPosition(MVec2(i*itemBackground.getWidth(),
        //             j*itemBackground.getHeight()));
        //         this.addChild(itemBackground);
        //     }
        // }

        var btnBack = MButton.create("res/btn_back_tlmn.png", TAG.TLMN_BTN_BACK);
        btnBack.setPosition(MVec2(padding - btnBack.getHeight()/6,
            height - padding - btnBack.getHeight()*(1.0-1.0/6)));
        btnBack.addTouchEventListener(this.menuCallBack, this);

        var btnInvitePlay = MButton.create("res/popup_moichoi/btn_moichoi.png", TAG.BTN_INVITE_TO_PLAY);
        btnInvitePlay.setPosition(MVec2(padding,height - 2*padding - btnInvitePlay.getHeight()*2));
        btnInvitePlay.addTouchEventListener(this.menuCallBack, this);

        var icon_lock = passwordRequired ? "res/btn_mokhoa.png" : "res/btn_khoa.png";

        var btnKhoa = MButton.create(icon_lock, TAG.TLMN_BTN_KHOA);
        btnKhoa.setPosition(MVec2(2*padding + btnKhoa.getWidth(),height - padding - btnKhoa.getHeight()));
        btnKhoa.addTouchEventListener(this.menuCallBack, this);
        btnKhoa.setVisible(is_create_room);

        var title_game = getTitleGame();

        var lb_title_game = MLabel.create(title_game, btnKhoa.getHeight() * 0.35, cc.color(10, 175, 244),true);
        lb_title_game.setAnchorPoint(cc.p(0,1));
        var posx_titlegame = is_create_room ? (btnKhoa.getPositionX() + btnKhoa.getWidth() + padding) :
            (btnInvitePlay.getPositionX() + btnKhoa.getWidth() + padding);
        lb_title_game.setPosition(cc.p(posx_titlegame, originY + height - padding));
        this.addChild(lb_title_game);

        var value_minbet = getMinBet();
        var minbet_type = is_vip_room ? "KEN" : "XU";

        var lb_value_minbet = MLabel.create(value_minbet + " " + minbet_type, btnKhoa.getHeight() * 0.25, cc.color.WHITE);
        lb_value_minbet.setAnchorPoint(cc.p(0,1));
        lb_value_minbet.setPosition(cc.p(lb_title_game.getPositionX(),
            lb_title_game.getPositionY() - lb_title_game.getHeight() - 2));
        this.addChild(lb_value_minbet);

        var lb_title_room = MLabel.create("Bàn", btnKhoa.getHeight() * 0.25, cc.color(10, 175, 244));
        lb_title_room.setAnchorPoint(cc.p(0,1));
        lb_title_room.setPosition(lb_value_minbet.getPositionX() + lb_value_minbet.getWidth() + 5,
            lb_value_minbet.getPositionY());
        this.addChild(lb_title_room);

        var lb_value_room = MLabel.create(roomIndex + 1, btnKhoa.getHeight() * 0.25, cc.color.WHITE);
        lb_value_room.setAnchorPoint(cc.p(0,1));
        lb_value_room.setPosition(lb_title_room.getPositionX() + lb_title_room.getWidth() + 2, lb_value_minbet.getPositionY());
        this.addChild(lb_value_room);

        var btn_caidat = MButton.create("res/btn_caidat.png", TAG.TLMN_BTN_CAIDAT);
        btn_caidat.setPosition(MVec2(width - padding - btn_caidat.getContentSize().width,
            height - btn_caidat.getContentSize().height - padding));
        btn_caidat.addTouchEventListener(this.menuCallBack, this);

        var btn_menu = MButton.create(res.BTN_MENU, TAG.TLMN_BTN_MENU);
        btn_menu.setPosition(cc.p(origin.x + padding, origin.y + visibleSize.height - btn_menu.getHeight() - padding));
        btn_menu.addTouchEventListener(this.menuCallBack, this);

        btn_message = MButton.create(res.BTN_MESSAGE, TAG.TLMN_BTN_MESSAGE);
        btn_message.setPosition(MVec2(width - btn_message.getContentSize().width - padding, padding));
        btn_message.addTouchEventListener(this.menuCallBack, this);

        var btn_purcharse = MButton.create(res.BTN_PURCHASE, TAG.TLMN_BTN_PURCHASE);
        btn_purcharse.setPosition(cc.p(btn_caidat.getPositionX() - padding - btn_purcharse.getContentSize().width,
            btn_caidat.getPositionY()));
        btn_purcharse.addTouchEventListener(this.menuCallBack, this);

        //icon facebook
        var btn_facebook = MButton.create(res.BTN_FACEBOOK, TAG.TLMN_BTN_FACEBOOK);
        btn_facebook.setPosition(cc.p(btn_purcharse.getPositionX() - padding - btn_facebook.getWidth(),
            btn_purcharse.getPositionY()));
        btn_facebook.addTouchEventListener(this.menuCallBack, this);

        this.addChild(btnBack);
        this.addChild(btnKhoa);
        this.addChild(btnInvitePlay);
        this.addChild(btn_message);
        this.addChild(btn_purcharse);
        this.addChild(btn_caidat);

        ws.onmessage = this.ongamestatus.bind(this);

        return true;
    },
    ongamestatus: function(e) {
        cc.log("data 1", e);
        if(e.data!==null || e.data !== 'undefined')
        {
            var listMessages = parseFrom(e.data, e.data.byteLength);
            cc.log("listMessages", listMessages);
            while(listMessages.length > 0) {
                var buffer = listMessages.shift();
                this.playSceneHandleMessage(buffer);
            }
        }
    },
    menuCallBack: function(pSender, eventType){
        if (eventType == ccui.Widget.TOUCH_ENDED) {
            var tag = pSender.tag;
            // SoundManager::getInstance().playSound("sounds/button_click.mp3");
            switch (tag) {
                case TAG.TLMN_BTN_BACK:
                    cc.log("m_popupTLMN");
                {
                    if (!check_exit_room) {
                        getExitRoomMessageFromServer(roomIndex);
                        pSender.loadTextureNormal("res/btn_back_out.png");
                    }else {
                        getCancelExitRoomMessageFromServer(roomIndex);
                        pSender.loadTextureNormal("res/btn_back_tlmn.png");
                    }
                    check_exit_room = !check_exit_room;
                }
                    break;
                case TAG.TLMN_BTN_MESSAGE:
                    if(this.getChildByTag(POPUP.TAG_CHAT) == null){
                        // var m_popupChat = PopupChat::createPopup(ScopeChat::CHAT_ROOM, lstMsgChat);
                        // m_popupChat.setTag(POPUP_TAG_CHAT);
                        // addChild(m_popupChat,INDEX_POPUP);
                        // m_popupChat.appear();
                    }
                    break;
                case TAG.BTN_INVITE_TO_PLAY:
                    // if(this.getChildByTag(POPUP.TAG_INVITE) == null){
                    //     var m_popupInviteToPlay = PopupInviteToPlay::create();
                    //     m_popupInviteToPlay.setTag(POPUP.TAG_INVITE);
                    //     m_popupInviteToPlay.setVipRoom(is_vip_room);
                    //     m_popupInviteToPlay.setRoomIndex(roomIndex);
                    //     addChild(m_popupInviteToPlay, INDEX_POPUP);
                    //
                    //     m_popupInviteToPlay.getLookupUserToInviteFromServer();
                    //     m_popupInviteToPlay.appear();
                    // }

                    break;
                case TAG.TLMN_BTN_KHOA:
                {
                    // if (passwordRequired){
                    //     //popup_lock.setLock(false);
                    //     getLockRoom(roomIndex, false);
                    // }
                    // else{
                    //     if(this.getChildByTag(POPUP.TAG_LOCKTABLE) == null){
                    //         var popup_lock = PopupLockTable::create();
                    //         popup_lock.setTag(POPUP.TAG_LOCKTABLE);
                    //         this.addChild(popup_lock, INDEX_POPUP);
                    //         popup_lock.appear();
                    //     }
                    // }
                }
                    break;
                case TAG.TLMN_BTN_PURCHASE:
                    cc.log("purchase");
                // {
                //     if (getServerAppVersion() < 0){
                //             this.showToast(MSG_COMMING_SOON, 2);
                //         break;
                //     }
                //     var m_popupDoiThe = this.getChildByTag(POPUP.TAG_DOITHE);
                //     if (m_popupDoiThe == null){
                //         m_popupDoiThe = PopupDoiThe::create();
                //         m_popupDoiThe.setTag(POPUP.TAG_DOITHE);
                //         m_popupDoiThe.addMenuNapThe();
                //         addChild(m_popupDoiThe, INDEX_POPUP);
                //         m_popupDoiThe.appear();
                //     }
                // }
                    break;
                case TAG.TLMN_BTN_CAIDAT:
                    cc.log("sound");
                    // if (this.getChildByTag(POPUP.TAG_SETTING) == null){
                    //     var m_popupSetting = PopupSetting::create();
                    //     m_popupSetting.setTag(POPUP.TAG_SETTING);
                    //     addChild(m_popupSetting, INDEX_POPUP);
                    //     m_popupSetting.appear();
                    // }
                    break;
                case TAG.TLMN_BTN_FACEBOOK:
                    // captureScreenShareFace();
                    break;
                default:
                    break;
            }
        }
    },
    playSceneHandleMessage: function(e) {
        var buffer = e;
        cc.log("buffer.message_id", buffer.message_id);
        switch (buffer.message_id) {
            case NetworkManager.EXIT_ROOM:
                var msg = buffer.response;
                exitRoomResponseHandler(msg);
                break;
            case NetworkManager.CANCEL_EXIT_ROOM:
                var msg = buffer.response;
                cancelExitRoomResponseHandler(msg);
                break;
        }
    }
});

//lay ra avatar cua nguoi choi
var findAvatarOfPlayer = function(player_id) {
    for (i = 0; i < avatars.length; i++){
        if (avatars[i].getPlayerId == player_id){
            return avatars[i];
        }
    }
    return null;
}

var exitRoomResponseHandler = function(exit_room_response) {
    if (exit_room_response != 0) {
        cc.log("exit_room_response", exit_room_response);
        // if (exit_room_response.responseCode && exit_room_response.exitAfterMatchEnd) {
        if (exit_room_response.responseCode) {
            // if (!exit_room_response.exitAfterMatchEnd) {
                cc.log("exit_room_response.exitAfterMatchEnd", exit_room_response.exitAfterMatchEnd);
                var enter_room_response = 0; //xoa bien luu trang thai dang choi khi nguoi choi join lai ban choi
                var default_room_type = getRequestRoomType() != -1 ? getRequestRoomType() : ROOM_TYPE.XU;
                cc.log("default_room_type", default_room_type);
                // onHideNotify();  //an thong bao di

                var showtable = new SceneTable(isDisplayRoomList(), default_room_type, exit_room_response.notEnoughMoney,
                    exit_room_response.message ? exit_room_response.message : "");
                cc.director.runScene(showtable);
            // }else{
            //     // showToast(TXT_REGISTER_EXITROOM, 2);
            // }
        }
        else {
            // this.showToast(exit_room_response.message().c_str(), 2);
        }
    }
}

//an cac nut moi choi va chat doi voi nguoi cho
// var showBtnWithWatingPlayer = function(isShow){
//     btnInvitePlay.setVisible(isShow);
//     btn_message.setVisible(isShow);
// }


