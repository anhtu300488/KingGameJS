/**
 * Created by MyPC on 16/01/2017.
 */
var BINMatchEndResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/match_end.proto').build('bigken.matchend'),
        ParamProto = ParamProtobuf.BINMatchEndResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}
