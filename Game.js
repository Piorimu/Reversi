// Global variables.
var boardX = 400; // Board width.
var boardY = 400; // Board height.
var paddleX = 150; // Initial paddle location.
var paddleH = 20; // Paddle height.
var paddleD = boardY - paddleH - 10; // Paddle depth.
var paddleW = 80; // Paddle width.
var canvas; // Canvas element.
var ctx; // Canvas context.
var gameLoop; // Game loop time interval.

var gGame;
var gBoard;
var gIManager;
var gFManager = new FileManager();

var leftKey = false;
var rightKey = false;
var spaceKey = false;
var spaceKeyToggle = false;
// This function is called on page load.

window.onload = function() {
	// Get the canvas element.
	canvas = document.getElementById("gameBoard");

	// Make sure you got it.
	if (canvas.getContext) {
		// Specify 2d canvas type.
		ctx = canvas.getContext("2d");
	  
		gIManager = new ImageManager( ctx );
		
		//初期化
		gBoard = new Board( 8, 8 );

		// Play the game until the ball stops.
		gameLoop = setInterval(GameLoop, 16);

		// Add keyboard listener.
		window.addEventListener('keydown', whatKeyDown, true);

		// Add keyboard listener.
		window.addEventListener('keyup', whatKeyUp, true);

	}
}

function Game(){
	var mBoard;
	
	//初期化
	this.Init(){
		//画像ロード
		gIManager.LoadImage( "BoardCell.jpg" );
		gIManager.LoadImage( "Stones.gif" );
	}
}
function drawBall() {

	// Clear the board.
	ctx.clearRect(0, 0, boardX, boardY);

	// Fill the board.
	gIManager.DrawImage( "back.jpg", 0, 0 );

	gStage.drawBlocks( ctx );

	// Draw a ball.
	gBall.draw( ctx );

	// Draw the paddle.
	gIManager.DrawImage( "paddle.gif", paddleX, paddleD );        

	if( leftKey == true ){
		paddleX = paddleX - 4;
		if (paddleX < 0) paddleX = 0;
	}
	if( rightKey == true ){
		paddleX = paddleX + 4;
		if (paddleX > boardX - paddleW) paddleX = boardX - paddleW;
	}
	
	if( gStage.isGameClear() == true ){
		//一番目の引数が表示したい文字、2番目がX座標、3番目がY座標
		ctx.fillStyle = "#00ff99";
		ctx.font = "50px 'Times New Roman'";
		ctx.fillText("GameClear!!!!", 50, 160, 200); 
		ctx.fillStyle = "#00ff99";
		ctx.font = "20px 'Times New Roman'";
		ctx.fillText("Num Retry:" + Retry, 50, 210, 200);
		if( spaceKey == true ){
			isBallset = true;
			spaceKeyToggle = true;
			StageNum = StageNum % 3 + 1;
			//初期化処理
			gStage.LoadStage( "./stage" + StageNum + ".txt" );
		}			
	}else{
		if( gBall.update() == -1 ){
			//一番目の引数が表示したい文字、2番目がX座標、3番目がY座標
			ctx.fillStyle = "red";
			ctx.font = "50px 'Times New Roman'";
			ctx.fillText("Miss!!!!", 50, 160, 200); 
			
			if( spaceKey == true ){
				isBallset = true;
				spaceKeyToggle = true;
				Retry++;
			}
		}else{
			if( spaceKey == true && spaceKeyToggle == false){
				isBallset = false;
			}else{
				if( spaceKey == false ){
					spaceKeyToggle = false;
				}
			}
		}
	}
}

// Get key press.


function whatKeyDown(evt) {
	switch (evt.keyCode) {
	// Left arrow.
	case 37:
		leftKey = true;
	break;

	// Right arrow.
	case 39:
		rightKey = true;
	break;

	//Space Key
	case 32:
	spaceKey = true;
	break;          
	}
}

function whatKeyUp(evt) {

	switch (evt.keyCode) {
	// Left arrow.
	case 37:
		leftKey = false;
	break;

	// Right arrow.
	case 39:
		rightKey = false;
	break;

	//Space Key
	case 32:
	spaceKey = false;
	break;
	}
}