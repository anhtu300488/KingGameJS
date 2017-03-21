/**
 * Created by MyPC on 16/01/2017.
 */
var BINSessionExpiredResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/match_begin.proto').build('bigken.matchbegin'),
        ParamProto = ParamProtobuf.BINMatchBeginResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}
