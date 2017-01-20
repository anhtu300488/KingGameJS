
var MauBinhLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var playLayer = new PlayLayer();
        this.addChild(playLayer);

        var bkgTable = MSprite.create(res.sprite_table);
        bkgTable.setScale(width*0.8 / bkgTable.getWidth());
        bkgTable.setContentSize(cc.size(width*0.8, bkgTable.getHeight()*bkgTable.getScale()));
        bkgTable.setPosition(cc.p(origin.x + visibleSize.width / 2 - bkgTable.getWidth() / 2,
            origin.y + visibleSize.height / 2 - bkgTable.getHeight() / 2));
        this.addChild(bkgTable);

        var spr_compare_turn = MSprite.create(res.bg_compare_turn);
        spr_compare_turn.setPosition(cc.p(btn_message.getPositionX() -
            spr_compare_turn.getWidth(), btn_message.getPositionY() +
            btn_message.getContentSize().height * 1.2));

        spr_compare_turn.setVisible(false);
        this.addChild(spr_compare_turn);

        var btn_san_sang = MButton.createExtends(res.BTN_CYAN, "Sẵn sàng", 25, TAG.MAUBINH_SCENE.BTN_SANSANG);
        btn_san_sang.setPosition(cc.p(btn_message.getPositionX() - btn_san_sang.getWidth(),
            btn_message.getPositionY()));

        btn_san_sang.addTouchEventListener(this.cardCallBack, this);
        btn_san_sang.setVisible(true);
        this.addChild(btn_san_sang);

        var btn_start_match = MButton.createExtends(res.BTN_CYAN, TXT_BTN_START_MATCH, 25, TAG.MAUBINH_SCENE.BTN_START_MATCH);
        btn_start_match.setPosition(cc.p(btn_message.getPositionX() - btn_start_match.getWidth() - BUTTON_PADDING,
            btn_message.getPositionY()));
        btn_start_match.setVisible(false);
        btn_start_match.addTouchEventListener(this.cardCallBack, this);

        //nut xep bai
        var btn_finish = MButton.createExtends(res.BTN_YELLOW, TXT_BTN_FINISH, 25, TAG.MAUBINH_SCENE.BTN_XONG);
        btn_finish.setPosition(cc.p(btn_message.getPositionX() - btn_finish.getWidth() - BUTTON_PADDING,
            btn_message.getPositionY()));
        btn_finish.setVisible(false);
        btn_finish.addTouchEventListener(this.cardCallBack, this);
        this.addChild(btn_start_match);
        this.addChild(btn_finish);

        var sprite_lung = MSprite.create(res.sprite_lung_maubinh);
        sprite_lung.setPosition(cc.p(originX + width/2 - sprite_lung.getWidth()/2,
            btn_message.getPositionY() + (width/12.5)*CARD_RATIO*(1*1.3+0.75) - sprite_lung.getHeight()/2));
        sprite_lung.setVisible(false);
        this.addChild(sprite_lung,CARD_UP+2);

        var label_lung = MLabel.createWithColor("LỦNG", btn_message.getContentSize().height, cc.color(255, 0, 0),true);
        // label_lung.enableOutline(cc.color(0,0,0,200),4);
        label_lung.setOpacity(200);
        label_lung.setPosition(cc.p(originX + width/2 - label_lung.getWidth() / 2,
            btn_message.getPositionY() + (width/12.5)*CARD_RATIO*(1*1.3+0.75) - label_lung.getHeight()/2));
        label_lung.setVisible(false);
        this.addChild(label_lung,CARD_UP+2);
        var label_turn = [];
        for(i =0; i< 3;i++){
            label_turn[i] = MLabel.createWithColor("", btn_message.getContentSize().height / 2.2,cc.color.YELLOW,true);
            // label_turn[i].enableOutline(cc.color(0,0,0,200),2);
            this.addChild(label_turn[i]);
            label_turn[i].setVisible(false);
        }

        return true;
    }

});

var MauBinhScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MauBinhLayer();
        this.addChild(layer);
    }
});

