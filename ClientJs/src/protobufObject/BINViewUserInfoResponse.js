/**
 * Created by MyPC on 05/01/2017.
 */
var BINViewUserInfoResponse = function (protoBufVar) {
    var ProtoBuf = dcodeIO.ProtoBuf,
        BinParamProtobuf = ProtoBuf.loadProtoFile('res/protobuf/login.proto').build('bigken.userinfo'),
        BinParamProto = BinParamProtobuf.BINUserInfo;

    var protoBufData = BinParamProto.decode(protoBufVar);

    return protoBufData;
}
