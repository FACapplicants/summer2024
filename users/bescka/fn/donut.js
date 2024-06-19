// Wait for the whole document to be loaded before initializing animation
document.addEventListener('DOMContentLoaded', function() {
  function initializeAnimation() {
      var canvastag = document.getElementById('canvasDonut');
      if (!canvastag) {
          console.error("Canvas element with id 'canvasDonut' not found.");
          return; // Exit early if canvas element is not found
      }

      var tmr = undefined;
      var A = 1, B = 1;
      var R1 = 1;
      var R2 = 2;
      var K1 = 150;
      var K2 = 5;
      var ctx = canvastag.getContext('2d');

      var canvasframe = function() {
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

          A += 0.03;
          B += 0.07;
          var cA = Math.cos(A), sA = Math.sin(A),
              cB = Math.cos(B), sB = Math.sin(B);
          for (var j = 0; j < 6.28; j += 0.3) { // j <=> theta
              var ct = Math.cos(j), st = Math.sin(j); // cosine theta, sine theta
              for (var i = 0; i < 6.28; i += 0.1) {   // i <=> phi
                  var sp = Math.sin(i), cp = Math.cos(i); // cosine phi, sine phi
                  var ox = R2 + R1 * ct, // object x, y = (R2,0,0) + (R1 cos theta, R1 sin theta, 0)
                      oy = R1 * st;

                  var x = ox * (cB * cp + sA * sB * sp) - oy * cA * sB; // final 3D x coordinate
                  var y = ox * (sB * cp - sA * cB * sp) + oy * cA * cB; // final 3D y
                  var ooz = 1 / (K2 + cA * ox * sp + sA * oy); // one over z
                  var xp = (150 + K1 * ooz * x); // x' = screen space coordinate, translated and scaled to fit our 320x240 canvas element
                  var yp = (120 - K1 * ooz * y); // y' (it's negative here because in our output, positive y goes down but in our 3D space, positive y goes up)
                  // luminance, scaled back to 0 to 1
                  var L = 0.7 * (cp * ct * sB - cA * ct * sp - sA * st + cB * (cA * st - ct * sA * sp));
                  if (L > 0) {
                      ctx.fillStyle = 'rgba(255,255,255,' + L + ')';
                      ctx.fillRect(xp, yp, 1.5, 1.5);
                  }
              }
          }
      };

      function startAnimation() {
          if (tmr === undefined) {
              tmr = setInterval(canvasframe, 50);
          }
      };

      function stopAnimation() {
          if (tmr !== undefined) {
              clearInterval(tmr);
              tmr = undefined;
          }
      };

      var startButton = document.getElementById('startDonutButton');
      var stopButton = document.getElementById('stopDonutButton');

      startButton.addEventListener('click', startAnimation);
      stopButton.addEventListener('click', stopAnimation);

      startAnimation();
  }

  var checkContentLoaded = function() {
      return document.getElementById('canvasDonut') !== null;
  };

  var intervalId = setInterval(function() {
      if (checkContentLoaded()) {
          clearInterval(intervalId);
          initializeAnimation(); 
      }
  }, 100); // checking interval
});
