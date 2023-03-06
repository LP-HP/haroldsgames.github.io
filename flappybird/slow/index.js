//max y for canvas: -276
//min y for canvas: -100

//gameover boolean, if set to true, the bird dies and the canvas crashes
var gameover=false;

//getting canvas from html page
let canvas = document.getElementById('cando');
let c2 = document.getElementById("cando2");

//canvas context
let ctx2 = c2.getContext("2d");
let ctx = canvas.getContext("2d");  

//////////////START OF IMAGES//////////////

//initializing bird and pipe images
const bird = new Image();
const pipe1 = new Image();
const pipe1b = new Image();
const pipe2 = new Image();
const pipe2b = new Image();
const pipe3 = new Image();
const pipe3b = new Image();

//sources for bird and pipe images located in C://flappy bird in js/images
bird.src='bird.png';  
pipe1.src="pipeNorth.png";
pipe1b.src = "pipeSouth.png";
pipe2.src="pipeNorth.png";
pipe2b.src = "pipeSouth.png";
pipe3.src="pipeNorth.png";
pipe3b.src = "pipeSouth.png";

//////////////END OF IMAGES//////////////
//class LayeredAudio {

//    url;
 //   samples = [];

//    constructor(src){
//        fetch(src)
//            .then(response => response.blob())
//            .then((blob) => {
//                this.url = URL.createObjectURL(blob);
//                this.samples[0] = new Audio(this.url);
//            });
//    }
//
//    play(){
 //       if(!this.samples.find(e => e.paused)?.play()){
//            this.samples.push(new Audio(this.url))
//            this.samples[this.samples.length - 1].play()
//        }
//    }
//}

//////////////START OF AUDIO//////////////
//var flapAudio = new LayeredAudio('http://192.168.86.32:8887/audio/wing.mp3');
//var pointAudio = new LayeredAudio('http://192.168.86.32:8887/audio/point.mp3');
//var hitAudio = new LayeredAudio('http://192.168.86.32:8887/audio/hit.mp3');
//var deathAudio = new LayeredAudio('http://192.168.86.32:8887/audio/die.mp3');
//////////////START OF INITIALIZING VARIABLES//////////////

//pipe x values, each pipe is 200 pixels before the last
let pipe1x = 300;
let pipe2x = 500;
let pipe3x = 700;

//initializing the players points
let points = 0;
ctx2.font="30px Ariel";
ctx2.fillText(points,50,-210);

//speed of each pipe
var pipespeed = 2;

//the birds initial gravity (increases while the bird is falling and resets when the bird flaps)
var gravity = 2;

//initial bird x and y values
var bY=60;
var bX=-60;

//set point taken to false for each pipe. this variable is checked so that you do not get multiple points from passing through one pipe. this is also reset to false once the pipe resets to the beginning of the canvas
let pointtaken1 = false;
let pointtaken2 = false;
let pointtaken3 = false;
//initializing each pipes original y value (random value for -276 to -100 as if it went out of range of these numbers, eiter the top or bottom pipe would be off the canvas)
let p1y=Math.floor(Math.random() * (-276))-100;
let p2y=Math.floor(Math.random() * (-276))-100;
let p3y=Math.floor(Math.random() * (-276))-100;

//getting the canvases hight and width
const height = ctx.canvas.height;
const width = ctx.canvas.width;

//////////////END OF INITIALIZING VARIABLES//////////////

//////////////FLAPPING FUNCTION//////////////

document.addEventListener("keydown", event => {

    //checks if the button pressed was the spacebar
    if (event.keyCode===32){

        //if the button is held down, the bird does not flap up multiple times
        if (event.repeat) {return}

        //ends program if the game is over so that the player cannot flap the bird after the game has ended
        if (gameover){throw new Error();}

        //changing the birds gravity to make it go up
        gravity = -5;
        bY += gravity;

	//play audio
	//flapAudio.play();
        //clearing screen so that the bird image is not stamped onto screen
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bird,bX,bY, 288, 512);
    }
});

//////////////END OF FLAPPING FUNCTION//////////////

//////////////CRASH FUNCTION//////////////

//what happens when the bird crashes into a pipe or the ground

const crash = () => {

  //writing game over text
  ctx.font = "30px Arial";
  ctx.fillText("Game Over!", 10, 50);

  //setting gameover boolean to true to indicate that the game has ended
  gameover=true;

  //throws error to end program
  throw new Error();
}

//////////////END OF CRASH FUNCTION//////////////

//////////////START OF CHECKFORPOINT FUNCTION//////////////

