$(document).ready(function(){
  var symbols = ['O', 'X'];
  var turn = 0;
  var player1 = 'Player 1', player2 = 'Player 2';

  $('.ttt-board-square').click(function() {
    if ((this).innerText === '' && turn % 2 === 0) {
      turn++;
      $('.ttt-game-prompt')[0].innerText = 'It\'s ' + player2 + '\'s turn';
      return (this).append(symbols[1]);

    }  else if ((this).innerText === '' && turn % 2 !== 0) {
      turn++;
      $('.ttt-game-prompt')[0].innerText = 'It\'s ' + player1 + '\'s turn';
      return (this).append(symbols[0]);
    }
  });

  $('.btn-clear-board').click(function() { resetBoard(); resetPlayers(); });

  $('.btn-add').on('click', function(){
    player1 = formatName($('.input-name-player1').val()); 
    player2 = formatName($('.input-name-player2').val()); 
    $('.ttt-players')[0].innerText = player1 + ' vs ' + player2 + '!';
    $('.ttt-game-prompt')[0].innerText = player1 + ' goes first!';
    resetBoard();
  });

  //tic-tac-toe reset functions:
  function resetBoard() {
    turn = 0;
    var tttSquares = document.getElementsByClassName('ttt-board-square');
    for (var i = 0; i < 9; i++) {
      tttSquares[i].innerText = '';
    }
  }

  function resetPlayers() {
    player1 = 'Player 1'; 
    player2 = 'Player 2';
    $('.ttt-players')[0].innerText = player1 + ' vs ' + player2 + '!';
    $('.ttt-game-prompt')[0].innerText = player1 + ' goes first!';
  }

  //other helper functions:
  function formatName(name) {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
  }


});