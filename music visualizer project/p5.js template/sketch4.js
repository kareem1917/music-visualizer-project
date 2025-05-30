var music;
var fft;
var frameX, frameY, frameWidth, frameHeight;
var img;

function preload() {
  soundFormats('mp3', 'ogg');
  music = loadSound('assets/song 2.mp3');
  music.setVolume(0.9);
  img = loadImage('assets/index 2.png');
}

function setup() {
  createCanvas(800, 600);
  fft = new p5.FFT(0.9, 64); 
  colorMode(HSB, 360, 100, 100); 

  
  frameX = width / 4;
  frameY = height / 4;
  frameWidth = width / 1.8;
  frameHeight = height / 2;
}

function draw() {
  background(0);

  var spectrum = fft.analyze();
  image(img, 0, 0, 800, 800);


  stroke(255);
  noFill();
  rect(frameX, frameY, frameWidth, frameHeight);

  var barWidth = frameWidth / spectrum.length;
  
  for (var i = 0; i < spectrum.length; i++) {
    var amplitude = spectrum[i];
    var barHeight = map(amplitude, 0, 255, 0, frameHeight);
    
    var hue = map(i, 0, spectrum.length, 0, 360);
    fill(hue, 100, 100);
    noStroke();
    
    var x = frameX + i * barWidth;
    var y = frameY + frameHeight - barHeight;
    
    rect(x, y, barWidth, barHeight);
  }
}

function mousePressed() {
  if (music.isPlaying()) {
    music.pause();
  } else {
    music.loop();
  }
}
