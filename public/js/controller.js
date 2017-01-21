$(function() {
    var ongoingTouches = [];
    var dpadDirections = {up: false, down: false, left: false, right: false};

    function copyTouch(touch) {
        return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY, target: touch.target };
    }

    function findOngoingTouch(id) {
       ongoingTouches.forEach(function(touch, i) {
           if (touch.identifier === id) return i;
       });
       return -1;
    }

    function handleButtonStart(e) {
        for (var i=0; i<e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            ongoingTouches.push(copyTouch(touch));
            var button = touch.target.id;
            console.log(`${button} pressed`);
        }
    }

    function handleButtonEnd(e) {
        for (var i=0; i<e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            var index = findOngoingTouch(touch.identifier);
            var button = touch.target.id;
            console.log(`${button} unpressed`);
            ongoingTouches.splice(index, 1);
        }
    }

    $('#controller').on('touchstart', '.button', handleButtonStart);
    $('#controller').on('touchend', '.button', handleButtonEnd);

    function getDpadDirections(x, y) {
        var $dpad = $('#dpad');
        var offset = $dpad.offset();
        var width = $dpad.width();
        var height = $dpad.height();
        var centerX = offset.left + width / 2;
        var centerY = offset.top + height / 2;

        var deadzoneRatio = 0.2;
        var deadzoneWidth = width * deadzoneRatio;
        var deadzoneHeight = height * deadzoneRatio;
        var deadzone = {
            top: centerY - deadzoneHeight/2,
            bottom: centerY + deadzoneHeight/2,
            left: centerX - deadzoneWidth/2,
            right: centerX + deadzoneWidth/2
        }

        var newDirections = {up: true, down: true, left: true, right: true};

        if (x > deadzone.left && x < deadzone.right) {
            newDirections.left = false;
            newDirections.right = false;
        }
        if (y > deadzone.top && y < deadzone.bottom) {
            newDirections.up = false;
            newDirections.down = false;
        }
        if (x < centerX) newDirections.right = false;
        else if (x > centerX) newDirections.left = false;
        if (y < centerY) newDirections.down = false;
        else if (y > centerY) newDirections.up = false;

        return newDirections;
    }

    function handleDpadStart(e) {
        for (var i=0; i<e.originalEvent.changedTouches.length; i++) {
            var touch = e.originalEvent.changedTouches[i];
            ongoingTouches.push(copyTouch(touch));
            dpadDirections = getDpadDirections(touch.pageX, touch.pageY);
        }
    }

    function handleDpadMove(e) {
        for (var i=0; i<e.originalEvent.changedTouches.length; i++) {
            var touch = e.originalEvent.changedTouches[i];
            var index = findOngoingTouch(touch.identifier);
            ongoingTouches.splice(index, 1, copyTouch(touch));
            dpadDirections = getDpadDirections(touch.pageX, touch.pageY);
        }
    }

    function handleDpadEnd(e) {
        for (var i=0; i<e.changedTouches.length; i++) {
            var touch = e.changedTouches[i];
            var index = findOngoingTouch(touch.identifier);
            ongoingTouches.splice(index, 1);
            console.log('dpad unpressed');
        }
    }

    $('#controller').on('touchstart', '#dpad', handleDpadStart);
    $('#controller').on('touchmove', '#dpad', handleDpadMove);
    $('#controller').on('touchend', '#dpad', handleDpadEnd);
});
