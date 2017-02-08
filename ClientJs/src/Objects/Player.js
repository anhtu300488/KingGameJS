/**
 * Created by MyPC on 08/02/2017.
 */
var Player = cc.Class.extend({
    ctor:function(n, i, c, g, h)
    {
        this._super();
        this.name = n;
        this.id = i;
        this.cash = c;
        this.gold = g;
        this.avatar_id = h;
        this._win = false;
        this.init();
    },

    init:function ()
    {
        this._super();
    },

    getName: function() {
        return this.name;
    },

    setName: function(n) {
        this.name = n;
    },

    getId: function() {
        return this.id;
    },

    setId: function(i) {
        this.id = i;
    },

    getCash: function() {
        return this.cash;
    },

    setCash: function(c) {
        this.cash = c;
    },

    getGold: function() {
        return this.gold;
    },

    setGold: function(g) {
        this.gold = g;
    },

    getAvatarId: function(){
        if (this.avatar_id < 100000){
            return 0;
        }
        return this.avatar_id;
    },

    isWin: function() {
        return this._win;
    },

    setWin: function(_win) {
        this._win = _win;
    },

    setMoney: function(isCash, money){
        if (isCash){
            this.cash = money;
        }
        else {
            this.gold = money;
        }
    }
});
