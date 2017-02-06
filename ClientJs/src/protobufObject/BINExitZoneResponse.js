/**
 * Created by MyPC on 16/01/2017.
 */
var BINExitZoneResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/enter_zone.proto').build('bigken.enterzone'),
        ParamProto = ParamProtobuf.BINExitZoneResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);

    return protoBufDatabase;
}
