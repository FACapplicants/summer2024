// TODO: Put conditional for outer grid points before the transformation. 
document.addEventListener('DOMContentLoaded', function() {
  function initializeAnimation() {
      var canvastag = document.getElementById('canvasCubeGrid');
      if (!canvastag) {
          console.error("Canvas element with id 'canvasCubeGrid' not found.");
          return; // Exit early if canvas element is not found
      }
    var tmr = undefined;
    var A = 0, B = 0, G = 0;
    var cubeSize = 50;
    var minDistance = -cubeSize/2
    var maxDistance = cubeSize/2
    var dotSpacing = 5;
    var K1 = 150; 
    var K2 = 90; 
    var ctx = canvastag.getContext('2d');

    var canvasframe = function() {
      ctx.fillStyle = '#000';
      ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height)
      var centerWidth = ctx.canvas.width/2
      var centerHeight = ctx.canvas.height/2
      A += 0.00; 
      B += 0.03;
      G += 0.07;
      var cA = Math.cos(A), sA = Math.sin(A),
          cB = Math.cos(B), sB = Math.sin(B), 
          sG = Math.sin(G), cG = Math.cos(G);
      for (var i = minDistance; i <= maxDistance; i += dotSpacing) {
        for (var j = minDistance; j <= maxDistance; j += dotSpacing) {
          for (var k = 0; k <= cubeSize; k += dotSpacing) {
              var ox = i;
              var oy = j;
              var oz = k;
              var x = cA*cB*ox + (cA*sB*sG-sA*cG)*oy + (cA*sB*cG + sA*sG)*oz;
              var y = sA*sB*ox + (sA*sB*sG+cA*cG)*oy + (sA*sB*cG - cA*sG)*oz;
              var ooz = 1/(K2 -sB*ox + cB*sG*oy + cB*cG*oz);
              var xp = (centerWidth + K1*ooz*x);
              var yp = (centerHeight - K1*ooz*y);
              if (!(Math.abs(i) == Math.abs(maxDistance) || Math.abs(j) == Math.abs(maxDistance) || (k == 0)|| k == cubeSize)) {
              var L = 0;
              } else {
              var L = 0.5;
              };
              if (L > 0) {
              ctx.fillStyle = 'rgba(255,255,255,' + L + ')';
              ctx.fillRect(xp, yp, 2, 2);
              };
          }
        }
      }
  };

  window.startAnimation = function() {
    if (tmr === undefined) {
      tmr = setInterval(canvasframe, 50);
    }
  };

  window.stopAnimation = function() {
    if (tmr !== undefined) {
      clearInterval(tmr);
      tmr = undefined;
    }
  };


  var startButton = document.getElementById('startCubeGridButton');
  var stopButton = document.getElementById('stopCubeGridButton');

  startButton.addEventListener('click', startAnimation);
  stopButton.addEventListener('click', stopAnimation);

  startAnimation();

}
  var checkContentLoaded = function() {
    return document.getElementById('canvasCubeGrid') !== null;
  };

  var intervalId = setInterval(function() {
    if (checkContentLoaded()) {
        clearInterval(intervalId);
        initializeAnimation(); 
    }
  }, 100); // checking interval
  });
