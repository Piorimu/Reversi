//FileManager
//テキストファイルとかひらいて文字列にしちゃうよう
function FileManager(){
	var xmlHttp;
	var Datas;
	
	this.LoadFile = function( filename ){		
		if (window.XMLHttpRequest){
			xmlHttp = new XMLHttpRequest();
		}else{
			if (window.ActiveXObject){
				xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
		    }else{
		    	xmlHttp = null;
		    }
		}
		
		xmlHttp.onreadystatechange = this.checkStatus;
		xmlHttp.open("GET", filename, true);

		xmlHttp.send(null);
		
		return Datas;
	}
	
	this.checkStatus = function(){
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
		    Datas = xmlHttp.responseText;
		}	
	}
}