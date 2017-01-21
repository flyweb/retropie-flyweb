var buttonCodes = {
    'button-a': 0x130,
    'button-x': 0x133,
    'button-b': 0x131,
    'button-y': 0x134,
    'button-select': 0x13a,
    'button-start': 0x13b,
    'button-r': 0x137,
    'button-l': 0x136
};

var Gamepad = function() {
    this.socket = io();
    this.padId = -1;
}

Gamepad.prototype.connectGamepad = function(callback) {
    this.socket.emit('connectGamepad');
    this.socket.on('gamepadConnected', function(padId) {
        this.padId = padId;
        this.socket.emit('padEvent', {type: 0x03, code: 0x00, value: 127});
        this.socket.emit('padEvent', {type: 0x03, code: 0x01, value: 127});
        callback();
    }.bind(this));
}

Gamepad.prototype.setButton = function(button, pushed) {
    this.socket.emit('padEvent', {
        type: 0x01,
        code: buttonCodes[button],
        value: pushed ? 1 : 0
    });
}

Gamepad.prototype.setDirection = function(oldDirections, newDirections) {
    if (oldDirections.left != newDirections.left || oldDirections.right != newDirections.right) {
        var x = newDirections.left ? 0 : newDirections.right ? 255 : 127;
        this.socket.emit('padEvent', {type: 0x03, code: 0x00, value: x});
    }
    if (oldDirections.up != newDirections.up || oldDirections.down != newDirections.down) {
        var y = newDirections.up ? 0 : newDirections.down ? 255 : 127;
        this.socket.emit('padEvent', {type: 0x03, code: 0x01, value: y});
    }
}