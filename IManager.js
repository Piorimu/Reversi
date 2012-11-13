//ImageManager�N���X
//�摜�̓ǂݍ��݁A�`��
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
	//�����̐������āA�edraw�֐��֔�΂�����
	this.DrawImage = function( key, dsx, dsy, dsw, dsh, dx, dy, dw, dh ){
		switch (arguments.length) {
			case 3:
				//dsx,dsy�ɉ摜�������ŕ`��
				this.draw3( key, dsx, dsy );
				break;
			case 5:
				//dsx,dsy�ɉ摜���T�C�Ydsw��dsh�ŕ`��
				this.draw5( key, dsx, dsy, dsw, dsh );
				break;
			case 7:
				//dx,dy�ɉ摜��dsx,dsy���N�_�Ƃ���dsw,dsh�̑傫���̕�����`��
				this.draw7( key, dsx, dsy, dsw, dsh, dx, dy );
				break;
			case 9:
				//dx,dy�ɉ摜��dsx,dsy���N�_�Ƃ���dsw,dsh�̑傫���̕�����dw,dh�̃T�C�Y�Ɋg��k�����ĕ`��
				this.draw9( key, dsx, dsy, dsw, dsh, dx, dy, dw, dh );
				break;
			default:
		}
	}
	
	this.draw3 = function( key, dx, dy ){
		if( myImages[key] != null ){
			//���[�f�B���O�I���O�ɕ`�惁�\�b�h���Ă΂ꂽ�牽�����Ȃ�����B
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
	
	//���[�f�B���O������Ԃ�
	this.isLoadComplete = function(){
		for( var key in myImages ){
			if( myImages[key].complete == false ){
				return false;
			}
		}
		return true;
	}
	
	//���[�f�B���O�҂��̉摜�̐������X�g��Ԃ�
	
}