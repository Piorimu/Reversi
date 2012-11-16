//Mouseクラス
//マウス関係の処理を担う

//イベント登録メソッド
var addListener = ( function(){	
	if( document.addEventListener ){
		return function( element, type, callback ){
			element.addEventListener( type, callback, false );
		}
	}else if( document.attachEvent ){
		return function( element, type, callback ){
			element.attachEvent( 'on' + type, fn );
		}
	}else{
		return function( element, type, callback ){
			element['on'+type] = callback;
		}
	}
})();

//マウスの座標
//こ↑こ↓のを参考に
//http://www12.atpages.jp/~nekomike/blog/2011/08/18/javascript-%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E6%95%B4%E7%90%861-%EF%BC%88%E3%83%9E%E3%82%A6%E3%82%B9%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E7%B7%A8%EF%BC%89/
window_info = function(){
    var wininfo = {};
    if(window.innerWidth){
        wininfo.horizontal_scroll = window.pageXOffset;
        wininfo.vertical_scroll = window.pageYOffset;
    }else{
        if(document.documentElement && document.documentElement.clientWidth){
            wininfo.horizontal_scroll = document.documentElement.scrollLeft;
            wininfo.vertical_scroll = document.documentElement.scrollTop;
        }else{
            if(document.body.clientWidth){
                wininfo.horizontal_scroll = document.body.scrollLeft;
                wininfo.vertical_scroll = document.body.scrollTop;
            }
        }
    }
    return wininfo;
}
get_mouseX = function(el){
    var x = 0,
        e;
    for(e = el; e; e = e.offsetParent){
        x += e.offsetLeft;
    }
    for(e = el.parentNode; e && e !== document.body; e = e.parentNode){
        if(e.scrollLeft){
            x -= e.scrollLeft;
        }
    }
    return x;
}
get_mouseY = function(el){
    var y = 0,
        e;
    for(e = el; e; e = e.offsetParent){
        y += e.offsetTop;
    }
    for(e = el.parentNode; e && e !== document.body; e = e.parentNode){
        if(e.scrollTop){
            y -= e.scrollTop;
        }
    }
    return y;
}
MouseMoveF = function(e){
    var el = e.target,
        wininfo = window_info();
    
    gMouse.X = e.clientX + wininfo.horizontal_scroll - get_mouseX(el);
	gMouse.Y = e.clientY + wininfo.vertical_scroll - get_mouseY(el);
};

//クリックイベント時に呼び出すメソッド
//クリックフラグをOnにする
var MouseClickF = function(e){
	switch( e.button ){
		case 0:
			gMouse.LClick = true;
			break;
	}
};

function Mouse( element ){	
	var X = 0;
	var Y = 0;
	
	var LClick = false;
	
	//マウスの状態を更新するために１フレーム毎に呼ぶ
	this.update = function(){
		if( this.LClick ) this.LClick = false;
	}
	
	//イベント登録	
	addListener( element, "mousemove", MouseMoveF );
	addListener( element, "click", MouseClickF );
}