/**
 * Created by MyPC on 08/02/2017.
 */
// var Card = cc.Class.extend({
//     // ctor: function () {
//     //     this._super();
//     //     this.init();
//     // },
//     // init:function () {
//     //     this._super();
//     // },
//     value : 0,
//     name : function () {
//         return cc.formatStr("res/%02dx.png", value);
//     },
//     getPhomName : function() {
//         var nameValue = value - 8;
//         if (nameValue < 1) nameValue = nameValue + 52;
//         return cc.formatStr("res/%02dx.png", nameValue);
//     },
//     getMauBinhName : function() {
//         //1-4 ==> 49-52, 5-8 ==> 1-4, ..., 49-52 ==> 45-48
//         var nameValue = value - 4;
//         if (nameValue < 1) nameValue = nameValue + 52;
//         return cc.formatStr("res/%02dx.png", nameValue);
//     },
//     getThreeCardName : function() {
//         var nameValue = value - 8;
//         if (nameValue < 1) nameValue = nameValue + 52;
//         if (nameValue % 4 == 0) {
//             nameValue--;
//         }
//         else if (nameValue % 4 == 3) {
//             nameValue++;
//         }
//         return cc.formatStr("res/%02dx.png", nameValue);
//     },
//     getActualName : function() {
//         var val;
//         switch (getZoneId())
//         {
//             case 4:
//                 val = this.getPhomName();
//                 break;
//             case 5:
//                 val = this.name();
//                 break;
//             case 1:
//                 val = this.getThreeCardName();
//                 break;
//             case 12:
//                 val = this.getMauBinhName();
//                 break;
//             default:
//                 val = this.name();
//                 break;
//         }
//         return val;
//     },
//     getValue: function() {
//         return value;
//     },
//     setValue : function(val) {
//         value = val;
//     }
// });

var Card = {
    value : 0,
    name : function () {
        return cc.formatStr("res/%02dx.png", this.value);
    },
    getPhomName : function() {
        var nameValue = this.value - 8;
        if (nameValue < 1) nameValue = nameValue + 52;
        return cc.formatStr("res/%02dx.png", nameValue);
    },
    getMauBinhName : function() {
        //1-4 ==> 49-52, 5-8 ==> 1-4, ..., 49-52 ==> 45-48
        var nameValue = this.value - 4;
        if (nameValue < 1) nameValue = nameValue + 52;
        return cc.formatStr("res/%02dx.png", nameValue);
    },
    getThreeCardName : function() {
        var nameValue = this.value - 8;
        if (nameValue < 1) nameValue = nameValue + 52;
        if (nameValue % 4 == 0) {
            nameValue--;
        }
        else if (nameValue % 4 == 3) {
            nameValue++;
        }
        return cc.formatStr("res/%02dx.png", nameValue);
    },
    getActualName : function() {
        var val;
        switch (getZoneId())
        {
            case 4:
                val = this.getPhomName();
                break;
            case 5:
                val = this.name();
                break;
            case 1:
                val = this.getThreeCardName();
                break;
            case 12:
                val = this.getMauBinhName();
                break;
            default:
                val = this.name();
                break;
        }
        return val;
    },
    getValue: function() {
        return this.value;
    },
    setValue : function(val) {
        this.value = val;
    }
};

// var name = function () {
//     return cc.formatStr("res/%02dx.png", value);
// }
//
// var getPhomName = function() {
//     var nameValue = value - 8;
//     if (nameValue < 1) nameValue = nameValue + 52;
//     return cc.formatStr("res/%02dx.png", nameValue);
// }
//
// var getMauBinhName = function() {
//     //1-4 ==> 49-52, 5-8 ==> 1-4, ..., 49-52 ==> 45-48
//     var nameValue = value - 4;
//     if (nameValue < 1) nameValue = nameValue + 52;
//     return cc.formatStr("res/%02dx.png", nameValue);
// }
//
// var getThreeCardName = function() {
//     var nameValue = value - 8;
//     if (nameValue < 1) nameValue = nameValue + 52;
//     if (nameValue % 4 == 0) {
//         nameValue--;
//     }
//     else if (nameValue % 4 == 3) {
//         nameValue++;
//     }
//     return cc.formatStr("res/%02dx.png", nameValue);
// }
//
// var getActualName = function() {
//     var val;
//     switch (getZoneId())
//     {
//         case 4:
//             val = getPhomName();
//             break;
//         case 5:
//             val = name();
//             break;
//         case 1:
//             val = getThreeCardName();
//             break;
//         case 12:
//             val = getMauBinhName();
//             break;
//         default:
//             val = name();
//             break;
//     }
//     return val;
// }
//
// var getValue = function() {
//     return this.value;
// }
//
// var setValue = function(val) {
//     this.value = val;
// }
