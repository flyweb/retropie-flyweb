module.exports = function(server) {
    // Initialize WS server
    var io = require('socket.io')(server, {origins: '*:*'});

    var gamepad_hub = require('../virtual_gamepad/virtual_gamepad_hub');
    var gp_hub = new gamepad_hub();

    // Handle WS messages from gamepad
    io.on('connection', function(socket) {
        socket.on('disconnect', function() {
          if (socket.gamePadId !== 0) {
            console.info('Gamepad disconnected');
            return gp_hub.disconnectGamepad(socket.gamePadId, function() {});   
          } else {
            return console.info('Unknown disconnect');
          }
        });
        socket.on('connectGamepad', function() {
          return gp_hub.connectGamepad(function(gamePadId) {
            if (gamePadId !== -1) {
              console.info('Gamepad connected');
              socket.gamePadId = gamePadId;
              return socket.emit('gamepadConnected', {
                padId: gamePadId
              });
            } else {
              return console.info('Gamepad connect failed');
            }
          });
        });
        socket.on('padEvent', function(data) {
          console.info('Pad event', data);
          if (socket.gamePadId !== 0 && data) {
            return gp_hub.sendEvent(socket.gamePadId, data);
          }
        });
    });
}
