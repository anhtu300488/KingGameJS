/**
 * Created by MyPC on 12/12/2016.
 */
var visibleSize = cc.size(1280,768);//cc.director.getVisibleSize();
var width = visibleSize.width;
var height = visibleSize.height;

var origin = cc.director.getVisibleOrigin();
var originX = origin.x;
var originY = origin.y;

cc.log("ox/oy:" + originX + "/" +originY);

var MVec2 = function (x,y) {
    return cc.p(originX+x, originY+y);
}
