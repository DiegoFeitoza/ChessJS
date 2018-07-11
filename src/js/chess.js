/*Javascript Chess
	
	Autor: Diego Feitoza
	E-Mail: diegofeitoza.dev@gmail.com

*/
var chess = {
	organizar: function(){
		var largTab = $('#lista-tabuleiro').width()/8;
		var $campoPeca = $('.item-tabuleiro');
		var $tabuleiro = $('#lista-tabuleiro');
		var linha = 1;
		var blue = "blue", white = "white";
		$campoPeca.css({
			'width': (largTab)+'px',
			'height': (largTab)+'px'
		});
		$tabuleiro.css({			
			'height': ($('#lista-tabuleiro').width()+2)+'px'
		});

		for(var i=1; i <= $campoPeca.length; i++){	
			if(i>1 && i%8==0){
				console.log('Linha: ',linha);
				if(linha%2 != 0){
					console.log('Entrou na negação');				
					$('[data-pos="h'+linha+'"]').css('background',white);
					$('[data-pos="g'+linha+'"]').css('background',blue);
					$('[data-pos="f'+linha+'"]').css('background',white);
					$('[data-pos="e'+linha+'"]').css('background',blue);
					$('[data-pos="d'+linha+'"]').css('background',white);
					$('[data-pos="c'+linha+'"]').css('background',blue);
					$('[data-pos="b'+linha+'"]').css('background',white);
					$('[data-pos="a'+linha+'"]').css('background',blue);
				}else{	
					console.log('Entrou na verdade');			
					$('[data-pos="h'+linha+'"]').css('background',blue);
					$('[data-pos="g'+linha+'"]').css('background',white);
					$('[data-pos="f'+linha+'"]').css('background',blue);
					$('[data-pos="e'+linha+'"]').css('background',white);
					$('[data-pos="d'+linha+'"]').css('background',blue);
					$('[data-pos="c'+linha+'"]').css('background',white);
					$('[data-pos="b'+linha+'"]').css('background',blue);
					$('[data-pos="a'+linha+'"]').css('background',white);
				}
				linha++;
			}	
		}
	}
}

var init = function(){
	chess.organizar();
}

$(function(){
	init();
});