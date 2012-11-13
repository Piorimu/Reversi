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

var gLog;

var gGame;
var gBoard;
var gIManager;
var gFManager = new FileManager();
var gMouse;

var leftKey = false;
var rightKey = false;
var spaceKey = false;
var spaceKeyToggle = false;
// This function is called on page load.


function Game( ctx ){
	var mCtx = ctx
	
	var mBoard;
	
	var isPlayer = true;
	
	//������
	this.Init = function(){
		//�摜���[�h
		gIManager.LoadImage( "BoardCell.gif" );
		gIManager.LoadImage( "Stones.gif" );
		
		mBoard = new Board( 8, 8 );
		mBoard.Init();
		
	}
	
	//�X�V
	this.update = function(){
		this.draw();
		gMouse.update();
	}
	
	//��ʕ`��
	this.draw = function(){
		mCtx.clearRect( 0, 0, boardX, boardY );
		
		mBoard.draw();
		
		//�}�E�X���W�\��
		gLog.value = "MouseX:"+gMouse.X+" MouseY:"+gMouse.Y+"\n";
		if( gMouse.LClick ){
			gLog.value += "Click!";
		}
	}
}

//�O���[�o���ȃ��\�b�h����

function GameLoop(){
	gGame.update();
}

window.onload = function() {
	// Get the canvas element.
	canvas = document.getElementById("gameBoard");
	
	gLog = document.getElementById( "Log" );

	// Make sure you got it.
	if (canvas.getContext) {
		//�}�E�X�N���X�쐬
		gMouse = new Mouse( canvas );
		
		// Specify 2d canvas type.
		ctx = canvas.getContext("2d");
	  
		gIManager = new ImageManager( ctx );
		
		//�Q�[���N���X�쐬
		gGame = new Game( ctx );
		gGame.Init();

		// Play the game until the ball stops.
		gameLoop = setInterval(GameLoop, 16);

		// Add keyboard listener.
		window.addEventListener('keydown', whatKeyDown, false);

		// Add keyboard listener.
		window.addEventListener('keyup', whatKeyUp, false);

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