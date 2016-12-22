/**
 * Created by MyPC on 12/12/2016.
 */
// var MLabelCreate = function (text, size, isBold) {
//     var label = new cc.LabelTTF(text, "Arial", size);
//     label.setAnchorPoint(cc.p(0,0));
//     return label;
// }

var MLabelCreate = function(text, size, color, isBold){
    var label = new cc.LabelTTF(text, "Arial", size);
    label.setAnchorPoint(cc.p(0,0));
    label.setColor(color);

    return label;
}

var MLabelCreateTitle = function(text, size){
    var label = new cc.LabelTTF(text,"fonts/font_title.otf",size);
    label.setAnchorPoint(cc.p(0, 0));
    return label;
}