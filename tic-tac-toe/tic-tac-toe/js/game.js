/* a game board is a 3x3 array */

var board = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

var turn = null;
var winner = null;

/** Update the state of a particular cell. */
function update(row, col, x_or_o) {
    board[row][col] = x_or_o;
    // update the cell's visible state
    $('#cell-' + row + '-' + col).text(x_or_o).removeClass('empty').addClass(x_or_o.toLowerCase());
}

function changePlayer() {
    var next;
    switch (turn) {
    case 'X':
        next = 'O';
        break;
    case 'O':
        next = 'X';
        break;
    default:
        if (winner === null) {
            next = 'O';
        } else {
            next = null;
        }
    }
    turn = next;

    if (next) {
        // update the status!
        console.log('player %s turn', turn);
        $('#status').text('Player ' + turn + ', it is your turn!');
    } else {
        $('#status').text('Game over.');
    }
}

function checkWinner() {
    var status;
    var empties = 0;
    var i, j;

    // count empties
    for (i = 0; i < 3; i++) {
        for (j = 0; j < 3; j++) {
            if (board[i][j] === null) {
                empties += 1;
            }
        }
    }

    // check the rows and columns for winners
    for (i = 0; i < 3; i++) {
        if (board[i][0] && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            console.log('winner on row %d', i);
            status = {
                winner: board[i][0],
                rows: [i, i, i],
                cols: [0, 1, 2]
            };
        } else if (board[0][i] && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
            console.log('winner on col %d', i);
            status = {
                winner: board[0][i],
                cols: [i, i, i],
                rows: [0, 1, 2]
            };
        }
    }
    if (!status) {
        // do we have a winner on a diagonal?
        var middle = board[1][1];
        if (middle) {
            if (board[0][0] === middle && board[2][2] === middle) {
                status = {
                    winner: middle,
                    rows: [0,1,2],
                    cols: [0,1,2]
                };
            } else if (board[0][2] === middle && board[2][0] === middle) {
                status = {
                    winner: middle,
                    rows: [0, 1, 2],
                    cols: [2, 1, 0]
                };
            }
        }
    }
    if (status) {
        // we have a winner
        return status;
    } else if (empties) {
        // game still goes
        return null;
    } else {
        // no empties, no winner, game over
        return {
            winner: 'draw'
        };
    }
}

// game over
function finishGame() {
    if (winner.winner === 'draw') {
        $('#status').text('The game ends in a draw.');
    } else {
        $('#status').text('Player ' + winner.winner + ' has won!');
        // now we need to mark!
        for (var i = 0; i < 3; i++) {
            var col = winner.cols[i];
            var row = winner.rows[i];
            var id = '#cell-' + row + '-' + col;
            $(id).addClass('winning');
        }
    }
}

$('.cell').on('click', function() {
    var row = parseInt($(this).parent().attr('data-row'));
    var col = parseInt($(this).attr('data-col'));
    if (board[row][col] === null) {
        update(row, col, turn);
        winner = checkWinner();
        if (winner) {
            finishGame();
        } else {
            changePlayer();
        }
    } else {
        // oops - the user clicked an already-used cell
        console.log('received click in already-played cell (%d,%d)', row, col);
    }
});

$(window).load(function() {
    // start the game
    changePlayer();
});
