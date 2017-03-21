/**
 * Created by MyPC on 16/01/2017.
 */
var BINPingResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        ParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/ping.proto').build('bigken.ping'),
        ParamProto = ParamProtobuf.BINPingResponse;

    var protoBufDatabase = ParamProto.decode(protoBufVar);


    return protoBufDatabase;
}
