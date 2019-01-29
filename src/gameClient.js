
let servicehost = "ws://192.168.5.118:8010";


function GameClient(){
    this.ws = null;


    var client = this;

    ws = new WebSocket( servicehost );

    ws.onopen = function(e){
        client.clientListener({
            state: "connected"
        });
    }

    ws.onclose = function(){
        client.clientListener({
            state: "closed"
        });
    }

    ws.onerror = function(e){
        client.clientListener({
            state: "error",
            data: e
        });
    }

    ws.onmessage = function(e){
        client.clientListener({
            state: "onmessage",
            data: e.data
        });
    }

    this.clientListener = function(e){

    }

    GameClient.prototype.pair = function( userId ){
        ws.send( JSON.stringify({
            cmd: "Pair",
            id: userId 
        }) );
    }

    GameClient.prototype.selectCard = function( cardIndex ){
        ws.send( JSON.stringify({
            cmd: "SelectedCard",
            card: cardIndex
        }) );
    }

    GameClient.prototype.connect = function(){
        if( ws == null ){
            ws = new WebSocket( servicehost );
        }
    }
}