module.exports = function(server) {
    // Initialize WS server
    var io = require('socket.io')(server, {origins: '*:*'});
    var keyboard_hub = require('../virtual_gamepad/virtual_keyboard_hub');
    var gamepad_hub = require('../virtual_gamepad/virtual_gamepad_hub');

    var kb_hub = new keyboard_hub();
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
        socket.on('connectKeyboard', function() {
          return kb_hub.connectKeyboard(function(keyBoardId) {
            if (keyBoardId !== -1) {
              console.info('Keyboard connected');
              socket.keyBoardId = keyBoardId;
              return socket.emit('keyboardConnected', {
                boardId: keyBoardId
              });
            } else {
              return console.info('Keyboard connect failed');
            }
          });
        });
        return socket.on('boardEvent', function(data) {
          console.info('Board event', data);
          if (socket.keyBoardId !== void 0 && data) {
            return kb_hub.sendEvent(socket.keyBoardId, data);
          }
        });
    });
}
