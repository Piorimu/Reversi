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
	
	//�͈̓`�F�b�N
	this.isOut = function( x, y ){
		//�͈̓`�F�b�N
		if( x < 0 || x >= BOARD_WIDTH || y < 0 || y >= BOARD_HEIGHT ){
			return true;
		}
		return false;
	}
	//�{�[�h����
	//(x,y)��board�ɂ���B�΂̗��Ԃ����͍s��Ȃ��B
	this.setBoard = function( x, y, board ){
		//�͈̓`�F�b�N
		if( this.isOut( x, y ) ){
			return null;
		}
		
		mBoard[ y * BOARD_WIDTH + x ] = board;
	}
	
	//�΂��u���邩
	//(x,y)��wob�̐΂�u���邩�`�F�b�N����
	//-3:�u���Ă����Ԃ���Ȃ� -2:�}�X���󂢂ĂȂ� -1:�͈͊O 0:�u����
	this.PutCheck = function( putX, putY, wob ){
		//�͈̓`�F�b�N
		if( this.isOut( putX, putY ) ){
			return -1;
		}
		
		//�󂫃}�X��
		if( mBoard[ putY * BOARD_WIDTH + putX ] != -1 ){
			return -2;
		}
		
		//���Ԃ��ׂ���
		var tstone = wob == 0 ? 1 : 0;
		//�e�����֐΂����邩���Ă���
		for( cy = -1; cy <= 1; cy++ ){
			for( cx = -1; cx <= 1; cx++ ){
				//���Ӗ�
				if( cx == 0 && cy == 0 ){
					continue;
				}
				
				var x = putX, y = putY;
				//���Ԃ���΂���������
				var isFindTS = false;
				//���[�v�i�߂���
				var count = 0;
				while(1){
					x += cx; y += cy;
					//�͈̓`�F�b�N
					if( this.isOut( x, y ) ){
						break;
					}
					
					//���Ԃ���΂�������
					if( mBoard[ y * BOARD_WIDTH + x ] == tstone ){
						isFindTS = true;
					}else{
						//���Ԃ���΂������Ă���
						if( isFindTS ){
							//�����F��������
							if( mBoard[ y * BOARD_WIDTH + x ] == wob ){
								//���Ԃ���I
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
	
	//�΂�u��
	//(x,y)��wob�̐΂�u���āA���Ԃ��������s���B
	//�Ԃ�l
	//-3:�u���Ă����Ԃ���Ȃ� -2:�}�X���󂢂ĂȂ� -1:�͈͊O 0:����
	this.PutStone = function( putX, putY, wob ){
		//�͈̓`�F�b�N
		if( this.isOut( putX, putY ) ){
			return -1;
		}
		
		//�󂫃}�X��
		if( mBoard[ putY * BOARD_WIDTH + putX ] != -1 ){
			return -2;
		}
		
		//���Ԃ�����
		var isTurn = false;
		//���Ԃ��ׂ���
		var tstone = wob == 0 ? 1 : 0;
		//�e�����֐΂����邩���Ă���
		for( cy = -1; cy <= 1; cy++ ){
			for( cx = -1; cx <= 1; cx++ ){
				//���Ӗ�
				if( cx == 0 && cy == 0 ){
					continue;
				}
				
				var x = putX, y = putY;
				//���Ԃ���΂���������
				var isFindTS = false;
				//���[�v�i�߂���
				var count = 0;
				while(1){
					x += cx; y += cy;
					//�͈̓`�F�b�N
					if( this.isOut( x, y ) ){
						break;
					}
					
					//���Ԃ���΂�������
					if( mBoard[ y * BOARD_WIDTH + x ] == tstone ){
						isFindTS = true;
					}else{
						//���Ԃ���΂������Ă���
						if( isFindTS ){
							//�����F��������
							if( mBoard[ y * BOARD_WIDTH + x ] == wob ){
								//���Ԃ���I
								isTurn = true;
								//���̏ꏊ����߂�Ȃ��痠�Ԃ��Ă���
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
		
		//�Ō�Ɏw�肵���ꏊ�ɐ΂�u��
		if( isTurn ){
			mBoard[ putY * BOARD_WIDTH + putX ] = wob;
			return 0;
		}
		return -3;
	}
	
	//color�Œu����ꏊ�����邩�m���߂�
	this.isCanPut = function( color ){
		for( y = 0;y < BOARD_HEIGHT; y++ ){
			for( x = 0; x < BOARD_WIDTH; x++ ){
				//�u����
				if( this.PutCheck( x, y, color ) == 0 ){
					return true;
				}
			}
		}
		return false;
	}
	
	//color�F�̐΂̐��𐔂���
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
		//�����z�u
		//����
		//����
		this.setBoard( BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2 - 1, 1 );
		this.setBoard( BOARD_WIDTH / 2, BOARD_HEIGHT / 2 - 1, 0 );
		this.setBoard( BOARD_WIDTH / 2 - 1, BOARD_HEIGHT / 2, 0 );
		this.setBoard( BOARD_WIDTH / 2, BOARD_HEIGHT / 2, 1 );
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