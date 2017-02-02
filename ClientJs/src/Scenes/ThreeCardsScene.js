
var ThreeCardsLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.init();
    },

    init: function () {
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
        girl.setContentSize(girl.getContentSize() * girl.getScale());
        girl.setPosition(cc.p(bkgTable.getPosition().x + bkgTable.getWidth() / 2 - girl.getWidth() / 2,
            bkgTable.getPosition().y + bkgTable.getHeight() - girl.getHeight() * 3 / 8));
        this.addChild(girl);

        var btn_san_sang = MButton.create(res.BTN_CYAN, "Sẵn sàng", TAG.BACAY_SCENE.BTN_SANSANG);
        btn_san_sang.setScale(0.8);
        btn_san_sang.setPosition(cc.p(btn_message.getPosition().x - btn_san_sang.getWidth() - padding,
            btn_message.getPosition().y));

        btn_san_sang.addTouchEventListener(this.menuCallBack, this);
        btn_san_sang.setVisible(true);

        var btn_so_bai = MButton.create(res.BTN_YELLOW, "So bài", TAG.BACAY_SCENE.BTN_SOBAI);
        btn_so_bai.setPosition(cc.p(originX + visibleSize.width / 2 - btn_so_bai.getWidth()*0.5,
        btn_message.getPosition().y));
        btn_so_bai.addTouchEventListener(this.cardCallBack, this);
        btn_so_bai.setVisible(false);

        this.addChild(btn_san_sang);
        //this.addChild(btn_lat_bai);
        this.addChild(btn_so_bai,INDEX_CARD);

        var sprite_muccuoc = MSprite.create(res.sprite_somuccuoc);
        sprite_muccuoc.setAnchorPoint(ANCHOR_BOTTOM_RIGHT);

        var label_muccuoc = MLabel.create("", sprite_muccuoc.getHeight() * 0.5);
        label_muccuoc.setTag(TAG.BTN_LABEL_MUCCUOC);
        label_muccuoc.setAnchorPoint(ANCHOR_MIDDLE_BOTTOM);
        label_muccuoc.setPosition(cc.p(sprite_muccuoc.getWidth() / 2, sprite_muccuoc.getHeight()*0.375));
        sprite_muccuoc.addChild(label_muccuoc);
        sprite_muccuoc.setVisible(false);

        this.addChild(sprite_muccuoc,1);

        var btn_gopga = MButton.create(res.BTN_GOPGA,TAG.BTN_GOP_GA);
        btn_gopga.addTouchEventListener(this.menuCallBack, this);
        btn_gopga.setPosition(MVec2(width / 2 - btn_gopga.getWidth()/2, height/2 - btn_gopga.getHeight()/2));
        btn_gopga.setVisible(false);
        this.addChild(btn_gopga);

        var money_sprite = MSprite.create(res.sprite_hienthi3);
        money_sprite.setScale(bkgTable.getScale());
        money_sprite.setContentSize(money_sprite.getContentSize() * money_sprite.getScale());
        money_sprite.setPosition(cc.p(bkgTable.getPosition().x + bkgTable.getWidth() / 2 - money_sprite.getWidth() / 2,
            btn_gopga.getPosition().y + btn_gopga.getHeight() + 10));
        this.addChild(money_sprite);

        var txt_tien_ga = MLabel.create("", money_sprite.getHeight() * 0.5);
        // txt_tien_ga.setTextColor(cc.color.GRAY);
        txt_tien_ga.setPosition(cc.p(money_sprite.getWidth() / 2 - txt_tien_ga.getWidth() / 2,
            money_sprite.getHeight() / 2 - txt_tien_ga.getHeight() / 2));
        money_sprite.addChild(txt_tien_ga);

        var background_under =  cc.LayerColor.create(cc.color(0,0,0,200));
        background_under.setContentSize(visibleSize);
        background_under.setPosition(MVec2(0,0));
        background_under.setOpacity(0);
        this.addChild(background_under,INDEX_CARD-2);

        var nanbai_left = MSprite.create(res.nanbai_left);
        var nanbai_right = MSprite.create(res.nanbai_right);

        nanbai_left.setPosition(MVec2(-nanbai_left.getWidth(),height- nanbai_left.getHeight()*2.5));
        nanbai_right.setPosition(MVec2(width,height- nanbai_right.getHeight()*2.5));

        this.addChild(nanbai_left,INDEX_CARD-2);
        this.addChild(nanbai_right,INDEX_CARD-2);        

        return true;
    }
});

var ThreeCardsScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new ThreeCardsLayer();
        this.addChild(layer);
    }
});

