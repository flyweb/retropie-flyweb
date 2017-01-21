var socket = io();

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
