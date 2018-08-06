/*Javascript Chess	
	Autor: Diego Feitoza
	E-Mail: diegofeitoza.dev@gmail.com
*/

var chess = {
	organizar: function(){
		var $mainChess = $('#main-chess');
		var $campoPeca = $('.item-tabuleiro');
		var $tabuleiro = $('#lista-tabuleiro');
		var telaH = $(window).height();
		var telaW = $(window).width();
		var linha = 1;
		var coresTabuleiro = {
			marromClaro: "rgb(210,180,140)",
			marromEscuro:"rgb(139,69,19)"
		};	

		$tabuleiro.css({			
			'height': (telaH-50) +'px',
			'width': (telaH-50) +'px'
		});

		$campoPeca.css({
			'width': ($tabuleiro.width()/8)+'px',
			'height': ($tabuleiro.height()/8)+'px'
		});

		$campoPeca.find('a').css({
			'font-size': ($campoPeca.width()*0.65)+'px'
		});

		for(var i=1; i <= $campoPeca.length; i++){
			if(i>1 && i%8==0){
				//console.log('Linha: ',linha);
				if(linha%2 != 0){				
					$('[data-pos="h'+linha+'"]').css('background',coresTabuleiro.marromClaro);
					$('[data-pos="g'+linha+'"]').css('background',coresTabuleiro.marromEscuro);
					$('[data-pos="f'+linha+'"]').css('background',coresTabuleiro.marromClaro);
					$('[data-pos="e'+linha+'"]').css('background',coresTabuleiro.marromEscuro);
					$('[data-pos="d'+linha+'"]').css('background',coresTabuleiro.marromClaro);
					$('[data-pos="c'+linha+'"]').css('background',coresTabuleiro.marromEscuro);
					$('[data-pos="b'+linha+'"]').css('background',coresTabuleiro.marromClaro);
					$('[data-pos="a'+linha+'"]').css('background',coresTabuleiro.marromEscuro);
				}else{				
					$('[data-pos="h'+linha+'"]').css('background',coresTabuleiro.marromEscuro);
					$('[data-pos="g'+linha+'"]').css('background',coresTabuleiro.marromClaro);
					$('[data-pos="f'+linha+'"]').css('background',coresTabuleiro.marromEscuro);
					$('[data-pos="e'+linha+'"]').css('background',coresTabuleiro.marromClaro);
					$('[data-pos="d'+linha+'"]').css('background',coresTabuleiro.marromEscuro);
					$('[data-pos="c'+linha+'"]').css('background',coresTabuleiro.marromClaro);
					$('[data-pos="b'+linha+'"]').css('background',coresTabuleiro.marromEscuro);
					$('[data-pos="a'+linha+'"]').css('background',coresTabuleiro.marromClaro);
				}
				linha++;
			}	
		}
	}
}

var movimentos = {
	//Salvar dados para movimento
	pecaSalva:{
		id: "",
		casaAnt: "",
		casaNova: ""
	},
	//Após o soltar
	allowDrop: function(ev) {
	    ev.preventDefault();
	},
	//Pega
	drag: function(ev, peca) {
		var pai = $(peca).parent('[data-pos]');
		movimentos.pecaSalva.casaAnt = $(pai).attr('data-pos');
	    movimentos.pecaSalva.id = $(peca).attr('id');
	    console.log('===Movimentos drag===\n  Peça: '+movimentos.pecaSalva.id,'\n======================');
	},
	//Solta
	drop: function(ev,posicao) {
	    ev.preventDefault();
	    if($(posicao).find('a').length > 0){
	    	var pecaRemover = $(posicao).find('a'); 

			($(pecaRemover).attr('id') != movimentos.pecaSalva.id) ? movimentosValidos.comePeca(ev,pecaRemover,posicao) : console.log('Mesma peça Fii');	    	
	    }else{
	    	movimentos.pecaSalva.casaNova = $(posicao).attr('data-pos');

	    	if(movimentosValidos.movimento(ev,movimentosValidos.retornaPeca(movimentos.pecaSalva.id), movimentos.pecaSalva.casaAnt, movimentos.pecaSalva.casaNova, movimentosValidos.retornaCor(movimentos.pecaSalva.id))){	    	
		    	$(posicao).append($('#'+movimentos.pecaSalva.id));
		    	console.log('========Jogada========\n'+movimentos.pecaSalva.id+'|'+movimentos.pecaSalva.casaAnt+'-'+movimentos.pecaSalva.casaNova+'\n===================');	
		    	movimentos.limparDadosPeca();
	    	}    		    	
	    }
	},
	//Limpar os dados da peça salva
	limparDadosPeca: function(){		
    	movimentos.pecaSalva.id="";
    	movimentos.pecaSalva.casaAnt="";
    	movimentos.pecaSalva.casaNova="";
	}
}

