/*Javascript Chess
	
	Autor: Diego Feitoza
	E-Mail: diegofeitoza.dev@gmail.com

*/

var chess = {
	organizar: function(){
		var $mainChess = $('#main-chess');
		var $campoPeca = $('.item-tabuleiro');
		var $tabuleiro = $('#lista-tabuleiro');
		var linha = 1;
		var coresTabuleiro = {
			marromClaro: "rgb(210,180,140)",
			marromEscuro:"rgb(139,69,19)"
		};	

		$tabuleiro.css({			
			'height': $tabuleiro.width()+'px'
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
	allowDrop: function(ev) {
	    ev.preventDefault();
	},

	drag: function(ev, peca) {
	    ev.dataTransfer.setData("peca", peca.id);
	},

	drop: function(ev,posicao) {
	    ev.preventDefault();
	    if($(posicao).find('a').length > 0){
	    	console.log('Tem Gente');
	    }else{
	    	console.log('Tá Livre');
	    	var data = ev.dataTransfer.getData("peca");
	    	$(posicao).append($('#'+data));
	    	//ev.target.appendChild(document.getElementById(data));
	    }
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
		console.log('mexeu');
	});

	//Events
	var pecasBrancas = document.getElementsByClassName("peca-branca");
	pecasBrancas.addEventListener("click", function(){
		movimentos.drag(event, this);
	});

	//Events
	$('.item-tabuleiro').on('click',function(){
		if($('.item-tabuleiro').find('a').length > 0){
			console.log(this);
		}else{
			movimentos.drop(event, this);
		}
		
	});
});

