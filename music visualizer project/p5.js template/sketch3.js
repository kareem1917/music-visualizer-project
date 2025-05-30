var fft;
var music;
var img;
function preload() {
    soundFormats('mp3', 'ogg');
    music = loadSound('assets/song 3.mp3');
    music.setVolume(0.9);
    img = loadImage('assets/index 3.png');

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
    image(img, 0, 0, 800, 1000);

    
    translate(width / 2, height / 2);
    
    strokeWeight(2);
    noFill();
    
    
    beginShape();
    for (var i = 0; i < 720; i++) {
        var index = floor(map(i, 0, 720, 0, wave.length - 1));
        var r = map(wave[index], -1, 1, 150, 350) * (i / 720);
        var x = r * cos(i);
        var y = r * sin(i);
        stroke(map(i, 0, 720, 0, 360), 100, 100); 
        vertex(x, y);
    }
    endShape();
    
    
    for (var i = 0; i < 720; i += 20) {
        var index = floor(map(i, 0, 720, 0, wave.length - 1));
        var r = map(wave[index], -1, 1, 150, 350) * (i / 720);
        var x = r * cos(i);
        var y = r * sin(i);
        fill(map(i, 0, 720, 0, 360), 100, 100);
        noStroke();
        ellipse(x, y, 10, 10);
    }

    
    strokeWeight(1);
    for (var i = 0; i < 720; i += 20) {
        for (var j = i + 20; j < 720; j += 20) {
            var index1 = floor(map(i, 0, 720, 0, wave.length - 1));
            var r1 = map(wave[index1], -1, 1, 150, 350) * (i / 720);
            var x1 = r1 * cos(i);
            var y1 = r1 * sin(i);
            
            var index2 = floor(map(j, 0, 720, 0, wave.length - 1));
            var r2 = map(wave[index2], -1, 1, 150, 350) * (j / 720);
            var x2 = r2 * cos(j);
            var y2 = r2 * sin(j);
            
            stroke(map(i + j, 0, 1440, 0, 360), 100, 100);
            line(x1, y1, x2, y2);
        }
    }
}

function mousePressed() {
    if (music.isPlaying()) {
        music.pause();
    } else {
        music.loop();
    }
}
