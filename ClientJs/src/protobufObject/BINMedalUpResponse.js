/**
 * Created by MyPC on 05/01/2017.
 */
var BINMedalUpResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        BinParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/level.proto').build('bigken.level'),
        BinParamProto = BinParamProtobuf.BINMedalUpResponse;

    var protoBufData = BinParamProto.decode(protoBufVar);

    return protoBufData;
}
