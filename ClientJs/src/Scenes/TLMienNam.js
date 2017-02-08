var cards = [];
var card_tag = [];
var lst_player = [];
var lst_waiting = [];
var padding = 20;

var CARD_SHOWING_ZORDER = 1;

var CARD_SUIT_TYPE_NUM = 4; // Loại bài trong bộ
var CARD_NUM_OF_SUIT = 13; // Số quân bài trong 1 loại

var CARD_X_NUM = 13; // rows
var CARD_MARGIN = 10; // Khoảng cách giữa các thẻ

var enter_room_status = 0;

var TLMNgameTag;
var isDisplayRoomList;

var TLMienNamLayer = cc.Layer.extend({
    sprite:null,
    isHiddenCardRemaining: false,
    isPreviousWinnerGoFirst : false,
    ctor:function (roomIndex, playerList, waitingPlayerList,
    createRoom, gameTag, isDisplayRoomList, passwordRequired, isVipRoom, minBet,
    cardRemainingCount, reEnterRoomResponse) {
        //////////////////////////////
        // 1. super init first
        this._super();

        // TLMNgameTag = _gameTag;

        // 'layer' is an autorelease object
        setCreateRoom(createRoom);
        setVipRoom(isVipRoom);
        setRoomIndex(roomIndex);
        setPassWordRequired(passwordRequired);
        setDisplayRoomList(isDisplayRoomList);
        setPlayerList(playerList);
        setWaitingPlayerList(waitingPlayerList);
        setEnterRoomResponse(reEnterRoomResponse);
        setMinBet(minBet);
        this.initMenu();
        this.initGame(cardRemainingCount);


        this.init();

    },

    init: function () {
        this._super();

        ws.onmessage = this.ongamestatus.bind(this);

        return true;

    },

    initMenu: function () {
        var playLayer = new PlayLayer();
        this.addChild(playLayer);

        var bkgTable = MSprite.create(res.sprite_table);
        bkgTable.setScale(width*0.8/bkgTable.getWidth());
        bkgTable.setContentSize(cc.size(width*0.8, bkgTable.getHeight()*bkgTable.getScale()));
        bkgTable.setPosition(cc.p(origin.x+visibleSize.width/2-bkgTable.getWidth()/2,
            origin.y+visibleSize.height/2-bkgTable.getHeight()/2));

        //================ play game button

        var menu_click = false;

        var btn_danh_bai = MButton.createWithText(res.BTN_GREEN,"Đánh bài", TAG.TLMN_BTN_DANHBAI);
        btn_danh_bai.setPosition(cc.p(origin.x+width*0.5+btn_danh_bai.getWidth()*1.5,origin.y+padding/2));
        btn_danh_bai.addTouchEventListener(this.cardCallBack,this);
        btn_danh_bai.setVisible(false);

        this.btn_start_match = MButton.createWithText(res.BTN_CYAN, "Bắt đầu", TAG.TLMN_START_MATCH);
        this.btn_start_match.setPosition(cc.p(origin.x + width*0.5 - this.btn_start_match.getWidth()/2 - btn_message.getContentSize().width,
            btn_danh_bai.getPosition().y));
        this.btn_start_match.addTouchEventListener(this.menuCallBack, this);
        // this.btn_start_match.setVisible(is_create_room && player_list.size() >= 2);

        var btn_bo_luot = MButton.createWithText(res.BTN_YELLOW, "Bỏ lượt", TAG.TLMN_BTN_BOLUOT);
        btn_bo_luot.setPosition(cc.p(origin.x+width*0.5-btn_bo_luot.getWidth()*2.5,
            btn_danh_bai.getPosition().y));
        btn_bo_luot.addTouchEventListener(this.cardCallBack, this);
        btn_bo_luot.setVisible(false);

        this.btn_san_sang = MButton.createWithText(res.BTN_CYAN, "Sẵn sàng", TAG.TLMN_BTN_SANSANG);
        this.btn_san_sang.setPosition(cc.p(origin.x + width - this.btn_san_sang.getWidth() - btn_message.getContentSize().width - padding,
            btn_message.getPosition().y));
        this.btn_san_sang.addTouchEventListener(this.menuCallBack, this);

        //change rule
        this.btn_doi_luat = MButton.createWithText(res.BTN_CYAN, "Đổi luật", TAG.TLMN_BTN_DOILUAT);
        this.btn_doi_luat.setVisible(false);
        this.btn_doi_luat.setPosition(cc.p(btn_danh_bai.getPosition().x,
            btn_danh_bai.getPosition().y));
        this.btn_doi_luat.addTouchEventListener(this.menuCallBack, this);

        var lb_luatchoi = MLabel.create("", this.btn_doi_luat.getHeight()/3.2, true);
        lb_luatchoi.setAnchorPoint(ANCHOR_MIDDLE);
        lb_luatchoi.setOpacity(100);
        // lb_luatchoi.setWidth(bkgTable.getWidth()/2);
        lb_luatchoi.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lb_luatchoi.setPosition(cc.p(bkgTable.getPosition().x + bkgTable.getWidth() / 2
            , bkgTable.getPosition().y + 0.72 * bkgTable.getHeight()));
        //end

        this.addChild(bkgTable);
        this.addChild(btn_danh_bai);
        this.addChild(btn_bo_luot);
        this.addChild(this.btn_start_match);
        this.addChild(this.btn_san_sang);
        this.addChild(this.btn_doi_luat);
        this.addChild(lb_luatchoi);
    },
    menuCallBack: function(pSender, eventType) {
        //PlayScene::menuCallBack(pSender, eventType);
        if(eventType == ccui.Widget.TOUCH_ENDED) {
            var tag = pSender.tag;
            switch (tag) {
                case TAG.TLMN_START_MATCH:
                    cc.log("start match");
                    // if (playerList.length >= 2) {
                        getStartMatchMessageFromServer(roomIndex);
                        this.btn_start_match.setVisible(false);
                        this.btn_doi_luat.setVisible(false);
                    // } else {
                    //     cc.log("Khong du nguoi choi");
                    // }
                    break;
                case TAG.TLMN_BTN_SANSANG:
                    getReadyToPlayMessageFromServer(roomIndex, -1);
                    break;
                // case TAG.TLMN_BTN_DOILUAT:
                // {
                //     var lstEventNameUnCheck = [ TXT_CHANGERULE_SHOW_CARD, TXT_CHANGERULE_RANDOM_TURN ];
                //     var lstEventNameChecked = [TXT_CHANGERULE_HIDDEN_CARD, TXT_CHANGERULE_FIRST_TURN];
                //     var lstEventType = [ EVENT_CHANGE_RULE_HIDDEN_CARD, EVENT_CHANGE_RULE_FIRST_TURN ];
                //     var lstEventChoose = [this.isHiddenCardRemaining, this.isPreviousWinnerGoFirst];
                //     var nodeChangeRule = new NodeChangeRule(this, lstEventNameUnCheck, lstEventNameChecked, lstEventType, lstEventChoose, 2);
                //     nodeChangeRule.setTag(TAG_NODE_DOILUAT);
                //     this.addChild(nodeChangeRule, INDEX_POPUP);
                //     nodeChangeRule.appear();
                // }
                //     break;
                default:
                    break;
            }
        }
    },
    ongamestatus: function(e) {
        cc.log("data 1", e);
        if(e.data!==null || e.data !== 'undefined')
        {
            var listMessages = parseFrom(e.data, e.data.byteLength);
            while(listMessages.length > 0) {
                var buffer = listMessages.shift();
                this.tlmnHandleMessage(buffer);
            }
        }
    },
    tlmnHandleMessage: function(e) {
        var buffer = e;
        switch (buffer.message_id) {
            case NetworkManager.START_MATCH:
                var msg = buffer.response;
                startMatchResponseHandler(msg);
                break;
            case NetworkManager.READY_TO_PLAY:
                var msg = buffer.response;
                readyToPlayResponseHandler(msg);
                break;
            case NetworkManager.EXIT_ROOM:
                var msg = buffer.response;
                exitRoomResponseHandler(msg);
                break;
            case NetworkManager.CANCEL_EXIT_ROOM:
                var msg = buffer.response;
                cancelExitRoomResponseHandler(msg);
                break;
        }
    },
    initGame: function(cardRemainingCount){

        if (is_create_room){
            var current_user_id = getUserId();
            setOwnerUserId(current_user_id);

            //show change rule button khi co 1 minh chu phong
            if (playerList.length == 1){
                this.btn_doi_luat.setVisible(true);
            }
        }

        setListPlayerFromParams(playerList, waitingPlayerList, cardRemainingCount);
        // if (enter_room_response != 0) {
        //     handleReEnterRoom(enter_room_response);
        // }
        //
        // showChangeRule(isHiddenCardRemaining, isPreviousWinnerGoFirst);
    }
});

