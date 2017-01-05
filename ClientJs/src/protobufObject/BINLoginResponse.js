/**
 * Created by MyPC on 05/01/2017.
 */
var BINLoginResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        BinParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/login.proto').build('bigken.login'),
        BinParamProto = BinParamProtobuf.BINLoginResponse;

    var protoBufData = BinParamProto.decode(protoBufVar);

    return protoBufData;
}