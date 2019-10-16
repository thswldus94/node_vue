
exports.socketServer = function(app, httpsServer) {
    var io = require('socket.io')(httpsServer);

    var count=1; 
    io.of("/socket").on('connection', function(socket){  // 채팅방에 접속했을 때 - 1
        console.log('user connected: ', socket.id);  
        var name = "익명의 돼지" + count++;                 
        socket.name = name;
        io.to(socket.id).emit('create_name', name);  
        
        io.emit('new_connect', name);
        
        socket.on('disconnect', function(){   // 채팅방 접속이 끊어졌을 때 - 2
            console.log('user disconnected: '+ socket.id + ' ' + socket.name);
            io.emit('new_disconnect', name);
        });

        socket.on('send', function(data){  // 메세지를 보냈을 때 - 3
            console.log(data);
            
            
            var returnMessage = `${data.name} : ${data.message}`;
            
            if (data.name != socket.name) {
                io.emit('change_name', socket.name, data.name);
            }
            socket.name = data.name;
            
            io.of("/socket").emit('receiveMessage', returnMessage);

            console.log(returnMessage);
        });
        
    });
};
