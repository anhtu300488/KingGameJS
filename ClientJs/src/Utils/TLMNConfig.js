/**
 * Created by MyPC on 12/12/2016.
 */

var WebSocket = WebSocket || window.WebSocket || window.MozWebSocket;
// var ws = null;


//anh Linh
var  SERVER_NAME = "192.168.100.250";
//const char*  SERVER_NAME = "192.168.100.20";
// anh Hai
//const char*  SERVER_NAME = "192.168.100.32";
// anh Tuấn
//const char*  SERVER_NAME = "192.168.100.11";
//const char*  SERVER_NAME = "103.28.37.24";
//const char*  SERVER_NAME = "192.168.1.100";

var SERVER_PORT = 1280;

var PATH = "bigken";

// var url = "ws://"+SERVER_NAME+":"+SERVER_PORT+"/"+PATH;
var url = "ws://192.168.100.250:1280/bigken";
var ws = new WebSocket(url);
ws.binaryType = "arraybuffer";
// ws.onopen = function() {
//     // called when connection is opened
// };
// ws.onerror = function(e) {
//     // called in case of error, when connection is broken in example
// };

// ws.onclose = function (e) {
//     setTimeout(function(){sendData()}, 120);
// };

var LOGIN_STATE = {
    NORMAL_LOGIN : 1,
    FB_LOGIN : 2,
    GG_LOGIN : 3
}

var ROOM_TYPE = {
    KEN : 0,
    XU : 1,
    TONG_HOP : 2
};

var PlayerState = {
    NOT_IN_ROOM: 1,
    PLAYING: 3,
    WAITING: 2
};

var USER_STATUS_CONFIG = {
    FILL_ALL : 0,
    FILL_MAIL : 1,
    FILL_FRIEND : 2
};

var GAMECOLOR = {
    DARK_COLOR: cc.color(0,0,0,180)
}

var TABLE_ORDERBY = {
    MIN_BET : 1,
    NUM_PLAYER : 2,
    INDEX : 3
};

