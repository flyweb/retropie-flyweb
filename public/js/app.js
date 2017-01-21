var FullScreenController = (function() {
  var FULL_SCREEN_CHANGE_EVENT =
    ('onwebkitfullscreenchange' in document) ? 'webkitfullscreenchange' :
       ('onmozfullscreenchange' in document) ?    'mozfullscreenchange' :
                                                     'fullscreenchange';
var socket = io();

  function _onTouchStart() {
    if (!window.fullScreen) {
      if (document.documentElement.webkitRequestFullScreen)
        document.documentElement.webkitRequestFullScreen();
      if (document.documentElement.mozRequestFullScreen)
        document.documentElement.mozRequestFullScreen();
      if (document.documentElement.requestFullScreen)
        document.documentElement.requestFullScreen();
    }
  }

  function _onFullScreenChange() {
    screen.orientation.lock('landscape-primary');
  }

  return {
    start: function() {
      window.addEventListener('touchstart', _onTouchStart);
      document.addEventListener(FULL_SCREEN_CHANGE_EVENT, _onFullScreenChange);
    },

    stop: function() {
      window.removeEventListener('touchstart', _onTouchStart);
      document.removeEventListener(FULL_SCREEN_CHANGE_EVENT, _onFullScreenChange);
    }
  };
})();

FullScreenController.start();

socket.on('currentEmulator', function(emulator){
  console.log(emulator)

  var controllerSVG;
  if (emulator == "lr-strella") {
    controllerSVG = '/svg/atari2600.svg';
  } else if (emulator == 'lr-snes9x2010') {
    controllerSVG = '/svg/snes.svg';
  } else if (emulator == 'lr-fceumm') {
    controllerSVG = '/svg/nes.svg';
  } else {
    controllerSVG = '/svg/snes.svg';
  }
 
  $('svg').remove();
  $('#controller').load(controllerSVG);
});
