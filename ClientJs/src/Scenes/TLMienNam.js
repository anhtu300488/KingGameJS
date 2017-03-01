var cards = [];
var card_tag = [];

var padding = 20;
var currentTableIndex;
var cardViews = [4];
var _currentTurnUserId;

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

        cc.log("TLMN");

        this.roomIndex = roomIndex;

        this.cardRemainingCount = cardRemainingCount;

        // TLMNgameTag = _gameTag;

        // 'layer' is an autorelease object
        setCreateRoom(createRoom);
        setVipRoom(isVipRoom);
        setRoomIndex(roomIndex);
        setPassWordRequired(passwordRequired);
        // setDisplayRoomList(isDisplayRoomList);
        common.displayRoomList = isDisplayRoomList;
        setPlayerList(playerList);
        setWaitingPlayerList(waitingPlayerList);
        setEnterRoomResponse(reEnterRoomResponse);
        // setMinBet(minBet);
        common.minBet  = minBet;

        // ws.onmessage = this.ongamestatus.bind(this);
        // ws.onclose = this.onclose.bind(this);
        // ws.onerror = this.onerror.bind(this);

        // this.scheduleUpdate();

        this.init();

        return true;
    },

    init: function () {
        this._super();

        cc.log("playScene.init", playScene.init());
        if (!playScene.init() ) {
            return false;
        }

        capacity_size = 4;

        this.initMenu();
        this.initGame(this.cardRemainingCount);

        ws.onmessage = this.ongamestatus.bind(this);

        this.scheduleUpdate();
    },


    onExit:function () {
        playScene.onExit();
        is_create_room = false;
        player_list.length = 0;
    },

    initMenu: function () {
        // var playLayer = new PlayLayer();
        // this.addChild(playLayer);

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
        this.btn_start_match.setVisible(is_create_room && playerList.length >= 2);

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

        bkgTable.runAction(cc.repeatForever(cc.sequence(cc.delayTime(6.0),
            cc.callFunc(function(){
                reloadEnterRoom(0);
            }))));


    },
    menuCallBack: function(pSender, eventType) {
        //PlayScene::menuCallBack(pSender, eventType);
        if(eventType == ccui.Widget.TOUCH_ENDED) {
            var tag = pSender.tag;
            cc.log("tag", tag);
            cc.log("this.roomIndex", this.roomIndex);
            switch (tag) {
                case TAG.TLMN_START_MATCH:
                    if (playerList.length >= 2) {
                        getStartMatchMessageFromServer(this.roomIndex);
                        this.btn_start_match.setVisible(false);
                        this.btn_doi_luat.setVisible(false);
                    } else {
                        cc.log("Khong du nguoi choi");
                    }
                    break;
                case TAG.TLMN_BTN_SANSANG:
                    getReadyToPlayMessageFromServer(this.roomIndex, -1);
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
        console.log("TLMienNam->.ws.onmessage():"+e.data);
        if(e.data!==null || e.data !== 'undefined')
        {
            var lstMess = parseFrom(e.data, e.data.byteLength);
            while(lstMess.length > 0) {
                var buffer = lstMess.shift();
                this.tlmnHandleMessage(buffer);
            }
        }
    },
    tlmnHandleMessage: function(e) {
        var buffer = e;
        switch (buffer.message_id) {
            case NetworkManager.START_MATCH:
                var msg = buffer.response;
                this.startMatchResponseHandler(msg);
                break;
            case NetworkManager.READY_TO_PLAY:
                var msg = buffer.response;
                cc.log("PLAYER_ENTER_ROOM");
                this.readyToPlayResponseHandler(msg);
                break;
            case NetworkManager.PLAYER_ENTER_ROOM:
                cc.log("PLAYER_ENTER_ROOM");
                var msg = buffer.response;
                this.playerEnterRoomResponseHandler(msg);
                break;
            // case NetworkManager.CANCEL_EXIT_ROOM:
            //     var msg = buffer.response;
            //     cancelExitRoomResponseHandler(msg);
            //     break;
        }
    },
    initGame: function(cardRemainingCount){

        if (is_create_room){
            var current_user_id = getUserId();
            common.ownerUserId  = current_user_id;

            //show change rule button khi co 1 minh chu phong
            if (playerList.length == 1){
                this.btn_doi_luat.setVisible(true);
            }
        }

        this.setListPlayerFromParams(player_list, waiting_player_list, this.cardRemainingCount, this);


        if (enterRoomResponse != 0) {
            this.handleReEnterRoom(enterRoomResponse);
        }


        // showChangeRule(this.isHiddenCardRemaining, this.isPreviousWinnerGoFirst);
    },
    handleReEnterRoom: function(response) {
        try  {
            if (response != 0) {
                if(response.currentTurnUserId.low != 0) {
                    this.setCurrentTurnUserId(response.currentTurnUserId.low);
                    this.btn_start_match.setVisible(false);
                }
    
                // if (response.enterRoomStatus == PlayerState.WAITING && response.roomIsPlaying){
                //     showNotifyWating();
                // }
    
                common.ownerUserId  = response.ownerUserId;
                var sizeCard = 0;
                //an nut start match di
                this.btn_start_match.setVisible(false);
                var avatar = findAvatarOfPlayer(getUserId());
                if (avatar != 0 && response.roomIsPlaying){
                    var moveTo = new cc.MoveTo(0.5, avatar.getAvatarPostion(0, origin, visibleSize, this.btn_start_match.getHeight()));
                    avatar.runAction(moveTo);
                }
    
                for (i = 0; i < response.args.length; i++) {
                    if (response.args[i].key == "currentCards") {
                        var current_card_values = response.args[i].value.split(',');
                        sizeCard = current_card_values.length;
                        this.sortCard(current_card_values);
    
                    } else if (response.args[i].key == "lastTurnCards") {
                        var listTurnCardValues = response.args[i].value.split(',');
    
                        var currentTurnUserId = this.getCurrentTurnUserId();
                        var buffer;
                        buffer = currentTurnUserId;
                        var current_user_id = buffer;
                        if(currentTurnUserId <= 0){
                            return;
                        }
                        var avatar = findAvatarOfPlayer(currentTurnUserId);
                        if (avatar == 0) {
                            return;
                        }
                        var numbercard = avatar.getNumberCard();
                        if (this.isHiddenCardRemaining){
                            for (i = 0; i < avatars.length; i++){
                                if (avatars[i].getPlayerId() != getUserId()){
                                    avatars[i].hideCardCover(false);
                                }
                            }
                        }
                        else {
                            numbercard -= listTurnCardValues.length;
                            if (numbercard < 0) {
                                numbercard = 13;
                            }
                            avatar.setNumberCard(numbercard);
                        }
    
                        // if (getCurrentTurnUserId() == getUserId()) {
                        //     this.moveCardToCenter(listTurnCardValues, false, avatar);
                        //
                        //     //suggess bai
                        //     if (!listTurnCardValues.empty()){
                        //         var cardReady =
                        //             TLMNCardHandler::getInstance().getAllSuggessCard(this.cardTagToInts(card_tag), listTurnCardValues);
                        //         if (!cardReady.empty()){
                        //             for (CardSprite* card : card_tag){
                        //                 if (card.getState() != OnTable) {
                        //                     for (int value : cardReady) {
                        //                         if (card.getNumberValue() == value) {
                        //                             card.setReady(true);
                        //                         }
                        //                     }
                        //                     card.showHidden(!card.getReady());
                        //                     card.setReady(false);
                        //                 }
                        //             }
                        //             btn_danh_bai.setVisible(true);
                        //         }else {
                        //             for (CardSprite* card : card_tag){
                        //                 if (card.getState() != OnTable){
                        //                     card.showHidden(true);
                        //                 }
                        //             }
                        //             btn_danh_bai.setVisible(false);
                        //         }
                        //     }
                        //     else {
                        //         btn_danh_bai.setVisible(true);
                        //     }
                        //
                        //     btn_bo_luot.setVisible(true);
                        // } else {
                        //     this.moveCardToCenter(listTurnCardValues, false, avatar);
                        // }
                        /*handler last turn cards*/
    
                    }
                    else if (response.args[i].key == "turnCdRemaining") {
                        var time_count_down = response.args[i].value * 1.0;
                        // findAvatarOfPlayer(this.getCurrentTurnUserId()).updateProgressCircleBar(100, time_count_down);
                    }
                    else if (response.args[i].key == "cardRemainingCount") {
                        var json = response.args[i].value;
                        // parseRemainCards(json);
                    }
                    else {
                        if (response.args[i].key == "hiddenCardRemainingCount") {
                            this.isHiddenCardRemaining = response.args[i].value == "true" ? true : false;
                        }
                        else if (response.args[i].key == "previousWinnerGoFirst"){
                            this.isPreviousWinnerGoFirst = response.args[i].value == "true" ? true : false;
                        }
                    }
                }
            }
        }
        catch (e) {
            cc.log("error message: %s", e);
        }
    },
    setCurrentTurnUserId: function(_currentTurnUserId) {
        this._currentTurnUserId = _currentTurnUserId;
    },
    getCurrentTurnUserId: function() {
        return this._currentTurnUserId;
    },
    sortCard: function(card_values) {
        card_values.sort(function(a, b) {
            return parseFloat(a) - parseFloat(b);
        });
        if (cards.length > 0) cards.length = 0;
        for(i=0;i<card_values.length;i++){
            var card = new Card();
            card.setValue(card_values[i]); // Số thẻ là 1-52
            cards.push(card);

        }
        this.showInitCard();
    },
    showInitCard: function() {
        for (i = 0; i < cards.length; i++){
            this.createCards(i);
            if (card_tag[i].getParent() == null)
                this.addChild(card_tag[i]);
        }

        //== chiabai

        for(i = 0;i < 4;i++){
            for(j =0 ;j< avatars.length;j++){
                if(avatars[j].getPlayerId() != getUserId() && avatars[j].getPositionIndex() == i){
                    for(k = 0 ;k < 8;k++){
                        var card = OtherCardSprite.createCardCover(cardWidth()*0.8);
                        card.setPosition(MVec2(width / 2 - cardWidth() / 2, height / 2));
                        var pos = this.getCardCoverPostion(avatars[j]);
                        card.runAction(new cc.Sequence(new cc.MoveTo(0.05*k, pos), new cc.RemoveSelf,null));
                        cardViews[i].push(card);
                    }
                    break;
                }
            }
        }

        for(i = 0 ;i < 4 ; i++){
            if(cardViews[i].length > 0)
                for(j =0 ;j < cardViews[i].length;j++){
                if(cardViews[i][j].getParent()== null){
                    this.addChild(cardViews[i][j]);
                }
            }
        }

        // play sound chiabai
        // SoundManager::getInstance().playSound(soundTLMN[37]);
        for(i = 0; i < card_tag.length;i++){
            var moveTo = new cc.MoveTo(0.2+0.06*i,MVec2(width / 2 + (i - 5) * cardWidth(),posYCard()));
            card_tag[i].runAction(moveTo);
            card_tag[i].setPosY(originY + posYCard());
        }
    },
    getCardCoverPostion: function(avatar){
        return Vec2(avatar.getPosition().x + avatar.spriteCard.getPosition().x,
            avatar.getPosition().y + avatar.spriteCard.getPosition().y);
    },
    getCurrentTurnUserId: function() {
        return _currentTurnUserId;
    },
    setCurrentTurnUserId: function(_currentTurnUserId) {
        this._currentTurnUserId = _currentTurnUserId;
    },
    update: function(delta) {
        playScene.update(delta);
        // /*
        //  nguoi choi huy dang ky roi ban
        //  */
        // this.cancelExitAfterMatchEndResponseHandler();
        //
        // /*
        //  nguoi choi khac nhan duoc thong bao khi co nguoi dang ky roi ban
        //  */
        // this.playerExitAfterMatchEndResponse();
        //
        // /*
        //  update thong tin ban choi khi co nguoi roi ban
        //  */
        // this.playerExitRoomResponse();
        //
        // /*
        //  Thay đổi chủ bàn
        //  */
        // this.roomOwnerChangedResponseHandler();
        //
        // /*
        //  TURN response
        //  */
        // this.turnResponse();
        //
        // /*
        //  begin UPDATE_MONEY
        //  */
        // this.updateMoneyResponseHandler();
        //
        //
        // this.prepareNewMatchResponseHandler();
        //
        // /*
        //  Match End
        //  */
        // this.matchEndResponseHandler();
        //
        // /*
        //  match begin
        //  */
        // this.matchBeginResponseHandler();
        //

        // /*
        //  player enter room
        //  */
        if(listMessages.length > 0) {
            for (i = 0; i < listMessages.length; i++) {
                if (listMessages[i].message_id == NetworkManager.PLAYER_ENTER_ROOM) {

                    newplayerresponse = listMessages[i].response;
                    this.playerEnterRoomResponseHandler(newplayerresponse);

                    listMessages.splice(i, 1);
                }
            }
        }
        // /*
        //  startMatch
        //  */
        // this.startMatchResponseHandler();
        //
        // /*
        //  kick user
        //  */
        // this.kickUserResponseHandler();
        //
        // /*
        //  readyToPlay
        //  */
        // this.readyToPlayResponseHandler();
        //
        // /*
        //  change_rule
        //  */
        // this.changeRuleResponseHandler();
    },
    setPositionPlayer : function(player, indexPos, thisObj){

        var position_index = 0;  //vi tri that cua nguoi choi
        //tinh toan vi tri that cua nguoi choi
        if (parseInt(player.tableIndex) >= parseInt(currentTableIndex)){
            position_index = parseInt(player.tableIndex) - parseInt(currentTableIndex);
        }
        else {
            position_index = parseInt(player.tableIndex) - parseInt(currentTableIndex) + capacity_size;
        }

        if (position_index >= capacity_size){
            position_index = 0;
        }

        if (common.zoneId == Common.TLMN_SOLO_ZONE) {
            if(indexPos == 1) position_index = 2;
        }

        var avatar = new Avatar();

        cc.log("avatar", avatar);

        var _numberCard = player.numberCard;
        var user_name = player.name;
        var user_id = player.id;
        var gold = player.gold;
        var cash = player.cash;

        //char buffer[20];
        var buffer = cc.formatStr("%d", is_vip_room ? cash : gold);

        //sprintf(buffer, "%lld $", is_vip_room ? cash : gold);

        var image_index = player.tableIndex;

        avatar.loadAvatar(image_index, user_id, user_name, buffer, this.roomIndex);
        var pos = avatar.getAvatarPostion(position_index, origin, visibleSize, btn_message.getContentSize().height);
        if(position_index == 0){
            pos = MVec2(width/2 - avatar.getContentSize().width/2,pos.y);
        }
        avatar.setPosition(pos);

        var cardCoverWidth = cardWidth() * 0.8;
        if(avatar.getPlayerId() == getUserId()){
            avatar.loadCardCover(cardCoverWidth, position_index, _numberCard,true);
            avatar.hideCardCover();
        }else{
            avatar.loadCardCover(cardCoverWidth, position_index, _numberCard);
        }

        avatar.setNumberCard(_numberCard);

        avatars.push(avatar);

        if (avatars[avatars.length -1].getParent() == null)
            thisObj.addChild(avatars[avatars.length -1],INDEX_AVATAR);
    },
    sortListPlayer : function(lst_player) {
        lst_player.sort(function(a, b) {
            return parseFloat(a.tableIndex) - parseFloat(b.tableIndex);
        });
    },
    findPlayer : function(player_id){
        var c_player_id = [50];

        c_player_id = player_id;

        var s_player_id = c_player_id;

        for (i = 0; i < playerList.length; i++){
            if (playerList[i].getID == s_player_id){
                return playerList[i];
            }
        }

        return null;
    },
    displayInfoRemainCard : function(remain_card_infos, thisObj) {
        //find current index
        var currentIndex = -1;
        currentTableIndex = -1;

        cc.log("remain_card_infos", remain_card_infos);

        for (i = 0; i < remain_card_infos.length; i++)  {
            var val = remain_card_infos[i].id;
            if (getUserId() == val) {
                currentIndex = i;
                currentTableIndex = remain_card_infos[i].tableIndex;
                break;
            }
        }
        //end find current index

        cc.log("list player size: ", remain_card_infos.length);

        //int index = currentIndex;
        var len = remain_card_infos.length;

        for (i = 0; i < len; i++) {
            this.setPositionPlayer(remain_card_infos[i], i, thisObj);
        }
    },
    showWaitingPlayerOnScene : function(lstWaiting){
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
    },
    isUserPlaying : function(){
        var user_id = getUserId();
        var player = this.findPlayer(user_id);
        if (player != 0){
            return true;
        }
        return false;
    },
    startMatchResponseHandler : function(rs) {
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

                if (!this.isUserPlaying()){ //neu la nguoi cho khi bat dau game thi khong hien thi nut san sang
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
                // if (this.isHiddenCardRemaining){
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
    },
    playerEnterRoomResponseHandler : function (newplayerresponse) {
        cc.log("newplayerresponse", newplayerresponse);
        if (newplayerresponse.responseCode) {
            var player = convertFromBINPlayer(newplayerresponse.player);
            var playerId = player.id;
            if (playerId != getUserId()) {
                if (newplayerresponse.enterRoomStatus == PlayerState.PLAYING){
                    // player_list.push(newplayerresponse.player);
                    player_list.push(newplayerresponse.player);
                    lst_player.push(player);

                    showInvitePlayer(lst_player.length);

                    this.sortListPlayer();
                    var index_pos_newplayer = findIndexPlayer(lst_player, player);
                    if (index_pos_newplayer != -1){
                        this.setPositionPlayer(lst_player[index_pos_newplayer], index_pos_newplayer);
                    }
                    if (getUserId() == common.ownerUserId && lst_player.length >= 2){
                        this.btn_start_match.setVisible(true);
                        this.btn_doi_luat.setVisible(false);
                    }
                } else {
                    if (newplayerresponse.enterRoomStatus == PlayerState.WAITING){
                        lst_waiting.push(player);
                        waiting_player_list.push(player);
                        resetListWaiting();
                        this.showWaitingPlayerOnScene(lst_waiting);
                        //dddd
                    }
                }
            }

            if (newplayerresponse.enterRoomStatus == PlayerState.PLAYING) {
                if (newplayerresponse[0].changeOwnerRoomCd > 0) {

                    if (this.getChildByTag(TAG_TIME_COUNTDOWN) != null){
                        this.removeChildByTag(TAG_TIME_COUNTDOWN);
                    }

                    var time_wait = newplayerresponse.changeOwnerRoomCd / 1000;
                    // addCountDown(time_wait);
                }
            }

        } else {
            // this.showToast(newplayerresponse.message, 2);
            if (getUserId() == common.ownerUserId) {
                this.is_create_room = true;
                this.btn_start_match.setVisible(this.is_create_room);
            }
        }


    },
    setListPlayerFromParams : function(player_list_dt, waiting_player_list_dt, cardRemainingCount, thisObj) {

        if (lst_player.length > 0) lst_player.length = 0;

        cc.log("player_list", player_list_dt);

        for (i = 0; i < player_list_dt.length; i++) {
            var player = convertFromBINPlayer(player_list_dt[i]);
            lst_player.push(player);
        }

        for (i = 0; i < waiting_player_list_dt.length; i++) {
            var playerWait = convertFromBINPlayer(waiting_player_list_dt[i]);
            lst_waiting.push(playerWait);
        }


        if (is_create_room){
            // this.btn_san_sang.setVisible(false);
        }
        else {
            if (this.isUserPlaying()){
                // showInvitePlayer(lst_player.length);
                showInvitePlayer(player_list_dt.length);
                // this.btn_san_sang.setVisible(false);
            }
            else {
                showBtnWithWatingPlayer(false);
            }
        }

        // if (cardRemainingCount != 0){
        //     parseRemainCards(cardRemainingCount);
        // }

        this.showWaitingPlayerOnScene(lst_waiting);

        //sap xep lai lst_player theo table_index
        this.sortListPlayer(lst_player);

        //hien thi avatar cua nhung nguoi join vao phong
        this.displayInfoRemainCard(lst_player, thisObj);
    },
    readyToPlayResponseHandler : function(ready_to_play_response){
        cc.log("ready_to_play_response", ready_to_play_response);
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
    },
    onclose:function (e) {

    },
    onerror:function (e) {

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

var reloadEnterRoom = function(dt){
    //neu co ket noi thi gui reload room
    if (ws.readyState == ws.OPEN) {
        getEnterRoomMessageFromServer(this.roomIndex, "");
    }
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

var convertFromBINPlayer = function(binplayer) {
    var uid = binplayer.userId;
    cc.log("binplayer", binplayer);
    var numberCard = 0;
    var player = TLMNPlayer.init(binplayer.displayName == null ? binplayer.userName : binplayer.displayName, uid.low, numberCard, binplayer.cash.low,
        binplayer.gold.low, 0, binplayer.tableIndex, binplayer.avatarId);
    return player;
}


// var parseRemainCards = function(json) {
//     try {
//         var document = new Document();
//         document = json;
//         var index = 0;
//         for (rapidjson::Value::ConstMemberIterator itr = document.MemberBegin();
//         itr != document.MemberEnd(); ++itr) {
//
//             string key = itr.name.GetString();
//             int val = itr.value.GetInt();
//             char buffer[20];
//             sprintf(buffer, "%d", Common::getInstance().getUserId());
//             std::string str_buffer = std::string(buffer);
//             int k = -1;
//             for (int i = 0; i < lst_player.size(); i++) {
//                 if (lst_player[i].getID() == key) {
//                     k = i;
//                     break;
//                 }
//             }
//             if (k != -1) {
//                 lst_player[k].setNumberCard(val);
//
//                 long long player_id;
//                 std::stringstream ss(lst_player[k].getID());
//                 ss >> player_id;
//                 Avatar* avatar = findAvatarOfPlayer(player_id);
//                 if (avatar != 0){
//                     avatar.setNumberCard(val);
//                 }
//             }
//
//             index++;
//         }
//     }
//     catch (const std::exception &e) {
//         CCLOG("error: %s", e.what());
//     }
// }


//set vi tri nguoi choi: indexPos . vi tri cua nguoi choi trong lst_player 
//capacity_size . so nguoi choi toi da trong room

var findIndexPlayer = function(lstPlayer, player){

    for (i = 0; i < lstPlayer.length;i++){
        if (lstPlayer[i].getID() == player.getID()){
            return i;
        }
    }

    return -1;
}
