/**
 * Created by MyPC on 16/01/2017.
 */
var BINCreateRoomResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/create_room.proto').build('bigken.createroom'),
        ParamProto = ParamProtobuf.BINCreateRoomResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}
