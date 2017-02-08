/**
 * Created by MyPC on 16/01/2017.
 */
var BINStartMatchResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        BinParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/start_match.proto').build('bigken.startmatch'),
        BinParamProto = BinParamProtobuf.BINStartMatchResponse;

    var protoBufData = BinParamProto.decode(protoBufVar);

    return protoBufData;
}
