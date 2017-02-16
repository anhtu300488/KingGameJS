/**
 * Created by MyPC on 04/01/2017.
 */

var BINInitializeResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        BinParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/initialize.proto').build('bigken.initialize'),
        BinParamProto = BinParamProtobuf.BINInitializeResponse;

    // var BinParamProto = Bigken.initialize.BINInitializeResponse;

    var protoBufData = BinParamProto.decode(protoBufVar);

    return protoBufData;
}


// function BINInitializeResponse(value) {}