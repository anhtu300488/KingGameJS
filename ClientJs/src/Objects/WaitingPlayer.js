/**
 * Created by MyPC on 08/02/2017.
 */
var avatar = new cc.Sprite();
var name;
var WaitingPlayer = cc.Layer.extend({

    ctor: function () {
        this._super();
        this.init();
    },
    setAvatar: function(playerName, index){
        var avatar_id = index;
        if (index < 100000){
            avatar_id = 0;
        }
        avatar.setTexture(cc.formatStr("res/avatar%d.png", avatar_id));
        name.setString(playerName);
    },
    getAvatar: function(){
        return avatar;
    },
    setPositionAvatar: function(origin, position){
        avatar.setPosition(cc.p(origin.x + position, origin.y + 5));
        name.setPosition(cc.p(avatar.getPosition().x + avatar.getWidth()*0.5 / 2-name.getWidth()/2,
        avatar.getPosition().y+avatar.getHeight()*0.5 + 5));
    },
    init: function () {
        this.setAnchorPoint(cc.p(0,0));

        var avatar = MSprite.create("res/avatar0.png");
        avatar.setScale(0.5);
        avatar.setContentSize(avatar.getContentSize()*0.5);
        this.addChild(avatar);

        var name = MLabel.create("z", avatar.getHeight()/5);
        name.setAlignment(cc.TEXT_ALIGNMENT_CENTER);
        this.addChild(name);

        return true;
    }
});
