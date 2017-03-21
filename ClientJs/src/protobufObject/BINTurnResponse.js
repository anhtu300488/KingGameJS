/**
 * Created by MyPC on 16/01/2017.
 */
var BINTurnResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/turn.proto').build('bigken.turn'),
        ParamProto = ParamProtobuf.BINTurnResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}