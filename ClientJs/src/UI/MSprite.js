/**
 * Created by MyPC on 13/12/2016.
 */

var MSprite = cc.Sprite.extend({

    ctor: function () {
        this._super();
    },
    getWidth: function () {
        return this.getContentSize().width;
    },
    getHeight: function () {
        return this.getContentSize().height;
    }
});

MSprite.create = function(textureName){
    var sprite = new MSprite();
    sprite.setTexture(textureName);
    sprite.setAnchorPoint(cc.p(0,0));

    return sprite;
}

MSprite.createWithSize = function(textureName,size){
    var sprite = new MSprite();
    sprite.setTexture(textureName);
    sprite.setAnchorPoint(cc.p(0,0));
    sprite.setScaleX(size.width/sprite.getWidth());
    sprite.setScaleY(size.height/sprite.getHeight());

    return sprite;
}

MSprite.createwithFrameName= function(textureName) {
    var sprite = new MSprite();
    sprite.setAnchorPoint(cc.p(0,0));
    sprite.setSpriteFrame(textureName);
    return sprite;
}