var movimentosValidos = {
	retornaPeca: function(peca){
		var pecaTrat = peca.split('-');
			pecaTrat = pecaTrat[0]
		return pecaTrat;
	},
	retornaCor: function(peca){
		var pecaCor = peca.split('-');
			pecaCor = pecaCor[1];
		return pecaCor;
	},
	comePeca: function(ev, pecaRemover, posicao){		
	    ev.preventDefault();	    
    	movimentos.pecaSalva.casaNova = $(posicao).attr('data-pos');
    	var posicoes = ['a','b','c','d','e','f','g','h'];
    	var podeComerCasa = false;

    	var comerPecas = {
    		piao: function(){
    			var cor = movimentosValidos.retornaCor(movimentos.pecaSalva.id);
    			for(var i=0; i < posicoes.length; i++){
					if(posicoes[i] == movimentos.pecaSalva.casaAnt.charAt(0)){
						if(posicoes[i+1] == movimentos.pecaSalva.casaNova.charAt(0) || posicoes[i-1] == movimentos.pecaSalva.casaNova.charAt(0)){
							podeComerCasa = true;
							console.log('Pode comer');
						}				
				    }
				}

    			if(podeComerCasa){     				
    				if(cor == 'branco' && ((parseInt(movimentos.pecaSalva.casaAnt.charAt(1))+1) == movimentos.pecaSalva.casaNova.charAt(1))){
    					console.log('Pode');   				
		    			$(posicao).text('');
				    	$(posicao).append($('#'+movimentos.pecaSalva.id));
			    		console.log('\n====Movimentos ComePeça====\nPosição final: '+$(posicao).attr('data-pos'));
				    	console.log('Peca Removida: ', $(pecaRemover).attr('id'));
				    	console.log('Peca que comeu: ', movimentos.pecaSalva.id,'\n=======================');
				    	console.log('========Jogada========\n'+movimentos.pecaSalva.id+'|'+movimentos.pecaSalva.casaAnt+'-'+movimentos.pecaSalva.casaNova+'\nRemoveu: '+$(pecaRemover).attr('id')+ '\n===================');	
				    	
				    	movimentos.limparDadosPeca();
    				}else{
    					console.log('Pião só come para o lado == carangue')
    				}
    			}else{
    				console.log('Não pode');
    			}
    		}
    	}

    	if(movimentosValidos.retornaCor($(pecaRemover).attr('id')) != movimentosValidos.retornaCor(movimentos.pecaSalva.id)){
    		console.log('Cores diferentes - Vai na fé');
    		var peca = movimentosValidos.retornaPeca(movimentos.pecaSalva.id);

    		switch(peca){
    			case 'piao':
    				comerPecas.piao();
    				break; 
    		}

    	}else{
    		console.log('Cores iguais Fii - Não podes comer (Vs.9)');
    	}    	
	},
	movimento: function(ev, peca, posicaoAnt, posicaoNova,cor){
	    ev.preventDefault();
		switch(peca){
			case 'piao':
				if(conjuntoMovimentos.piao(posicaoAnt,posicaoNova,cor)){
					return true
				}else{
					return false
				}
				break;
		}
	}
}

