
var TLMienNamLayer = cc.Layer.extend({
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

        var bkgTable = MSprite.create(res.sprite_table);
        bkgTable.setScale(width*0.8/bkgTable.getWidth());
        bkgTable.setContentSize(cc.size(width*0.8, bkgTable.getHeight()*bkgTable.getScale()));
        bkgTable.setPosition(cc.p(origin.x+visibleSize.width/2-bkgTable.getWidth()/2,
            origin.y+visibleSize.height/2-bkgTable.getHeight()/2));

        //================ play game button

        var menu_click = false;

        var btn_danh_bai = MButton.create(res.BTN_GREEN,"Đánh bài", TAG.TLMN_BTN_DANHBAI);
        btn_danh_bai.setPosition(cc.p(origin.x+width*0.5+btn_danh_bai.getWidth()*1.5,origin.y+padding/2));
        btn_danh_bai.addTouchEventListener(this.cardCallBack,this);
        btn_danh_bai.setVisible(false);

        var btn_start_match = MButton.create(res.BTN_CYAN, "Bắt đầu", TAG.TLMN_START_MATCH);
        btn_start_match.setPosition(cc.p(origin.x + width*0.5 - btn_start_match.getWidth()/2,
        btn_danh_bai.getPosition().y));
        btn_start_match.addTouchEventListener(this.menuCallBack, this);
        // btn_start_match.setVisible(is_create_room && player_list.size() >= 2);

        var btn_bo_luot = MButton.create(res.BTN_YELLOW, "Bỏ lượt", TAG.TLMN_BTN_BOLUOT);
        btn_bo_luot.setPosition(cc.p(origin.x+width*0.5-btn_bo_luot.getWidth()*2.5,
        btn_danh_bai.getPosition().y));
        btn_bo_luot.addTouchEventListener(this.cardCallBack, this);
        btn_bo_luot.setVisible(false);

        var btn_san_sang = MButton.create(res.BTN_CYAN, "Sẵn sàng", TAG.TLMN_BTN_SANSANG);
        btn_san_sang.setPosition(cc.p(originX + width - btn_san_sang.getWidth() - padding/2,
            btn_message.getPosition().y));
        btn_san_sang.addTouchEventListener(this.menuCallBack, this);

        //change rule
        var btn_doi_luat = MButton.create(res.BTN_CYAN, "Đổi luật", TAG.TLMN_BTN_DOILUAT);
        btn_doi_luat.setVisible(false);
        btn_doi_luat.setPosition(cc.p(btn_danh_bai.getPosition().x,
            btn_danh_bai.getPosition().y));
        btn_doi_luat.addTouchEventListener(this.menuCallBack, this);

        var lb_luatchoi = MLabel.create("", btn_doi_luat.getHeight()/3.2, true);
        lb_luatchoi.setAnchorPoint(ANCHOR_MIDDLE);
        lb_luatchoi.setOpacity(100);
        // lb_luatchoi.setWidth(bkgTable.getWidth()/2);
        lb_luatchoi.setHorizontalAlignment(cc.TEXT_ALIGNMENT_CENTER);
        lb_luatchoi.setPosition(cc.p(bkgTable.getPosition().x + bkgTable.getWidth() / 2
            , bkgTable.getPosition().y + 0.72 * bkgTable.getHeight()));
        //end

        this.addChild(bkgTable);
        this.addChild(btn_danh_bai);
        this.addChild(btn_bo_luot);
        this.addChild(btn_start_match);
        this.addChild(btn_san_sang);
        this.addChild(btn_doi_luat);
        this.addChild(lb_luatchoi);

        return true;

    }
});

var TLMienNamScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new TLMienNamLayer();
        this.addChild(layer);
    }
});

