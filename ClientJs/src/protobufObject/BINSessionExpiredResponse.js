/**
 * Created by MyPC on 16/01/2017.
 */
var BINMatchBeginResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/session_expired.proto').build('bigken.sessionexpired'),
        ParamProto = ParamProtobuf.BINSessionExpiredResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}
