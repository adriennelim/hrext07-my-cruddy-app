$(document).ready(function(){
  var symbols = ['O', 'X'];
  var player1 = 'Player 1', player2 = 'Player 2';
  var turn = 0;
  var gameboard = document.getElementsByClassName('ttt-board-square');
  var isGameFinished = false;
  var winner = '';
  var gameCount = Number(window.localStorage.getItem('gameCount'));

  if(!gameCount) {
    window.localStorage.setItem('gameCount', 1);
  }
  populateSavedGame();
  populateScoreboard();

  //Button functions
  $('.btn-play').on('click', function(){
    player1 = formatName($('.input-name-player1').val()); 
    player2 = formatName($('.input-name-player2').val()); 
    $('.ttt-players')[0].innerText = player1 + ' vs ' + player2 + '!'; 
    $('.ttt-game-prompt')[0].innerText = player1 + ' goes first!';
    resetBoard();
    playTicTacToe();
    populateSavedGame();
    populateScoreboard();
  });

  $('.btn-save').on('click', function() {
    if (turn < 8 && !isGameFinished) {
      var key =  ('game'+gameCount);
      var value = createGameObj(player1, player2, turn, getBoardStatus(), isGameFinished, winner, key);
      window.localStorage.setItem(key,value);
      // $('.saved-games-list').prepend('<div class="date-time">' + moment().format('MMMM Do YYYY, h:mm a') + '</div>')
      // $('.saved-games-list').prepend('<div class="saved-game-item ' + key + '">' + player1 + ' vs ' + player2 + ' </div>');
      populateSavedGame();
      $('.ttt-board-square').off('click');
    }
  });

  $('.btn-clear-board').click(function() { 
    resetBoard(); 
    resetPlayers(); 
    playTicTacToe();
    populateSavedGame();
    populateScoreboard();
  });

  $('.btn-clear').click(function() { 
    resetBoard(); 
    resetPlayers(); 
    $('.saved-games-list').html('');
    $('.scoreboard-list').html('');
    window.localStorage.clear();
    window.localStorage.setItem('gameCount', 1);
  });

  //clicking on the saved games
  $('.saved-game-item').on('click', function(){
    var savedGame = JSON.parse(window.localStorage[(this).classList[1]]);
    var board = savedGame.boardStatus;
    for (var i=0; i<9; i++) {
      gameboard[i].innerText = board[i];
    }
    turn = savedGame.turn;
    player1 = savedGame.player1;
    player2 = savedGame.player2;
    playTicTacToe();
  });

  //Tic-Tac-Toe game:
  function playTicTacToe() {
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
  }

  function ticTacToe (playerTurn) {
    if (isWinningCombo(gameboard[0], gameboard[1], gameboard[2]) || 
        isWinningCombo(gameboard[3], gameboard[4], gameboard[5]) ||
        isWinningCombo(gameboard[6], gameboard[7], gameboard[8]) || 
        isWinningCombo(gameboard[0], gameboard[3], gameboard[6]) ||
        isWinningCombo(gameboard[1], gameboard[4], gameboard[7]) || 
        isWinningCombo(gameboard[2], gameboard[5], gameboard[8]) ||
        isWinningCombo(gameboard[0], gameboard[4], gameboard[8]) || 
        isWinningCombo(gameboard[2], gameboard[4], gameboard[6]) ) {
          isGameFinished = true;
          winner = playerTurn % 2 === 0 ? player1 : player2;
          $('.ttt-game-prompt')[0].innerText = winner + ' wins!';
          // $('.scoreboard-list').prepend('<div class="date-time">' + moment().format('MMMM Do YYYY, h:mm a') + '</div>')
          // $('.scoreboard-list').prepend('<div class="scoreboard-item">' + player1 + ' vs ' + player2 + ': ' + winner + ' wins!</div>');
          
          $('.ttt-board-square').off('click');
          var key =  ('game'+gameCount);
          var value = createGameObj(player1, player2, playerTurn, getBoardStatus(), isGameFinished, winner, key);
          window.localStorage.setItem(key,value);
          //gameObj[('game'+gameCount)] = createGameObj(player1, player2, playerTurn, getBoardStatus(), isGameFinished, winner);
          //console.log(gameObj);
          populateScoreboard();
          return true;
        } else if (playerTurn === 8) {
          isGameFinished = true;
          $('.ttt-game-prompt')[0].innerText = 'It\'s a draw!';
          // $('.scoreboard-list').prepend('<div class="date-time">' + moment().format('MMMM Do YYYY, h:mm a') + '</div>')
          // $('.scoreboard-list').prepend('<div class="scoreboard-item">' + player1 + ' vs ' + player2 + ': ' + ' It\'s a draw!</div>');
          populateScoreboard();
          var key =  ('game'+gameCount);
          var value = createGameObj(player1, player2, playerTurn, getBoardStatus(), isGameFinished, winner, key);
          window.localStorage.setItem(key,value);
          //gameObj[('game'+gameCount)] = createGameObj(player1, player2, playerTurn, board, isGameFinished, winner);
          //console.log(gameObj);
          return true;
        } else {
          return false;
        }
  }

  // function dealWithWinner (winner) {
  //   $('.ttt-game-prompt')[0].innerText = (playerTurn % 2 === 0 ? player1 : player2) + ' wins!';
  // }


  //tic-tac-toe reset functions:
  function resetBoard() {
    isGameFinished = false;
    turn = 0;
    winner = '';
    for (var square of gameboard) {
      square.innerText = '';
    }
  }

  function resetPlayers() {
    if ($('.input-name-player1').val() === '' && $('.input-name-player2').val() === '') {
      player1 = 'Player 1'; 
      player2 = 'Player 2';
    } 
    $('.ttt-players')[0].innerText = player1 + ' vs ' + player2 + '!';
    $('.ttt-game-prompt')[0].innerText = player1 + ' goes first!';
  }

  //tic-tac-toe game functions:
  function isWinningCombo (elem1, elem2, elem3) {
    return (elem1.innerText === elem2.innerText && elem1.innerText === elem3.innerText && elem1.innerText !== '');  
  }

  function getBoardStatus() {
    var board = [];
    for (var square of gameboard) { 
      board.push(square.innerText);
    }
    return board;
  }

  //other helper functions:
  function formatName(name) {
    return name[0].toUpperCase() + name.slice(1).toLowerCase();
  }

  function createGameObj (p1, p2, turn, boardStatus, isGameFinished, winner, keyName) {
    var obj = {};
    gameCount = Number(window.localStorage.getItem('gameCount')) + 1;
    window.localStorage.setItem('gameCount', gameCount);
    obj.player1 = p1;
    obj.player2 = p2;
    obj.turn = turn;
    obj.boardStatus = boardStatus;
    obj.isGameFinished = isGameFinished;
    obj.winner = winner;
    obj.keyName = keyName;
    obj.dateStamp = moment().format('MMMM Do YYYY, h:mm a');
    return JSON.stringify(obj);
  }

  //will only populate the div with the last 3 saved games
  function populateSavedGame() {
    $('.saved-games-list').html('');
    var mapped = Object.keys(window.localStorage).map(function(key){
      return JSON.parse(window.localStorage[key]);
    })

    var unfinished = mapped.filter(function(game) {
      return !game.isGameFinished && typeof game === 'object';
    })

    for (var i = unfinished.length>3 ? unfinished.length-3 : 0; i < unfinished.length; i++ ) {
      $('.saved-games-list').prepend('<div class="date-time">' + unfinished[i].dateStamp + '</div>')
      $('.saved-games-list').prepend('<div class="saved-game-item ' + unfinished[i].keyName + '">' + unfinished[i].player1 + ' vs ' + unfinished[i].player2 + ' </div>');
    }
  };

  //will only populate the div with the last 3 played games
  function populateScoreboard() {
    $('.scoreboard-list').html('');
    var mapped = Object.keys(window.localStorage).map(function(key){
      return JSON.parse(window.localStorage[key]);
    })

    var finished = mapped.filter(function(game) {
      return game.isGameFinished && typeof game === 'object';
    })

    for (var i = finished.length>3 ? finished.length-3 : 0; i < finished.length; i++ ) {
      $('.scoreboard-list').prepend('<div class="date-time">' + finished[i].dateStamp + '</div>');
      if (finished[i].winner !== '') {
        $('.scoreboard-list').prepend('<div class="scoreboard-item">' + finished[i].player1 + ' vs ' + finished[i].player2 + ': ' + finished[i].winner + ' wins!</div>');
      } else {
        $('.scoreboard-list').prepend('<div class="scoreboard-item">' + finished[i].player1 + ' vs ' + finished[i].player2 + ': ' + 'It\'s a draw!</div>');
      }
    }
  };
  

  // //Parsing through keyname to get index, if storing data in an array of objects
  // function getIndex(input) {
  //   var idx = '';
  //   for (var char of input.match(/game\d*/)[0]) {
  //     if (/\d/.test(char)) {
  //       idx += char;  
  //     }
  //   }
  //   return Number(idx) - 1;
  // }

});