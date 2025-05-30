var startX;
var startY;
var endY;
var spectrumWidth;
var output = [];
var music;
var speed = 0.7;
var fourier;

function preload() {
  soundFormats('mp3', 'ogg');
  music = loadSound('assets/song 2.mp3');
  music.setVolume(0.9);
}

function setup() {
  createCanvas(800, 600);
  startX = width / 5;
  endY = height / 5;
  startY = height - endY;
  spectrumWidth = (width / 5) * 3;
  fourier = new p5.FFT();
  colorMode(HSB, 360, 100, 100); // Use HSB color mode for colorful effects
}

function mousePressed() {
  if (music.isPlaying()) {
    music.pause();
  } else {
    music.loop();
  }
}

function addWave() {
  var w = fourier.waveform();
  var outputWave = [];
  var smallScale = 3;
  var bigScale = 40;
  for (var i = 0; i < w.length; i++) {
    if (i % 30 == 0) {
      var x = map(i, 0, w.length, startX, startX + spectrumWidth);
      var y = map(w[i], -1, 1, -smallScale, smallScale);
      if (i < w.length * 0.25 || i > w.length * 0.75) {
        outputWave.push({ x: x, y: startY + y });
      } else {
        y = map(w[i], -1, 1, -bigScale, bigScale);
        outputWave.push({ x: x, y: startY + y });
      }
    }
  }
  output.push(outputWave);
}

function draw() {
  background(0);
  noStroke();
  fill(255);
  if (frameCount % 20 == 0) {
    addWave();
  }

  for (var i = 0; i < output.length; i++) {
    var o = output[i];

    for (var j = 0; j < o.length; j++) {
      var waveColor = map(o[j].y, endY, startY, 0, 360); // Map y position to color hue
      fill(waveColor, 100, 100); // Set fill color based on hue
      var rectWidth = 10; // Adjust width of rectangle
      var rectHeight = 15; // Adjust height of rectangle
      rectMode(CENTER);
      rect(o[j].x, o[j].y, rectWidth, rectHeight);
      o[j].y -= speed;
    }

    if (o[0].y < endY) {
      output.splice(i, 1);
    }
  }
}
