var gui;

var inc = 0.1;
var scl = 10;

var cols, rows;
var zoff = 0;
var fr;
var particles = [];
var flowfield;



function setup() {
    createCanvas(500, 500);


    cols = floor(width / scl);
    rows = floor(height / scl);
    fr = createP('');
    bg = color('rgba(0, 0, 0, 1)');


    flowfield = new Array(cols * rows);

    for (var i = 0; i < 100; i++) {
        particles[i] = new Particle();
    }
    background(bg);
};

function draw() {

    var yoff = 0;
    for (var y = 0; y < rows; y++) {
        var xoff = 0;
        for (var x = 0; x < cols; x++) {
            var index = x + y * cols;
            var angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
            var v = p5.Vector.fromAngle(angle);
            v.setMag(1);
            flowfield[index] = v;
            xoff += inc;

        }
        yoff += inc;
        zoff += 0.0001;
    }

    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();
    }

    fr.html('FPS:' + floor(frameRate()));

};
