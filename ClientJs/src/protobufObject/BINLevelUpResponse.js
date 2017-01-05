/**
 * Created by MyPC on 05/01/2017.
 */
var BINLevelUpResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        BinParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/level.proto').build('bigken.level'),
        BinParamProto = BinParamProtobuf.BINLevelUpResponse;

    var protoBufData = BinParamProto.decode(protoBufVar);

    return protoBufData;
}
