//### Shader dla wierzchołków ###
        const vertexShaderSource = `
            attribute vec4 a_Position;

            void main() {
                gl_Position = a_Position;
            }
        `;

//### Ustalanie shadera ###
        const fragmentShaderSource = `
            precision mediump float;
            uniform vec4 u_Color;

            void main() {
                gl_FragColor = u_Color;
            }
        `;

		
		
// ###Podstawowe funkcje odpowiedzialne za działanie WebGL ###
        function main() {
            const canvas = document.getElementById('webgl-canvas');
            const gl = canvas.getContext('webgl');

            if (!gl) {
                console.error('Twoje urządzenie nie obsługuje WebGL ;c');
                return;
            }
			
			
			

//### Funkcje shadera ###
            const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
            const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

//### Tworzenie programu ###
            const program = createProgram(gl, vertexShader, fragmentShader);

            const positionAttributeLocation = gl.getAttribLocation(program, 'a_Position');
            const colorUniformLocation = gl.getUniformLocation(program, 'u_Color');

//### Tworzenie Buffora ###
            const positionBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            const positions = [
                0, 0.5,
                -0.5, -0.5,
                0.5, -0.5
            ];
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

//### Ustalenie koloru tła ###
            gl.clearColor(1, 1, 1, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

//### Użycie programu ###
            gl.useProgram(program);

            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

//### Ustalenie koloru figury###
            let color = [1.0, 0.0, 0.0, 1.0]; // Red

            gl.uniform4fv(colorUniformLocation, color);

//### Funkcja zmieniająca kolor figury ###
            function changeColor() {
                color = [Math.random(), Math.random(), Math.random(), 1.0];
                gl.uniform4fv(colorUniformLocation, color);
                gl.clear(gl.COLOR_BUFFER_BIT);
                gl.drawArrays(gl.TRIANGLES, 0, 3);
            }

//### Tworzenie działania przycisku ###
            const button = document.getElementById('change-color-btn');
            button.addEventListener('click', changeColor);

//### Rysowanie trójkąta ###
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }

//### Dodatkowe funkcje shadera ###
        function createShader(gl, type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Error compiling shader:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }

            return shader;
        }

///### Włączenie programu ###
        function createProgram(gl, vertexShader, fragmentShader) {
            const program = gl.createProgram();
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('Error linking program:', gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }

            return program;
}

window.onload = main;