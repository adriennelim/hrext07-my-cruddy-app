$(document).ready(function(){
  var symbols = ['O', 'X'];
  var turn = 0;
  $('.ttt-board-square').click(function() {
    if ((this).innerText === '' && turn % 2 === 0) {
      turn++
      return (this).append(symbols[1]);
    }  else if ((this).innerText === '' && turn % 2 !== 0) {
      turn++
      return (this).append(symbols[0]);
    }
  });

  $('.btn-clear-board').click(function() { clearBoard() });

  $('.btn-add').on('click', function(){
    var player1 = formatName($('.input-name-player1').val()); 
    var player2 = formatName($('.input-name-player2').val()); 
    $('.ttt-players')[0].innerText = '';
    $('.ttt-players')[0].innerText = player1 + ' vs ' + player2 + '!';
    clearBoard();
  });

  //tic-tac-toe game functions:
  function clearBoard() {
    turn = 0;
    var tttSquares = document.getElementsByClassName('ttt-board-square');
    for (var i = 0; i < 9; i++) {
      tttSquares[i].innerText = '';
    }
  }

  //helper functions:
  function formatName(name) {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
  }


});