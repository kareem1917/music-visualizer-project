var fft;
var music;
var img;

function preload() {
    soundFormats('mp3', 'ogg');
    music = loadSound('assets/song.mp3');
    music.setVolume(0.9);
    img = loadImage('assets/index.png');
}

function setup(){
    createCanvas(800, 800);
    angleMode(DEGREES);
    fft = new p5.FFT();
    colorMode(HSB, 360, 100, 100); 
}

function draw(){
    background(0); 
    var wave = fft.waveform();
    image(img, 0, 0, 800, 800); 

    translate(width / 2, height / 2);

    strokeWeight(4);
    noFill();

    beginShape();
    for (var i = 0; i < 180; i++) {
        var index = floor(map(i, 0, 180, 0, wave.length - 1));
        var r = map(wave[index], -1, 1, 150, 350);
        var x = r * sin(i);
        var y = r * cos(i);
        stroke(map(i, 0, 300, 180, 180), 100, 100); 
        vertex(x, y);
    }
    endShape();

    beginShape();
    for (var i = 0; i < 180; i++) {
        var index = floor(map(i, 0, 180, 0, wave.length - 1));
        var r = map(wave[index], -1, 1, 150, 350);
        var x = r * -sin(i);
        var y = r * -cos(i);
        stroke(map(i, 0, 500, 500, 500), 100, 100); 
        vertex(x, y);
    }
    endShape();
}

function mousePressed() {
    if (music.isPlaying()) {
        music.pause();
    } else {
        music.loop();
    }
}