var TLMienNamScene = cc.Scene.extend({
    ctor:function (roomIndex, playerList, waitingPlayerList,
                                     createRoom, gameTag, isDisplayRoomList, passwordRequired, isVipRoom, minBet,
                                     cardRemainingCount, reEnterRoomResponse)
    {
        this._super();
        this.init(roomIndex, playerList, waitingPlayerList,
            createRoom, gameTag, isDisplayRoomList, passwordRequired, isVipRoom, minBet,
            cardRemainingCount, reEnterRoomResponse);
    },

    init:function (roomIndex, playerList, waitingPlayerList,
                   createRoom, gameTag, isDisplayRoomList, passwordRequired,isVipRoom, minBet,
                   cardRemainingCount, reEnterRoomResponse)
    {
        var layer = new TLMienNamLayer(roomIndex, playerList, waitingPlayerList,
            createRoom, gameTag, isDisplayRoomList, passwordRequired,isVipRoom, minBet,
            cardRemainingCount, reEnterRoomResponse);

        this.addChild(layer);
    }
});

var setListPlayerFromParams = function(player_list, waiting_player_list, cardRemainingCount) {

    if (lst_player.length > 0) lst_player.length = 0;

    for (i = 0; i < player_list.length; i++) {
        var player = convertFromBINPlayer(player_list[i]);
        lst_player.push(player);
    }

    for (i = 0; i < waiting_player_list.length; i++) {
        var playerWait = convertFromBINPlayer(waiting_player_list[i]);
        lst_waiting.push(playerWait);
    }


    // if (is_create_room){
    //     // this.btn_san_sang.setVisible(false);
    // }
    // else {
    //     if (isUserPlaying()){
    //         // showInvitePlayer(lst_player.length);
    //         showInvitePlayer(player_list.length);
    //         // this.btn_san_sang.setVisible(false);
    //     }
    //     else {
    //         showBtnWithWatingPlayer(false);
    //     }
    // }

    // if (cardRemainingCount != null){
    //     parseRemainCards(cardRemainingCount);
    // }

    // showWaitingPlayerOnScene(lst_waiting);

    //sap xep lai lst_player theo table_index
    // sortListPlayer();

    //hien thi avatar cua nhung nguoi join vao phong
    // displayInfoRemainCard(lst_player);
}