var TAG = {
    LOGIN: {
        BTN_LOGIN: 1,
        BTN_LOGIN_FB: 2,
        BTN_LOGIN_GOOGLE: 3,
        BTN_REGISTER: 4,
        BTN_FORGET_PASSWORD: 5,
        BTN_HOT_LINE: 6,
        EDIT_BOX_USER_NAME: 7,
        EDIT_BOX_PASSWORD: 8
    },

    SHOW_GAME: {
        BTN_BACK: 1,
        BTN_HOT_LINE: 2,
        BTN_AVATAR: 3,
        BTN_MAIL: 4,
        BTN_SETTING: 5,
        BTN_HELP: 6,
        BTN_TOP_USER: 7,
        BTN_GET_PRICE: 8,
        BTN_NOTIFY: 9,
        BTN_GIFT: 10
    },

    SCENE_TABLE: {
        //Table
        SCENE: 120,
        BTN_BACK: 121,
        BTN_PLAYNOW: 122,
        BTN_CREATE: 123,
        BTN_GOTO: 124,
        BTN_REFRESH: 125,
        BTN_PHONGVIP: 126,
        BTN_PHONGFREE: 127,
        BTN_HOPTHU: 128,
        BTN_TIEN: 129,
        BTN_PHONE: 130,
        BTN_CAIDAT: 131,

        BTN_PHONGCHO: 132,
        BTN_VIPXU: 133,
        BTN_KEN: 134,
        BTN_MUCCUOC: 135,
        BTN_SONGUOI: 136,
        BTN_KHOA: 137
    },

    TLMN_SCENE:{

    },

    PHOM_SCENE:{
        BTN_DANHBAI: 240,
        BTN_XEPBAI: 241,
        BTN_BOCBAI: 242,
        BTN_ANBAI: 243,
        BTN_BATDAU: 244,
        BTN_HAPHOM: 245,
        BTN_GUIBAI: 246,
        BTN_U: 247
    },

    CHANLE_SCENE:{

    },

    TAMXINGAU_SCENE:{

    },

    MINIPOKER_SCENE:{

    },

    MAUBINH_SCENE:{
        BTN_START_MATCH: 2001,
        BTN_SANSANG: 2002,
        BTN_XONG: 2003,
        EFFECT_TEXT: 2004
    },

    VQMM_SCENE:{
        VQMN: 600,
        BTN_BACK: 601,
        BTN_QUAY: 602,
        BTN_SWEEP_TURN: 603,
        BTN_MUA_1: 604,
        BTN_MUA_2: 605,
        BTN_MUA_3: 606
    },

    BACAY_SCENE:{

    },

    MINI_BACAY_SCENE:{

    },

    XOCDIA_SCENE:{
        //Xoc dia scene
        BTN_X1: 141,
        BTN_X5: 142,
        BTN_X25: 143,
        BTN_X50: 144,
        CUA_CHAN: 145,
        CUA_LE: 146,
        CUA_0_TRANG: 147,
        CUA_1_TRANG: 148,
        CUA_3_TRANG: 149,
        CUA_4_TRANG: 152,
        BTN_DATLAI: 153,
        BTN_HUYCUOC: 154,
        BTN_GAPDOI: 155,
        BTN_XINCAI: 157,
        BTN_HUYCAI: 158,
        NUT_TRANG_DO: 156,
        OUTSITE_PLAYER: 159
    },

    POPUP_VQMM: {
        POPUP: 840,
        BTN_HISTORY: 841,

        BTN_HISTORY_NOHU: 842,
        HISTORY_NOHU: 843,
        BTN_HISTORY_SPIN: 844,
        HISTORY_SPIN: 845,
        BTN_TOP_USER_HISTORY: 846,
        TOP_USER_HISTORY: 847,

        BTN_NAP_XU: 848,
        BTN_NAP_KEN: 849
    },

    TLMN_SCENE: 100,
    TLMN_BTN_MENU: 101,
    TLMN_BTN_MESSAGE: 102,
    TLMN_BTN_PURCHASE: 103,
    TLMN_BTN_SOUND: 104,
    TLMN_BTN_FACEBOOK: 105,
    TLMN_BTN_CHONLAI: 106,
    TLMN_BTN_XEPBAI: 107,
    TLMN_BTN_DANHBAI: 108,
    TLMN_BTN_BOLUOT: 109,
    TLMN_BTN_EXIT: 110,
    TLMN_START_MATCH: 111,
    TLMN_CREATE_ROOM: 112,
    TLMN_BTN_BACK: 113,
    TLMN_BTN_KHOA: 114,
    TLMN_BTN_PHONGCHO: 115,
    TLMN_BTN_CAIDAT: 116,
    TLMN_BTN_SANSANG: 117,
    TLMN_CREATE_ROOM_GOLD: 118,
    TLMN_CREATE_ROOM_CASH: 119,
    BTN_INVITE_TO_PLAY: 120,
    TLMN_BTN_DOILUAT: 178,

//Show
    SHOW_SCENE:60,
    SHOW_BTN_BACK: 61,
    SHOW_BTN_MENU: 62,
    SHOW_BTN_NAPXU: 63,
    SHOW_BTN_NAPKEN: 97,
    SHOW_BTN_TROGIUP: 64,
    SHOW_BTN_CAIDAT: 65,
    SHOW_GAME_XITO: 66,
    SHOW_GAME_PHOM: 67,
    SHOW_GAME_TLMB: 68,
    SHOW_GAME_TAMXINGAU: 69,
    SHOW_GAME_TLMN: 89,
    SHOW_GAME_TLMN_SOLO: 90,
    SHOW_GAME_WHEEL: 91,
    SHOW_GAME_MINI_POKER: 92,
    SHOW_GAME_BACAY: 70,
    SHOW_GAME_POCKER: 71,
    SHOW_GAME_XOCDIA: 72,
    SHOW_GAME_MAUBINH: 59,
    SHOW_GAME_LIENG: 1001,
    SHOW_BTN_FRIEND: 73,
    SHOW_BTN_DOI_THUONG: 74,
    SHOW_BTN_AVATAR: 75,
    SHOW_GAME_SAM: 76,
    SHOW_GAME_SAM_2: 77,
    SHOW_BTN_MESSAGE: 78,
    SHOW_BTN_PHONE: 79,
    SHOW_ARROW_BACK: 80,
    SHOW_ARROW_NEXT: 81,
    SHOW_GAME_TALA: 82,
    SHOW_GAME_HOPTHU: 83,
    SHOW_GAME_THONGBAO: 84,
    SHOW_BTN_GIFTCODE: 85,
    SHOW_BTN_XEPHANG: 96,
    SHOW_BTN_REFRESH: 86,
    SHOW_SORT_NUMPLAYER: 87,
    SHOW_SORT_MUCCUOC: 88,
    SHOW_SORT_TOITHIEU: 89,

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
    MINIPOKER_ZONE: 19,

    //REG
    REG_SCENE: 40,
    REG_BTN_REGISTER: 41,
    REG_BTN_BACK: 42,
    REG_EDITBOX_NHAP_MATKHAU: 43,
    REG_EDITBOX_NHAPLAI_MATKHAU: 44,
    REG_EDITBOX_NHAP_SDT: 45,
    REG_EDITBOX_NHAP_TEN: 46,

    BACAY_BTN_SANSANG: 1001,
    BACAY_BTN_LATBAI: 1002,
    NODE_BACAY_BETTABLE: 1003,
    BTN_CUOC_XACNHAN: 1004,
    BTN_LABEL_MUCCUOC: 1005,
    BTN_BET_BARIER1: 1006,
    BTN_BET_BARIER2: 1007,
    BTN_GOP_GA: 1008,
    BACAY_BTN_SOBAI: 1009,

    BTN_SANSANG: 1010
}



