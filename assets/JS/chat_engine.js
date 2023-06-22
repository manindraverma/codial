//this class will send a request for connection
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox= $(`#${chatBoxId}`);
        this.userEmail=userEmail;
        //below we are sending the connect request
      //  this.socket=io.connect('http://localhost:5000');

      //use below for using during deployment bcoz localhost will not be accessible
        this.socket=io.connect('http://13.235.77.59 :5000');


        //below we are calling the connection Handler which detects if the connection has been completed by emitting a connect event
        if(this.userEmail){
            this.connectionHandler();
        }
    }

//as soon as i send the request the connection handler detests using the s
    connectionHandler(){
        let self=this;

        this.socket.on('connect',function(){
            console.log('connection established using sockets....!');
        

        self.socket.emit('join_room',{
            user_email:self.userEmail,
            chatroom:'codeial'
        })


        self.socket.on('user_joined',function(data){
            console.log('a user joined!', data);
        });

    });

        //send the message on clicking the send button
        $('#send-message').click(function(){
            console.log('is it working');
            let msg = $('#chat-message-input').val();

            if (msg != ''){
                self.socket.emit('send_message', {
                    message: msg,
                    user_email: self.userEmail,
                    chatroom: 'codeial'
                });
            }
        });

        self.socket.on('receive_message', function(data){
            console.log('message received', data.message);


            let newMessage = $('<li>');

            let messageType = 'other-message';

            if (data.user_email == self.userEmail){
                messageType = 'self-message';
            }

            newMessage.append($('<span>', {
                'html': data.message
            }));

            newMessage.append($('<sub>', {
                'html': data.user_email
            }));

            newMessage.addClass(messageType);

            $('#chat-messages-list').append(newMessage);
        })
        
    }
}



// class ChatEngine{
//     constructor(chatBoxId, userEmail){
//         this.chatBox = $(`#${chatBoxId}`);
//         this.userEmail = userEmail;

//         this.socket = io.connect('http://localhost:5000');

//         if (this.userEmail){
//             this.connectionHandler();
//         }

//     }


//     connectionHandler(){
//         let self = this;

//         this.socket.on('connect', function(){
//             console.log('connection established using sockets...!');


//             self.socket.emit('join_room', {
//                 user_email: self.userEmail,
//                 chatroom: 'codeial'
//             });

//             self.socket.on('user_joined', function(data){
//                 console.log('a user joined!', data);
//             })


//         });

//         // CHANGE :: send a message on clicking the send message button
//         $('#send-message').click(function(){
//             let msg = $('#chat-message-input').val();

//             if (msg != ''){
//                 self.socket.emit('send_message', {
//                     message: msg,
//                     user_email: self.userEmail,
//                     chatroom: 'codeial'
//                 });
//             }
//         });

//         self.socket.on('receive_message', function(data){
//             console.log('message received', data.message);


//             let newMessage = $('<li>');

//             let messageType = 'other-message';

//             if (data.user_email == self.userEmail){
//                 messageType = 'self-message';
//             }

//             newMessage.append($('<span>', {
//                 'html': data.message
//             }));

//             newMessage.append($('<sub>', {
//                 'html': data.user_email
//             }));

//             newMessage.addClass(messageType);

//             $('#chat-messages-list').append(newMessage);
//         })
//     }
// }