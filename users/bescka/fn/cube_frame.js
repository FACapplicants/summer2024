//TODO: hashnav
document.addEventListener('DOMContentLoaded', function() {
    function initializeCubeAnimation() {
        var canvas = document.getElementById('canvasCubeFrame');
        if (!canvas) {
            console.error("Canvas element with id 'canvasCubeFrame' not found.");
            return; 
        }
    
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    var cubeSize = 60; 
    var dotSpacing = 5;
    var scale = 1; 
    var offsetX = canvas.width / 2; 
    var offsetY = canvas.height / 2; 
  
    // the corners of the cube. Notably, positive z values are "closer" to the 
    // viewer. so the positions are: 
    var cubeVertices = [
      { x: -cubeSize, y: -cubeSize, z: -cubeSize }, // bottom left far away
      { x: cubeSize, y: -cubeSize, z: -cubeSize },  // bottom right far away
      { x: cubeSize, y: cubeSize, z: -cubeSize }, // top right far away
      { x: -cubeSize, y: cubeSize, z: -cubeSize }, // top left far away
      { x: -cubeSize, y: -cubeSize, z: cubeSize }, // bottom left close 
      { x: cubeSize, y: -cubeSize, z: cubeSize }, // bottom right close
      { x: cubeSize, y: cubeSize, z: cubeSize }, // top right close
      { x: -cubeSize, y: cubeSize, z: cubeSize } // top left close
    ];
    
    // this is an array with the 16 edges of the cube. 
    // the edges are defined by the vertices that they connect
    // so here, [0,1] is the line between cubeVertices[0] and 
    // cubeVertices[1], or the line between the bottom left and bottom right 
    // far away from the viewer. 
    var cubeEdges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ];
  
    var rotationSpeedX = 0.007; // Rotation speed around x-axis (radians per frame)
    var rotationSpeedY = -0.011; // Rotation speed around y-axis (radians per frame)
    var rotationSpeedZ = 0.009; // Rotation speed around z-axis (radians per frame)
    var isRotating = true;
  
    // Here we show the calculation of the rotation matrix explicitly. (blame numpy!)
    // This means we need to also create the necessary matrix/ vector multiplication
    // functions. 
    function multiply3x3MatrixVector(matrix, vector) {
      var result = {
          x: matrix[0][0] * vector.x + matrix[0][1] * vector.y + matrix[0][2] * vector.z,
          y: matrix[1][0] * vector.x + matrix[1][1] * vector.y + matrix[1][2] * vector.z,
          z: matrix[2][0] * vector.x + matrix[2][1] * vector.y + matrix[2][2] * vector.z
      };
      return result;
    }
    
    function multiply3x3Matrices(matrixA, matrixB) {
      var result = [];
      for (var i = 0; i < 3; i++) {
          result[i] = [];
          for (var j = 0; j < 3; j++) {
              result[i][j] = 0;
              for (var k = 0; k < 3; k++) {
                  result[i][j] += matrixA[i][k] * matrixB[k][j];
              }
          }
      }
      return result;
    }
  
    function rotateVector(vector, rotationX, rotationY, rotationZ) {
      // Rotation around x-axis
      // This "rolls" the vector by an angle counterclockwise about the x-axis
      var matrixX = [
          [1, 0, 0],
          [0, Math.cos(rotationX), -Math.sin(rotationX)],
          [0, Math.sin(rotationX), Math.cos(rotationX)]
      ];
  
      // Rotation around y-axis
      // This "pitches" the vector by an angle counterclockwise to the y axis
      var matrixY = [
          [Math.cos(rotationY), 0, Math.sin(rotationY)],
          [0, 1, 0],
          [-Math.sin(rotationY), 0, Math.cos(rotationY)]
      ];
  
      // Rotation around z-axis
      // This is known as the "yaw"
      var matrixZ = [
          [Math.cos(rotationZ), -Math.sin(rotationZ), 0],
          [Math.sin(rotationZ), Math.cos(rotationZ), 0],
          [0, 0, 1]
      ];
  
      // The combined rotation matrix:
      var matrixR = multiply3x3Matrices(matrixZ, multiply3x3Matrices(matrixY, matrixX));
  
      var result = multiply3x3MatrixVector(matrixR, vector);
      return result;
    }
    
    function rotateCube() {
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
      for (var i = 0; i < cubeVertices.length; i++) {
        var vertex = cubeVertices[i];
  
        var rotatedVertex = rotateVector(vertex, rotationSpeedX, rotationSpeedY, rotationSpeedZ);
  
        vertex.x = rotatedVertex.x;
        vertex.y = rotatedVertex.y;
        vertex.z = rotatedVertex.z;
      }
  
      for (var i = 0; i < cubeEdges.length; i++) {
          // here we iterate through all of the edges and fetch the first and 
          // second vertices for each edge
          var v1 = cubeVertices[cubeEdges[i][0]];
          var v2 = cubeVertices[cubeEdges[i][1]];
          
          // Then we get the differences between each co-ordinate to calculate
          // the length of the edge using pythagoras. This will vary during the 
          // rotation but we still need the same number of dots.
          var dx = v2.x - v1.x;
          var dy = v2.y - v1.y;
          var dz = v2.z - v1.z;
          var edgeLength = Math.sqrt(dx * dx + dy * dy + dz * dz);
          var numDots = Math.ceil(edgeLength / dotSpacing);
          var incrementX = dx / numDots;
          var incrementY = dy / numDots;
          var incrementZ = dz / numDots;
  
          var x = v1.x;
          var y = v1.y;
          var z = v1.z;
  
          // The "dots" are then filled in at the defined increment amounts along 
          // the edge. 
          for (var j = 0; j < numDots; j++) {
              var xp = x * scale + offsetX; //offsets are just set to middle of canvas for positioning
              var yp = y * scale + offsetY; //scale gives some flexibility in the size of the render
              
              const L = 0.5;
              ctx.fillStyle = 'rgba(255,255,255,' + L + ')';
              ctx.fillRect(xp, yp, 2, 2);
              
              x += incrementX;
              y += incrementY;
              z += incrementZ;
          }
      }
  
        if (isRotating) {
            // interestingly one reason why requestAnimationFrame is better than 
            // setting intervals for "repainting" the canvas is because it 
            // automatically pauses when the user changes tab/ minimizes the window
            requestAnimationFrame(rotateCube);
        }
    }
  
    document.getElementById('startCubeFrameButton').addEventListener('click', function() {
        if (!isRotating) {
            isRotating = true;
            requestAnimationFrame(rotateCube);
        }
    });
  
    document.getElementById('stopCubeFrameButton').addEventListener('click', function() {
        isRotating = false;
    });

    requestAnimationFrame(rotateCube);
  }
    
    var checkContentLoaded = function() {
        return document.getElementById('canvasCubeFrame') !== null // &&
            //    document.getElementById('startCubeFrameButton') !== null &&
            //    document.getElementById('stopCubeFrameButton') !== null;
    };

    var intervalId = setInterval(function() {
        if (checkContentLoaded()) {
            clearInterval(intervalId); 
            initializeCubeAnimation(); 
        }
    }, 100); // checking interval
});