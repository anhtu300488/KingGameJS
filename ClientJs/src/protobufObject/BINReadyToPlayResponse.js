/**
 * Created by MyPC on 16/01/2017.
 */
var BINReadyToPlayResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        BinParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/ready_to_play.proto').build('bigken.readytoplay'),
        BinParamProto = BinParamProtobuf.BINReadyToPlayResponse;

    var protoBufData = BinParamProto.decode(protoBufVar);

    return protoBufData;
}
