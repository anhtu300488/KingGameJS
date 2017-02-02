var _lstResult;
var _betsRatio;

var SocdiaLayer = cc.Layer.extend({
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        this.init();
    },
    init: function () {
        this._super();

        layoutInit(this);

        return true;
    }
});

var SocdiaScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new SocdiaLayer();
        this.addChild(layer);
    }
});

var layoutInit = function(thisObj) {

    var playLayer = new PlayLayer();
    thisObj.addChild(playLayer);
    // PlayScene::initMenu();
    //
    // setBetRatio(1);
    // auto common = Common::getInstance();
    var _totalMoney = is_vip_room ? getCash() : getGold();

    var _canBet = false;
    var padding = 15;
    var formatText = "%d:%d";
    var tag_chip = [TAG.XOCDIA_SCENE.BTN_X1, TAG.XOCDIA_SCENE.BTN_X5, TAG.XOCDIA_SCENE.BTN_X25, TAG.XOCDIA_SCENE.BTN_X50] ;

    var bkgTable = MSprite.create("res/ba_cay/ba_cay_table.png");
    bkgTable.setScale(width*0.85 / bkgTable.getWidth());
    bkgTable.setContentSize(cc.size(width*0.85, bkgTable.getHeight()*bkgTable.getScale()));
    bkgTable.setPosition(cc.p(origin.x + visibleSize.width / 2 - bkgTable.getWidth() / 2,
        origin.y + visibleSize.height / 2 - bkgTable.getHeight() / 2));
    thisObj.addChild(bkgTable);

    var girl = MSprite.create("res/ba_cay/ba_cay_girl.png");
    girl.setAnchorPoint(cc.p(0.5,0.5));
    girl.setScale(bkgTable.getScale());
    girl.setPosition(cc.p(bkgTable.getPosition().x + bkgTable.getWidth() / 2,
        bkgTable.getPosition().y + bkgTable.getHeight() - girl.getHeight() * 3 / 8 + girl.getHeight()/2));
    thisObj.addChild(girl);

    var _btnXinlamcai = MButton.create(res.XOCDIA_BTN_XINCAI, TXT_XOCDIA_XINCAI, TAG.XOCDIA_SCENE.BTN_XINCAI);
    _btnXinlamcai.setAnchorPoint(cc.p(0.5,0));
    _btnXinlamcai.setPosition(cc.p(originX + width / 2,
        bkgTable.getPosition().y + bkgTable.getHeight() - girl.getHeight() * 3 / 8));
    _btnXinlamcai.setTitleFontSize(_btnXinlamcai.getHeight() / 2);
    _btnXinlamcai.addTouchEventListener(thisObj.menuCallBack, thisObj);
    thisObj.addChild(_btnXinlamcai);

    var _btnHuylamcai = MButton.create(res.XOCDIA_BTN_XINCAI, TXT_XOCDIA_HUYCAI, TAG.XOCDIA_SCENE.BTN_HUYCAI);
    _btnHuylamcai.setAnchorPoint(cc.p(0.5,0));
    _btnHuylamcai.setPosition(_btnXinlamcai.getPosition());
    _btnHuylamcai.setTitleFontSize(_btnHuylamcai.getHeight() / 2);
    _btnHuylamcai.addTouchEventListener(thisObj.menuCallBack, thisObj);
    thisObj.addChild(_btnHuylamcai);
    _btnHuylamcai.setVisible(false);

    var sizeText = _btnXinlamcai.getHeight() / 2;

    var _btnCua4Trang = MButton.create(res.XOCDIA_BTN_KHUNGCUOC, TAG.XOCDIA_SCENE.CUA_4_TRANG);

    var _btnCuaChan = MButton.create(res.XOCDIA_BTN_CUOC, TAG.XOCDIA_SCENE.CUA_CHAN);
    _btnCuaChan.setPosition(MVec2(width / 2 - _btnCuaChan.getWidth(), height / 2 - _btnCua4Trang.getHeight() / 8));
    _btnCuaChan.addTouchEventListener(thisObj.betCallback, thisObj);

    var _cuaChantotalBet = MLabel.create("0", sizeText);
    _cuaChantotalBet.setAnchorPoint(cc.p(0.5,1));
    _cuaChantotalBet.setPosition(cc.p(_btnCuaChan.getPosition().x + _btnCuaChan.getContentSize().width / 2,
        _btnCuaChan.getPosition().y + _btnCuaChan.getContentSize().height));

    var _cuaChanPlayBet = MLabel.create("0", sizeText, cc.color.YELLOW);
    _cuaChanPlayBet.setAnchorPoint(cc.p(0.5,0));
    _cuaChanPlayBet.setPosition(cc.p(_btnCuaChan.getPositionX() + _btnCuaChan.getContentSize().width / 2,
        _btnCuaChan.getPositionY()));

    var _btnCuaLe = MButton.create(res.XOCDIA_BTN_CUOC, TAG.XOCDIA_SCENE.CUA_LE);
    _btnCuaLe.setPosition(MVec2(width / 2 + _btnCuaLe.getWidth(), height / 2 - _btnCua4Trang.getHeight() / 8));
    _btnCuaLe.setFlippedX(true);
    _btnCuaLe.addTouchEventListener(thisObj.betCallback, thisObj);

    var _cuaLeTotalBet = MLabel.create("0", sizeText);
    _cuaLeTotalBet.setAnchorPoint(cc.p(0.5,1));
    _cuaLeTotalBet.setPosition(cc.p(_btnCuaLe.getPositionX() - _btnCuaLe.getContentSize().width / 2,
        _btnCuaLe.getPositionY() + _btnCuaLe.getContentSize().height));

    var _cuaLePlayBet = MLabel.create("0", sizeText, cc.color.YELLOW);
    _cuaLePlayBet.setAnchorPoint(cc.p(0.5,0));
    _cuaLePlayBet.setPosition(cc.p(_btnCuaLe.getPositionX() - _btnCuaLe.getContentSize().width / 2,
        _btnCuaLe.getPositionY()));

    var dia = MSprite.create(res.XOCDIA_DIA);
    dia.setPosition(MVec2(width / 2, height / 2 - _btnCua4Trang.getHeight() / 8));
    dia.setAnchorPoint(cc.p(0.5,0));

    var bat = MSprite.create(res.XOCDIA_BAT);
    bat.setAnchorPoint(cc.p(0.5,0.5));
    bat.setPosition(cc.p(dia.getPosition().x, dia.getPosition().y + dia.getContentSize().height / 2));
    batPos = bat.getPosition();

    var firstchip = MSprite.create(res.XOCDIA_SPRITE_DO);
    firstchip.setPosition(cc.p(dia.getPosition().x - firstchip.getHeight(),
        dia.getPosition().y + dia.getContentSize().height * 0.5 + firstchip.getHeight()));
    // _lstResult.push_back(firstchip);

    var secondchip = MSprite.create(res.XOCDIA_SPRITE_DO);
    secondchip.setPosition(cc.p(dia.getPosition().x + firstchip.getHeight(),
        dia.getPosition().y + dia.getContentSize().height * 0.5 + firstchip.getHeight()));
    // _lstResult.push_back(secondchip);

    var thirdchip = MSprite.create(res.XOCDIA_SPRITE_DO);
    thirdchip.setPosition(cc.p(dia.getPosition().x - firstchip.getHeight(),
        dia.getPosition().y + dia.getContentSize().height * 0.5 - firstchip.getHeight()));
    // _lstResult.push_back(thirdchip);

    var fourthchip = MSprite.create(res.XOCDIA_SPRITE_DO);
    fourthchip.setPosition(cc.p(dia.getPosition().x + firstchip.getHeight(),
        dia.getPosition().y + dia.getContentSize().height * 0.5 - firstchip.getHeight()));
    // _lstResult.push_back(fourthchip);

    var sizeBtnCuoc = (_btnCuaChan.getWidth() * 2 - 3 * padding) / 4;

    _btnCua4Trang.setScaleX(sizeBtnCuoc / _btnCua4Trang.getWidth());
    _btnCua4Trang.setPosition(cc.p(_btnCuaChan.getPosition().x,
        originY + height / 2 - 5.0 * _btnCua4Trang.getHeight() / 4));
    _btnCua4Trang.addTouchEventListener(thisObj.betCallback, thisObj);

    var _cua4TrangTotalBet = MLabel.create("0", sizeText);
    _cua4TrangTotalBet.setAnchorPoint(cc.p(0.5,1));
    _cua4TrangTotalBet.setPosition(cc.p(_btnCua4Trang.getPositionX() + _btnCua4Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua4Trang.getPositionY() + _btnCua4Trang.getContentSize().height));

    var _cua4TrangPlayBet = MLabel.create("0", sizeText, cc.color.YELLOW);
    _cua4TrangPlayBet.setAnchorPoint(cc.p(0.5,0));
    _cua4TrangPlayBet.setPosition(_btnCua4Trang.getPositionX() + _btnCua4Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua4Trang.getPositionY());

    var _btnCua0Trang = MButton.create(res.XOCDIA_BTN_KHUNGCUOC, TAG.XOCDIA_SCENE.CUA_0_TRANG);
    _btnCua0Trang.setScaleX(_btnCua4Trang.getScaleX());
    _btnCua0Trang.setPosition(cc.p(_btnCua4Trang.getPosition().x + sizeBtnCuoc + padding,
        _btnCua4Trang.getPosition().y));
    _btnCua0Trang.addTouchEventListener(thisObj.betCallback, thisObj);

    var _cua0TrangTotalBet = MLabel.create("0", sizeText);
    _cua0TrangTotalBet.setAnchorPoint(cc.p(0.5,1));
    _cua0TrangTotalBet.setPosition(cc.p(_btnCua0Trang.getPositionX() + _btnCua0Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua0Trang.getPositionY() + _btnCua0Trang.getContentSize().height));

    var _cua0TrangPlayBet = MLabel.create("0", sizeText, cc.color.YELLOW);
    _cua0TrangPlayBet.setAnchorPoint(cc.p(0.5,0));
    _cua0TrangPlayBet.setPosition(_btnCua0Trang.getPositionX() + _btnCua0Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua0Trang.getPositionY());

    var _btnCua1Trang = MButton.create(res.XOCDIA_BTN_KHUNGCUOC, TAG.XOCDIA_SCENE.CUA_1_TRANG);
    _btnCua1Trang.setScaleX(_btnCua4Trang.getScaleX());
    _btnCua1Trang.setPosition(cc.p(_btnCua0Trang.getPosition().x + sizeBtnCuoc + padding,
        _btnCua4Trang.getPosition().y));
    _btnCua1Trang.addTouchEventListener(thisObj.betCallback, thisObj);

    var _cua1TrangTotalBet = MLabel.create("0", sizeText);
    _cua1TrangTotalBet.setAnchorPoint(cc.p(0.5,1));
    _cua1TrangTotalBet.setPosition(cc.p(_btnCua1Trang.getPositionX() + _btnCua1Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua1Trang.getPositionY() + _btnCua1Trang.getContentSize().height));

    var _cua1TrangPlayBet = MLabel.create("0", sizeText, cc.color.YELLOW);
    _cua1TrangPlayBet.setAnchorPoint(cc.p(0.5,0));
    _cua1TrangPlayBet.setPosition(cc.p(_btnCua1Trang.getPositionX() + _btnCua1Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua1Trang.getPositionY()));

    var _btnCua3Trang = MButton.create(res.XOCDIA_BTN_KHUNGCUOC, TAG.XOCDIA_SCENE.CUA_3_TRANG);
    _btnCua3Trang.setScaleX(_btnCua4Trang.getScaleX());
    _btnCua3Trang.setPosition(cc.p(_btnCua1Trang.getPosition().x + sizeBtnCuoc + padding,
        _btnCua4Trang.getPosition().y));
    _btnCua3Trang.addTouchEventListener(thisObj.betCallback, thisObj);

    var _cua3TrangTotalBet = MLabel.create("0", sizeText);
    _cua3TrangTotalBet.setAnchorPoint(cc.p(0.5,1));
    _cua3TrangTotalBet.setPosition(cc.p(_btnCua3Trang.getPositionX() + _btnCua3Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua3Trang.getPositionY() + _btnCua3Trang.getContentSize().height));

    var _cua3TrangPlayBet = MLabel.create("0", sizeText, cc.color.YELLOW);
    _cua3TrangPlayBet.setAnchorPoint(cc.p(0.5,0));
    _cua3TrangPlayBet.setPosition(cc.p(_btnCua3Trang.getPositionX() + _btnCua3Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua3Trang.getPositionY()));

    var _labelCuaChan = MLabel.create(XOCDIA_TEXT_CHAN, _btnCuaChan.getHeight() / 3, cc.color.WHITE);
    _labelCuaChan.setAnchorPoint(ANCHOR_MIDDLE);
    _labelCuaChan.setPosition(cc.p(_btnCuaChan.getPosition().x + _btnCuaChan.getWidth() / 2,
        _btnCuaChan.getPosition().y + _btnCuaChan.getHeight() / 2));

    var _labelCuaLe = MLabel.create(XOCDIA_TEXT_LE, _btnCuaLe.getHeight() / 3, cc.color.WHITE);
    _labelCuaLe.setAnchorPoint(ANCHOR_MIDDLE);
    _labelCuaLe.setPosition(cc.p(_btnCuaLe.getPosition().x - _btnCuaLe.getWidth() / 2,
        _btnCuaLe.getPosition().y + _btnCuaLe.getHeight() / 2));

    var _labelCua4Trang = MLabel.create(cc.formatStr(formatText, 1, getTypeBetRatio(0)),
        _btnCua4Trang.getHeight() / 4, cc.color.WHITE);
    _labelCua4Trang.setAnchorPoint(ANCHOR_MIDDLE);
    _labelCua4Trang.setPosition(cc.p(_btnCua4Trang.getPosition().x + _btnCua4Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua4Trang.getPosition().y + _btnCua4Trang.getHeight() / 2));

    var _labelCua0Trang = MLabel.create(cc.formatStr(formatText, 1, getTypeBetRatio(4)),
        _btnCua0Trang.getHeight() / 4, cc.color.WHITE);
    _labelCua0Trang.setAnchorPoint(ANCHOR_MIDDLE);
    _labelCua0Trang.setPosition(cc.p(_btnCua0Trang.getPosition().x + _btnCua0Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua0Trang.getPosition().y + _btnCua0Trang.getHeight() / 2));

    var _labelCua3Trang = MLabel.create(cc.formatStr(formatText, 1, getTypeBetRatio(1)),
        _btnCua3Trang.getHeight() / 4, cc.color.WHITE);
    _labelCua3Trang.setAnchorPoint(ANCHOR_MIDDLE);
    _labelCua3Trang.setPosition(cc.p(_btnCua3Trang.getPosition().x + _btnCua3Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua3Trang.getPosition().y + _btnCua3Trang.getHeight() / 2));

    var _labelCua1Trang = MLabel.create(cc.formatStr(formatText, 1, getTypeBetRatio(3)),
        _btnCua1Trang.getHeight() / 4, cc.color.WHITE);
    _labelCua1Trang.setAnchorPoint(ANCHOR_MIDDLE);
    _labelCua1Trang.setPosition(cc.p(_btnCua1Trang.getPosition().x + _btnCua1Trang.getWidth() * _btnCua4Trang.getScaleX() / 2,
        _btnCua1Trang.getPosition().y + _btnCua1Trang.getHeight() / 2));

    var bg4Trang = MSprite.create(res.XOCDIA_BG_4TRANG);
    bg4Trang.setPosition(cc.p(_btnCua4Trang.getPosition().x - bg4Trang.getWidth() / 2,
        _btnCua4Trang.getPosition().y + _btnCua4Trang.getHeight() / 2 - bg4Trang.getHeight() / 2));

    var bg3Trang = MSprite.create(res.XOCDIA_BG_3TRANG);
    bg3Trang.setPosition(cc.p(_btnCua3Trang.getPosition().x - bg3Trang.getWidth() / 2,
        _btnCua3Trang.getPosition().y + _btnCua3Trang.getHeight() / 2 - bg3Trang.getHeight() / 2));

    var bg1Trang = MSprite.create(res.XOCDIA_BG_1TRANG);
    bg1Trang.setPosition(cc.p(_btnCua1Trang.getPosition().x - bg1Trang.getWidth() / 2,
        _btnCua1Trang.getPosition().y + _btnCua1Trang.getHeight() / 2 - bg1Trang.getHeight() / 2));

    var bg0Trang = MSprite.create(res.XOCDIA_BG_0TRANG);
    bg0Trang.setPosition(cc.p(_btnCua0Trang.getPosition().x - bg0Trang.getWidth() / 2,
        _btnCua0Trang.getPosition().y + _btnCua0Trang.getHeight() / 2 - bg0Trang.getHeight() / 2));

    var _btnGapDoi = MButton.create(res.BTN_GREEN, "Gấp Đôi", TAG.XOCDIA_SCENE.BTN_GAPDOI);
    _btnGapDoi.setScale(0.9);
    _btnGapDoi.setPosition(cc.p(btn_message.getPosition().x - _btnGapDoi.getWidth()*0.9 - padding,
    btn_message.getPosition().y + btn_message.getContentSize().height - _btnGapDoi.getHeight()*0.9));
    _btnGapDoi.addTouchEventListener(thisObj.extraBetCallback, thisObj);

    var _btnDatlai = MButton.create(res.BTN_CYAN, "Đặt Lại", TAG.XOCDIA_SCENE.BTN_DATLAI);
    _btnDatlai.setScale(0.9);
    _btnDatlai.setPosition(cc.p(_btnGapDoi.getPosition().x - _btnDatlai.getWidth()*0.9 - padding,
    _btnGapDoi.getPosition().y));
    _btnDatlai.addTouchEventListener(thisObj.extraBetCallback, thisObj);

    var _btnHuyCuoc = MButton.create(res.BTN_CYAN, "Huỷ Cược", TAG.XOCDIA_SCENE.BTN_HUYCUOC);
    _btnHuyCuoc.setScale(0.9);
    _btnHuyCuoc.setPosition(cc.p(_btnDatlai.getPosition().x - _btnHuyCuoc.getWidth()*0.9 - padding,
    _btnGapDoi.getPosition().y));
    _btnHuyCuoc.addTouchEventListener(thisObj.extraBetCallback, thisObj);

    //chip
    var bg_chip = MSprite.create(res.XOCDIA_DATCHIP);
    bg_chip.setPosition(cc.p(originX + width / 2, _btnDatlai.getPosition().y + _btnDatlai.getHeight() + 10));

    var _btnX1 = MButton.create(res.XOCDIA_CHIP1, TAG.XOCDIA_SCENE.BTN_X1);
    _btnX1.setAnchorPoint(ANCHOR_MIDDLE);
    _btnX1.setPosition(cc.p(bg_chip.getWidth() / 8, bg_chip.getHeight()/2));
    _btnX1.addTouchEventListener(thisObj.chipCallBack, thisObj);

    var _btnX5 = MButton.create(res.XOCDIA_CHIP5, TAG.XOCDIA_SCENE.BTN_X5);
    _btnX5.setAnchorPoint(ANCHOR_MIDDLE);
    _btnX5.setPosition(cc.p(3 * bg_chip.getWidth() / 8, bg_chip.getHeight() / 2));
    _btnX5.addTouchEventListener(thisObj.chipCallBack, thisObj);

    var _btnX25 = MButton.create(res.XOCDIA_CHIP25, TAG.XOCDIA_SCENE.BTN_X25);
    _btnX25.setAnchorPoint(ANCHOR_MIDDLE);
    _btnX25.setPosition(cc.p(5 * bg_chip.getWidth() / 8, bg_chip.getHeight() / 2));
    _btnX25.addTouchEventListener(thisObj.chipCallBack, thisObj);

    var _btnX50 = MButton.create(res.XOCDIA_CHIP50, TAG.XOCDIA_SCENE.BTN_X50);
    _btnX50.setAnchorPoint(ANCHOR_MIDDLE);
    _btnX50.setPosition(cc.p(7 * bg_chip.getWidth() / 8, bg_chip.getHeight() / 2));
    _btnX50.addTouchEventListener(thisObj.chipCallBack, thisObj);
    //end chip

    //so nguoi choi
    var bg_songuoixem = MButton.create(res.IC_SONGUOIXEM, TAG.XOCDIA_SCENE.OUTSITE_PLAYER);
    bg_songuoixem.setPosition(cc.p(btn_caidat.getPosition().x, btn_caidat.getPosition().y - bg_songuoixem.getHeight() - 5));
    bg_songuoixem.addTouchEventListener(thisObj.menuCallBack, thisObj);
    thisObj.addChild(bg_songuoixem);

    var ic_songuoixem = MSprite.create(res.BG_SONGUOIXEM);
    ic_songuoixem.setPosition(cc.p(bg_songuoixem.getPosition().x - ic_songuoixem.getWidth() / 2,
        bg_songuoixem.getPosition().y + bg_songuoixem.getHeight() - ic_songuoixem.getHeight()));
    thisObj.addChild(ic_songuoixem);

    var numberPlayerOutsite = MLabel.create("0", ic_songuoixem.getHeight()/2, cc.color.WHITE);
    numberPlayerOutsite.setAnchorPoint(ANCHOR_MIDDLE);
    numberPlayerOutsite.setPosition(cc.p(ic_songuoixem.getWidth() / 2, ic_songuoixem.getHeight()/2));
    ic_songuoixem.addChild(numberPlayerOutsite);


    var timerCountDown = MLabel.createBMFont("taixiu_countdown.fnt",0);//MLabel::createClockCountDown(0,sprite_clock.getWidth()/2.5f);
    timerCountDown.setAnchorPoint(cc.p(0.5,0.45));
    timerCountDown.setPosition(bat.getWidth()/2,bat.getHeight()*0.6*0.85);
    //timerCountDown.enableOutline(Color4B::BLACK,2);
    bat.addChild(timerCountDown);

    timerCountDown.setScale(0.7);
    timerCountDown.setContentSize(timerCountDown.getContentSize()*0.7);
    timerCountDown.setOpacity(0);
    //sprite_clock.setOpacity(0);

    // //circle round countDown
    // var circleBarXocDia = MCircleBar::createWithPer(0, 0);
    // circleBarXocDia.setPosition(cc.p(bat.getWidth()/2 + circleBarXocDia.getContentSize().width/2,
    //     bat.getHeight()/2));
    // bat.addChild(circleBarXocDia);

    //end so nguoi choi

    //thong ke chan le
    var bg_total_chanle = MSprite.create(res.XOCDIA_TOTAL_CHANLE);
    bg_total_chanle.setPosition(MVec2(5,5));

    var bg_thongke_chanle = MSprite.create(res.XOCDIA_THONGKE_CHANLE);
    bg_thongke_chanle.setPosition(cc.p(bg_total_chanle.getPosition().x + bg_total_chanle.getWidth(), originY + 5));

    var lb_chan = MLabel.create("Chẵn", bg_total_chanle.getHeight()/6, cc.color.RED, true);
    lb_chan.setAnchorPoint(ANCHOR_MIDDLE_BOTTOM);
    lb_chan.setPosition(cc.p(bg_total_chanle.getWidth() / 2, 3 * bg_total_chanle.getHeight() / 4 + 1));

    var lb_le = MLabel.create("Lẻ", bg_total_chanle.getHeight() / 6, cc.color.WHITE, true);
    lb_le.setAnchorPoint(ANCHOR_MIDDLE_BOTTOM);
    lb_le.setPosition(cc.p(bg_total_chanle.getWidth() / 2, bg_total_chanle.getHeight() / 4 + 1));

    var lb_value_chan = MLabel.create("0", bg_total_chanle.getHeight() / 6, cc.color.RED, true);
    lb_value_chan.setAnchorPoint(ANCHOR_MIDDLE_TOP);
    lb_value_chan.setPosition(cc.p(bg_total_chanle.getWidth() / 2, 3 * bg_total_chanle.getHeight() / 4 - 1));

    var lb_value_le = MLabel.create("0", bg_total_chanle.getHeight() / 6, cc.color.WHITE, true);
    lb_value_le.setAnchorPoint(ANCHOR_MIDDLE_TOP);
    lb_value_le.setPosition(cc.p(bg_total_chanle.getWidth() / 2, bg_total_chanle.getHeight() / 4 - 1));

    bg_total_chanle.addChild(lb_chan);
    bg_total_chanle.addChild(lb_le);
    bg_total_chanle.addChild(lb_value_chan);
    bg_total_chanle.addChild(lb_value_le);

    var btn_san_sang = MButton.create(res.BTN_CYAN, "Sẵn sàng", TAG.BTN_SANSANG);
    btn_san_sang.setPosition(cc.p(origin.x + width - btn_san_sang.getWidth() - padding,
        btn_message.getPosition().y));
    btn_san_sang.addTouchEventListener(thisObj.menuCallBack, thisObj);

    //end thong ke chan le

    thisObj.addChild(bg_total_chanle);
    thisObj.addChild(bg_thongke_chanle);

    thisObj.addChild(_btnCuaChan);
    thisObj.addChild(_btnCuaLe);
    thisObj.addChild(_btnCua0Trang);
    thisObj.addChild(_btnCua1Trang);
    thisObj.addChild(_btnCua3Trang);
    thisObj.addChild(_btnCua4Trang);
    thisObj.addChild(_cuaChantotalBet);
    thisObj.addChild(_cuaChanPlayBet);
    thisObj.addChild(_cuaLeTotalBet);
    thisObj.addChild(_cuaLePlayBet);
    thisObj.addChild(_cua0TrangTotalBet);
    thisObj.addChild(_cua0TrangPlayBet);
    thisObj.addChild(_cua1TrangTotalBet);
    thisObj.addChild(_cua1TrangPlayBet);
    thisObj.addChild(_cua3TrangTotalBet);
    thisObj.addChild(_cua3TrangPlayBet);
    thisObj.addChild(_cua4TrangTotalBet);
    thisObj.addChild(_cua4TrangPlayBet);
    thisObj.addChild(_btnDatlai);
    thisObj.addChild(_btnHuyCuoc);
    thisObj.addChild(_btnGapDoi);
    thisObj.addChild(dia);
    // for (i = 0; i < _lstResult.size(); i++) {
    //     thisObj.addChild(_lstResult[i]);
    //     _lstResult[i].setAnchorPoint(ANCHOR_MIDDLE);
    // }

    thisObj.addChild(bg_chip);
    bg_chip.addChild(_btnX1);
    bg_chip.addChild(_btnX5);
    bg_chip.addChild(_btnX25);
    bg_chip.addChild(_btnX50);

    thisObj.addChild(_labelCuaChan);
    thisObj.addChild(_labelCuaLe);
    thisObj.addChild(_labelCua4Trang);
    thisObj.addChild(_labelCua3Trang);
    thisObj.addChild(_labelCua1Trang);
    thisObj.addChild(_labelCua0Trang);

    thisObj.addChild(bg0Trang);
    thisObj.addChild(bg1Trang);
    thisObj.addChild(bg3Trang);
    thisObj.addChild(bg4Trang);

    thisObj.addChild(btn_san_sang);
    thisObj.addChild(bat);

    //this.enableBetButton(_totalMoney);
    // this.invisibleBetLable();
    // showChipClicked(TAG.XOCDIA_SCENE.BTN_X1);
}

// var initGame = function() {
//
//     var avatar_position = [0, 8, 4, 2, 9, 7, 5, 6, 3, 1];
//
//     if (is_create_room){
//         var current_user_id = getUserId();
//         setOwnerUserId(current_user_id);
//     }
//
//     setListPlayerFromParams(player_list, waiting_player_list);
//
//     showNumberPlayerOutsite();
//     if (enter_room_response != 0) {
//         handleReEnterRoom(enter_room_response);
//     }
//     var hostSprite = addHostSprite();
//     hostSprite.setPosition(getHostPosition());
// }

var getTypeBetRatio = function(type) {
    var result = 0;
    // for (it = _betsRatio.begin(); it != _betsRatio.end(); it++) {
    //     if ((*it)[0] == type) {
    //         result = (*it)[1];
    //     }
    // }
    return type;
}

