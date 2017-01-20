
var LiengLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var playLayer = new PlayLayer();
        this.addChild(playLayer);

        var bkgTable = MSprite.create(res.ba_cay_table);
        bkgTable.setScale(width*0.75 / bkgTable.getWidth());
        bkgTable.setContentSize(cc.size(width*0.75, bkgTable.getHeight()*bkgTable.getScale()));
        bkgTable.setPosition(cc.p(origin.x + visibleSize.width / 2 - bkgTable.getWidth() / 2,
            origin.y + visibleSize.height / 2 - bkgTable.getHeight() / 2));
        this.addChild(bkgTable);

        var girl = MSprite.create(res.ba_cay_girl);
        girl.setScale(bkgTable.getScale());
        girl.setContentSize(cc.size(girl.getWidth() * girl.getScale(), girl.getHeight() * girl.getScale()));
        girl.setPosition(cc.p(bkgTable.getPositionX() + bkgTable.getWidth() / 2 - girl.getWidth() / 2,
            bkgTable.getPositionY() + bkgTable.getHeight() - girl.getHeight() * 3 / 8));
        this.addChild(girl);

        return true;
    }

});

var LiengScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LiengLayer();
        this.addChild(layer);
    }
});

