//These are variables that will allow me to identify the location and sizes of each block for the purpose of calculating collisions.
//gravity of the game
const g = 5;

//first block variables
var firstBlockX=(100);
var firstBlockY=(155);

//first ball variables
var firstLocationX=(1200);
var firstLocationY=(100);


//second block variables
var secondBlockX=(400);
var secondBlockY=(355);

//second ball variables
var secondLocationX=(700);
var secondLocationY=(300);


//third block variables
var thirdBlockX=(700);
var thirdBlockY=(555);

//second ball variables
var thirdLocationX=(400);
var thirdLocationY=(500);

var score = 0;
var showingText = false;

//ball 1 speed variables
var m = 5	// just a variable that will dictate how fast the ball is moving in the x direction
var l = 2 // just a variable that will dictate how fast the ball is moving in the y direction, but can also indicate the direction when multiplied by -1


//ball 2 speed variables
var o = 5	// just a variable that will dictate how fast the ball is moving in the x direction
var a = 3.5 // just a variable that will dictate how fast the ball is moving in the y direction, but can also indicate the direction when multiplied by -1


//ball 3 speed variables
var q = 5	// just a variable that will dictate how fast the ball is moving in the x direction
var r = 2 // just a variable that will dictate how fast the ball is moving in the y direction, but can also indicate the direction when multiplied by -1



function setup() {
	createCanvas(1200, 600);
    //code to allow interaction with the arduino
    console.warn('UI hit')
    
    window.bend.on('press', function firstBlock(){
        firstBlockY = firstBlockY - 30;
     if (firstBlockY < 0){ 									//cause the block to wrap around on the y axis
          firstBlockY = 155; 
        }
    })
    
     window.touch.on('press', function firstBlock(){
       secondBlockY = secondBlockY - 30;
      if (secondBlockY < 200){ 									//cause the block to wrap around on the y axis
      secondBlockY = 355;
        }
    })
    
    window.piezo.on('press', function firstBlock(){
    thirdBlockY = thirdBlockY - 30;
      if (thirdBlockY < 400){ 									//cause the block to wrap around on the y axis
      thirdBlockY = 555;
            }
    })
    // TODO:
    
    
}


//sets the collision to being false from the start
var hit = false;
var hit2 = false;
var hit3 = false;


