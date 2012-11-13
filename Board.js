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
	
	//�����z�u
	//����
	//����
	setBoard( BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2 - 1, 0 );
	setBoard( BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 1, 1 );
	setBoard( BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2, 1 );
	setBoard( BOARD_WIDTH / 2, BOARD_HEIGHT / 2, 0 );
	
	//�{�[�h����
	//(x,y)��board�ɂ���B�΂̗��Ԃ����͍s��Ȃ��B
	this.setBoard( x, y, board ){
		//�͈̓`�F�b�N
		if( x < 0 || x > BOARD_WIDTH ||
			y < 0 || y > BOARD_HEIGHT ){
			return null;
		}
		
		mBoard[ y * BOARD_WIDTH + x ] = board;
	}
	
	//�΂�u��
	//(x,y)��wob�̐΂�u���āA���Ԃ��������s���B
	this.PutStone( x, y, wob ){
		//�͈̓`�F�b�N
		if( x < 0 || x > BOARD_WIDTH ||
			y < 0 || y > BOARD_HEIGHT ){
			return null;
		}
		
		//�󂫃}�X��
		if( mBoard[ y * BOARD_WIDTH + x ] != -1 ){
			return null;
		}
		
		mBoard[ y * BOARD_WIDTH + x ] = wob;
		
		//:TODO �΂̗��Ԃ�
	}
	
	//�{�[�h�`��
	this.draw(){
		
	}
}