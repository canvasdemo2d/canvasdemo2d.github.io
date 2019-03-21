const demoCanvas = document.getElementById('game-canvas').getContext("2d");

demoCanvas.beginPath();

function randomizeImage() {
  var rectData = demoCanvas.getImageData(0, 0, 400, 400);
  for (var y=0; y<400; y++) {
    for (var x=0; x<400; x++) {
      const offset = 4*(y*400+x);// 4* because each pixel is 4 bytes
      rectData.data[offset] = Math.floor(Math.random() * 256);// red
      rectData.data[offset+1] = Math.floor(Math.random() * 256);// green
      rectData.data[offset+2] = Math.floor(Math.random() * 256);// blue
      rectData.data[offset+3] = 255;// alpha, fully opaque
    }
  }

  demoCanvas.putImageData(rectData, 0, 0);
}

var oldX = 0, oldY = 0;
function onPointerMove(evt) {
  var newX = evt.clientX, newY = evt.clientY;
  newX -= 200; newY -= 200;// rel. to center
  var deltaX = newX - oldX, deltaY = newY - oldY;

  var ang = Math.atan(deltaY/deltaX);
  oldX = newX; oldY = newY;
  demoCanvas.translate(deltaX, deltaY);
  demoCanvas.drawImage(document.getElementById('game-canvas'), 0, 0);
}

window.onload = function() {
  randomizeImage();

  // demoCanvas ain't the Canvas element - it's the 2d context
  document.getElementById('game-canvas').onpointermove = onPointerMove;
}
/* beginPath/closePath aren't required for this code */

demoCanvas.closePath();
