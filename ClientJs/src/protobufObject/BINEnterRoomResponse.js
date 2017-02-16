/**
 * Created by MyPC on 16/01/2017.
 */

var BINEnterRoomResponse = function (protoBufVar) {
    cc.log("protoBufVar", protoBufVar);
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/enter_room.proto').build('bigken.enterroom'),
        ParamProto = ParamProtobuf.BINEnterRoomResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);

    cc.log("protoBufDatabase", protoBufDatabase);

    return protoBufDatabase;
}

