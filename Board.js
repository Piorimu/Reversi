//Board
//�{�[�h�N���X

//-1:���z�u
//0:��
//1:��
function Board( width, height ){
	//�{�[�h�̏c���̃T�C�Y������6~100�}�X�Ŏ��܂��Ă��邩
	if( width < 6 || width > 100 || height < 6 || height > 100 ){
		return null;
	}
	
	var mBoard;
	
	var BOARD_WIDTH = width;
	var BOARD_HEIGHT = height;
	
	mBoard = new Array( width * height );
	
	//������
	for( y = 0; y < BOARD_HEIGHT; y++ ){
		for( x = 0; x < BOARD_WIDTH; x++ ){
			mBoard[ y * BOARD_WIDTH + x ] = -1;
		}
	}

	//�{�[�h����
	//(x,y)��board�ɂ���B�΂̗��Ԃ����͍s��Ȃ��B
	this.setBoard = function( x, y, board ){
		//�͈̓`�F�b�N
		if( x < 0 || x > BOARD_WIDTH || y < 0 || y > BOARD_HEIGHT ){
			return null;
		}
		
		mBoard[ y * BOARD_WIDTH + x ] = board;
	}
	
	//�΂�u��
	//(x,y)��wob�̐΂�u���āA���Ԃ��������s���B
	this.PutStone = function( x, y, wob ){
		//�͈̓`�F�b�N
		if( x < 0 || x > BOARD_WIDTH || y < 0 || y > BOARD_HEIGHT ){
			return null;
		}
		
		//�󂫃}�X��
		if( mBoard[ y * BOARD_WIDTH + x ] != -1 ){
			return null;
		}
		
		mBoard[ y * BOARD_WIDTH + x ] = wob;
		
		//:TODO �΂̗��Ԃ�
	}
	
	this.Init = function(){
		//�����z�u
		//����
		//����
		this.setBoard( BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2 - 1, 0 );
		this.setBoard( BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 1, 1 );
		this.setBoard( BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2, 1 );
		this.setBoard( BOARD_WIDTH / 2, BOARD_HEIGHT / 2, 0 );
	}
	
	//�{�[�h�`��
	this.draw = function(){
		for( y = 0; y < BOARD_HEIGHT; y++ ){
			for( x = 0; x < BOARD_WIDTH; x++ ){
				var tx = x * 50;
				var ty = y * 50;
				
				gIManager.DrawImage( "BoardCell.gif", tx, ty );
				
				switch( mBoard[ y * BOARD_WIDTH + x ] ){
					case 0:	//��
						gIManager.DrawImage( "Stones.gif", 0, 0, 48, 48, tx + 1, ty + 1);
						break;
					case 1: 	//��
						gIManager.DrawImage( "Stones.gif", 48, 0, 48, 48, tx + 1, ty + 1);					
						break;
				}
			}
		}
	}
}