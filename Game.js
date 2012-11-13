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


function Game( ctx ){
	var mCtx = ctx
	
	var mBoard;
	
	//初期化
	this.Init = function(){
		//画像ロード
		gIManager.LoadImage( "BoardCell.gif" );
		gIManager.LoadImage( "Stones.gif" );
		
		mBoard = new Board( 8, 8 );
		mBoard.Init();
		
	}
	
	//更新
	this.update = function(){
		
		this.draw();
	}
	
	//画面描画
	this.draw = function(){
		mCtx.clearRect( 0, 0, boardX, boardY );
		
		mBoard.draw();
	}
}

function GameLoop(){
	gGame.update();
}

window.onload = function() {
	// Get the canvas element.
	canvas = document.getElementById("gameBoard");

	// Make sure you got it.
	if (canvas.getContext) {
		// Specify 2d canvas type.
		ctx = canvas.getContext("2d");
	  
		gIManager = new ImageManager( ctx );
		
		//ゲームクラス作成
		gGame = new Game( ctx );
		gGame.Init();

		// Play the game until the ball stops.
		gameLoop = setInterval(GameLoop, 16);

		// Add keyboard listener.
		window.addEventListener('keydown', whatKeyDown, true);

		// Add keyboard listener.
		window.addEventListener('keyup', whatKeyUp, true);

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