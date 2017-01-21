var socket = io();

socket.on('currentEmulator', function(emulator){
  console.log(emulator)
});