var startMatchResponseHandler = function(rs) {
    if (rs != 0) {
        var matchRunning = rs.responseCode;
        if (matchRunning) {

            if (this.getChildByTag(TAG_TIME_COUNTDOWN) != null){
                this.removeChildByTag(TAG_TIME_COUNTDOWN);
            }

            // if (rs.has_countdowntimer() && rs.countdowntimer() >= 0) {
            if (rs.countDownTimer >= 0) {
                setMatchCountDownTime(rs.countDownTimer);
            }

            // if (rs.has_firstturnuserid()) {
                setFirstTurnUserId(rs.firstTurnUserId);
            // }

            if (!isUserPlaying()){ //neu la nguoi cho khi bat dau game thi khong hien thi nut san sang
                this.btn_san_sang.setVisible(false);
            }

            // for (i = 0; i < rs.args.length; i++) {
            //     if (rs.args[i].key == "currentCards") {
            //         var current_card_values = rs.args[i].value;
            //         sortCard(current_card_values);
            //
            //         var avatar = findAvatarOfPlayer(getUserId());
            //         if (avatar != 0){
            //             var moveTo = MoveTo::create(0.2, avatar.getAvatarPostion(0, origin, visibleSize, btn_start_match.getHeight()));
            //             avatar.runAction(moveTo);
            //         }
            //     } else {
            //         //handle card remain count
            //         var json = rs.args[i].value();
            //         parseRemainCards(json);
            //     }
            // }
            //
            // if (isHiddenCardRemaining){
            //     for (i = 0; i < avatars.length; i++){
            //         if (avatars[i].getPlayerId() != getUserId()){
            //             avatars[i].hideCardCover(false);
            //         }
            //     }
            // }
            //
            // if (rs.has_message()) {
            //     this.showToast(rs.message().c_str(), 2);
            // }

        } else {
            // this.showToast(rs.message().c_str(), 2);
        }
    }
}

