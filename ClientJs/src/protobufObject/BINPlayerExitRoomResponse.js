/**
 * Created by MyPC on 16/01/2017.
 */
var BINPlayerExitRoomResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/exit_room.proto').build('bigken.exitroom'),
        ParamProto = ParamProtobuf.BINExitRoomResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}
