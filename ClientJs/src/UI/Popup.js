/**
 * Created by MyPC on 15/12/2016.
 */

var PopupLayer = cc.LayerColor.extend({
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super(cc.color(0, 0, 0, 180));

        var winSize = cc.director.getWinSize();

        var origin = cc.director.getVisibleOrigin();

        var m_popupLayer = new cc.Layer();
        m_popupLayer.setPosition(cc.p(origin.x,origin.y - winSize.height));
        this.addChild(m_popupLayer);

    }
});