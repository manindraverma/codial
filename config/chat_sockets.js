//for receiving a request for connection we pass on the socket Server  in below function
 


module.exports.chatSockets=function(socketServer){
//so io has been established and this io will be handling the connection
    let io=require('socket.io')(socketServer , {
        cors: {
          origin: "http://localhost:8000",
          methods: ["GET", "POST"]
        }
      });
      

    //once this connection establishes than below function sends back an aknowledgment that connection has been established by emitting a connect event back  to connectHandler function of chatEngine automatically

    io.sockets.on('connection',function(socket){
        //this emit back that we are connected using connect event of connection Handler

        console.log('new connection received',socket.id);


        //whenever the client disconnect an automatic disconnect event is fired
        socket.on('disconnect',function(){
            console.log('socket disconnected!')
        });



        socket.on('join_room', function(data){
            console.log('joining request rec.', data);

            socket.join(data.chatroom);

            io.in(data.chatroom).emit('user_joined', data);
        });

        // CHANGE :: detect send_message and broadcast to everyone in the room
        socket.on('send_message', function(data){
            io.in(data.chatroom).emit('receive_message', data);
        });
    });
}