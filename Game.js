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
	
	var mGameState = document.getElementById( "gameState" );
	var mBoard;
	
	var BlackWhite = false;	//���łF�Bfalse��true��
	var isPrevNoPut = false;	//�O�̐F�Œu���ꏊ���Ȃ�������
	
	var isEnd = false;	//�������I�������
	
	//������
	this.Init = function(){
		//�摜���[�h
		gIManager.LoadImage( "BoardCell.gif" );
		gIManager.LoadImage( "Stones.gif" );
		
		this.Reset();
	}
	
	//���Z�b�g
	this.Reset = function(){
		//���͍�
		BlackWhite = false;
		//�{�[�h������
		mBoard = new Board( 8, 8 );
		mBoard.Init();

		if( !isEnd ){
			mGameState.innerHTML = "";
			//�u���Ȃ��ăp�X����
			if( isPrevNoPut ){
				mGameState.innerHTML = "�u���ꏊ���Ȃ��̂Ńp�X���܂���<br>";
			}
			//���݂̎�Ԃ�\��
			mGameState.innerHTML += (BlackWhite ? "��" : "��") + "�̔Ԃł��B";
		}else{
			mGameState.innerHTML = "��" + mBoard.getNumStones( 0 ) + "�A��"+mBoard.getNumStones( 1 )+"�ŁA"+(BlackWhite ? "��" : "��") + "�������܂����B";
		}		
	}
	
	this.Pass = function(){
		BlackWhite = !BlackWhite;
		//�u���܂������H
		if( !mBoard.isCanPut(BlackWhite) ){
			if( isPrevNoPut ){
				//�O�̐F�ł��u���Ȃ������̂ŏ��s�`�F�b�N
				this.Judgement();
				
				return;
			}
			//�u���܂���ł����c
			isPrevNoPut = true;
			this.Pass();
		}else{
			isPrevNoPut = false;
		}
		
		if( !isEnd ){
			mGameState.innerHTML = "";
			//�u���Ȃ��ăp�X����
			if( isPrevNoPut ){
				mGameState.innerHTML = "�u���ꏊ���Ȃ��̂Ńp�X���܂���<br>";
			}
			//���݂̎�Ԃ�\��
			mGameState.innerHTML += (BlackWhite ? "��" : "��") + "�̔Ԃł��B";
		}else{
			mGameState.innerHTML = "��" + mBoard.getNumStones( 0 ) + "�A��"+mBoard.getNumStones( 1 )+"�ŁA"+(BlackWhite ? "��" : "��") + "�������܂����B";
		}
	}
	
	this.Judgement = function(){
		BlackWhite = mBoard.getNumStones( 0 ) > mBoard.getNumStones( 1 );
		isEnd = true;
	}
	
	//�X�V
	this.update = function(){
		//�Q�[���i�s
		if( !isEnd ){
			if( gMouse.LClick ){
				var isPut = mBoard.PutStone( parseInt(gMouse.X / 50), parseInt(gMouse.Y / 50), BlackWhite ? 1 : 0 );
				if( isPut == 0 ){	//�u����
					this.Pass();
				}
			}
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

//�p�X�{�^����������
function Pass(){
	gGame.Pass();
}

//���Z�b�g�{�^����������
function Reset(){
	gGame.Reset();
}