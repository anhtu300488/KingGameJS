/**
 * Created by MyPC on 16/01/2017.
 */
var BINPlayerExitAfterMatchEndResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/exit_room.proto').build('bigken.exit_room'),
        ParamProto = ParamProtobuf.BINPlayerExitAfterMatchEndResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}
