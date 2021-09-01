const displayWidth = window.innerWidth - 100;
const displayHeight = 400;

// Get learning rate
let lrSlider;

// Learning_rate declared globally
let learning_rate;

// Max_iterations declared globally

let max_iterations = 5;

// y = mx + b 
let m = 0;
let b = 0;

function setup() {
    var canvas = createCanvas(displayWidth, displayHeight);
    canvas.parent('#canvascontainer');

    canvas.mousePressed(addPoints);

    lrSlider = select('#lrslider');
    reset_btn = select('#reset_btn');

    reset_btn.mousePressed(reset)
    // Data will be entered by user clicking
    training = [];
}

function reset() {
    m = 0;
    b = 0;
    training = []
}

function addPoints() {
    // Add a data point
    var x = map(mouseX, 0, width, 0, 1)
    var y = map(mouseY, 0, height, 1, 0)

    training.push(createVector(x, y));
}

function linearRegression() {

    var deltaB = 0;
    var deltaM = 0;
    for (var iterations = 0; iterations < max_iterations; iterations++) {
        for (var i = 0; i < training.length; i++) {
            var x = training[i].x;
            var y = training[i].y;
            var yguess = m * x + b;
            var error = y - yguess;
            deltaB += (2 / training.length) * error;
            deltaM += (2 / training.length) * x * error;
        }
        b += (deltaB * learning_rate);
        m += (deltaM * learning_rate);
    }
}

function draw() {

    learning_rate = lrSlider.value();
    select('#lr').html(learning_rate);
    background('#25262b');

    linearRegression();

    drawPoints();
    drawLine();
    drawText();
}

// Draw the text
function drawText() {
    fill('#ffffff');
    stroke('None')
    strokeWeight(0.1)
    text("y = mx + b", 10, 20);
    text("m = " + round(m, 4), 10, 40);
    text("b = " + round(b, 4), 10, 60);
}

// Draw the best-fit line
function drawLine() {
    // Draw a line between any two points (use min and max x)
    stroke('#ffffff');
    strokeWeight(2)
    var x1 = 0;
    var y1 = m * x1 + b;

    var x2 = 1;
    var y2 = m * x2 + b;

    x1 = map(x1, 0, 1, 0, width)
    y1 = map(y1, 0, 1, height, 0)
    x2 = map(x2, 0, 1, 0, width)
    y2 = map(y2, 0, 1, height, 0)

    line(x1, y1, x2, y2);
}

// Plot all the training data
function drawPoints() {
    stroke('#3fe4h2');
    strokeWeight(2);
    fill('#ffffff');
    for (var i = 0; i < training.length; i++) {
        var x = map(training[i].x, 0, 1, 0, width)
        var y = map(training[i].y, 0, 1, height, 0)
        ellipse(x, y, 10, 10);
    }
}

