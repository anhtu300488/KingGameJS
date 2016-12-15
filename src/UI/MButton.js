var winsize = cc.director.getWinSize();
var MCreate = function(textureName, tag) {
    var btn = new ccui.Button();
    btn.loadTextureNormal(textureName);
    btn.setZoomScale(0.02);
    btn.setAnchorPoint(cc.p(0,0));
    btn.setTag(tag);

    return btn;
};

var MCreate = function(textureName) {
    var btn = new ccui.Button();
    btn.loadTextureNormal(textureName);
    btn.setZoomScale(0.02);
    btn.setAnchorPoint(cc.p(0,0));

    return btn;
};


// var MCreate = function(textureName, text, size, tag){
//     var btn = new ccui.Button();
//     btn.loadTextureNormal(textureName);
//     btn.setZoomScale(0.02);
//     btn.setAnchorPoint(cc.p(0,0));
//     btn.setTitleText(text);
//     btn.setTitleFontSize(btn.getContentSize().height*0.4);
//     btn.setTitleFontName(FONT_BOLD);
//     btn.setTag(tag);
//
//     return btn;
// };
//
//
// var createWithIcon = function (bgrName, iconName, text, size, tag) {
//     var btn = new ccui.Button();
//     btn.setZoomScale(0.02);
//     btn.setAnchorPoint(cc.p(0,0));
//     btn.setTag(tag);
//     var icon = new cc.Sprite(iconName);
//     icon.setPosition(cc.p(10, btn.getContentSize().height/2 - icon.getContentSize().height/2));
//     btn.addChild(icon);
//     var label = MLabelCreate(text,btn.getContentSize().height/2);
//     label.setAnchorPoint(cc.p(0,0));
//     label.setPosition(icon.getPositionX()+icon.getContentSize().width + (btn.getContentSize().width - icon.getPositionX() - icon.getContentSize().width)/2 - label.getContentSize().width/2, btn.getContentSize().height/2 - label.getContentSize().height/2);
//     btn.addChild(label);
//
//     return btn;
//
// }

// icon + text
var createExtends = function(textureName,text,size,tag){
    var btn = new ccui.Button();
    btn.loadTextureNormal(textureName);
    btn.setZoomScale(0.02);
    btn.setAnchorPoint(cc.p(0,0));
    btn.setTag(tag);
    if (text != ""){
        var label = new cc.LabelTTF(text, FONT_THIN, btn.getContentSize().height / 1.5);
        label.setAnchorPoint(cc.p(0, 0));
        label.setPosition(btn.getContentSize().width + 5, 0);
        btn.addChild(label);
    }
    return btn;
}

// icon + text bottom
var createExtendsBottom = function(textureName, text, size, tag){
    var btn = new ccui.Button(res.btn_toolbar);
    btn.setZoomScale(0.2);
    btn.setAnchorPoint(cc.p(0,0));
    btn.setTag(tag);

    if (text != ""){
        var spriteIcon = new cc.Sprite(textureName);
        var label = MLabelCreate(text, spriteIcon.getContentSize().height / 2.0, true);

        var height = label.getContentSize().height + 5 + spriteIcon.getContentSize().height;

        spriteIcon.setPosition(cc.p(btn.getContentSize().width / 2 - spriteIcon.getContentSize().width / 2, btn.getContentSize().height / 2 + height / 2 - spriteIcon.getContentSize().height));
        btn.addChild(spriteIcon);

        label.setPosition(btn.getContentSize().width / 2 - label.getContentSize().width / 2, btn.getContentSize().height / 2 - winsize.height / 2);
        btn.addChild(label);
    }
    return btn;
}

var createWidthSize = function(textureName,textureSize,tag){
    var btn = new ccui.Button();
    btn.loadTextureNormal(textureName);
    btn.ignoreContentAdaptWithSize(false);
    btn.setContentSize(textureSize);
    btn.setZoomScale(0.02);
    btn.setTag(tag);

    return btn;
}