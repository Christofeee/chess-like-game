import React, { useState } from 'react';

function TicTacToe()
{
    const [isGameWon, setIsGameWon] = useState(false);
    let achievedCount = 0
    let cells = new Array(5);   //1D array
    let isOturn = true

    for (let i=0; i<cells.length; i++)      //2D array
    {
        cells[i] = [];
        for (let a=0; a<cells.length; a++)
        {
            cells[i][a] = null
        }
    }
    console.log(cells) 

    function generateId(rowIndex,cellIndex) //to generate specific indexes for each cell
    {
        return (rowIndex.toString()+cellIndex.toString())
    }

    function hideShow(elementId)    //to hide or show elements
    {
        var x = document.getElementById(elementId)
        if (x.style.display === "none")
        {
            x.style.display = "block"
        }
        else
        {
            x.style.display = "none"
        }
    }

    function restart()  //to restart game by reloading page
    {
        window.location.reload()
    }
    
    function changeEmoji(elementId, emoji) //to change emoji in cells
    {
        document.getElementById(elementId).innerHTML = emoji
        // disableButton()
    }

    function checkMatched(x, y, cell)
    {
      if((cells[x][y] === cell))
      {
        console.log("isMatched")
        return true
      } else {
        console.log("isNotMatched")
        return false
      }
    }

    function checkBack(x, y, cell)
    {
      console.log("Checking back, cell is", cell)
      while (true)
      {
        console.log("checking index: ", y-1)
        if (Math.sign(y-1) !== -1)
        {
          if ((cells[x][y-1] === cell))
          {
            console.log("mathched")
            return true
          } 
          if (cells[x][y-1]===null)
          {
            console.log("is null")
            return false
          } else {
            console.log("need to check more")
            --y
            ++achievedCount
          }
        } else {
          console.log("Cant check back") 
          return false
        }
      }
    }
    
    let winner
    function checkWin(x, y, cell)
    {
      if (checkBack(x, y, cell))
      {
        console.log("Checkback found")
        cells[x][y] = cell
        document.getElementById(generateId(x,y-1)).innerHTML = cell
      }
      
    }

    function clickEvent (cellIndex, rowIndex, cell)
    {
        console.log(cell)
        const elementId = generateId(rowIndex,cellIndex)

        if (isOturn === true)
        {
            cells[rowIndex][cellIndex] = "O"
            isOturn = false
            document.getElementById("turn").innerHTML = ("'X' turn")
        }
        else
        {
            cells[rowIndex][cellIndex] = "X"
            isOturn = true
            document.getElementById("turn").innerHTML = ("'O' turn")
        }
        changeEmoji(elementId, cells[rowIndex][cellIndex])
        document.getElementById(elementId).disabled = true
        console.log("input",cells[rowIndex][cellIndex])
        console.log(rowIndex,cellIndex)
        console.log(cells)
        checkWin(rowIndex, cellIndex, cells[rowIndex][cellIndex])
        console.log("The winner is", winner)
        if (winner)
        {
            // document.getElementsByTagName("button").disabled = true
            setIsGameWon(true)
            document.getElementById("winner").innerHTML = ("The winner is '" + winner + "'")
            setTimeout(hideShow, 300,"gamecomplete")
            setTimeout(hideShow, 300,"fullscreen-bg")
        }
        console.log(cells)
    }

    const board = cells.map((row, rowIndex) =>
        <tr>
            {row.map((cell, cellIndex) =>
                <td>
                    <button
                        onClick={ () => clickEvent(cellIndex, rowIndex, cell)}
                        className="cell" 
                        id={generateId(rowIndex,cellIndex)}
                        disabled={isGameWon}>
                    </button>
                </td>
            )}
        </tr>
    )

    return (
        
        <div className="App">
            
            <table id="board">  
                <tr><th colSpan={5}><h1 class="header">Chess-Like-Game</h1></th></tr>
                <tr><th colSpan={5}><h1 id="turn" style={{fontSize:"40px"}}>'O' turn</h1></th></tr>
                {board}
            </table>
            <div id="fullscreen-bg" style={{display:"none"}}></div> {/*darken background*/}
            <div id="gameover" style={{display:"none"}}>    {/*game over box*/}
                <h1 >Game Over</h1>
                <button onClick={restart} id="restartbtn">restart</button>
            </div>
            <div id="gamecomplete" style={{display:"none"}}>    {/*you win box*/}
                <h1 id="winner"></h1>
                <button onClick={restart} id="restartbtn">restart</button>
            </div>
        </div>
    )
}

export default TicTacToe;