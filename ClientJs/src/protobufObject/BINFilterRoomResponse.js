/**
 * Created by MyPC on 16/01/2017.
 */
var BINFilterRoomResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/filter_room.proto').build('bigken.filterroom'),
        ParamProto = ParamProtobuf.BINFilterRoomResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);

    return protoBufDatabase;
}

