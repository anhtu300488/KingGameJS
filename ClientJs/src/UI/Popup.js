/**
 * Created by MyPC on 15/12/2016.
 */

var Popup = cc.Node.extend({
    background:null,
    backgroundPopup:null,
    // constructor
    ctor:function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();

        this.background = new cc.LayerColor(cc.Color(255,255,255,200),
            visibleSize.width,visibleSize.height);
        this.background.setOpacity(0);
        this.addChild(this.background);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true ,
            onTouchBegan: function(touch ,event) {
                return true;
            },
        },this.background);

        this.backgroundPopup = cc.Sprite.create(res.bg_popup);
        this.backgroundPopup.setPosition(cc.p(visibleSize.width/2,visibleSize.height/2));
        this.addChild(this.backgroundPopup);

        return true;
    },

    disappear:function () {
        var self = this;
        var callDisappear = cc.callFunc(function(){
            this.removeFromParentAndCleanup(true);
        },this);

        this.background.runAction(cc.sequence(cc.fadeTo(0.1, 0),cc.callFunc(function(){
            var move = cc.moveTo(0.15,cc.p(originX,originY - visibleSize.height/2));
            self.runAction(cc.sequence(move,callDisappear));
        })));

        return true;
    },

    appear:function () {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true ,
            onTouchBegan: function(touch ,event) {
                var target = event.getCurrentTarget();

                var locationInNode = target.convertToNodeSpace(touch.getLocation());

                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                //Check the click area
                if (!cc.rectContainsPoint(rect,locationInNode)){
                    self.disappear();
                    return true;
                }
                return false;
            },
        },this.backgroundPopup);

        this.runAction(cc.sequence(cc.moveTo(0.15,cc.p(originX,originY)),cc.callFunc(function(){
            this.background.runAction(cc.sequence(cc.fadeTo(0.1,200),cc.callFunc(function () {
                this.scheduleUpdate();
            },this)));
        },this)));
    }


});