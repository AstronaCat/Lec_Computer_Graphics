"use strict";

var canvas, gl, animID, viewMatrix, modelViewMatrix,
    modelViewMatrixLoc, vPositionLoc, fColorLoc, verticesBuffer;
var vertices = new Float32Array([

    /********************* Vertices of initial 'P' *******************/
    // Front face
    -0.4, 0.2, -0.1,
    -0.4, 0.1, -0.1,
    -0.05, 0.2, -0.1,
    -0.4, 0.1, -0.1,
    -0.05, 0.1, -0.1,
    -0.05, 0.2, -0.1,

    // Horizontal bar (front)
    -0.4, -0.1, -0.1,
    -0.4, -0.2, -0.1,
    -0.05, -0.1, -0.1,
    -0.4, -0.2, -0.1,
    -0.05, -0.2, -0.1,
    -0.05, -0.1, -0.1,

    // Connect front face and Horizontal bar (front)
    -0.05, 0.1, -0.1,
    -0.05, -0.1, -0.1,
    -0.12, 0.1, -0.1,
    -0.05, -0.1, -0.1,
    -0.12, -0.1, -0.1,
    -0.12, 0.1, -0.1,

    // Vertical bar (front)
    -0.4, 0.1, -0.1,
    -0.4, -0.5, -0.1,
    -0.3, 0.1, -0.1,
    -0.4, -0.5, -0.1,
    -0.3, -0.5, -0.1,
    -0.3, 0.1, -0.1,

    // Back face
    -0.4, 0.2, -0.2,
    -0.4, 0.1, -0.2,
    -0.05, 0.2, -0.2,
    -0.4, 0.1, -0.2,
    -0.05, 0.1, -0.2,
    -0.05, 0.2, -0.2,

    // Horizontal bar (back)
    -0.4, -0.1, -0.2,
    -0.4, -0.2, -0.2,
    -0.05, -0.1, -0.2,
    -0.4, -0.2, -0.2,
    -0.05, -0.2, -0.2,
    -0.05, -0.1, -0.2,

    // Connect front face and Horizontal bar (back)
    -0.05, 0.1, -0.2,
    -0.05, -0.1, -0.2,
    -0.12, 0.1, -0.2,
    -0.05, -0.1, -0.2,
    -0.12, -0.1, -0.2,
    -0.12, 0.1, -0.2,

    // Vertical bar (back)
    -0.4, 0.1, -0.2,
    -0.4, -0.5, -0.2,
    -0.3, 0.1, -0.2,
    -0.4, -0.5, -0.2,
    -0.3, -0.5, -0.2,
    -0.3, 0.1, -0.2,

    // Connect front and back
    -0.4, 0.2, -0.2,
    -0.4, -0.5, -0.2,
    -0.4, 0.2, -0.1,
    -0.4, -0.5, -0.2,
    -0.4, -0.5, -0.1,
    -0.4, 0.2, -0.1,

    // Top
    -0.4, 0.2, -0.2,
    -0.4, 0.2, -0.1,
    -0.05, 0.2, -0.2,
    -0.4, 0.2, -0.1,
    -0.05, 0.2, -0.1,
    -0.05, 0.2, -0.2,

    // Between connection bars of front face & horizontal bar
    -0.05, 0.2, -0.2,
    -0.05, 0.2, -0.1,
    -0.05, -0.2, -0.2,
    -0.05, 0.2, -0.1,
    -0.05, -0.2, -0.1,
    -0.05, -0.2, -0.2,

    // Between two vertical bars (front & back)
    -0.3, -0.2, -0.2,
    -0.3, -0.2, -0.1,
    -0.3, -0.5, -0.2,
    -0.3, -0.2, -0.1,
    -0.3, -0.5, -0.1,
    -0.3, -0.5, -0.2,

    // Between two horizontal bars (front & back)
    -0.3, -0.2, -0.2,
    -0.3, -0.2, -0.1,
    -0.05, -0.2, -0.2,
    -0.3, -0.2, -0.1,
    -0.05, -0.2, -0.1,
    -0.05, -0.2, -0.2,

    // Inside the P
    -0.12, 0.1, -0.2,
    -0.12, 0.1, -0.1,
    -0.12, -0.1, -0.2,
    -0.12, 0.1, -0.1,
    -0.12, -0.1, -0.1,
    -0.12, -0.1, -0.2,

    -0.3, 0.1, -0.2,
    -0.3, 0.1, -0.1,
    -0.12, 0.1, -0.2,
    -0.3, 0.1, -0.1,
    -0.12, 0.1, -0.1,
    -0.12, 0.1, -0.2,

    -0.3, 0.1, -0.2,
    -0.3, 0.1, -0.1,
    -0.3, -0.1, -0.2,
    -0.3, 0.1, -0.1,
    -0.3, -0.1, -0.1,
    -0.3, -0.1, -0.2,

    -0.3, -0.1, -0.2,
    -0.3, -0.1, -0.1,
    -0.12, -0.1, -0.2,
    -0.3, -0.1, -0.1,
    -0.12, -0.1, -0.1,
    -0.12, -0.1, -0.2,

    // Bottom
    -0.4, -0.5, -0.2,
    -0.4, -0.5, -0.1,
    -0.3, -0.5, -0.2,
    -0.4, -0.5, -0.1,
    -0.3, -0.5, -0.1,
    -0.3, -0.5, -0.2,


    /********************** Vertices of S ***********************/
    // Top bar (front)
    0.4, 0.2, 0.1,
    0.4, 0.1, 0.1,
    0.1, 0.2, 0.1,
    0.4, 0.1, 0.1,
    0.1, 0.1, 0.1,
    0.1, 0.2, 0.1,

    // Middle bar (front)
    0.1, -0.2, 0.1,
    0.1, -0.1, 0.1,
    0.4, -0.2, 0.1,
    0.1, -0.1, 0.1,
    0.4, -0.1, 0.1,
    0.4, -0.2, 0.1,

    // Bottom bar (front)
    0.1, -0.4, 0.1,
    0.1, -0.5, 0.1,
    0.4, -0.4, 0.1,
    0.1, -0.5, 0.1,
    0.4, -0.5, 0.1,
    0.4, -0.4, 0.1,

    // Top bar (back)
    0.4, 0.2, 0,
    0.4, 0.1, 0,
    0.1, 0.2, 0,
    0.4, 0.1, 0,
    0.1, 0.1, 0,
    0.1, 0.2, 0,

    // Middle bar (back)
    0.1, -0.2, 0,
    0.1, -0.1, 0,
    0.4, -0.2, 0,
    0.1, -0.1, 0,
    0.4, -0.1, 0,
    0.4, -0.2, 0,

    // Bottom bar (back)
    0.1, -0.4, 0,
    0.1, -0.5, 0,
    0.4, -0.4, 0,
    0.1, -0.5, 0,
    0.4, -0.5, 0,
    0.4, -0.4, 0,

    // Top of top bar
    0.1, 0.2, 0.1,
    0.4, 0.2, 0.1,
    0.1, 0.2, 0,
    0.4, 0.2, 0.1,
    0.4, 0.2, 0,
    0.1, 0.2, 0,
    // Bottom of top bar
    0.1, 0.1, 0.1,
    0.4, 0.1, 0.1,
    0.1, 0.1, 0,
    0.4, 0.1, 0.1,
    0.4, 0.1, 0,
    0.1, 0.1, 0,

    // Top of middle bar
    0.1, -0.1, 0.1,
    0.4, -0.1, 0.1,
    0.1, -0.1, 0,
    0.4, -0.1, 0.1,
    0.4, -0.1, 0,
    0.1, -0.1, 0,
    // Bottom of middle bar
    0.1, -0.2, 0.1,
    0.4, -0.2, 0.1,
    0.1, -0.2, 0,
    0.4, -0.2, 0.1,
    0.4, -0.2, 0,
    0.1, -0.2, 0,

    // Top of bottom bar
    0.1, -0.4, 0.1,
    0.4, -0.4, 0.1,
    0.1, -0.4, 0,
    0.4, -0.4, 0.1,
    0.4, -0.4, 0,
    0.1, -0.4, 0,
    // Bottom of bottom bar
    0.1, -0.5, 0.1,
    0.4, -0.5, 0.1,
    0.1, -0.5, 0,
    0.4, -0.5, 0.1,
    0.4, -0.5, 0,
    0.1, -0.5, 0,

    // Between top bar and middle bar
    0.1, 0.2, 0,
    0.1, 0.2, 0.1,
    0.1, -0.1, 0,
    0.1, 0.2, 0.1,
    0.1, -0.1, 0.1,
    0.1, -0.1, 0,

    0.1, 0.1, 0,
    0.2, 0.1, 0,
    0.1, -0.1, 0,
    0.2, 0.1, 0,
    0.2, -0.1, 0,
    0.1, -0.1, 0,

    0.1, 0.1, 0.1,
    0.2, 0.1, 0.1,
    0.1, -0.1, 0.1,
    0.2, 0.1, 0.1,
    0.2, -0.1, 0.1,
    0.1, -0.1, 0.1,

    0.2, 0.1, 0,
    0.2, 0.1, 0.1,
    0.2, -0.1, 0,
    0.2, 0.1, 0.1,
    0.2, -0.1, 0.1,
    0.2, -0.1, 0,

    // Between middle bar and bottom bar
    0.4, -0.1, 0,
    0.4, -0.1, 0.1,
    0.4, -0.5, 0,
    0.4, -0.1, 0.1,
    0.4, -0.5, 0.1,
    0.4, -0.5, 0,

    0.3, -0.2, 0,
    0.4, -0.2, 0,
    0.3, -0.4, 0,
    0.4, -0.2, 0,
    0.4, -0.4, 0,
    0.3, -0.4, 0,

    0.3, -0.2, 0.1,
    0.4, -0.2, 0.1,
    0.3, -0.4, 0.1,
    0.4, -0.2, 0.1,
    0.4, -0.4, 0.1,
    0.3, -0.4, 0.1,

    0.3, -0.2, 0,
    0.3, -0.2, 0.1,
    0.3, -0.4, 0,
    0.3, -0.2, 0.1,
    0.3, -0.4, 0.1,
    0.3, -0.4, 0,

    // between top and bottom of each bar (except middle bar ; already surrounded)
    0.4, 0.2, 0,
    0.4, 0.1, 0,
    0.4, 0.2, 0.1,
    0.4, 0.1, 0,
    0.4, 0.1, 0.1,
    0.4, 0.2, 0.1,

    0.1, -0.4, 0,
    0.1, -0.5, 0,
    0.1, -0.4, 0.1,
    0.1, -0.5, 0,
    0.1, -0.5, 0.1,
    0.1, -0.4, 0.1,

    /******************** Vertices of initial 'Y' *******************/
    // Vertical bar (back)
    0, 0, 0.3,
    0, 0.5, 0.3,
    0.1, 0.5, 0.3,
    0, 0, 0.3,
    0.1, 0, 0.3,
    0.1, 0.5, 0.3,

    // Vertical bar (front)
    0, 0, 0.2,
    0, 0.5, 0.2,
    0.1, 0.5, 0.2,
    0, 0, 0.2,
    0.1, 0, 0.2,
    0.1, 0.5, 0.2,

    // Between bars
    0, 0.5, 0.3,
    0, 0.5, 0.2,
    0, 0, 0.3,
    0, 0.5, 0.2,
    0, 0, 0.2,
    0, 0, 0.3,

    0.1, 0.5, 0.3,
    0.1, 0.5, 0.2,
    0.1, 0, 0.3,
    0.1, 0.5, 0.2,
    0.1, 0, 0.2,
    0.1, 0, 0.3,

    // Bottom
    0, 0, 0.3,
    0.1, 0, 0.3,
    0.1, 0, 0.2,
    0, 0, 0.3,
    0, 0, 0.2,
    0.1, 0, 0.2,

    // Top
    0, 0.5, 0.3,
    0.1, 0.5, 0.3,
    0.1, 0.5, 0.2,
    0, 0.5, 0.3,
    0, 0.5, 0.2,
    0.1, 0.5, 0.2,

    // Left slant (back)
    -0.2, 0.7, 0.3,
    -0.1, 0.8, 0.3,
    0, 0.5, 0.3,
    -0.1, 0.8, 0.3,
    0.1, 0.6, 0.3,
    0, 0.5, 0.3,

    // Left slant (front)
    -0.2, 0.7, 0.2,
    -0.1, 0.8, 0.2,
    0, 0.5, 0.2,
    -0.1, 0.8, 0.2,
    0.1, 0.6, 0.2,
    0, 0.5, 0.2,

    // Between back and front of slant (left)
    -0.2, 0.7, 0.3,
    -0.2, 0.7, 0.2,
    0, 0.5, 0.3,
    -0.2, 0.7, 0.2,
    0, 0.5, 0.2,
    0, 0.5, 0.3,

    -0.1, 0.8, 0.3,
    -0.1, 0.8, 0.2,
    0.1, 0.5, 0.3,
    -0.1, 0.8, 0.2,
    0.1, 0.5, 0.2,
    0.1, 0.5, 0.3,

    // Top of left slant
    -0.2, 0.7, 0.3,
    -0.2, 0.7, 0.2,
    -0.1, 0.8, 0.3,
    -0.2, 0.7, 0.2,
    -0.1, 0.8, 0.2,
    -0.1, 0.8, 0.3,

    // Right slant (back)
    0.3, 0.7, 0.3,
    0.2, 0.8, 0.3,
    0.1, 0.5, 0.3,
    0.2, 0.8, 0.3,
    0, 0.6, 0.3,
    0.1, 0.5, 0.3,

    // Right slant (front)
    0.3, 0.7, 0.2,
    0.2, 0.8, 0.2,
    0.1, 0.5, 0.2,
    0.2, 0.8, 0.2,
    0, 0.6, 0.2,
    0.1, 0.5, 0.2,

    // Between back and front of slant (right)
    0.3, 0.7, 0.3,
    0.3, 0.7, 0.2,
    0.1, 0.5, 0.3,
    0.3, 0.7, 0.2,
    0.1, 0.5, 0.2,
    0.1, 0.5, 0.3,

    0.2, 0.8, 0.3,
    0.2, 0.8, 0.2,
    0, 0.5, 0.3,
    0.2, 0.8, 0.2,
    0, 0.5, 0.2,
    0, 0.5, 0.3,

    // Top of right slant
    0.3, 0.7, 0.3,
    0.3, 0.7, 0.2,
    0.2, 0.8, 0.3,
    0.3, 0.7, 0.2,
    0.2, 0.8, 0.2,
    0.2, 0.8, 0.3,

    // Cover empty space of back and front (back)
    0, 0.5, 0.2,
    0.05, 0.55, 0.2,
    0.1, 0.5, 0.2,

    // Cover empty space of back and front (front)
    0, 0.5, 0.3,
    0.05, 0.55, 0.3,
    0.1, 0.5, 0.3,

]);

