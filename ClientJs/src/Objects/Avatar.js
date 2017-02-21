/**
 * Created by MyPC on 08/02/2017.
 */
var player_id = 0;
var Avatar = cc.Layer.extend({
    PADDING : 15,
    XONG : 10,
    WIN : 11,
    LOSE : 12,
    PASSUP: 13,
    OPACITY: 180,
    ctor: function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();
        
        this.setAnchorPoint(cc.p(0,0));

        this.background = MSprite.create("res/bk_avatar.png");
        this.background.setPosition(cc.p(0,0));
        this.addChild(this.background);

        // cc.log("avatarID = ", getAvatarId());
        // this.avatar = MSprite.createWithSize("res/null_bg.png", cc.size(this.background.getWidth(), this.background.getWidth()));
        // this.avatar.setPosition(0,(this.background.getHeight() / 2 - this.background.getWidth() / 2));
        // this.addChild(this.avatar);

        // circleBar = MCircleBar::createWithPer(0, 0);
        // circleBar.setPosition(cc.p(this.background.getWidth()/2 + circleBar.getContentSize().width/2,
        //     this.background.getHeight()/2));
        // this.addChild(circleBar);

        this.name = MLabel.createIsBold("",this.background.getWidth()/5, true);
        this.name.setPosition(cc.p(this.background.getWidth()/2-this.name.getWidth()/2,
            this.background.getHeight()+5));
        // this.name.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.name);

        this.under_money = MSprite.create("res/sprite_diem.png");
        this.under_money.setPosition(cc.p(this.background.getWidth()/2-this.under_money.getWidth()/2,
            -5-this.under_money.getHeight()));
        this.addChild(this.under_money);

        this.money = MLabel.createWithColor("",this.background.getWidth()/6,cc.color(248,236,53),true);
        this.money.setPosition(Vec2(this.background.getWidth()/2-this.money.getWidth()/2,
            this.under_money.getPosition().y+this.under_money.getHeight()/2-this.money.getHeight()/2));
        // this.money.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(this.money);

        this.spriteCard = MSprite.create("res/card_cover.png");
        this.addChild(this.spriteCard);

        /* Anh Điệp xem lại chỗ này tạo Sprite mới không dùng hàm này được
         exit_room = MSprite::createwithFrameName("close.png");
         this.addChild(exit_room);
         */

        this.number = MLabel.createIsBold("0", this.background.getWidth()*0.35,true);
        // this.number.enableOutline(cc.color.WHITE,1);
        this.addChild(this.number,2);

        this.ic_register_exit_room = MSprite.create("res/ic_exit_room.png");
        this.ic_register_exit_room.setAnchorPoint(ANCHOR_MIDDLE_RIGHT);
        this.ic_register_exit_room.setPosition(cc.p(this.background.getPosition().x + this.background.getWidth()
            , this.background.getPosition().y + this.background.getHeight() / 2));
        this.ic_register_exit_room.setVisible(false);
        this.addChild(this.ic_register_exit_room , 1);

        this.setContentSize(this.background.getContentSize());

        // this.addEvents();

        return true;
    },
    addEvents: function(){
        var listener = new cc.EventListener.TOUCH_ONE_BY_ONE();
        listener.setSwallowTouches(true);

        listener.onTouchBegan = function(touch, event) {
            var p = touch.getLocation();
            var rect = this.getBoundingBox();

            if(rect.containsPoint(p)) {
                return true;
            }

            if (this.getChildByTag(TAG_NODE_EMOTICON) != null){
                hiddenInfoExtend(this);
            }
            return false;
        };

        listener.onTouchEnded = function(touch, event) {
            this.touchEvent(touch);
        };

        cc.Director.getEventDispatcher().addEventListenerWithSceneGraphPriority(listener, this);
    },
    showRegisterExitRoom : function(isShow){
        this.ic_register_exit_room.setVisible(isShow);
    },
    setDraw: function(duration) {
        var node = new cc.Node();
        this.addChild(node);

        var spriteBlur = MSprite.create("res/bk_avatar.png");
        spriteBlur.setColor(cc.color.BLACK);
        spriteBlur.setOpacity(cc.OPACITY);
        spriteBlur.setPosition(cc.p(this.background.getWidth()/2-spriteBlur.getWidth()/2,
            this.background.getHeight()/2-spriteBlur.getHeight()/2));
        node.addChild(spriteBlur);

        var sprite = MSprite.create("res/sprite_draw.png");
        sprite.setPosition(cc.p(this.background.getWidth()/2-sprite.getWidth()/2,
            this.background.getHeight()/2-sprite.getHeight()/2));
        node.addChild(sprite);

        // node.runAction(Sequence::create(DelayTime::create(duration),RemoveSelf::create(), NULL));
    },
    showXong: function(finished){
        if(this.getChildByTag(this.XONG) != null){
            this.getChildByTag(this.XONG).setVisible(finished);
        }else{
            var node = new cc.Node;
            node.setTag(this.XONG);

            var spriteBlur = MSprite.create("res/bk_avatar.png");
            spriteBlur.setColor(cc.color.BLACK);
            spriteBlur.setOpacity(cc.OPACITY);
            spriteBlur.setPosition(cc.p(this.background.getWidth()/2-spriteBlur.getWidth()/2,
                this.background.getHeight()/2-spriteBlur.getHeight()/2));
            node.addChild(spriteBlur);

            var sprite = MSprite.create("res/xong.png");
            sprite.setPosition(cc.p(this.background.getWidth()/2-sprite.getWidth()/2,
                this.background.getHeight()/2-sprite.getHeight()/2));
            node.addChild(sprite);
            node.setVisible(finished);
            this.addChild(node);
        }
    },
    getAvatarPostion: function(index,origin,visibleSize,buttonHeight){
        var pos = cc.p(0, 0);
        var posIndex = index;
        var spritez = MSprite.create("res/nem_gach_da/background_nem.png");
        var sizeS = spritez.getContentSize().width*0.75;
        switch (index) {
            case 3:
                pos = cc.p(origin.x + this.PADDING/2 + sizeS, origin.y + visibleSize.height / 2 - this.getContentSize().height / 2);
                break;
            case 2:
                if(common.zoneId == Common.MAUBINH_ZONE){
                    pos = cc.p(origin.x + visibleSize.width / 2 + visibleSize.width* 2 / 12.5,
                    origin.y + visibleSize.height - this.getContentSize().height - (this.PADDING/2 + sizeS));
                }else{
                    pos = cc.p(origin.x + visibleSize.width / 2 - this.getContentSize().width*0.5,
                    origin.y + visibleSize.height - this.getContentSize().height - (sizeS));
                }
                break;
            case 1:
                pos = cc.p(origin.x + visibleSize.width - this.getContentSize().width - (this.PADDING/2 + sizeS),
                    origin.y + visibleSize.height / 2 - this.getContentSize().height / 2);
                break;
            case 0:
                if(common.zoneId == Common.PHOM_ZONE){
                    pos = cc.p(origin.x + visibleSize.width / 2 - visibleSize.width * 5 / 18.0 - this.getContentSize().width,
                    origin.y + 5*3 + buttonHeight + this.under_money.getHeight());
                }else{
                    pos = cc.p(origin.x + visibleSize.width / 2 - visibleSize.width * 6.5 / 18.0 - this.getContentSize().width/2,
                    origin.y + 5*3 + buttonHeight + this.under_money.getHeight() + 5 + (visibleSize.width / 18) * CARD_RATIO* 0.5
                    - this.getContentSize().height / 2);
                }

                break;
            default:
                break;
        }
        return pos;
    },
    loadAvatar: function(index, id, _name, _money, roomIndex) {
        this.roomIndex = roomIndex;
        player_id = id;

        cc.log("avatar id", index);

        this.avatar = MSprite.createWithSize(cc.formatStr("res/avatar%d.png", index), cc.size(this.background.getWidth(), this.background.getWidth()));
        // this.avatar.setPosition(0,(this.background.getHeight() / 2 - this.background.getWidth() / 2));
        this.name.setString(this.getDisplayNameSubTextX(_name));
        this.name.setPosition(cc.p(this.background.getWidth()/2-this.name.getWidth()/2,
            this.background.getHeight()+5));
        this.addChild(this.avatar);


        var long_money = _money;
        this.setMoney(long_money);
    },
    getDisplayNameSubTextX: function(displayName){
        var displayNameChars =  displayName.split(' ');
        if (displayNameChars.length > 1){
            var origSize = displayName.length;

            var sub_display_name;
            sub_display_name = displayName.substr(0, 13);
            if (sub_display_name.length != origSize){
                return sub_display_name + "...";
            }
            return sub_display_name;

        }
        else if (displayName.length > 13){
            return (displayName.substr(0, 13) + "...");
        }

        return displayName;
    },
    setMoney: function(_money){
        this.money.setString(convertLongToMoneyView(_money));
        this.money.setPosition(cc.p(this.background.getWidth()/2-this.money.getWidth()/2,
            this.under_money.getPosition().y+this.under_money.getHeight()/2-this.money.getHeight()/2));
    },
    loadCardCover: function(width,index,numberCard,isUser){
        this.is_current_avatar = false;
        // var scale = width/this.spriteCard.getContentSize().width;
        var scale = 1;
        this.spriteCard.setScale(scale);
        this.spriteCard.setPosition(this.getCardCoverPostion(index,this.background.getContentSize(),
                0));
        this.number.setString(cc.formatStr("%d",numberCard));
        this.number.setPosition(this.spriteCard.getPosition().x+this.spriteCard.getWidth()*scale/2-this.number.getWidth()/2,
            this.spriteCard.getPosition().y+this.spriteCard.getHeight()/2*scale-this.number.getHeight()/2);

        if (index == 0 && isUser){
            this.number.setPosition(cc.p(0, 0));
        }
    },
    getCardCoverPostion: function (index, avatarSize, cardSize){
        var pos;

        switch (index) {
            case 3:
                pos = cc.p(20 + avatarSize.width, avatarSize.height / 2 - cardSize.height / 2);
                break;
            case 2:
                pos = Vec2(20 + avatarSize.width, avatarSize.height / 2 - cardSize.height / 2);
                break;
            case 1:
                pos = Vec2(-20 - cardSize.width, avatarSize.height / 2 - cardSize.height / 2);
                break;
            case 0:
                pos = Vec2(20 + avatarSize.width, avatarSize.height / 2 - cardSize.height / 2);
                break;
            default:
                break;
        }

        return pos;
    },
    hideCardCover: function(){
        this.is_current_avatar = true;
        this.spriteCard.setVisible(false);
        this.number.setVisible(false);
    },
    setNumberCard: function(_numberCard) {
        if (_numberCard == 0) {
            this.number.setVisible(false);
            this.numberCard = _numberCard;
            this.number.setString(cc.formatStr("%d",_numberCard));
            this.number.setPositionX(this.spriteCard.getPosition().x+this.spriteCard.getWidth()*this.spriteCard.getScale()/2-this.number.getWidth()/2);
            this.spriteCard.setVisible(false);
        } else {
            this.numberCard = _numberCard;
            this.number.setString(cc.formatStr("%d",_numberCard));
            this.number.setPositionX(this.spriteCard.getPosition().x+this.spriteCard.getWidth()*this.spriteCard.getScale()/2-this.number.getWidth()/2);
            this.number.setVisible(true);
    
            if (!this.is_current_avatar){
                this.spriteCard.setVisible(true);
            }
            else {
                this.number.setPosition(Vec2(0, 0));
            }
        }
    },
    getPlayerId : function(){
        return player_id;
    }


});

var hiddenInfoExtend = function(thisObj){
    if (thisObj.getChildByTag(TAG_NODE_EMOTICON) != null){
        thisObj.removeChildByTag(TAG_NODE_EMOTICON);
    }
}