var canvas = document.getElementById('myCanvas');

var gl = canvas.getContext('webgl');

if (!gl) {
	console.error('Twoje urządzenie nie obsługuje WebGL :c');
        return;
}

//### Koordynaty wierzchołków trójkątów ###

        var vertices = [
			0.5,  0.5,
			-0.5,  0.5,
			0.5, -0.5,  //jeden trójkąt
			-0.5,  0.5,
			0.5, -0.5,
			-0.5, -0.5  //drugi trójkąt
];

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

		
//### Użycie shadera ###		
        var vertexShaderCode = `
            attribute vec2 coordinates;
            void main(void) {
                gl_Position = vec4(coordinates, 0.0, 1.0);
            }
        `;

        var fragmentShaderCode = `
            void main(void) {
                gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);   //ustalenie kolory kwadratu
            }
        `;

        var vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderCode);
        gl.compileShader(vertexShader);

        var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderCode);
        gl.compileShader(fragmentShader);

        var shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        gl.useProgram(shaderProgram);

        var coord = gl.getAttribLocation(shaderProgram, "coordinates");
        gl.vertexAttribPointer(coord, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(coord);

//### Rysowanie trójkątów na kwadrat ###
        gl.clearColor(1.0, 1.0, 1.0, 1.0);  //ustalenie koloru tła
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 6);  //rysowanie z użyciem gl.drawArrays 
