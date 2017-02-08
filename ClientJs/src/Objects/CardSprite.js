/**
 * Created by MyPC on 08/02/2017.
 */
var CardSprite = cc.Sprite.extend({

    ctor: function () {
        this._super();
    },
    getWidth: function () {
        return this.getContentSize().width;
    },
    getHeight: function () {
        return this.getContentSize().height;
    },
    setNumberValue: function (value) {
        this.value = value;
    },
    getNumberValue: function () {
        return this.value;
    },
    setCard: function (value) {
        this.value = value;
    },
    getCard: function () {
        return this.value;
    },
    setCurentX: function (value) {
        this.value = value;
    },
    getCurentX: function () {
        return this.value;
    }
});

CardSprite.create = function(card, posX, width,cardEvent) {
    var cardSprite = new CardSprite();
    var name = getActualName();

    cardSprite.setTexture(name);
    cardSprite.setNumberValue(card.getValue());
    cardSprite.setCard(card);
    cardSprite.setCurentX(posX);
    cardSprite.setScale(width/cardSprite.getWidth());

    if (getZoneId() != Common.BACAY_ZONE)  {
        setEvent(cardEvent);
        // cardSprite.addEvents();
    }

    return cardSprite;
}


var setNumberValue = function(numberValue){
    this.numberValue = numberValue;
}

var getNumberValue = function(){
    return this.numberValue;
}

var setEvent = function(cardEvent){
    this.cardEvent = cardEvent;
}
