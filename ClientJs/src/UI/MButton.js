
var MButton = ccui.Button.extend({
    ctor: function () { 
        this._super(); 
        this.init(); 
    },  
    init:function () { 
        this._super(); 
    },  
    getWidth: function () { 
        return this.getNormalTextureSize().width;
    },  
    getHeight: function () { 
        return this.getNormalTextureSize().height;
     }
  });

  MButton.create = function (imageName,tag) { 
        var button = new MButton(); 
        button.loadTextureNormal(imageName); 
        button.setTag(tag); 
        button.setZoomScale(0.1); 
        button.setAnchorPoint(cc.p(0,0));  
        return button; 
}

  MButton.createWithText = function(textureName, text, tag){ 
    var btn = new MButton(); 
    btn.loadTextureNormal(textureName); 
    btn.setZoomScale(0.1); 
    btn.setAnchorPoint(cc.p(0,0)); 
    btn.setTitleText(text); 
    btn.setTitleFontSize(btn.getHeight()*0.4); 
    btn.setTitleFontName(res.FONT_BOLD); 
    btn.setTag(tag);  
    return btn; 
}

MButton.createTextSizeTag = function(text,size,tag) {
    var btn = new MButton();
    btn.setZoomScale(0.02);
    btn.setAnchorPoint(cc.p(0,0));
    btn.setTitleText(text);
    btn.setTitleFontSize(size);
    btn.setTitleFontName("fonts/gamevina.otf");
    btn.setTag(tag);

    return btn;

}
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
//     return btn;
//
// }

// icon + text
MButton.createExtends = function(textureName,text,size,tag){
    var btn = new MButton();
    btn.loadTextureNormal(textureName);
    btn.setZoomScale(0.1);
    btn.setAnchorPoint(cc.p(0,0));
    btn.setTag(tag);
    if (text != ""){
        var label = MLabel.create(text, res.FONT_THIN, btn.getHeight() / 1.5);
        label.setAnchorPoint(cc.p(0, 0));
        label.setPosition(btn.getWidth() + 5, 0);
        btn.addChild(label);
    }
    return btn;
}

// icon + text bottom
MButton.createExtendsBottom = function(textureName, text, size, tag){
    var btn = new MButton();
    btn.loadTextureNormal(res.btn_toolbar);
    btn.setZoomScale(0.2);
    btn.setAnchorPoint(cc.p(0,0));
    btn.setTag(tag);

    if (text != ""){
        var spriteIcon = MSprite.create(textureName);
        var label = MLabel.create(text, spriteIcon.getHeight() / 2.0, true);

        spriteIcon.setPosition(cc.p(btn.getWidth() / 2 - spriteIcon.getWidth() / 2,
                                    label.getHeight()*1.2));
        btn.addChild(spriteIcon);

        label.setPosition(btn.getWidth() / 2,label.getHeight()*0.6);
        btn.addChild(label);
    }
    return btn;
}

MButton.createWidthSize = function(textureName,textureSize,tag){
    var btn = new MButton();
    btn.loadTextureNormal(textureName);
    btn.ignoreContentAdaptWithSize(false);
    btn.setContentSize(textureSize);
    btn.setZoomScale(0.02);
    btn.setTag(tag);

    return btn;
}