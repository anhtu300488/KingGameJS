/**
 * Created by MyPC on 12/12/2016.
 */

var MLabel = cc.LabelTTF.extend({
    ctor: function (text,font,size) {
        this._super(text,font,size);
        this.init(text,font,size);
    },
    init:function (text,font,size) {
        this._super(text,font,size);
    },
    getWidth: function () {
        return this.getContentSize().width;
    },
    getHeight: function () {
        return this.getContentSize().height;
    }
});

MLabel.create = function (text, size) {
    var label = new MLabel("",getFontName(res.FONT_THIN_X),size);
    label.setAnchorPoint(cc.p(0.5,0.5));
    label.setString(text);
    label.setColor(cc.color(255,255,255));
    label.setFontName(res.FONT_THIN);

    return label;
}

MLabel.createBold = function (text, size) {
    var label = new MLabel("",getFontName(res.FONT_BOLD_X),size);
    label.setAnchorPoint(cc.p(0.5,0.5));
    label.setString(text);
    label.setColor(cc.color(255,255,255));
    label.setFontName(res.FONT_BOLD);

    return label;
}

MLabel.createWithColor = function(text, size, color, isBold) {
    var label = new MLabel("",getFontName(res.FONT_THIN_X),size);
    label.setString(text);
    label.setFontName(isBold ? res.FONT_BOLD : res.FONT_THIN);
    label.setColor(color);

    return label;
}

MLabel.createTitle = function(text, size){
    var label = new MLabel("",getFontName(res.FONT_TITLE_X),size);
    label.setString(text);
    label.setColor(cc.color(0,0,0));
    label.setAnchorPoint(cc.p(0, 0));

    return label;
}

MLabel.createIsBold = function(text, size,isBold){
    var label = new MLabel(text, isBold ? res.FONT_BOLD : res.FONT_THIN,size);
    label.setAnchorPoint(cc.p(0,0));
    return label;
}