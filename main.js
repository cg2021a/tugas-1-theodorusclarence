// https://github.com/cg2021c/learn-webgl-hadziq/blob/main/main.js

function main() {
  // Access the canvas through DOM: Document Object Model
  /**
   * @type {HTMLCanvasElement} canvas
   */
  const canvas = document.getElementById('myCanvas'); // The paper

  /**
   * @type {WebGLRenderingContext} gl
   */
  const gl = canvas.getContext('webgl'); // The brush and the paints

  // Create a linked-list for storing the vertices data
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  const vertexShaderSource = `
    attribute vec2 aPosition;
    attribute vec3 aColor;
    varying vec3 vColor;
    uniform mat4 uTranslate;

    void main() {
      gl_Position = uTranslate * vec4(aPosition, 0.0, 1.0);
      vColor = aColor;
    }
  `;

  // gl_FragColor = vec4(0.74, 0.149, 0.137, 1.0);
  const fragmentShaderSource = `
  precision mediump float;
  varying vec3 vColor;
  void main() {
      gl_FragColor = vec4(vColor, 1.0);
    }
  `;

  // Create .c in GPU
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);

  // Compile .c into .o
  gl.compileShader(vertexShader);
  gl.compileShader(fragmentShader);

  // Prepare a .exe shell (shader program)
  const shaderProgram = gl.createProgram();

  // Put the two .o files into the shell
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);

  // Link the two .o files, so together they can be a runnable program/context.
  gl.linkProgram(shaderProgram);

  // Start using the context (analogy: start using the paints and the brushes)
  gl.useProgram(shaderProgram);

  // Teach the computer how to collect
  //  the positional values from ARRAY_BUFFER
  //  to each vertex being processed
  const aPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
  gl.vertexAttribPointer(
    aPosition,
    2,
    gl.FLOAT,
    false,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(aPosition);

  const aColor = gl.getAttribLocation(shaderProgram, 'aColor');
  let colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(color), gl.STATIC_DRAW);
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(aColor);

  let dy = 0;
  let speed = 0.0104;

  const uTranslate = gl.getUniformLocation(shaderProgram, 'uTranslate');
  // prettier-ignore
  const leftObject = [
		1.0, 0.0, 0.0, 0.0, // width
		0.0, 1.0, 0.0, 0.0, // height
		0.0, 0.0, 1.0, 0.0, // depth
		-0.50, 0.0, 0.0, 1, 
	]

  function render() {
    // prettier-ignore
    const rightObject = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.50, dy, 0.0, 1.0,
    ]

    if (dy >= 0.5 || dy <= -0.4) speed = -speed;
    // dy += speed;

    // Clear Color
    gl.clearColor(0.13, 0.13, 0.13, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Draw Left Object
    gl.uniformMatrix4fv(uTranslate, false, leftObject);
    gl.drawArrays(gl.TRIANGLES, 0, leftObjectVertices.length / 2);

    // Draw Right Object
    gl.uniformMatrix4fv(uTranslate, false, rightObject);
    gl.drawArrays(
      gl.TRIANGLES,
      leftObjectVertices.length / 2,
      (vertices.length - leftObjectVertices.length) / 2
    );

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}

main();
