"use strict";
var gl, thetaLoc, animID, fColorLoc;
var direction = true, delay = 1.0, theta = 0.0, fColor = [0.0, 0.0, 0.0, 1.0];

window.onload = function init() {

    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    thetaLoc = gl.getUniformLocation(program, "theta");
    fColorLoc = gl.getUniformLocation(program, "fColor");

    // ---------- Design vertices here ----------------
    // ------ vertices for line & point ---------
    var lineVertices_P = new Float32Array([
        -0.5, 0.13, -0.5, -0.4
    ]);
    var lineVertices_Y = new Float32Array([
        0.62, -0.09, 0.62, -0.4
    ])
    var lineVertices_Y2 = new Float32Array([
        0.5, 0.08, 0.62, -0.09
    ])
    var lineVertices_Y3 = new Float32Array([
        0.62, -0.09, 0.75, 0.08
    ])

    var dotVertices_PS = new Float32Array([
        -0.25, -0.4
    ])

    var dotVertices_SY = new Float32Array([
        0.38, -0.4
    ])

    // ------ vertices of semicircle -------
    // for P
    var vertices = [];
    for (var i = 0.0; i <= 180; i += 1) {
        var j = i * Math.PI / 180;
        var vert1 = [
            1 / 7 * Math.sin(j) - 0.5,
            1 / 7 * Math.cos(j),
            //0
        ];
        var vert2 = [
            1 / 7 * Math.sin(j) * 0.9 - 0.5,
            1 / 7 * Math.cos(j) * 0.9,
            //0
        ];
        vertices = vertices.concat(vert1);
        vertices = vertices.concat(vert2);
    }
    var circleVertices_P = new Float32Array(vertices);

    // for S #1
    var vertices = [];
    for (var i = -30.0; i <= 180; i += 1) {
        var j = i * Math.PI / 180;
        var vert1 = [
            -1 / 8 * Math.sin(j) + 0.1,
            1 / 8 * Math.cos(j) - 0.03,
            //0
        ];
        var vert2 = [
            -1 / 8 * Math.sin(j) * 0.9 + 0.1,
            1 / 8 * Math.cos(j) * 0.9 - 0.03,
            //0
        ];
        vertices = vertices.concat(vert1);
        vertices = vertices.concat(vert2);
    }
    var circleVertices_S = new Float32Array(vertices);
    // for S #2
    var vertices = [];
    for (var i = -60.0; i <= 180; i += 1) {
        var j = i * Math.PI / 180;
        var vert3 = [
            1 / 8 * Math.sin(j) + 0.08,
            -1 / 8 * Math.cos(j) - 0.27,
            //0
        ];
        var vert4 = [
            1 / 8 * Math.sin(j) * 0.9 + 0.08,
            -1 / 8 * Math.cos(j) * 0.9 - 0.27,
            //0
        ];
        vertices = vertices.concat(vert3);
        vertices = vertices.concat(vert4);
    }
    var circleVertices_S2 = new Float32Array(vertices);

    // ---------------- Render primitives here --------------------
    function render() {
        gl.clearColor(1., 1., 1., 1.);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.uniform1f(thetaLoc, theta);
        gl.uniform4fv(fColorLoc, fColor);

        // draw P
        drawA(gl.LINES, lineVertices_P);
        drawA(gl.TRIANGLE_STRIP, circleVertices_P);
        // draw S
        drawA(gl.TRIANGLE_STRIP, circleVertices_S);
        drawA(gl.TRIANGLE_STRIP, circleVertices_S2);
        //draw Y
        drawA(gl.LINES, lineVertices_Y);
        drawA(gl.LINES, lineVertices_Y2);
        drawA(gl.LINES, lineVertices_Y3);
        //draw points for initial
        drawA(gl.POINTS, dotVertices_PS);
        drawA(gl.POINTS, dotVertices_SY);
    }

    function drawA(type, vertices) {
        var n = initBuffers(vertices);
        gl.drawArrays(type, 0, n);
    }

    function initBuffers(vertices) {
        var n = vertices.length / 2;

        var vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        var vPosition = gl.getAttribLocation(program, 'vPosition');
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);
        return n;
    }

    gl.viewport(0, 0, canvas.width, canvas.height);
    render();
    // -------------------- Interactions ---------------------
    document.getElementById("Start").onclick = function () {
        startRotation();
    }
    function startRotation() {
        function rotate() {
            if (direction) { theta += 0.1 * delay; }
            else { theta -= 0.1 * delay; }

            render();
            animID = requestAnimationFrame(rotate);
        }
        rotate();
    }

    document.getElementById("Stop").onclick = function () {
        stopRotation();
    }
    function stopRotation() {
        cancelAnimationFrame(animID);
    }

    document.getElementById("Reset").onclick =
        function () {
            resetCanvas();
            cancelAnimationFrame(animID);
        }
    function resetCanvas() {
        theta = 0.0;
        fColor = [0.0, 0.0, 0.0, 1.0];
        render();
    }

    document.getElementById("Animation Controls").onclick =
        function (event) {
            switch (event.target.index) {
                case 0:
                    direction = !direction;
                    break;
                case 1:
                    delay *= 2.0;
                    break;
                case 2:
                    delay /= 2.0;
                    break;
            }
        }

    document.addEventListener("keydown", checkRGB);
    function checkRGB(event) {
        switch (event.key) {
            case 'r':
                fColor = [1.0, 0.0, 0.0, 1.0];
                break;

            case 'g':
                fColor = [0.0, 1.0, 0.0, 1.0];
                break;

            case 'b':
                fColor = [0.0, 0.0, 1.0, 1.0];
                break;

            default:
                fColor = [0.0, 0.0, 0.0, 1.0];
                break;
        }
        render();
    }
}