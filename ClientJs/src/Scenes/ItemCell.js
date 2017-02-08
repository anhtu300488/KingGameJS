var ItemCell = function (_index, passwordRequired, width, height, minBet, number_user, isVipRoom, max_number_user, minEnterMoney, thisObject) {

    var cell = thisObject;

    var posY = height / 2;
    var sizeText = height / 3;

    //so ban
    var lb_soban = MLabel.create(cc.formatStr("%d", _index + 1), sizeText, true);
    lb_soban.setAnchorPoint(ANCHOR_MIDDLE_LEFT);
    lb_soban.setPosition(cc.p(width / (3.2 * 6), posY));
    cell.addChild(lb_soban);

    //khoa
    if (passwordRequired){
        var lock = MSprite.create("res/icon_lock_mini.png");
        lock.setAnchorPoint(ANCHOR_MIDDLE_LEFT);
        lock.setPosition(cc.p(width / (1.6 * 6), posY));
        cell.addChild(lock);
    }

    //xu ken
    var bg_xuken = isVipRoom ? "res/sprite_xu_mini.png" : "res/sprite_ken_mini.png";
    var sprite_xuken = MSprite.create(bg_xuken);
    sprite_xuken.setAnchorPoint(ANCHOR_MIDDLE_LEFT);
    sprite_xuken.setPosition(cc.p(width / 6 + 3 * width / (4 * 6), posY));
    cell.addChild(sprite_xuken);

    //muc cuoc
    var lb_muccuoc = MLabel.create(convertIntToMoneyView100k(minBet), sizeText, true);
    lb_muccuoc.setAnchorPoint(ANCHOR_MIDDLE_LEFT);
    lb_muccuoc.setPosition(cc.p(width / 6 + width / (4 * 6) - 10, posY));
    cell.addChild(lb_muccuoc);

    //so nguoi choi
    var sprite = MSprite.create("res/under_progressbar.png");
    sprite.setAnchorPoint(ANCHOR_MIDDLE);
    sprite.setScaleX(((5 * width) / (7 * 3)) / sprite.getContentSize().width);
    sprite.setPosition(cc.p(3 * width / 6, posY));
    cell.addChild(sprite);


    var loadingBar = new ccui.LoadingBar();
    loadingBar.setAnchorPoint(ANCHOR_MIDDLE);
    loadingBar.setCapInsets(cc.Rect(sprite.getContentSize().width*0.25, sprite.getContentSize().height*0.25,
        sprite.getContentSize().width*0.5, sprite.getContentSize().height*0.5));
    loadingBar.setName("LoadingBar");

    if (max_number_user >= 25 && number_user > 0 && number_user < 4){
        loadingBar.setPercent(100 * 4 / max_number_user);
    }
    else {
        loadingBar.setPercent(100 * number_user / max_number_user);
    }

    loadingBar.setScaleX(((5 * width) / (7 * 3)) / sprite.getContentSize().width);
    loadingBar.setPosition(cc.p(3 * width / 6, posY));
    loadingBar.setScale9Enabled(true);

    var trangthai_text = "";
    var colorTxt;

    if (number_user / max_number_user >= 1){
        trangthai_text = CELL_STATUS_PLAYING;
        loadingBar.loadTexture("res/inside_progressbar.png");  //max_progressbar.png
        loadingBar.setContentSize(cc.Size(sprite.getContentSize().width, sprite.getContentSize().height));
        loadingBar.setColor(cc.color.RED);
        colorTxt = cc.color.YELLOW;
    }
    else {
        trangthai_text = CELL_STATUS_MIS_SLOT;
        loadingBar.loadTexture("res/inside_progressbar.png");
        loadingBar.setContentSize(cc.size(sprite.getContentSize().width, sprite.getContentSize().height));
        loadingBar.setColor(cc.color.GREEN);
        colorTxt = cc.color.WHITE;
    }

    cell.addChild(loadingBar);

    //xuken
    var sprite_xuken_min = MSprite.create(bg_xuken);
    sprite_xuken_min.setAnchorPoint(ANCHOR_MIDDLE_LEFT);
    sprite_xuken_min.setPosition(cc.p(4 * width / 6 + 3 * width / (4 * 6), posY));
    cell.addChild(sprite_xuken_min);

    //toi thieu
    var lb_toithieu = MLabel.create(convertIntToMoneyView100k(minEnterMoney), sizeText, true);
    lb_toithieu.setAnchorPoint(ANCHOR_MIDDLE_LEFT);
    lb_toithieu.setPosition(cc.p(4 * width / 6 + width / (4 * 6) - 10, posY));
    cell.addChild(lb_toithieu);

    // //trang thai
    var lb_trangthai = MLabel.create(trangthai_text, sizeText, true);
    lb_trangthai.setAnchorPoint(ANCHOR_MIDDLE);
    lb_trangthai.setColor(colorTxt);
    lb_trangthai.setPosition(cc.p(5 * width / 6 + width / (2 * 6), posY));
    cell.addChild(lb_trangthai);

    var labelSoNguoi = MLabel.create(cc.formatStr("%d/%d", number_user, max_number_user), sizeText, true);
    labelSoNguoi.setAnchorPoint(ANCHOR_MIDDLE);
    labelSoNguoi.setPosition(cc.p(width / 2, posY));
    cell.addChild(labelSoNguoi);

    return cell;
}