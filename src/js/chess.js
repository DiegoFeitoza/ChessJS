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
				console.log('Linha: ',linha);
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
    	console.log('========\nPosição partida: '+movimentos.pecaSalva.casaAnt); //Posição que a peça foi!
	    movimentos.pecaSalva.id = $(peca).attr('id');
	    console.log('Peça: '+movimentos.pecaSalva.id);
	    movimentosValidos(movimentos.pecaSalva.id);
	},
	//Solta
	drop: function(ev,posicao) {
	    ev.preventDefault();
	    if($(posicao).find('a').length > 0){
	    	console.log('Posição tentativa: '+$(posicao).attr('data-pos'));
	    	var pecaRemover = $(posicao).find('a');
	    	console.log($(posicao).find('a'));
	    	console.log('Tem Gente');
	    	$(posicao).text('');
	    	$(posicao).append($('#'+movimentos.pecaSalva.id));
	    	console.log('Peca Removida: ', $(pecaRemover).attr('id'));
	    	console.log('\nPeca que comeu: ', movimentos.pecaSalva.id);
	    }else{
	    	console.log('Tá Livre');
	    	movimentos.pecaSalva.casaNova = $(posicao).attr('data-pos')
	    	console.log('Posição chegada: '+ movimentos.pecaSalva.casaNova); //Posição que a peça foi!
	    	$(posicao).append($('#'+movimentos.pecaSalva.id));
	    	console.log('=====Jogada====\n'+movimentos.pecaSalva.id+'|'+movimentos.pecaSalva.casaAnt+'-'+movimentos.pecaSalva.casaNova+'\n==========');	
	    	movimentos.limparDadosPeca();    		    	
	    }
	},
	limparDadosPeca: function(){		
    	movimentos.pecaSalva.id="";
    	movimentos.pecaSalva.casaAnt="";
    	movimentos.pecaSalva.casaNova="";
	}
}

var movimentosValidos = function(peca){
	var pecaTrat = peca.split('-');
	pecaTrat = pecaTrat[0];

	console.log('\nPeça a calcular o movimento: '+pecaTrat);


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

	//Events
	$('.peca-branca').on('click', function(){
		movimentos.drag(event,this);
	});

	$('.peca-branca').on('dragstart',function(){
		movimentos.drag(event,this);
	});

	$('.peca-preta').on('click', function(){
		movimentos.drag(event,this);
	});

	$('.peca-preta').on('dragstart',function(){
		movimentos.drag(event,this);
	});

	//Events
	$('.item-tabuleiro').on('click',function(){
		if($(this).find('a').length > 0){
			console.log('não livre');
		}else{			
			movimentos.drop(event, this);
		}		
	});

	$('.item-tabuleiro').on('drop',function(){
		movimentos.drop(event,this);
	});

	$('.item-tabuleiro').on('dragover',function(){
		movimentos.allowDrop(event);
	});
});

