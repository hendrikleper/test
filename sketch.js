// sketch voor Lennert


let minSelected = 1; // tijd in minuten voor de timer
let startDate;
let alarmSound;
let timeTicking;
let state = true;
var capture;
var w = 640;
var h = 480;

function preload() {
  soundFormats('mp3');
  //alarmSound = loadSound('alarm.mp3');
  alarmSound = createAudio('camera-shutter.mp3');
}

function setup() {
  //createCanvas(windowWidth,windowHeight);
  createCanvas(displayWidth, displayHeight);
  frameRate(30);
  textSize(38);
  textAlign(CENTER, TOP);

  var constraints = {
    audio: false,
        video: {
            facingMode: { exact: "user" },
            //facingMode: "environment",
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.hide();
    capture.size(w, h);
    canvas = createCanvas(w, h);
}

function draw() {
  background(50, 50, 50);
  if (state == true) {
    getTime();
    camswitch1();
    state = false;
  }

  image(capture, 0, 0, displayWidth, displayHeight);
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
    fill(255, 0, 0);
    text('NOW', 0, 30, width);
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
async function takeABreak() {
  await sleep(1000);
  let timeStamp = year() + "-" + month() + "-" + day() + "-" + hour() + "-" + minute() + "-" + second();
  //save(timeStamp);
  saveCanvas(timeStamp);
  alarmSound.play();
  await sleep(6000)
  state = true;
}

// a custom 'sleep' or wait' function, that returns a Promise that resolves only after a timeout
function sleep(millisecondsDuration) {
  return new Promise((resolve) => {
    setTimeout(resolve, millisecondsDuration);
  })
}

function camswitch0() {
  var constraints = {
    audio: false,
        video: {
            facingMode: { exact: "user" },
            //facingMode: "environment",
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.hide();
    capture.size(w, h);
    canvas = createCanvas(w, h);
}

function camswitch1() {
  var constraints = {
    audio: false,
        video: {
            //facingMode: { exact: "environment" },
            facingMode: "environment",
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    capture.hide();
    capture.size(w, h);
}

function touchStarted() {
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