var conjuntoMovimentos = {
	dados:{
		casaAnt: '',
		posAnt: '',
		casaNova: '',
		posNova: '',
		cor: '',
		primeiraJogada: false
	},
	attPosicoes: function(posicaoAnt, posicaoNova, cor){
		conjuntoMovimentos.dados.casaAnt = posicaoAnt.charAt(0);
		conjuntoMovimentos.dados.posAnt = posicaoAnt.charAt(1);
		conjuntoMovimentos.dados.casaNov = posicaoNova.charAt(0);
		conjuntoMovimentos.dados.posNova = posicaoNova.charAt(1);
		conjuntoMovimentos.dados.cor = cor;
	},
	limparPosicoes: function(){
		conjuntoMovimentos.dados.casaAnt = '';
		conjuntoMovimentos.dados.posAnt = '';
		conjuntoMovimentos.dados.casaNov = '';
		conjuntoMovimentos.dados.posNova = '';
		conjuntoMovimentos.dados.cor = '';
		conjuntoMovimentos.dados.primeiraJogada = '';
	},
	piao: function(posicaoAnt, posicaoNova, cor){		
		conjuntoMovimentos.attPosicoes(posicaoAnt,posicaoNova,cor);
		if(conjuntoMovimentos.dados.cor == 'branco' && conjuntoMovimentos.dados.posAnt === '2'){
			conjuntoMovimentos.dados.primeiraJogada = true;
		}else if(conjuntoMovimentos.dados.cor == 'preto' && conjuntoMovimentos.dados.posAnt === '7'){
			conjuntoMovimentos.dados.primeiraJogada = true;
		}else{			
			conjuntoMovimentos.dados.primeiraJogada = false;
		}
		console.log('Casa antiga: ',conjuntoMovimentos.dados.casaAnt, '\nCasa nova: ', conjuntoMovimentos.dados.casaNov);
		if(conjuntoMovimentos.dados.casaAnt == conjuntoMovimentos.dados.casaNov){		
			if(conjuntoMovimentos.dados.primeiraJogada){
				if(conjuntoMovimentos.dados.cor == 'branco'){
					if((parseInt(conjuntoMovimentos.dados.posAnt)+2) == conjuntoMovimentos.dados.posNova || (parseInt(conjuntoMovimentos.dados.posAnt)+1) == conjuntoMovimentos.dados.posNova){
						console.log('Pode');
						return true;
					}else{
						console.log('Não Pode');
						return false;					
					}
				}else{
					if((parseInt(conjuntoMovimentos.dados.posAnt)-2) == conjuntoMovimentos.dados.posNova || (parseInt(conjuntoMovimentos.dados.posAnt)-1) == conjuntoMovimentos.dados.posNova){
						console.log('Pode');
						return true;
					}else{
						console.log('Não Pode');
						return false;					
					}
				}
			}else{
				if(conjuntoMovimentos.dados.cor == 'branco'){
					if((parseInt(conjuntoMovimentos.dados.posAnt)+1) == conjuntoMovimentos.dados.posNova){
						console.log('Pode');
						return true;
					}else{
						console.log('Não Pode');
						return false;					
					}
				}else{
					if((parseInt(conjuntoMovimentos.dados.posAnt)-1) == conjuntoMovimentos.dados.posNova){
						console.log('Pode');
						return true;
					}else{
						console.log('Não Pode');
						return false;					
					}
				}
			}
		}else{
			console.log('Não Pode');			
			return false;
		}
	}
}

var verificaVazio = function(){
	if(!movimentos.pecaSalva.id){
		return true;
	}else{
		return false;
	}
}

var init = function(){
	chess.organizar();
}

$(function(){
	init();

	//Alteração de tamanho para cada resize
	$(window).resize(function(){
		chess.organizar();
	});


	//Events Drag & Drop
	$('.peca-branca').on('dragstart',function(){
		movimentos.drag(event,this);
	});

	$('.peca-preta').on('dragstart',function(){
		movimentos.drag(event,this);
	});
	$('.item-tabuleiro').on('drop',function(){
		movimentos.drop(event,this);
	});

	$('.item-tabuleiro').on('dragover',function(){
		movimentos.allowDrop(event);
	});

	//Events click
	$('.item-tabuleiro').on('click',function(){
		if($(this).find('a').length > 0){

			var peca = $(this).find('a');

			if(verificaVazio()){
				movimentos.drag(event,peca);
			}else{			
				($(peca).attr('id') != movimentos.pecaSalva.id) ? movimentosValidos.comePeca(event,peca,this) : console.log('Mesma peça Fii');
				
			}		
		}else{			
			movimentos.drop(event, this);
		}		
	});

}); 

