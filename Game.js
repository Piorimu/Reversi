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

// This function is called on page load.


function Game( ctx ){
	var mCtx = ctx
	
	var mBoard;
	
	var BlackWhite = false;	//���łF�Bfalse��true��
	
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
		//�Q�[���i�s
		if( gMouse.LClick ){
			mBoard.PutStone( parseInt(gMouse.X / 50), parseInt(gMouse.Y / 50), BlackWhite ? 1 : 0 );
			BlackWhite = !BlackWhite;
		}
		
		//�`��
		this.draw();
		
		//�}�E�X��ԍX�V
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

	}
}