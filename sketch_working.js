// sketch voor Lennert


let minSelected = 1; // tijd in minuten voor de timer
let startDate;
let alarmSound;
let timeTicking;
let state = true;
var capture;
let schaal = 0.9;

function preload() {
  soundFormats('mp3');
  //alarmSound = loadSound('alarm.mp3');
  alarmSound = createAudio('camera-shutter.mp3');
}

function setup() {
  //createCanvas(windowWidth,windowHeight);
  createCanvas(displayWidth, displayHeight);
  frameRate(30);
  textSize(36);
  textAlign(CENTER, TOP);

  var constraints = {
    audio: false,
    video: {
      facingMode: {
        ideal: "environment"
      }
    }
  };
  //capture.elt.setAttribute('playsinline', '');
  capture = createCapture(constraints);
  capture.hide();

}

function draw() {
  background(0);
  if (state == true){
    getTime();
    camswitch1();
    state = false;
  }
  imageMode(CENTER);
  image(capture, 0.5*width, 0.5*height, schaal*width, schaal*capture.height*width/capture.width); // to fit width

  let currentDate = new Date().getTime();
  let minsLeft = secondsToHms(ceil((startDate - currentDate) / 1000));

  if (currentDate < startDate) {
  	fill(255);
  	text('THERE IS SOMETHING GOING TO HAPPEN', 0, 100, width);
  	text((minsLeft), 0, 160, width);
  }
  if ((currentDate >= startDate) && timeTicking) {
    timeTicking = false;
    camswitch0();
    takeABreak();
  }
}

function getTime() {
  timeTicking = true;
  startDate = new Date();
  startDate = (startDate.getTime() + minSelected * 60000);
  alarmSound.stop();
}

// Convert seconds to min:sec
function secondsToHms(d) {
  d = Number(d);
  let h = floor(d / 3600);
  let m = floor(d % 3600 / 60);
	let s = floor(d % 3600 % 60);
	return nf(h, 2) + ':' + nf(m, 2) + ':' + nf(s, 2);
}

// Not is use
function stopSound() {
  alarmSound.stop();
  timeTicking = false;
}

// Wait a bit & do some functions while cam 2 is on
async function takeABreak()
{
  await sleep(1000);
  let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second();
  //save(timeStamp);
  saveCanvas(timeStamp);
  alarmSound.play();
  await sleep(6000)
  state = true;
}

// a custom 'sleep' or wait' function, that returns a Promise that resolves only after a timeout
function sleep(millisecondsDuration)
{
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

function camswitch0(){
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "user"
        //facingMode: "user"
      }
    }
  };
  //capture.elt.setAttribute('playsinline', '');
  capture = createCapture(constraints);
  capture.hide();
}
function camswitch1(){
  var constraints = {
    audio: false,
    video: {
      facingMode: {
        exact: "environment"
        //facingMode: "user"
      }
    }
  };
  //capture.elt.setAttribute('playsinline', '');
  capture = createCapture(constraints);
  capture.hide();
}

function touchStarted () {
  if (!fullscreen()) {
    fullscreen(true);
  }
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

/* prevents the mobile browser from processing some default
 * touch events, like swiping left for "back" or scrolling the page.
 */
document.ontouchmove = function(event) {
    event.preventDefault();
};