var isUserPlaying = function(){
    var user_id = getUserId();
    var player = findPlayer(user_id);
    if (player != 0){
        return true;
    }
    return false;
}

//tim nguoi choi
var findPlayer = function(player_id){
    var c_player_id = [50];

    c_player_id = player_id;

    var s_player_id = c_player_id;

    for (i = 0; i < playerList.length; i++){
        if (playerList[i].getID == s_player_id){
            return playerList[i];
        }
    }

    return null;
}

var createCards = function(posX){
    var cardx = cards[posX];
    var cardSprite = CardSprite.create(cardx,posX,this.cardWidth(),this);
    // cardSprite.addHidden();

    cardSprite.setPosition(MVec2(visibleSize.width/2,
        visibleSize.height/2));

    card_tag.push(cardSprite);
}

// var showInitCard = function() {
//     for (i = 0; i < cards.length; i++){
//         createCards(i);
//         if (card_tag[i].getParent() == null)
//             this.addChild(card_tag[i]);
//     }
//
//     //== chiabai
//
//     for(i = 0;i < 4;i++){
//         for(j =0 ;j< avatars.length;j++){
//             if(avatars[j].getPlayerId() != getUserId()
//                 && avatars[j],getPositionIndex() == i){
//                 for(k = 0 ;k < 8;k++){
//                     var card = OtherCardSprite::createCardCover(cardWidth()*0.8f);
//                     card.setPosition(MVec2(width / 2 - cardWidth() / 2, height / 2));
//                     auto pos = getCardCoverPostion(avatars[j]);
//                     card.runAction(Sequence::create(MoveTo::create(0.05f*k, pos),RemoveSelf::create(),NULL));
//                     cardViews[i].push_back(card);
//                 }
//                 break;
//             }
//         }
//     }
//
//     for(int i = 0 ;i < 4 ; i++){
//         if(cardViews[i].size() > 0)
//             for(int j =0 ;j < cardViews[i].size();j++){
//             if(cardViews[i][j].getParent()== nullptr){
//                 this.addChild(cardViews[i][j]);
//             }
//         }
//     }
//
//     // play sound chiabai
//     SoundManager::getInstance().playSound(soundTLMN[37]);
//     for(int i = 0; i < card_tag.size();i++){
//         auto moveTo = MoveTo::create(0.2f+0.06f*i,MVec2(width / 2 + (i - 5) * cardWidth(),posYCard()));
//         card_tag[i].runAction(moveTo);
//         card_tag[i].setPosY(originY + posYCard());
//     }
// }

// var sortCard = function(card_values) {
//     // std::sort(card_values.begin(), card_values.end());
//     if (!cards.length) cards.clear();
//     for(i=0;i<card_values.size();i++){
//         var card;
//         card.value = card_values[i]; // Số thẻ là 1-52
//         cards.push(card);
//
//     }
//     showInitCard();
// }
//
// var showInitCard = function() {
//     for (i = 0; i < cards.length; i++){
//         createCards(i);
//         if (card_tag[i].getParent() == nullptr)
//             this.addChild(card_tag[i]);
//     }
//
//     //== chiabai
//
//     for(int i = 0;i < 4;i++){
//         for(int j =0 ;j< avatars.size();j++){
//             if(avatars[j].getPlayerId() != Common::getInstance().getUserId()
//                 && avatars[j].getPositionIndex() == i){
//                 for(int k = 0 ;k < 8;k++){
//                     auto card = OtherCardSprite::createCardCover(cardWidth()*0.8f);
//                     card.setPosition(MVec2(width / 2 - cardWidth() / 2, height / 2));
//                     auto pos = getCardCoverPostion(avatars[j]);
//                     card.runAction(Sequence::create(MoveTo::create(0.05f*k, pos),RemoveSelf::create(),NULL));
//                     cardViews[i].push_back(card);
//                 }
//                 break;
//             }
//         }
//     }
//
//     for(int i = 0 ;i < 4 ; i++){
//         if(cardViews[i].size() > 0)
//             for(int j =0 ;j < cardViews[i].size();j++){
//             if(cardViews[i][j].getParent()== nullptr){
//                 this.addChild(cardViews[i][j]);
//             }
//         }
//     }
//
//     // play sound chiabai
//     SoundManager::getInstance().playSound(soundTLMN[37]);
//     for(int i = 0; i < card_tag.size();i++){
//         auto moveTo = MoveTo::create(0.2f+0.06f*i,MVec2(width / 2 + (i - 5) * cardWidth(),posYCard()));
//         card_tag[i].runAction(moveTo);
//         card_tag[i].setPosY(originY + posYCard());
//     }
// }

