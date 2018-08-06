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
	    	$(posicao).append($('#'+movimentos.pecaSalva.id));
	    	console.log('========Jogada========\n'+movimentos.pecaSalva.id+'|'+movimentos.pecaSalva.casaAnt+'-'+movimentos.pecaSalva.casaNova+'\n===================');	
	    	movimentos.limparDadosPeca();    		    	
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
		var pecaTrat = peca.split('-'),
			pecaTrat = pecaTrat[0]
		return pecaTrat;
	},
	retornaCor: function(peca){
		var cor = peca.split('-'),
			cor = cor[1];
		return cor;
	},
	comePeca: function(ev, pecaRemover, posicao){		
	    ev.preventDefault();	    
    	movimentos.pecaSalva.casaNova = $(posicao).attr('data-pos');
    	if(movimentosValidos.retornaCor($(pecaRemover).attr('id')) != movimentosValidos.retornaCor(movimentos.pecaSalva.id)){
    		console.log('Cores diferentes - Vai na fé');
	    	$(posicao).text('');
	    	$(posicao).append($('#'+movimentos.pecaSalva.id));

    		console.log('\n====Movimentos ComePeça====\nPosição final: '+$(posicao).attr('data-pos'));
	    	console.log('Peca Removida: ', $(pecaRemover).attr('id'));
	    	console.log('Peca que comeu: ', movimentos.pecaSalva.id,'\n=======================');
	    	console.log('========Jogada========\n'+movimentos.pecaSalva.id+'|'+movimentos.pecaSalva.casaAnt+'-'+movimentos.pecaSalva.casaNova+'\nRemoveu: '+$(pecaRemover).attr('id')+ '\n===================');	
	    	
	    	movimentos.limparDadosPeca();
    	}else{
    		console.log('Cores iguais Fii - Não podes comer (Vs.9)');
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


