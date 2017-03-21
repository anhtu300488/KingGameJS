var OtherCardSprite = cc.Sprite.extend({

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


OtherCardSprite.createCardCover = function(width) {
    var cardSprite = new OtherCardSprite();
    // cardSprite.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame("#card_cover.png"));
    cardSprite.setSpriteFrame(res.ICON_CHOINGAY);
    cardSprite.setAnchorPoint(Vec2(0,0));
    cardSprite.setScale(width/cardSprite.getWidth());
    cardSprite.setContentSize(cc.size(width,width*CARD_RATIO));
    // cardSprite.addHidden();
    return cardSprite;
}

OtherCardSprite.addHidden = function() {
    var hidden = MSprite.createWithSpriteFrameName(cc.spriteFrameCache.getSpriteFrame("#card_hidden.png"));
    hidden.setTag(CARD_HIDDEN);
    hidden.setColor(cc.color.BLACK);
    hidden.setOpacity(100);
    hidden.setAnchorPoint(ZERO);
    this.addChild(hidden);
    hidden.setVisible(false);
}