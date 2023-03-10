/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array
  board = [...Array(HEIGHT)].map(function () {
    return Array(WIDTH).fill(null);
  });
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // get "htmlBoard" variable from the item in HTML w/ID of "board"
  const htmlBoard = document.getElementById("board");
  // create "top" variable with makes table row element in document
  const top = document.createElement("tr");
  //giving the table row elements we create the id of column-top
  top.setAttribute("id", "column-top");
  //add a click eventlistener to the table rows we created which
  //executes the function of handleClick
  top.addEventListener("click", handleClick);

  //giving each table data(table cell) that is created an ID of 0,1,2, etc.
  //appending the table data to table row.
  //after it has looped 6 times aka created 6 TDs which is attached to
  //the table row, it will append the table row to the actual table.
  //this is for the grayed out row on top
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  //creating a 6x7 dimensions of rowxcolumn table and appending it
  //below the first table row created inside the table
  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = 0; y < HEIGHT; y++) {
    if (board[y][x] === null) {
      return y;
      // } else break;
    }
  }
  return null;
}
/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  let yVal = HEIGHT - y - 1;
  let pieceDiv = document.createElement("div");
  let tableCell = document.getElementById(yVal + "-" + x);
  pieceDiv.setAttribute("class", "piece" + currPlayer);
  tableCell.append(pieceDiv);
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  var x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  var y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board, changes the place in array from
  // null to currPlayer 1 or 2.
  placeInTable(y, x);
  board[y][x] = currPlayer;

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // if (
  //   board.map(function (row) {
  //     return row.every(function (el) {
  //       if (el === 1 || el === 2) {
  //         endGame("You both suck.");
  //       }
  //     });
  //   })
  // )

  if (board.every((row) => row.every(Boolean))) {
    return endGame("It's a tie");
  }

  currPlayer = currPlayer == 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      var vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      var diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      var diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