var readyToPlayResponseHandler = function(ready_to_play_response){

    if (ready_to_play_response != 0){
        if (ready_to_play_response.responseCode){
            if (getUserId() == ready_to_play_response.readyUserId){
                this.btn_san_sang.setVisible(false);
                showBtnWithWatingPlayer(true);
            }

            var ready_player_id = ready_to_play_response.readyUserId;
            var table_index = ready_to_play_response.tableIndex;
            var player = findWaiting(ready_player_id);

            // if (player != 0){
            //     //day vao lst playing
            //     var waiting_player = *player;
            //     waiting_player.setTableIndex(table_index);
            //     lst_player.push_back(waiting_player);
            //
            //     showInvitePlayer(lst_player.size());  //show moi choi
            //
            //     //remove avatar tren ban choi
            //     resetDisplayAvatar();
            //     //dat waiting player len ban choi
            //     sortListPlayer();
            //     displayInfoRemainCard(lst_player);
            //
            //     //neu so luong nguoi choi lon hon 2 thi hien thi btn startmatch
            //     if (Common::getInstance().getUserId() == getOwnerUserId() && lst_player.size() >= 2){
            //         btn_start_match.setVisible(true);
            //         this.btn_doi_luat.setVisible(false);
            //     }
            //
            //     //xoa khoi lst_waiting
            //     deleteWaitingPlayer(waiting_player.getID());
            //
            //     //hien thi lai danh sach cho len giao dien
            //     resetListWaiting();
            //     showWaitingPlayerOnScene(lst_waiting);
            // }
            //
            // //show doi chu phong
            // if (this.getChildByTag(TAG_TIME_COUNTDOWN) == nullptr){
            //     int time_wait = ready_to_play_response.countdowntimer() / 1000;
            //     addCountDown(time_wait);
            // }
        }
        else {
            // this.showToast(ready_to_play_response.message().c_str(), 2);
        }
    }
}

var convertFromBINPlayer = function(binplayer) {
    var uid = binplayer.userId;

    var numberCard = 0;
    var player = TLMNPlayer.init(binplayer.displayName == null ? binplayer.userName : binplayer.displayName, uid.low, numberCard, binplayer.cash.low,
        binplayer.gold.low, 0, binplayer.tableIndex, binplayer.avatarId);
    return player;
}

//show danh sach nguoi cho
var showWaitingPlayerOnScene = function(lstWaiting){
    if (!lstWaiting.length){
        lstDisplayWaitingPlayer.length = 0;

        var size = lstWaiting.length;
        var init_distance = 10;
        var distance = init_distance;
        for (i = 0; i < 3; i++){
            if ((i + 1) > size){
                break;
            }
            var waitingPlayer = new WaitingPlayer();
            waitingPlayer.setAvatar(lstWaiting[i].getName, lstWaiting[i].getAvatarId);
            waitingPlayer.setPositionAvatar(origin, distance);
            distance += waitingPlayer.getAvatar().getWidth()*0.5 + init_distance;
            lstDisplayWaitingPlayer.push(waitingPlayer);
            this.addChild(waitingPlayer);
        }
    }
}

// var sortListPlayer = function() {
//     sort(lst_player.begin(), lst_player.end());
// }

// var displayInfoRemainCard = function(remain_card_infos) {
//     //find current index
//     var currentIndex = -1;
//     var currentTableIndex = -1;
//
//     for (i = 0; i < remain_card_infos.length; i++)  {
//         var val;
//         std::stringstream ss(remain_card_infos[i].getID());
//         ss >> val;
//         if (getUserId() == val) {
//             currentIndex = i;
//             currentTableIndex = remain_card_infos[i].getTableIndex();
//             break;
//         }
//     }
//     //end find current index
//
//     cc.log("list player size: %lu", remain_card_infos.length);
//
//     //int index = currentIndex;
//     var len = remain_card_infos.length;
//
//     for (i = 0; i < len; i++) {
//         setPositionPlayer(remain_card_infos[i], i);
//     }
// }