function draw() {
	
		//These three rectangles are the borders/backgrounds for each playing area
	strokeWeight(4);
	//Game 1
	fill(240,146,34); //color of top game area
	rect(0, 0, 1200, 200);

	
	//Game 2
	fill(246,236,32); //color of middle game area
	rect(0, 200, 1200, 200);
	
	
	//Game 3
	fill(86,18,16);//color of bottom game area
	rect(0, 400, 1200, 200);
	
	
	//Code for collision of blocks with bombs
	//Code for interaction TOP
	strokeWeight(0);													//no stroke for the blocks looks more retro
	fill("green");														//color of the first block
	rect(firstBlockX,firstBlockY,45,45);
	fill("red");															//color of the attacking ball
	ellipse(firstLocationX,firstLocationY,40,40);
	
	
	//Code for interaction Middle
	strokeWeight(0);													//no stroke for the blocks looks more retro
	fill("green");														//color of the first block
	rect(secondBlockX,secondBlockY,45,45);
	fill("red");															//color of the attacking ball
	ellipse(secondLocationX,secondLocationY,40,40);
	
	
	//Code for interaction Bottom
	strokeWeight(0);													//no stroke for the blocks looks more retro
	fill("green");														//color of the first block
	rect(thirdBlockX,thirdBlockY,45,45);
	fill("red");															//color of the attacking ball
	ellipse(thirdLocationX,thirdLocationY,40,40);
	
	
	//hit code
	hit = collideRectCircle(firstBlockX,firstBlockY,45,45,firstLocationX,firstLocationY,30,30);
	hit1 = collideRectCircle(secondBlockX,secondBlockY,45,45,secondLocationX,secondLocationY,30,30);
	hit2 = collideRectCircle(thirdBlockX,thirdBlockY,45,45,thirdLocationX,thirdLocationY,30,30);

	
//debugging code
	// print("colliding?" + hit); //tells me if the block interacts with another block
	// print("colliding?" + hit1); //tells me if the block interacts with another block
	// print("colliding?" + hit2); //tells me if the block interacts with another block
	
	//how to get the blocks to drop at a different frame count
	if(frameCount%6 === 0){
		if(firstBlockY < 155){
			//ball 1 code to get the ball to drop
			firstBlockY += g;
		}
		if(secondBlockY < 355){
			//ball 2 code to get the ball to drop
			secondBlockY += g;
		}
		if(thirdBlockY < 555){
			//ball 3 code to get the ball to drop
			thirdBlockY += g;
		}
	}
	
	
	//Ball 1 code to get the ball to move
	firstLocationX = firstLocationX - m;		//x Axis
	firstLocationY = firstLocationY + l;		//y Axis
	
	//Ball 2 code to get the ball to move
	
	secondLocationX = secondLocationX - o;		//x Axis
	secondLocationY = secondLocationY + a;		//y Axis
	
	//Ball 3 code to get the ball to move
	
	thirdLocationX = thirdLocationX - q;		//x Axis
	thirdLocationY = thirdLocationY + r;		//y Axis
	
	//Code to get the balls to bounce along their respective boundaries
	//BALL 1
	if (firstLocationX < 1){				//will bounce along the x axis
		firstLocationX = 1200;
	}
	
	if (firstLocationY > 200 || firstLocationY < 0){		// will bounce along the y axis
		l = l * -1;
	}
	
	
		//BALL 2
		if (secondLocationX < 1){			//will bounce along the x axis
		secondLocationX = 1200;				
	}
	
	
	if (secondLocationY > 400 || secondLocationY < 200){		// will bounce along the y axis
		 a = a * -1;
	}
	
	
		//BALL 3
	if (thirdLocationX < 1){				//will bounce along the x axis
		thirdLocationX = 1200;
	}
	
	
	if (thirdLocationY > 600 || thirdLocationY < 400){		// will bounce along the y axis
		r = r * -1;
	}
	
	
	//score stuff
		textSize(32);
		var t = "Score: " + str(score)
		text(t, 200,50);
	
	
	
	//setting a game over function and a restarting the score function
	if (hit == true || hit1 == true || hit2 == true || showingText == true){
		showingText = true;
		setTimeout(function(){showingText = false},2000);
		fill("black");
		textSize(150);
		text('START FROM 0', 50, windowHeight/2);
		score = 0;
	}
	
	
	
	//Increasing score
		var hit7 = false;
		var hit8 = false;
		var hit9 = false;
	
	point(firstLocationX,firstLocationY);
	point(secondLocationX,secondLocationY);
	point(thirdLocationX,thirdLocationY);
	
	line(0, 0, 0, windowHeight);

	
	
	//Code for ball crossing line to increase score
	hit7 = collidePointLine(firstLocationX,firstLocationY,0, 0, 0, windowHeight);
	hit8 = collidePointLine(secondLocationX,secondLocationY,0, 0, 0, windowHeight);
	hit9 = collidePointLine(thirdLocationX,thirdLocationY,0, 0, 0, windowHeight);

if (hit7 == true || hit8 == true || hit9 == true){
		score+=1;
		console.log(score);
	
	}
}

//setting initial values to certain variables
var value=0;
var value1=1;
var value2=2;


//A key pressed function that causes the movement of the blocks and will ultimately be changed to be caused by the arduino
	
	function keyPressed() {
  if (keyCode === LEFT_ARROW) {
 firstBlockY = firstBlockY - 30;
  }if (firstBlockY < 0){ 									//cause the block to wrap around on the y axis
  firstBlockY = 155;
  } if (keyCode === UP_ARROW) {
    secondBlockY = secondBlockY - 30;
  }if (secondBlockY < 200){ 									//cause the block to wrap around on the y axis
  secondBlockY = 355;
  }if (keyCode === RIGHT_ARROW) {
		thirdBlockY = thirdBlockY - 30;
  }if (thirdBlockY < 400){ 									//cause the block to wrap around on the y axis
  thirdBlockY = 555;
		}
	}