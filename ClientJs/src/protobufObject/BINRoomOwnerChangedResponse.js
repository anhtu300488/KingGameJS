/**
 * Created by MyPC on 16/01/2017.
 */
var BINRoomOwnerChangedResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/room_owner_changed.proto').build('bigken.roomownerchanged'),
        ParamProto = ParamProtobuf.BINRoomOwnerChangedResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}
