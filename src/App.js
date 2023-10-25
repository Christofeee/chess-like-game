import React, { useState } from 'react';

function TicTacToe() {
  let arrayControlNum = 5
  let achievedCells = []
  let cells = new Array(arrayControlNum)  //1D array
  let isOturn = true
  let clickCount = 0
  let oCount = 0
  let xCount = 0

  for (let i = 0; i < cells.length; i++)      //2D array
  {
    cells[i] = [];
    for (let a = 0; a < cells.length; a++) {
      cells[i][a] = null
    }
  }

  console.log(cells)

  function generateId(rowIndex, cellIndex) //to generate specific indexes for each cell
  {
    return (rowIndex.toString() + cellIndex.toString())
  }

  function hideShow(elementId)    //to hide or show elements
  {
    var x = document.getElementById(elementId)
    if (x.style.display === "none") {
      x.style.display = "block"
    }
    else {
      x.style.display = "none"
    }
  }

  function restart()  //to restart game by reloading page
  {
    window.location.reload()
  }

  function changeEmoji(elementId, emoji) //to change emoji in cells
  {
    var element = document.getElementById(elementId)
    document.getElementById(elementId).innerHTML = emoji
    if (emoji === "O")
    {
      element.style.color = "cyan";
    }
    else
    {
      element.style.color = "rgb(255, 119, 119)";
    }
    // disableButton()
  }

  function changeColorAndFade(id, value) {
    var button = document.getElementById(id);
    button.style.transition = "background-color 0.3s ease-in-out";
    if (value === "O")
    {
      button.style.backgroundColor = "cyan";
      button.style.color = "cyan";
    }
    else
    {
      button.style.backgroundColor = "red";
      button.style.color = "rgb(255, 119, 119)";
    }
    setTimeout(function () {
      button.style.backgroundColor = "rgb(98, 0, 255)";
    }, 500);
  }


  function updateCells(recievedCells, value) {
    let x, y
    for (let i = 0; i < recievedCells.length; i++) {
      let xTurn = true
      for (let a = 0; a < recievedCells[i].length; a++) {
        if (xTurn === true) {
          x = recievedCells[i][a]
          xTurn = false
        }
        else {
          y = recievedCells[i][a]
          xTurn = true
        }
      }
      console.log(x, y)
      cells[x][y] = value
      document.getElementById(generateId(x, y)).innerHTML = value
      changeColorAndFade(generateId(x, y), value)
    }
  }

  function checkBack(x, y, cell) {
    console.log("Checking back, cell is", cell)
    while (true) {
      console.log("checking index: ", y - 1)
      if (Math.sign(y - 1) !== -1) {
        if ((cells[x][y - 1] === cell)) {
          console.log("mathched")
          console.log(achievedCells)
          return true
        }
        if (cells[x][y - 1] === null) {
          console.log("is null")
          achievedCells = []
          return false
        } else {
          console.log("need to check more")
          --y
          achievedCells.push([x, y])
        }
      } else {
        console.log("Cant check back")
        achievedCells = []
        return false
      }
    }
  }

  function checkFront(x, y, cell) {
    console.log("Checking Front, cell is", cell)
    while (true) {
      console.log("checking index: ", y + 1)
      if (!((y + 1) > arrayControlNum - 1)) {
        if ((cells[x][y + 1] === cell)) {
          console.log("mathched")
          console.log(achievedCells)
          return true
        }
        if (cells[x][y + 1] === null) {
          console.log("is null")
          achievedCells = []
          return false
        } else {
          console.log("need to check more")
          ++y
          achievedCells.push([x, y])
        }
      } else {
        console.log("Cant check front")
        achievedCells = []
        return false
      }
    }
  }

  function checkUp(x, y, cell) {
    console.log("Checking Up, cell is", cell)
    while (true) {
      console.log("checking index: ", x - 1)
      if (Math.sign(x - 1) !== -1) {
        if ((cells[x - 1][y] === cell)) {
          console.log("mathched")
          console.log(achievedCells)
          return true
        }
        if (cells[x - 1][y] === null) {
          console.log("is null")
          achievedCells = []
          return false
        } else {
          console.log("need to check more")
          --x
          achievedCells.push([x, y])
        }
      } else {
        console.log("Cant check up")
        achievedCells = []
        return false
      }
    }
  }

  function checkDown(x, y, cell) {
    console.log("Checking Down, cell is", cell)
    while (true) {
      console.log("checking index: ", x + 1)
      if (!((x + 1) > arrayControlNum - 1)) {
        if ((cells[x + 1][y] === cell)) {
          console.log("mathched")
          console.log(achievedCells)
          return true
        }
        if (cells[x + 1][y] === null) {
          console.log("is null")
          achievedCells = []
          return false
        } else {
          console.log("need to check more")
          ++x
          achievedCells.push([x, y])
        }
      } else {
        console.log("Cant check down")
        achievedCells = []
        return false
      }
    }
  }

  function checkLeftUp(x, y, cell) {
    console.log("Checking LeftUp, cell is", cell)
    while (true) {
      console.log("checking index: ", x - 1, y - 1)
      if ((Math.sign(x - 1) !== -1) && (Math.sign(y - 1) !== -1)) {
        if ((cells[x - 1][y - 1] === cell)) {
          console.log("mathched")
          console.log(achievedCells)
          return true
        }
        if (cells[x - 1][y - 1] === null) {
          console.log("is null")
          achievedCells = []
          return false
        } else {
          console.log("need to check more")
          --x
          --y
          achievedCells.push([x, y])
        }
      } else {
        console.log("Cant check LeftUp")
        achievedCells = []
        return false
      }
    }
  }

  function checkRightUp(x, y, cell) {
    console.log("Checking RightUp, cell is", cell)
    while (true) {
      console.log("checking index: ", x - 1, y + 1)
      if ((Math.sign(x - 1) !== -1) && (!((y + 1) > arrayControlNum - 1))) {
        if ((cells[x - 1][y + 1] === cell)) {
          console.log("mathched")
          console.log(achievedCells)
          return true
        }
        if (cells[x - 1][y + 1] === null) {
          console.log("is null")
          achievedCells = []
          return false
        } else {
          console.log("need to check more")
          --x
          ++y
          achievedCells.push([x, y])
        }
      } else {
        console.log("Cant check RightUp")
        achievedCells = []
        return false
      }
    }
  }

  function checkLeftDown(x, y, cell) {
    console.log("Checking RightUp, cell is", cell)
    while (true) {
      console.log("checking index: ", x - 1, y + 1)
      if ((Math.sign(y - 1) !== -1) && (!((x + 1) > arrayControlNum - 1))) {
        if ((cells[x + 1][y - 1] === cell)) {
          console.log("mathched")
          console.log(achievedCells)
          return true
        }
        if (cells[x + 1][y - 1] === null) {
          console.log("is null")
          achievedCells = []
          return false
        } else {
          console.log("need to check more")
          ++x
          --y
          achievedCells.push([x, y])
        }
      } else {
        console.log("Cant check leftdown")
        achievedCells = []
        return false
      }
    }
  }

  function CheckRightDown(x, y, cell) {
    console.log("Checking RightUp, cell is", cell)
    while (true) {
      console.log("checking index: ", x - 1, y + 1)
      if ((!((x + 1) > arrayControlNum - 1)) && (!((y + 1) > arrayControlNum - 1))) {
        if ((cells[x + 1][y + 1] === cell)) {
          console.log("mathched")
          console.log(achievedCells)
          return true
        }
        if (cells[x + 1][y + 1] === null) {
          console.log("is null")
          achievedCells = []
          return false
        } else {
          console.log("need to check more")
          ++x
          ++y
          achievedCells.push([x, y])
        }
      } else {
        console.log("Cant check rightdown")
        achievedCells = []
        return false
      }
    }
  }

  let winner
  function checkWin(x, y, cell) {
    if (checkBack(x, y, cell)) {
      console.log("Checkback found")
      console.log(achievedCells)
      updateCells(achievedCells, cell)
      achievedCells = []
    }
    if (checkFront(x, y, cell)) {
      console.log("Checkfront found")
      console.log(achievedCells)
      updateCells(achievedCells, cell)
      achievedCells = []
    }
    if (checkUp(x, y, cell)) {
      console.log("checkup found")
      console.log(achievedCells)
      updateCells(achievedCells, cell)
      achievedCells = []
    }
    if (checkDown(x, y, cell)) {
      console.log("Checkdown found")
      console.log(achievedCells)
      updateCells(achievedCells, cell)
      achievedCells = []
    }
    if (checkLeftUp(x, y, cell)) {
      console.log("CheckLeftUp found")
      console.log(achievedCells)
      updateCells(achievedCells, cell)
      achievedCells = []
    }
    if (checkRightUp(x, y, cell)) {
      console.log("CheckLeftUp found")
      console.log(achievedCells)
      updateCells(achievedCells, cell)
      achievedCells = []
    }
    if (checkLeftDown(x, y, cell)) {
      console.log("CheckLeftUp found")
      console.log(achievedCells)
      updateCells(achievedCells, cell)
      achievedCells = []
    }
    if (CheckRightDown(x, y, cell)) {
      console.log("CheckRightDown found")
      console.log(achievedCells)
      updateCells(achievedCells, cell)
      achievedCells = []
    }
    ++clickCount
    console.log("click count:", clickCount)
    if (clickCount === (arrayControlNum ** 2)) {
      for (let i = 0; i < cells.length; i++) {
        for (let a = 0; a < cells[i].length; a++) {
          if (cells[i][a] === "O") {
            ++oCount
          }
          else {
            ++xCount
          }
        }
      }
      console.log("oCount: ", oCount)
      console.log("xCount: ", xCount)
      if (oCount > xCount) {
        winner = "The winner is 'O'"
      }
      else if (xCount > oCount) {
        winner = "The winner is 'X'"
      }
      else {
        winner = "This match is draw"
      }
    }
  }

  function clickEvent(cellIndex, rowIndex, cell) {
    console.log(cell)
    const elementId = generateId(rowIndex, cellIndex)

    if (isOturn === true) {
      cells[rowIndex][cellIndex] = "O"
      isOturn = false
      // document.getElementById("turn").innerHTML = ("'X' turn")
      var element = document.getElementById("turnText");
      element.style.transition = "opacity 0.3s ease-in-out";
      element.style.opacity = "0";

      setTimeout(function () {
        element.innerHTML = "X turn";
        element.style.opacity = "1";
      }, 250);
    }
    else {
      cells[rowIndex][cellIndex] = "X"
      isOturn = true
      // document.getElementById("turn").innerHTML = ("'O' turn")
      var element = document.getElementById("turnText");
      element.style.transition = "opacity 0.3s ease-in-out";
      element.style.opacity = "0";

      setTimeout(function () {
        element.innerHTML = "O turn";
        element.style.opacity = "1";
      }, 250);
    }
    changeEmoji(elementId, cells[rowIndex][cellIndex])
    document.getElementById(elementId).disabled = true
    console.log("input", cells[rowIndex][cellIndex])
    console.log(rowIndex, cellIndex)
    console.log(cells)
    checkWin(rowIndex, cellIndex, cells[rowIndex][cellIndex])
    console.log("The winner is", winner)
    if (winner) {
      document.getElementById("winner").innerHTML = winner
      setTimeout(hideShow, 300, "gamecomplete")
      setTimeout(hideShow, 300, "fullscreen-bg")
    }
    console.log(cells)
  }

  const board = cells.map((row, rowIndex) =>
    <tr>
      {row.map((cell, cellIndex) =>
        <td>
          <button
            onClick={() => clickEvent(cellIndex, rowIndex, cell)}
            className="cell"
            id={generateId(rowIndex, cellIndex)}
          >
          </button>
        </td>
      )}
    </tr>
  )

  return (

    <div className="App">

      <table id="board">
        <tr><th colSpan={5}><h1 class="header">Chess-Like-Game</h1></th></tr>
        <tr><th colSpan={5}><h1 id="turn" style={{ fontSize: "40px" }}><span id="turnText">O turn</span></h1></th></tr>
        {board}
      </table>
      <div id="fullscreen-bg" style={{ display: "none" }}></div> {/*darken background*/}
      <div id="gameover" style={{ display: "none" }}>    {/*game over box*/}
        <h1 >Game Over</h1>
        <button onClick={restart} id="restartbtn">restart</button>
      </div>
      <div id="gamecomplete" style={{ display: "none" }}>    {/*you win box*/}
        <h1 id="winner"></h1>
        <button onClick={restart} id="restartbtn">restart</button>
      </div>
    </div>
  )
}

export default TicTacToe;