/**
 * Created by MyPC on 08/02/2017.
 */
var TLMNPlayer = ({

    init:function (n, i, c, g, h, number, pos, tableIndex)
    {
        var setData = {
            name : n,
            id : i,
            cash : c,
            gold : g,
            avatar_id : h,
            numberCard : number,
            postion : pos,
            tableIndex : tableIndex
        };

        return setData;
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

    getNumberCard: function(){
        return this.numberCard;
    },

    getPostion: function(){
        return this.postion;
    },

    setNumberCard: function(number){
        this.numberCard = number;
    },

    setPostion: function(pos){
        this.postion = pos;
    },

    getState: function() {
        return this.state;
    },

    setState: function(state) {
        this.state = state;
    },

    setTableIndex: function(_tableIndex) {
        this.tableIndex = _tableIndex;
    },

    getTableIndex: function() {
        return this.tableIndex;
    }
});