var POPUP = {
    HOT_LINE:{
        BTN_CLOSE: 1,
        BTN_HOT_LINE_1: 2,
        BTN_HOT_LINE_2: 3,
        BTN_FAN_PAGE: 4
    },

    MESSAGE_BOX:{
        BTN_OK: 1,
        BTN_CANCEL: 2,
        BTN_CLOSE: 3,
        LBL_MESSAGE: 4
    },

    SETTING:{
        BTN_MUSIC: 1,
        BTN_SOUND: 2,
        BTN_DENY_INVITE: 3,
        BTN_AUTO_READY: 4,
        BTN_VIBRATE: 5,
        BTN_AUTO_SIT: 6,
        BTN_CLOSE: 7
    },

    TAG_FRIEND: 331,
    TAG_USERINFOR: 332,
    TAG_DOITHE: 333,
    TAG_SETTING: 334,
    TAG_TOPUSER: 335,
    TAG_PASSWORD: 336,
    TAG_CREATEROOM: 337,
    TAG_CHAT: 338,
    TAG_INVITE: 339,
    TAG_LOCKTABLE: 340,
    TAG_OUTSITE_PLAYER: 341,
    TAG_HOTLINE: 342,
    TAG_MUATHE: 343,
    TAG_GIFTCODE: 344,

    TAG_CHANGE_PASS: 346,
    TAG_CHANGE_PHONE: 347,
    TAG_HELP_TO_PLAY: 348,
    TAG_CHANGE_AVATAR: 349
}

var GAME_STATE = {
    INTRO : 1,
    LOGIN_SCENE : 2,
    REGISTER_SCENE : 2,
    SHOW_GAME : 3,
    SCENE_TABLE : 4,
    IN_GAME : 5
};

var REGISTER = {
    //register
    MAX_LENGTH_USERNAME: 12,
    MIN_LENGTH_USERNAME: 3,
    MAX_LENGTH_PASSWORD: 12,
    MIN_LENGTH_PASSWORD: 6,
    MIN_LENGTH_SERIA: 10,
    MAX_LENGTH_SERIA: 20,
    MAX_LENGTH_SDT: 15,

    TAG_MAIL_CONTENT: 280,
    TAG_MAIL_DEL: 281,
    TAG_MAIL_READ: 282,
    TAG_MAIL_RECV: 283,
    TAG_MAIL_VIEW_READ: 284,
    TAG_MAIL_HOME: 285
};

var LOGIN = {
    BTN_GOOGLE: "res/btn_google.png",
    BTN_DANGKY: "res/btn_dang_ky.png",
    BTN_DANGNHAP: "res/btn_dangnhap.png",
    BTN_FACEBOOK: "res/btn_facebook.png",
    BTN_HOTLINE: "res/btn_hotline.png",
    BTN_PHONE: "res/btn_phone.png",
    CHECK_BOX: "res/check_box.png",
    CHECKEDIT_PASSWORD: "res/checkedit_password.png",
    SPRITE_GIRL: "res/sprite_cogai.png",
    EDIT_PASSWORD: "res/edit_password.png",
    SPRITE_BIGKEN: "res/sprite_bigken.png",
    BTN_BUTTON: "res/btn_button.png",
    SPRITE_CARD: "res/sprite_card.png"
};

var BUTTON_PADDING = 15;
var CARD_RATIO  = 1.490909;
var CARD_UP   = 20;
var INDEX_CARD  = 22;
var TAG_TIME_COUNTDOWN = 223;

