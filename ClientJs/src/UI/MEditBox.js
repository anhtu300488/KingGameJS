/**
 * Created by MyPC on 30/12/2016.
 */
var MEditBox = cc.EditBox.extend({
    ctor: function (size,sprite_normal,sprite_pressed,sprite_disable) {
        this._super(size,sprite_normal,sprite_pressed,sprite_disable);
        this.init(size,sprite_normal,sprite_pressed,sprite_disable);
    },
    init:function (size,sprite_normal,sprite_pressed,sprite_disable) {
        this._super(size,sprite_normal,sprite_pressed,sprite_disable);
    },
    getWidth: function () {
        return this.getContentSize().width;
    },
    getHeight: function () {
        return this.getContentSize().height;
    }
});

MEditBox.create = function(size,fileName,textSize,text){

    var edit_box = new MEditBox(size,cc.Scale9Sprite.create(fileName),
        cc.Scale9Sprite.create(fileName),cc.Scale9Sprite.create(fileName));
    edit_box.setContentSize(size);
    edit_box.setInputFlag(fileName);
    edit_box.setFontName(res.FONT_THIN);
    edit_box.setFontSize(textSize);
    edit_box.setFontColor(cc.color.BLACK);
    edit_box.setPlaceholderFontColor(cc.color.BLACK);
    edit_box.setPlaceHolder(text);
    edit_box.setPlaceholderFont(res.FONT_THIN,textSize);
    edit_box.setPlaceholderFontColor(cc.color(213,187,187));
    edit_box.setReturnType(cc.EditBox.KEYBOARD_RETURNTYPE_DONE);
    edit_box.setInputMode(cc.EditBox.EDITBOX_INPUT_MODE_SINGLELINE);
    edit_box.setInputFlag(cc.EditBox.EDITBOX_INPUT_FLAG_INITIAL_CAPS_SENTENCE);

    return edit_box;
}
