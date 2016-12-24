/**
 * Created by MyPC on 12/12/2016.
 */

var getTitleGame = function(){
    var title_game = "";

    var zoneId = getZoneId();

    if (zoneId == TAG.TIENLENMIENNAM_ZONE){
        title_game = TXT.TITLE_GAME_TLMN;
    }
    else if (zoneId == TAG.PHOM_ZONE){
        title_game = TXT.TITLE_GAME_PHOM;
    }
    else if (zoneId == TAG.BACAY_ZONE){
        title_game = TXT.TITLE_GAME_BACAY;
    }
    else if (zoneId == TAG.XOCDIA_ZONE){
        title_game = TXT.TITLE_GAME_XOCDIA;
    }
    else if (zoneId == TAG.MAUBINH_ZONE) {
        title_game = TXT.TITLE_GAME_MAUBINH;
    }
    else if (zoneId == TAG.TLMN_SOLO_ZONE) {
        title_game = TXT.TITLE_GAME_TLMN_SOLO;
    }
    else if (zoneId == TAG.LIENG_ZONE) {
        title_game = TXT.TITLE_GAME_TLMN_LIENG;
    }
    return title_game;
};

var getZoneId = function() {
    var result = -1;
    //CCLOG("%d", this->gameTag);
    switch (this.gameTag)
    {
        case TAG.SHOW_GAME_SAM:
            result = TAG.SAM_ZONE;
            break;
        case TAG.SHOW_GAME_POCKER:
            result = TAG.POKER_ZONE;
            break;
        case TAG.SHOW_GAME_PHOM:
            result = TAG.PHOM_ZONE;
            break;
        case TAG.SHOW_GAME_TLMN:
            result = TAG.TIENLENMIENNAM_ZONE;
            break;
        case TAG.SHOW_GAME_TLMN_SOLO:
            result = TAG.TLMN_SOLO_ZONE;
            break;
        case TAG.SHOW_GAME_BACAY:
            result = TAG.BACAY_ZONE;
            break;
        case TAG.SHOW_GAME_XITO:
            result = TAG.XITO_ZONE;
            break;
        case TAG.SHOW_GAME_XOCDIA:
            result = TAG.XOCDIA_ZONE;
            break;
        case TAG.SHOW_GAME_MAUBINH:
            result = TAG.MAUBINH_ZONE;
            break;
        case TAG.SHOW_GAME_LIENG:
            result = TAG.LIENG_ZONE;
            break;
        case TAG.SHOW_GAME_WHEEL:
            result = TAG.WHEEL_ZONE;
            break;
        case TAG.SHOW_GAME_TAMXINGAU:
            result = TAG.TAMXINGAU_ZONE;
            break;
        case TAG.SHOW_GAME_MINI_POKER:
            result = TAG.MINIPOKER_ZONE;
            break;
        default:
            result = TAG.TIENLENMIENNAM_ZONE;
            break;
    }
    return _zoneId != -1 ? _zoneId : result;
};

var setGameTag = function(gameTag) {
    this.gameTag = gameTag;
}

var getGameTag = function() {
    return this.gameTag;
}

var setZoneId = function(zoneId) {
    _zoneId = zoneId;
}

var Common = {
    FACEBOOK_CHANNEL: 1,
    GOOGLE_CHANNEL: 2,
    BACAY_ZONE: 1,
    XITO_ZONE: 2,
    POKER_ZONE: 3,
    PHOM_ZONE: 4,
    TIENLENMIENNAM_ZONE: 5,
    TLMN_SOLO_ZONE: 6,
    CARO_ZONE: 7,
    BAUCUA_ZONE: 8,
    CHAN_ZONE: 9,
    SAM_ZONE: 10,
    LIENG_ZONE: 11,
    MAUBINH_ZONE: 12,
    XENG_ZONE: 13,
    XOCDIA_ZONE: 15,
    TAMXINGAU_ZONE: 17,
    WHEEL_ZONE: 18,
    MINIPOKER_ZONE: 19
}

var getCp = function() {
    // if (TEST_ENVIRONMENT)
    return "1";

}

var getVersionCode = function() {
    return "8";
}

var getCountry = function() {
    // if (TEST_ENVIRONMENT)
    return "vn";

}

var getLanguage = function() {
    // if (TEST_ENVIRONMENT)
    return "vi";
}

var getDeviceId =function() {
    /*if (TEST_ENVIRONMENT)
     return "00000000";*/
    return "";
}

var getDeviceInfo = function() {
    /*if (TEST_ENVIRONMENT)
     return "Samsung Galaxy S2";*/
    return "NO_DEVICE";
}

var getPackageName = function() {
    return "com.bigken.game.b";
}