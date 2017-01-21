var keypressToButtons = {
    'u': 'button-a',
    'i': 'button-x',
    'j': 'button-b',
    'k': 'button-y',
    'o': 'button-select',
    'p': 'button-start',
    't': 'button-r',
    'y': 'button-l'
};
var keys = Object.keys(keypressToButtons);
var directionKeys = ["w", "a", "s", "d", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

$(function() {
    var gamepad = new Gamepad();

    function generateDirectionObject(arrowKey, keydown) {
        switch (arrowKey) {
            case "w":
            case "ArrowUp":
                return {'up': keydown, 'down': false, 'left': false, 'right': false};
                break;
            case "s":
            case "ArrowDown":
                return {'up': false, 'down': keydown, 'left': false, 'right': false};
                break;
            case "a":
            case "ArrowLeft":
                return {'up': false, 'down': false, 'left': keydown, 'right': false};
                break;
            case "d":
            case "ArrowRight":
                return {'up': false, 'down': false, 'left': false, 'right': keydown};
                break;
        }
    }

    function handleKeyDown(evt) {
        if (keys.includes(evt.key)){
            gamepad.setButton(keypressToButtons[evt.key], true);
        }
        else if (directionKeys.includes(evt.key)) {
            // Keypress down
            gamepad.setDirection(generateDirectionObject(evt.key, false), generateDirectionObject(evt.key, true));
        }
        else {
            console.error("Unknown key - " + evt.key);
        }
    };

    function handleKeyUp(evt) {
        if (keys.includes(evt.key)){
            gamepad.setButton(keypressToButtons[evt.key], false);
        }
        else if (directionKeys.includes(evt.key)) {
            // Keypress up
            gamepad.setDirection(generateDirectionObject(evt.key, true), generateDirectionObject(evt.key, false));
        }
        else {
            console.error("Unknown key - " + evt.key);
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
});