var canvas = document.getElementById('myCanvas');
var gl = canvas.getContext('webgl');

//### Funkcja do obliczania punktów sześciokąta foremnego ###
function calculateRegularHexagonVertices(centerX, centerY, radius) {
    var vertices = [];
    for (var i = 0; i < 6; i++) {
        var angle = (2 * Math.PI / 6) * i;
        var x = centerX + radius * Math.cos(angle);
        var y = centerY + radius * Math.sin(angle);
        vertices.push(x, y);
    }
    return vertices;
}

//### Wierzchołki sześciokąta foremnego ###
var centerX = 0.0;
var centerY = 0.0;
var radius = 0.7;	//ustalanie wielkości sześciokąta (odległość od jego środka)
var vertices = calculateRegularHexagonVertices(centerX, centerY, radius);


var vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

// ### Korzystanie z Shadera ###
var vertCode = `
  attribute vec2 coordinates;
  void main(void) {
     gl_Position = vec4(coordinates, 0.0, 1.0);
  }
`;


var vertShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertShader, vertCode);
gl.compileShader(vertShader);

//### Ustalanie koloru sześciokąta ###
var fragCode = `
  void main(void) {
    gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);   
  }
`;

//### Tworzenie shadera fragmentów figury ###
var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragShader, fragCode);
gl.compileShader(fragShader);

//### Tworzenie programu shaderów ###
var shaderProgram = gl.createProgram();
gl.attachShader(shaderProgram, vertShader);
gl.attachShader(shaderProgram, fragShader);
gl.linkProgram(shaderProgram);
gl.useProgram(shaderProgram);

// Linkowanie atrybutu
var coord = gl.getAttribLocation(shaderProgram, "coordinates");
gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(coord);

//### Funkcja odpowiadająca za rysowanie sześciokąta ###
gl.clearColor(1.0, 1.0, 1.0, 1.0);   //ustalenie koloru tła
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.TRIANGLE_FAN, 0, vertices.length / 2);  //rysowanie sześciokąta
