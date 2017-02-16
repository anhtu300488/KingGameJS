/**
 * Created by MyPC on 16/01/2017.
 */
var BINPlayerEnterRoomResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/enter_room.proto').build('bigken.enterroom'),
        ParamProto = ParamProtobuf.BINPlayerEnterRoomResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}
