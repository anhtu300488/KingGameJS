/**
 * Created by MyPC on 16/01/2017.
 */
var BINRegisterResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/register.proto').build('bigken.register'),
        ParamProto = ParamProtobuf.BINRegisterResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}