const checkForPoint = (bX, pipe1x, pipe2x, pipe3x, gameover) => {
    if ((bX < pipe1x+19 && bX > pipe1x-19) && !gameover && !pointtaken1){
        points += 1;
        pointtaken1 = true;
        console.log(points);
	ctx.clearRect(0,0, width,height);
	ctx.font="30px Ariel";
	ctx.fillText(points, 10, 50);
	//pointAudio.play()
    } else if ((bX < pipe2x+19 && bX > pipe2x-19) && !gameover && !pointtaken2) {
        points += 1;
        pointtaken2 = true;
        console.log(points);
	ctx.clearRect(0,0, width, height);
	ctx.font="30px Ariel";
	ctx.fillText(points, 50, -110);
	//pointAudio.play()
    } else if ((bX < pipe3x+19 && bX > pipe3x-19) && !gameover && !pointtaken3) {
        points += 1;
        pointtaken3 = true;
        console.log(points);
	ctx.clearRect(0,0,width, height);
	ctx.font="30px Ariel";
	ctx.fillText(points,0,-110);
	//pointAudio.play()
    }
}

//////////////END OF CHECKFORPOINT FUNCTION//////////////

//////////////START OF CHECK FUNCTION//////////////

//checks if the bird has crashed into the floor or a pipe. returns true or false
const check = (bY, pipe1x, p1y) => {

  //returns true if the bird crashes into the floor or roof
  if (bY < -249 || bY > 240){
      return true;
    } 

  //returns true if the bird crashes into the first top pipe
  else if ((bX < pipe1x+23 && bX > pipe1x-23) && (bY < p1y+175 && bY > p1y-175)){
      return true;
    } 

  //returns true if the bird crashes into the first bottom pipe
  else if ((bX < pipe1x+23 && bX > pipe1x-23) && (bY < p1y+500+175 && bY > p1y+500-190)){
      return true;
    } 

  //returns true if the bird crashes into the second top pipe
  else if ((bX < pipe2x+23 && bX > pipe2x-23) && (bY < p2y+175 && bY > p2y-175)){
      return true;
    } 

  //returns true if the bird crashes into the second bottom pipe
  else if ((bX < pipe2x+23 && bX > pipe2x-23) && (bY < p2y+500+175 && bY > p2y+500-190)){
      return true;
    } 

  //returns true if the bird crashes into the third top pipe
  else if ((bX < pipe3x+23 && bX > pipe3x-23) && (bY < p3y+175 && bY > p3y-175)){
      return true;
    } 

  //returns true if the bird crashes into the third bottom pipe
  else if ((bX < pipe3x+23 && bX > pipe3x-23) && (bY < p3y+500+175 && bY > p3y+500-190)){
      return true;
    } 

  //returns false if the bird has not crashed into anything
  else {
      return false;
    }
}

//////////////END OF CHECK FUNCTION//////////////

//////////////START OF DRAW FUNCTION//////////////

const draw = () => {
    checkForPoint(bX, pipe1x, pipe2x, pipe3x, gameover);

    //if the check function returns true, call the crash function
    if (check(bY, pipe1x, p1y)) {
	//hitAudio.play()
        crash();
    }

    //clears the screen on each iteration so that the previous frame is not shown on the screen
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draws the bird at its current position
    ctx.drawImage(bird,bX,bY, 288, 512);

    //drawing pipe 1 at its current position
    ctx.drawImage(pipe1, pipe1x, p1y, 288, 512);
    ctx.drawImage(pipe1b, pipe1x, p1y+500, 288, 512);

    //drawing pipe 2 at its current position
    ctx.drawImage(pipe2, pipe2x, p2y, 288, 512);
    ctx.drawImage(pipe2b, pipe2x, p2y+500, 288, 512);

    //drawing pipe 3 at its current position
    ctx.drawImage(pipe3, pipe3x, p3y, 288, 512);
    ctx.drawImage(pipe3b, pipe3x, p3y+500, 288, 512);

    //changing pipes x value by the value of pipespeed to make them move left
    pipe1x -= pipespeed;
    pipe2x -= pipespeed;
    pipe3x -= pipespeed;

    //changing the gravity variable and the birds y variable to make it fall
    gravity += 0.2; 
    bY += gravity;

    //moves pipes back to the start when they go out of the screen, then changing the pipes y value to another random variable. also resets pointtaken boolean
    if (pipe1x <= -200){
        pipe1x=400;
        p1y = Math.floor(Math.random() * (-276))-100;
        pointtaken1 = false;
    } else if (pipe2x <= -200){
        pipe2x=400;
        p2y = Math.floor(Math.random() * (-276))-100;
        pointtaken2 = false;
    } else if (pipe3x <= -200){
        pipe3x=400;
        p3y = Math.floor(Math.random() * (-276))-100;
        pointtaken3 = false;
    }
    

    //calls the draw function inside of itself to make an infinite loop and animates the new frame
    requestAnimationFrame(draw);
}

//////////////END OF DRAW FUNCTION//////////////

//calling draw function to start the loop
draw();

