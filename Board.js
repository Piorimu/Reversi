//Board
//ボードクラス

//-1:未配置
//0:黒
//1:白
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
	
	//範囲チェック
	this.isOut = function( x, y ){
		//範囲チェック
		if( x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT ){
			return true;
		}
		return false;
	}
	//ボード操作
	//(x,y)をboardにする。石の裏返し等は行わない。
	this.setBoard = function( x, y, board ){
		//範囲チェック
		if( this.isOut( x, y ) ){
			return null;
		}
		
		mBoard[ y * BOARD_WIDTH + x ] = board;
	}
	
	//石が置けるか
	//(x,y)にwobの石を置けるかチェックする
	//-3:置いても裏返せれない -2:マスが空いてない -1:範囲外 0:置ける
	this.PutCheck = function( putX, putY, wob ){
		//範囲チェック
		if( this.isOut( putX, putY ) ){
			return -1;
		}
		
		//空きマスか
		if( mBoard[ putY * BOARD_WIDTH + putX ] != -1 ){
			return -2;
		}
		
		//裏返すべき石
		var tstone = wob == 0 ? 1 : 0;
		//各方向へ石があるか見ていく
		for( cy = -1; cy <= 1; cy++ ){
			for( cx = -1; cx <= 1; cx++ ){
				//無意味
				if( cx == 0 && cy == 0 ){
					continue;
				}
				
				var x = putX, y = putY;
				//裏返せる石があったか
				var isFindTS = false;
				//ループ進めた数
				var count = 0;
				while(1){
					x += cx; y += cy;
					//範囲チェック
					if( this.isOut( x, y ) ){
						break;
					}
					
					//裏返せる石を見つけた
					if( mBoard[ y * BOARD_WIDTH + x ] == tstone ){
						isFindTS = true;
					}else{
						//裏返せる石を見つけていた
						if( isFindTS ){
							//同じ色があった
							if( mBoard[ y * BOARD_WIDTH + x ] == wob ){
								//裏返せる！
								return 0;
							}
						}
						break;
					}
					
					count++;
				}
			}			
		}
		return -3;
	}
	
	//石を置く
	//(x,y)にwobの石を置いて、裏返し処理を行う。
	//返り値
	//-3:置いても裏返せれない -2:マスが空いてない -1:範囲外 0:成功
	this.PutStone = function( putX, putY, wob ){
		//範囲チェック
		if( this.isOut( putX, putY ) ){
			return -1;
		}
		
		//空きマスか
		if( mBoard[ putY * BOARD_WIDTH + putX ] != -1 ){
			return -2;
		}
		
		//裏返せたか
		var isTurn = false;
		//裏返すべき石
		var tstone = wob == 0 ? 1 : 0;
		//各方向へ石があるか見ていく
		for( cy = -1; cy <= 1; cy++ ){
			for( cx = -1; cx <= 1; cx++ ){
				//無意味
				if( cx == 0 && cy == 0 ){
					continue;
				}
				
				var x = putX, y = putY;
				//裏返せる石があったか
				var isFindTS = false;
				//ループ進めた数
				var count = 0;
				while(1){
					x += cx; y += cy;
					//範囲チェック
					if( this.isOut( x, y ) ){
						break;
					}
					
					//裏返せる石を見つけた
					if( mBoard[ y * BOARD_WIDTH + x ] == tstone ){
						isFindTS = true;
					}else{
						//裏返せる石を見つけていた
						if( isFindTS ){
							//同じ色があった
							if( mBoard[ y * BOARD_WIDTH + x ] == wob ){
								//裏返せる！
								isTurn = true;
								//元の場所から戻りながら裏返していく
								for( i = 0; i < count; i++ ){
									x -= cx; y -= cy;
									mBoard[ y * BOARD_WIDTH + x ] = wob;
								}
							}
						}
						break;
					}
					
					count++;
				}
			}			
		}
		
		//最後に指定した場所に石を置く
		if( isTurn ){
			mBoard[ putY * BOARD_WIDTH + putX ] = wob;
			return 0;
		}
		return -3;
	}
	
	//colorで置ける場所があるか確かめる
	this.isCanPut = function( color ){
		for( y = 0;y < BOARD_HEIGHT; y++ ){
			for( x = 0; x < BOARD_WIDTH; x++ ){
				//置ける
				if( this.PutCheck( x, y, color ) == 0 ){
					return true;
				}
			}
		}
		return false;
	}
	
	//color色の石の数を数える
	this.getNumStones = function( color ){
		var num = 0;
		for( y = 0;y < BOARD_HEIGHT; y++ ){
			for( x = 0; x < BOARD_WIDTH; x++ ){
				if( mBoard[ y * BOARD_WIDTH + x ] == color ){
					num++;
				}
			}
		}
		return num;
	}
	
	this.Init = function(){
		//初期配置
		//○●
		//●○
		this.setBoard( BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2 - 1, 1 );
		this.setBoard( BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 1, 0 );
		this.setBoard( BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2, 0 );
		this.setBoard( BOARD_WIDTH / 2, BOARD_HEIGHT / 2, 1 );
	}
	
	//ボード描画
	this.draw = function(){
		for( y = 0; y < BOARD_HEIGHT; y++ ){
			for( x = 0; x < BOARD_WIDTH; x++ ){
				var tx = x * 50;
				var ty = y * 50;
				
				gIManager.DrawImage( "BoardCell.gif", tx, ty );
				
				switch( mBoard[ y * BOARD_WIDTH + x ] ){
					case 0:	//黒
						gIManager.DrawImage( "Stones.gif", 0, 0, 48, 48, tx + 1, ty + 1);
						break;
					case 1: 	//白
						gIManager.DrawImage( "Stones.gif", 48, 0, 48, 48, tx + 1, ty + 1);					
						break;
				}
			}
		}
	}
}