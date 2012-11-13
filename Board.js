//Board
//ボードクラス

//-1:未配置
//0:白
//1:黒
function Board( width, height ){
	//ボードの縦横のサイズが両方6~100マスで収まっているか
	if( width < 6 || width > 100 || height < 6 || height > 100 ){
		return null;
	}
	
	var mBoard;
	
	var BOARD_WIDTH = width;
	var BOARD_HEIGHT = height;
	
	mBoard = new Array( width * height );
	
	//初期化
	for( y = 0; y < BOARD_HEIGHT; y++ ){
		for( x = 0; x < BOARD_WIDTH; x++ ){
			mBoard[ y * BOARD_WIDTH + x ] = -1;
		}
	}
	
	//初期配置
	//○●
	//●○
	setBoard( BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2 - 1, 0 );
	setBoard( BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 1, 1 );
	setBoard( BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2, 1 );
	setBoard( BOARD_WIDTH / 2, BOARD_HEIGHT / 2, 0 );
	
	//ボード操作
	//(x,y)をboardにする。石の裏返し等は行わない。
	this.setBoard( x, y, board ){
		//範囲チェック
		if( x < 0 || x > BOARD_WIDTH ||
			y < 0 || y > BOARD_HEIGHT ){
			return null;
		}
		
		mBoard[ y * BOARD_WIDTH + x ] = board;
	}
	
	//石を置く
	//(x,y)にwobの石を置いて、裏返し処理を行う。
	this.PutStone( x, y, wob ){
		//範囲チェック
		if( x < 0 || x > BOARD_WIDTH ||
			y < 0 || y > BOARD_HEIGHT ){
			return null;
		}
		
		//空きマスか
		if( mBoard[ y * BOARD_WIDTH + x ] != -1 ){
			return null;
		}
		
		mBoard[ y * BOARD_WIDTH + x ] = wob;
		
		//:TODO 石の裏返し
	}
	
	//ボード描画
	this.draw(){
		
	}
}