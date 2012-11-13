//ImageManagerクラス
//画像の読み込み、描画
function ImageManager( g ){
	var Graphic = g;
	var myImages = [];
	
	this.LoadImage = function( filename ){
		if( myImages[ filename ] == null ){
			myImages[ filename ] = new Image();
			myImages[ filename ].src = filename + "?" + new Date().getTime();
			myImages[ filename ].onerror = function(){
				delete myImages[ filename ];
			}
			myImages[ filename ].onabort = function(){
				delete myImages[ filename ];
			}
		}else{
			return false;
		}
	}
	this.DeleteImage = function( filename ){
		myImages[ filename ] = null;
	}
	
	this.ReLoad = function(){
		for( var key in myImages ){
			myImages[key].src = key + "?" + new Date().getTime();
		}	
	}
	
	//DrawImage
	//引数の数を見て、各draw関数へ飛ばすだけ
	this.DrawImage = function( key, dsx, dsy, dsw, dsh, dx, dy, dw, dh ){
		switch (arguments.length) {
			case 3:
				//dsx,dsyに画像を原寸で描画
				this.draw3( key, dsx, dsy );
				break;
			case 5:
				//dsx,dsyに画像をサイズdswｘdshで描画
				this.draw5( key, dsx, dsy, dsw, dsh );
				break;
			case 7:
				//dx,dyに画像のdsx,dsyを起点としてdsw,dshの大きさの部分を描画
				this.draw7( key, dsx, dsy, dsw, dsh, dx, dy );
				break;
			case 9:
				//dx,dyに画像のdsx,dsyを起点としてdsw,dshの大きさの部分をdw,dhのサイズに拡大縮小して描画
				this.draw9( key, dsx, dsy, dsw, dsh, dx, dy, dw, dh );
				break;
			default:
		}
	}
	
	this.draw3 = function( key, dx, dy ){
		if( myImages[key] != null ){
			//ローディング終了前に描画メソッドが呼ばれたら何もしない安定。
			if( myImages[key].complete == true ){
				Graphic.drawImage( myImages[key], dx, dy );
			}
		}else{
			return false;
		}
		return true;
	}
	
	this.draw5 = function( key, dx, dy, dw, dh ){
		if( myImages[key] != null ){
			if( myImages[key].complete == true ){
				Graphic.drawImage( myImages[key], dx, dy, dw, dh );
			}
		}else{
			return false;
		}
		return true;
	}
	
	this.draw7 = function( key, sx, sy, sw, sh, dx, dy ){
		if( myImages[key] != null ){
			if( myImages[key].complete == true ){
				Graphic.drawImage( myImages[key], sx, sy, sw, sh, dx, dy, sw, sh );
			}
		}else{
			return false;
		}
		return true;
	}
	
	this.draw9 = function( key, sx, sy, sw, sh, dx, dy, dw, dh ){
		if( myImages[key] != null ){
			if( myImages[key].complete == true ){
				Graphic.drawImage( myImages[key], sx, sy, sw, sh, dx, dy, dw, dh );
			}
		}else{
			return false;
		}
		return true;
	}
	
	//ローディング中かを返す
	this.isLoadComplete = function(){
		for( var key in myImages ){
			if( myImages[key].complete == false ){
				return false;
			}
		}
		return true;
	}
	
	//ローディング待ちの画像の数かリストを返す
	
}