//I found this example in the p5js examples and I found that it was really cool
//When it comes to movement detection, even the little things like blinking.
//example came from here https://editor.p5js.org/bestesaylar/sketches/WFsPqG-8A

//Description above was the same from project 2: assignment 2 - iteration 4

//Wanted to showcase parts of the idea I have for the project
//with a camera attached to screen and detects movement,
//normally the screen will be in black and white but as soon as it detects
//movement, it will fill in the colour.

//I am also looking into implementing sound but as of right now I could not
//figure it out yet. I found a piece about implementing sounds with motion
//https://medium.com/disintegration-anxiety-1/icm-final-project-53b624770bb6

var video;
var scaler = 5;
var preFrame;


function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / scaler, height / scaler);
  video.hide();
  preFrame = createImage(video.width, video.height);
}

function draw() {
  video.loadPixels();
  preFrame.loadPixels();

  for (let y = 0; y < video.height; y++) {
    for (let x = 0; x < video.width; x++) {
      var index = (x + y * video.width) * 4
      let pr = preFrame.pixels[index + 0];
      let pg = preFrame.pixels[index + 1];
      let pb = preFrame.pixels[index + 2];
      let pbright = (pr + pg + pb) / 3;

      let r = video.pixels[index + 0];
      let g = video.pixels[index + 1];
      let b = video.pixels[index + 2];
      let bright = (r + g + b) / 3;
			
      var diff = dist(r, g, b, pr, pg, pb);
			if (diff<15){
        fill(bright);
      } else {
        //fill(255, 0, 0); //This is better when its showing movement
        
        //This one is better because its showing the true colour of the user
        //The more movement they do the more the actual colour appears
        fill(r,g,b);
      }
      noStroke();
      //I returned it to rectangles so it'll be more true to what im working on which is pixels
      rect(x * scaler, y * scaler, scaler, scaler);
      //ellipse(x * scaler, y * scaler, scaler);
    }
  }

    preFrame.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

}