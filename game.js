$(function() {
  var N = 4;
  var M = 4;
  var I = 2;

  function twoOrFour() {
    if (Math.random() > 0.5) {
      return 2;
    } else {
      return 4;
    }
  }

  function rand(n) {
    return Math.round(Math.random() * n);
  }

  function addRandom(board) {
    var empty = [];

    for(var y = 0; y < M; y++) {
      for(var x = 0; x < N; x++) {
        if (board[y][x] == 0) {
          empty.push({
            x: x,
            y: y
          });
        }
      }
    }

    if (empty.length > 0) {
      var cell = _.sample(empty);
      board[cell.y][cell.x] = twoOrFour();
    } else {

    }

    return board;
  }

  function init() {
    var board = [];

    for(var y = 0; y < M; y++) {
      board[y] = [];
      for(var x = 0; x < N; x++) {
        board[y][x] = 0;
      }
    }

    for(var i = 0; i < I; i++) {
      board = addRandom(board);
    }

    return board;
  }

  function draw(board) {
    var string = "<table>";

    for(var y = 0; y < M; y++) {
      string += '<tr>';

      for(var x = 0; x < N; x++) {
        string += '<td class="board-' + board[y][x] + '">';
        if (board[y][x] > 0) {
          string += board[y][x];
        }
        string += '</td>';
      }

      string += '</tr>';
    }

    string += '</table>';

    $('#game').html(string);
  }

  function moveLeft(board) {
    for(var x = 1; x < N ; x++) {
      for(var y = 0; y < M; y++) {
        if (board[y][x] > 0) {
          board = moveCellLeft(x, y, board);
        }
      }
    }

    return board;
  }

  function moveCellLeft(x, y, board) {
    for(var i = x; i > 0; i--) {
      if (board[y][i - 1] == 0) {
        board[y][i - 1] = board[y][i];
        board[y][i] = 0;
      }

      if (board[y][i - 1] == board[y][i]) {
        board[y][i - 1] += board[y][i];
        board[y][i] = 0;
        break;
      }
    }

    return board;
  }

  function moveRight(board) {
    for(var x = N - 2; x >= 0 ; x--) {
      for(var y = 0; y < M; y++) {
        if (board[y][x] > 0) {
          board = moveCellRight(x, y, board);
        }
      }
    }

    return board;
  }

  function moveCellRight(x, y, board) {
    for(var i = x; i < N - 1; i++) {
      if (board[y][i + 1] == 0) {
        board[y][i + 1] = board[y][i];
        board[y][i] = 0;
      }

      if (board[y][i + 1] == board[y][i]) {
        board[y][i + 1] += board[y][i];
        board[y][i] = 0;
        break;
      }
    }

    return board;
  }

  function moveUp(board) {
    for(var y = 1; y < M ; y++) {
      for(var x = 0; x < N; x++) {
        if (board[y][x] > 0) {
          board = moveCellUp(x, y, board);
        }
      }
    }

    return board;
  };

  function moveCellUp(x, y, board) {
    for(var i = y; i > 0; i--) {
      if (board[i - 1][x] == 0) {
        board[i - 1][x] = board[i][x];
        board[i][x] = 0;
      }

      if (board[i - 1][x] == board[i][x]) {
        board[i - 1][x] += board[i][x];
        board[i][x] = 0;
        break;
      }
    }

    return board;
  }

  function moveDown(board) {
    for(var y = M - 2; y >= 0 ; y--) {
      for(var x = 0; x < N; x++) {
        if (board[y][x] > 0) {
          board = moveCellDown(x, y, board);
        }
      }
    }

    return board;
  };

  function moveCellDown(x, y, board) {
    for(var i = y; i < M - 1; i++) {
      if (board[i + 1][x] == 0) {
        board[i + 1][x] = board[i][x];
        board[i][x] = 0;
      }

      if (board[i + 1][x] == board[i][x]) {
        board[i + 1][x] += board[i][x];
        board[i][x] = 0;
        break;
      }
    }

    return board;
  }

  function isBordEqual(a, b) {
    for(var y = 0; y < M; y++) {
      for(var x = 0; x < N; x++) {
        if (a[y][x] != b[y][x]) {
          return false;
        }
      }
    }

    return true;
  }

  function move(board, moveFunction) {
    var oldBoard = _.cloneDeep(board);

    board = moveFunction(board);
    draw(board);

    if (!isBordEqual(board, oldBoard)) {
      board = addRandom(board);
      draw(board);
    }

    return board;
  }

  var board = init();
  draw(board);

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
        board = move(board, moveLeft);
      break;

      case 38: // up
        board = move(board, moveUp);
      break;

      case 39: // right
        board = move(board, moveRight);
      break;

      case 40: // down
        board = move(board, moveDown);
      break;
      default: return;
    }
    e.preventDefault();
  });
});
