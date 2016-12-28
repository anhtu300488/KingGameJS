/**
 * Created by MyPC on 12/12/2016.
 */

var MLabel = cc.LabelTTF.extend({
    ctor: function () {
        this._super();
        this.init();
    },
    init:function () {
        this._super();
    },
    getWidth: function () {
        return this.getContentSize().width;
    },
    getHeight: function () {
        return this.getContentSize().height;
    }
});

MLabel.create = function (text, size, isBold) {
    var label = new MLabel();
    label.setAnchorPoint(cc.p(0.5,0.5));
    label.setString(text);
    label.setColor(cc.color(255,255,255));
    label.setFontName(isBold ? res.FONT_BOLD : res.FONT_THIN);
    label.setFontSize(size);

    return label;
}

MLabel.createWithColor = function(text, size, color, isBold) {
    var label = new MLabel();
    label.setString(text);
    label.setFontName(isBold ? res.FONT_BOLD : res.FONT_THIN);
    label.setFontSize(size);
    label.setColor(color);

    return label;
}

MLabel.createTitle = function(text, size){
    var label = new MLabel();
    label.setString(text);
    label.setFontName(res.FONT_TITLE);
    label.setColor(cc.color(0,0,0));
    label.setAnchorPoint(cc.p(0, 0));
    label.setFontSize(size);

    return label;
}