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
	
	var BlackWhite = false;	//次打つ色。false黒true白
	var isPrevNoPut = false;	//前の色で置く場所がなかったか
	
	var isEnd = false;	//試合が終わったか
	
	//初期化
	this.Init = function(){
		//画像ロード
		gIManager.LoadImage( "BoardCell.gif" );
		gIManager.LoadImage( "Stones.gif" );
		
		this.Reset();
	}
	
	//リセット
	this.Reset = function(){
		//先手は黒
		BlackWhite = false;
		//ボード初期化
		mBoard = new Board( 8, 8 );
		mBoard.Init();

		if( !isEnd ){
			mGameState.innerHTML = "";
			//置けなくてパスした
			if( isPrevNoPut ){
				mGameState.innerHTML = "置く場所がないのでパスしました<br>";
			}
			//現在の手番を表示
			mGameState.innerHTML += (BlackWhite ? "白" : "黒") + "の番です。";
		}else{
			mGameState.innerHTML = "黒" + mBoard.getNumStones( 0 ) + "個、白"+mBoard.getNumStones( 1 )+"個で、"+(BlackWhite ? "白" : "黒") + "が勝ちました。";
		}		
	}
	
	this.Pass = function(){
		BlackWhite = !BlackWhite;
		//置けましたか？
		if( !mBoard.isCanPut(BlackWhite) ){
			if( isPrevNoPut ){
				//前の色でも置けなかったので勝敗チェック
				this.Judgement();
				
				return;
			}
			//置けませんでした…
			isPrevNoPut = true;
			this.Pass();
		}else{
			isPrevNoPut = false;
		}
		
		if( !isEnd ){
			mGameState.innerHTML = "";
			//置けなくてパスした
			if( isPrevNoPut ){
				mGameState.innerHTML = "置く場所がないのでパスしました<br>";
			}
			//現在の手番を表示
			mGameState.innerHTML += (BlackWhite ? "白" : "黒") + "の番です。";
		}else{
			mGameState.innerHTML = "黒" + mBoard.getNumStones( 0 ) + "個、白"+mBoard.getNumStones( 1 )+"個で、"+(BlackWhite ? "白" : "黒") + "が勝ちました。";
		}
	}
	
	this.Judgement = function(){
		BlackWhite = mBoard.getNumStones( 0 ) > mBoard.getNumStones( 1 );
		isEnd = true;
	}
	
	//更新
	this.update = function(){
		//ゲーム進行
		if( !isEnd ){
			if( gMouse.LClick ){
				var isPut = mBoard.PutStone( parseInt(gMouse.X / 50), parseInt(gMouse.Y / 50), BlackWhite ? 1 : 0 );
				if( isPut == 0 ){	//置けた
					this.Pass();
				}
			}
		}
		
		//描画
		this.draw();
		
		//マウス状態更新
		gMouse.update();
	}
	
	//画面描画
	this.draw = function(){
		mCtx.clearRect( 0, 0, boardX, boardY );
		
		mBoard.draw();
		
		//マウス座標表示
		gLog.value = "MouseX:"+gMouse.X+" MouseY:"+gMouse.Y+"\n";
		if( gMouse.LClick ){
			gLog.value += "Click!";
		}
	}
}

//グローバルなメソッドたち

function GameLoop(){
	gGame.update();
}

window.onload = function() {
	// Get the canvas element.
	canvas = document.getElementById("gameBoard");
	
	gLog = document.getElementById( "Log" );

	// Make sure you got it.
	if (canvas.getContext) {
		//マウスクラス作成
		gMouse = new Mouse( canvas );
		
		// Specify 2d canvas type.
		ctx = canvas.getContext("2d");
	  
		gIManager = new ImageManager( ctx );
		
		//ゲームクラス作成
		gGame = new Game( ctx );
		gGame.Init();

		// Play the game until the ball stops.
		gameLoop = setInterval(GameLoop, 16);

	}
}

//パスボタンを押した
function Pass(){
	gGame.Pass();
}

//リセットボタンを押した
function Reset(){
	gGame.Reset();
}