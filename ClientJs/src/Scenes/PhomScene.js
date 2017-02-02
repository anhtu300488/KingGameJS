
var PhomLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        var playLayer = new PlayLayer();
        this.addChild(playLayer);

        var bkgTable = MSprite.create(res.sprite_table);
        bkgTable.setScale(width*0.8/bkgTable.getWidth());
        bkgTable.setContentSize(cc.size(width*0.8, bkgTable.getHeight()*bkgTable.getScale()));
        bkgTable.setPosition(cc.p(origin.x+visibleSize.width/2-bkgTable.getWidth()/2,
            origin.y+visibleSize.height/2-bkgTable.getHeight()/2));
        this.addChild(bkgTable);

        var btnStartMatch = MButton.createExtends(res.BTN_CYAN, "Bắt đầu", 25, TAG.PHOM_SCENE.BTN_BATDAU);
        btnStartMatch.setPosition(MVec2(width/2 - btnStartMatch.getWidth()/2,padding));
        btnStartMatch.addTouchEventListener(this.menuCallBack, this);
        btnStartMatch.setVisible(false);

        var btnAnBai = MButton.createExtends(res.BTN_GREEN, "Ăn bài", 25, TAG.PHOM_SCENE.BTN_ANBAI);
        btnAnBai.setPosition(MVec2(width/2 - btnAnBai.getWidth()*2,padding));
        btnAnBai.addTouchEventListener(this.menuCallBack, this);
        var sprite_out_anbai = MSprite.create(res.btn_out_glow);
        sprite_out_anbai.setPosition(cc.p(btnAnBai.getWidth()/2 - sprite_out_anbai.getWidth()/2,
            btnAnBai.getHeight()/2 - sprite_out_anbai.getHeight()/2));
        btnAnBai.addChild(sprite_out_anbai);
        btnAnBai.setVisible(false);

        var btnDanhBai = MButton.createExtends(res.BTN_YELLOW, "Đánh bài", 25, TAG.PHOM_SCENE.BTN_DANHBAI);
        btnDanhBai.setPosition(cc.p(btnAnBai.getPositionX() + btnAnBai.getWidth() * 3,
            btnStartMatch.getPositionY()));
        btnDanhBai.addTouchEventListener(this.menuCallBack, this);

        var btnBocBai = MButton.createExtends(res.BTN_YELLOW, "Bốc bài", 25, TAG.PHOM_SCENE.BTN_BOCBAI);
        btnBocBai.setPosition(cc.p(btnDanhBai.getPositionX(), btnStartMatch.getPositionY()));
        btnBocBai.addTouchEventListener(this.menuCallBack, this);

        var btnGuiBai = MButton.createExtends(res.BTN_BLUE, "Gửi Bài", 25, TAG.PHOM_SCENE.BTN_GUIBAI);
        btnGuiBai.setPosition(cc.p(btnAnBai.getPositionX() + btnGuiBai.getWidth()*1.5,
        btnStartMatch.getPositionY()));
        btnGuiBai.addTouchEventListener(this.menuCallBack, this);

        var btnHaPhom = MButton.createExtends(res.BTN_GREEN, "Hạ Phỏm", 25, TAG.PHOM_SCENE.BTN_HAPHOM);
        btnHaPhom.setPosition(cc.p(btnAnBai.getPositionX(),
            btnStartMatch.getPositionY()));
        btnHaPhom.addTouchEventListener(this.menuCallBack, this);
        btnHaPhom.setPosition(cc.p(btnAnBai.getPositionX(),
            btnStartMatch.getPositionY()));
        var sprite_out_haphom = MSprite.create(res.btn_out_glow);
        sprite_out_haphom.setPosition(cc.p(btnHaPhom.getWidth()/2 - sprite_out_haphom.getWidth()/2,
            btnHaPhom.getHeight()/2 - sprite_out_haphom.getHeight()/2));
        btnHaPhom.addChild(sprite_out_haphom);
        btnHaPhom.setVisible(false);

        var btnU = MButton.createExtends(res.BTN_BLUE, "Ù", 25, TAG.PHOM_SCENE.BTN_U);
        btnU.setPosition(cc.p(btnHaPhom.getPositionX(), btnStartMatch.getPositionY()));
        var sprite_out_u = MSprite.create(res.btn_out_glow);
        sprite_out_u.setPosition(cc.p(btnU.getWidth()/2 - sprite_out_u.getWidth()/2,
            btnU.getHeight()/2 - sprite_out_u.getHeight()/2));
        btnU.addChild(sprite_out_u);
        btnU.addTouchEventListener(this.menuCallBack, this);
        btnU.setVisible(false);

        var btn_san_sang = MButton.createExtends(res.BTN_CYAN, "Sẵn sàng", 25, TAG.TLMN_BTN_SANSANG);
        btn_san_sang.setPosition(MVec2(width - btn_san_sang.getWidth() - padding,padding));
        btn_san_sang.addTouchEventListener(this.menuCallBack, this);
        //btn_san_sang->setVisible(false);

        this.addChild(btnStartMatch);
        //this->addChild(btnXepBai);
        this.addChild(btnDanhBai);
        this.addChild(btnBocBai);
        this.addChild(btnAnBai,INDEX_CARD+1);
        this.addChild(btnHaPhom,INDEX_CARD+1);
        this.addChild(btnGuiBai);
        this.addChild(btnU,INDEX_CARD+1);
        this.addChild(btn_san_sang);
        // this.disableAllCardButton();

        var centerCard = new cc.Node();

        // for(i = 0 ; i< 3; i++){
        //     var sprite = MSprite.createwithFrameName(res.card_cover);
        //     sprite.setScale(cardWidth()*0.8/sprite.getWidth());
        //     sprite.setPosition(cc.p(0,sprite.getHeight()*0.02*sprite.getScale()*(i-3)));
        //     centerCard.addChild(sprite);
        // }

        centerCard.setPosition(MVec2(width/2 -cardWidth()*0.4,height/2 - cardWidth()*CARD_RATIO*0.4));
        this.addChild(centerCard,1);
        centerCard.setVisible(false);

        var remainCard = MLabel.createIsBold("0", cardWidth()/2,true);
        remainCard.setPosition(MVec2(width/2-remainCard.getWidth()/2,height/2-remainCard.getHeight()/2));
        this.addChild(remainCard,1);
        remainCard.setVisible(false);

        return true;
    },
    initGame : function () {
        btnInvitePlay = 10;
    }

});

var PhomScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new PhomLayer();
        this.addChild(layer);
    }
});

var cardWidth = function(){
    return width/17;
}

