/**
 * Created by MyPC on 16/01/2017.
 */
var BINEnterZoneRequest = function () {
    var ProtoBuf = dcodeIO.ProtoBuf,
        BinParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/enter_zone.proto').build('bigken.enterzone'),
        BinParamProto = BinParamProtobuf.BINEnterZoneRequest;

    return BinParamProto;
}
