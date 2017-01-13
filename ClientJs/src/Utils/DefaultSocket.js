/**
 * Created by MyPC on 10/01/2017.
 */
var bufferReader;
var lengthBufferReader;

// var connectSocket = function (ip, port) {
//     cc.log("openSocket");
//     var data = null;
//     try{
//         var url = "ws://"+ip+":"+port+"/"+PATH;
//         ws = new WebSocket(url);
//
//         ws.onopen = function(e){
//             ws.send(data);
//         };
//
//         ws.onmessage = function(e){
//             cc.log("data", e.data);
//         };
//
//         setConnected(true);
//
//         // return true;
//     }catch (e){
//         setConnected(false);
//         cc.log("connect fail");
//         cc.error('Sorry, the web socket at "%s" is un-available', url);
//         // return false;
//     }
//
//
// }

function connectSocket(ip, port) {

    cc.log("openSocket");
    var data = getDataBuf();
    cc.log("data", data);
    try{
        var url = "ws://"+ip+":"+port+"/"+PATH;
        ws = new WebSocket(url);

        ws.onopen = function(e){
            ws.send(data);
        };

        ws.onmessage = function(e) {
            // setConnected(true);
            // setHanderMessage(true);
            // setLengthBufferReader(e.data.byteLength);
            // onMessage(e);

            if( (e.data!==null || e.data !== 'undefined') && e.data.type != '')
            {
                var listMessages = parseFrom(e.data, e.data.byteLength);

                var messageid = listMessages['messageid'];

                cc.log("messageid", messageid);

                switch (messageid){
                    case NetworkManager.INITIALIZE:
                        cc.director.runScene(new LoginScene());
                        break;
                    // default:
                    //     cc.director.runScene(new LoginScene());
                    //     break;
                }
            }


        };

        // ws.onerror = function(e) {
        //     onError(e);
        // };

        // ws.onclose = function(){
        //     setConnected(false);
        //     setHanderMessage(false);
        // }

        setConnected(true);

         return true;
    }catch (e){
        setConnected(false);
        cc.log("connect fail");
        cc.error('Sorry, the web socket at "%s" is un-available', url);
         return false;
    }


}

function onOpen(e) {
    var data = null;
    doSend(data);
}

function onMessage(e) {
    // lengthBufferReader = e.data.byteLength;
    cc.log("onMessage", e.data);
    if(e.data!==null || e.data !== 'undefined')
    {
        var listMessages = parseFrom(e.data, e.data.byteLength);

        var messageid = listMessages['messageid'];

        cc.log("messageid", messageid);

        switch (messageid){
            case NetworkManager.INITIALIZE:
                cc.director.runScene(new LoginScene());
                break;
            // default:
            //     cc.director.runScene(new LoginScene());
            //     break;
        }
    }
}



function onError(e) {
    cc.log(e.data);
}

function doSend(message) {
    cc.log("doSend", message);
    ws.onopen = function(e){
        cc.log("send message", message);
        ws.send(message);
    };
    // cc.log("send message", message);
    // ws.send(message);
}

// var setBufferReader = function(_isBufferReader) {
//     bufferReader = _isBufferReader;
// }
//
// var setLengthBufferReader = function(_isLengthBufferReader) {
//     lengthBufferReader = _isLengthBufferReader;
// }
//
// var islengthBuffer = function() {
//     cc.log(" return lengthBufferReader", lengthBufferReader);
//     return lengthBufferReader;
// }
