/**
 * Created by MyPC on 12/12/2016.
 */
var origin = cc.director.getVisibleOrigin();
var originX = origin.x;
var originY = origin.y;

var MVec2 = function (x,y) {
    return cc.p(originX+x, originY+y);
}