var numVertices = vertices.length / 3;
var theta = [0, 0, 0];
var xAxis = 0, yAxis = 1, zAxis = 2;
var scaleMatrix = [1, 1, 1];

var eyePosition = [0., 0., 0.5]; // Camera Position
var atPoint = [0., 0., 0];       // The point camera is looking at
var upDirection = [0, 1, 0];

var scale = [1, 1, 1];

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.clearColor(1., 1., 1., 1.);
    gl.viewport(0, 0, canvas.width, canvas.height);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    vPositionLoc = gl.getAttribLocation(program, "vPosition");

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");

    fColorLoc = gl.getUniformLocation(program, "fColor");
    gl.uniform4fv(fColorLoc, [Math.random(), Math.random(), Math.random(), 1.0]);

    verticesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(vPositionLoc);
    gl.vertexAttribPointer(vPositionLoc, 3, gl.FLOAT, false, 0, 0);

    render();

    // Interactions
    document.getElementById("Stop").onclick = function () {
        stopRotation();
    }
    // Rotate with 3 axis when the button is pressed.
    document.getElementById("X").onclick = function () {
        stopRotation();
        xRotation();
    }
    document.getElementById("Y").onclick = function () {
        stopRotation();
        yRotation();
    }
    document.getElementById("Z").onclick = function () {
        stopRotation();
        zRotation();
    }
    // Modify scale when button is pressed.
    document.getElementById("xup").onclick = function () {
        scale[xAxis] += 0.1;
        render();
    }
    document.getElementById("xdown").onclick = function () {
        scale[xAxis] -= 0.1;
        render();
    }
    document.getElementById("yup").onclick = function () {
        scale[yAxis] += 0.1;
        render();
    }
    document.getElementById("ydown").onclick = function () {
        scale[yAxis] -= 0.1;
        render();
    }
    document.getElementById("zup").onclick = function () {
        scale[zAxis] += 0.1;
        render();
    }
    document.getElementById("zdown").onclick = function () {
        scale[zAxis] -= 0.1;
        render();
    }
    // Modify parameters of lookAt function using keyboard input.
    document.addEventListener("keydown", function (event) {
        switch (event.key) {
            case "ArrowUp":
                eyePosition[yAxis] += 0.1;  // Move up
                break;
            case "ArrowDown":
                eyePosition[yAxis] -= 0.1;  // Move down
                break;
            case "ArrowLeft":
                eyePosition[xAxis] -= 0.1;  // Move left
                break;
            case "ArrowRight":
                eyePosition[xAxis] += 0.1;  // Move right
                break;
            case "0":
                eyePosition[zAxis] += 0.1;
                break;
            case "9":
                eyePosition[zAxis] -= 0.1;
                break;
        }
        updateEyePosition();
        render();
    });
};

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    modelViewMatrix = mat4();
    modelViewMatrix = lookAt(eyePosition, atPoint, upDirection);
    modelViewMatrix = mult(modelViewMatrix, rotateX(theta[xAxis]));
    modelViewMatrix = mult(modelViewMatrix, rotateY(theta[yAxis]));
    modelViewMatrix = mult(modelViewMatrix, rotateZ(theta[zAxis]));
    modelViewMatrix = mult(modelViewMatrix, scalem(scale));

    //console.log(modelViewMatrix);

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));

    document.getElementById("eyePosition").innerText = `(${eyePosition[0]}, ${eyePosition[1]}, ${eyePosition[2]})`

    gl.drawArrays(gl.TRIANGLES, 0, numVertices);
}

// Interaction functions definition
function stopRotation() {
    cancelAnimationFrame(animID);
}

function xRotation() {
    function x_rotate() {
        theta[xAxis] += 1.0;
        render();
        animID = requestAnimationFrame(x_rotate);
    }
    x_rotate();
}

function yRotation() {
    function y_rotate() {
        theta[yAxis] += 1.0;
        render();
        animID = requestAnimationFrame(y_rotate);
    }
    y_rotate();
}

function zRotation() {
    function z_rotate() {
        theta[zAxis] += 1.0;
        render();
        animID = requestAnimationFrame(z_rotate);
    }
    z_rotate();
}

function updateEyePosition() {
    modelViewMatrix = lookAt(eyePosition, atPoint, upDirection);
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
}