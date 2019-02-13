$(document).ready(function(){
  var symbols = ['O', 'X'];
  var turn = 0;
  var player1 = 'Player 1', player2 = 'Player 2';
  var gameboard = document.getElementsByClassName('ttt-board-square');

  //Tic-Tac-Toe gameboard
  $('.ttt-board-square').on('click',function() {
    
    if ((this).innerText === '' && turn % 2 === 0) {
      $('.ttt-game-prompt')[0].innerText = 'It\'s ' + player2 + '\'s turn';
      (this).append(symbols[1]);
      if (!ticTacToe(turn)) { turn++; }
      
    } else if ((this).innerText === '' && turn % 2 !== 0) {
      $('.ttt-game-prompt')[0].innerText = 'It\'s ' + player1 + '\'s turn';
      (this).append(symbols[0]);
      if (!ticTacToe(turn)) { turn++; }
    }
  });

  //Button functions
  $('.btn-clear-board').click(function() { 
    resetBoard(); 
    resetPlayers(); 
    
    $('.ttt-board-square').on('click',function() {
    
      if ((this).innerText === '' && turn % 2 === 0) {
        $('.ttt-game-prompt')[0].innerText = 'It\'s ' + player2 + '\'s turn';
        (this).append(symbols[1]);
        if (!ticTacToe(turn)) { turn++; }
        
      } else if ((this).innerText === '' && turn % 2 !== 0) {
        $('.ttt-game-prompt')[0].innerText = 'It\'s ' + player1 + '\'s turn';
        (this).append(symbols[0]);
        if (!ticTacToe(turn)) { turn++; }
      }
    });
  });

  $('.btn-add').on('click', function(){
    player1 = formatName($('.input-name-player1').val()); 
    player2 = formatName($('.input-name-player2').val()); 
    $('.ttt-players')[0].innerText = player1 + ' vs ' + player2 + '!';
    $('.ttt-game-prompt')[0].innerText = player1 + ' goes first!';
    resetBoard();
  });

  //Tic-Tac-Toe game:
  function ticTacToe (playerTurn) {
    if (isWinningCombo(gameboard[0].innerText, gameboard[1].innerText, gameboard[2].innerText) || 
        isWinningCombo(gameboard[3].innerText, gameboard[4].innerText, gameboard[5].innerText) ||
        isWinningCombo(gameboard[6].innerText, gameboard[7].innerText, gameboard[8].innerText) || 
        isWinningCombo(gameboard[0].innerText, gameboard[3].innerText, gameboard[6].innerText) ||
        isWinningCombo(gameboard[1].innerText, gameboard[4].innerText, gameboard[7].innerText) || 
        isWinningCombo(gameboard[2].innerText, gameboard[5].innerText, gameboard[8].innerText) ||
        isWinningCombo(gameboard[0].innerText, gameboard[4].innerText, gameboard[8].innerText) || 
        isWinningCombo(gameboard[2].innerText, gameboard[4].innerText, gameboard[6].innerText) ) {
          $('.ttt-game-prompt')[0].innerText = (playerTurn % 2 === 0 ? player1 : player2) + ' wins!';
          $('.scoreboard-list').prepend('<div class="date-time">' + moment().format('MMMM Do YYYY, h:mm a') + '</div>')
          $('.scoreboard-list').prepend('<div>' + player1 + ' vs ' + player2 + ': ' + (playerTurn % 2 === 0 ? player1 : player2) + ' wins!</div>');
          $('.ttt-board-square').off('click');
          return true;
        } else if (playerTurn === 8) {
          $('.ttt-game-prompt')[0].innerText = 'It\'s a draw!';
          $('.scoreboard-list').prepend('<div class="date-time">' + moment().format('MMMM Do YYYY, h:mm a') + '</div>')
          $('.scoreboard-list').prepend('<div>' + player1 + ' vs ' + player2 + ': ' + ' It\'s a draw!</div>');
          return false;
        } else {
          return false;
        }
  }

  // function dealWithWinner (winner) {
  //   $('.ttt-game-prompt')[0].innerText = (playerTurn % 2 === 0 ? player1 : player2) + ' wins!';
  // }


  //tic-tac-toe reset functions:
  function resetBoard() {
    turn = 0;
    for (var square of gameboard) {
      square.innerText = '';
    }
  }

  function resetPlayers() {
    player1 = 'Player 1'; 
    player2 = 'Player 2';
    $('.ttt-players')[0].innerText = player1 + ' vs ' + player2 + '!';
    $('.ttt-game-prompt')[0].innerText = player1 + ' goes first!';
  }

  //tic-tac-toe game functions:
  function isWinningCombo (elem1, elem2, elem3) {
    return (elem1 === elem2 && elem1 === elem3 && elem1 !== '');  
  }


  //other helper functions:
  function formatName(name) {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
  }

});