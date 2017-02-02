/**
 * Created by MyPC on 16/01/2017.
 */
var BINEnterZoneResponse = function (protoBufVar) {
    cc.log("protoBufVar", protoBufVar);
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/enter_zone.proto').build('bigken.enterzone'),
        ParamProto = ParamProtobuf.BINEnterZoneResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);
    cc.log("protoBufDatabase", protoBufDatabase);

    return protoBufDatabase;
}
