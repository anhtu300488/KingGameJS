/**
 * Created by MyPC on 05/01/2017.
 */
var BINLoginResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/login.proto').build('bigken.login'),
        ParamProto = ParamProtobuf.BINLoginResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}