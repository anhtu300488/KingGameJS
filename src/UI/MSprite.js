/**
 * Created by MyPC on 13/12/2016.
 */

var MSpriteCreate = function(textureName, size){
    var sprite = new cc.Sprite();
    sprite.setAnchorPoint(cc.p(0,0));
    sprite.setTexture(textureName);
    sprite.setScale(size.width/sprite.getContentSize().width, size.height/sprite.getContentSize().height);
    sprite.setContentSize(size);

    return sprite;
}
