/**
 * Created by MyPC on 30/12/2016.
 */
var MEditBox = cc.EditBox.extend({
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

MEditBox.create = function(size,fileName,textSize){

    var editbox = new MEditBox();
    editbox.setContentSize(size);
    editbox.setInputFlag(fileName);
    editbox.setAnchorPoint(cc.p(0,0));
    editbox.setFontName("fonts/gamevina.otf");
    editbox.setFontSize(textSize);
    editbox.setFontColor(cc.color.WHITE);
    editbox.setPlaceholderFont("fonts/gamevina.otf",textSize);
    editbox.setPlaceholderFontColor(cc.color(213,187,187));
    editbox.setReturnType(EditBox.KEYBOARD_RETURNTYPE_DONE);
    editbox.setInputMode(EditBox.EDITBOX_INPUT_MODE_SINGLELINE);

    return editbox;
}
