import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';

function Board() {
    const [board, setBoard] = useState([[]]); 
    const [winner, setWinner] = useState('');
    const [turnCount, setTurnCount] = useState(1);

    function emptyBoard() {
        const gameBoard = [];
        for(let i = 0; i < 7; i++) {
          gameBoard[i] = [];
          for(let j = 0; j < 6; j++){
            gameBoard[i][j] = 'empty';
          }
        };
        setBoard(gameBoard);
        setWinner(false);
        setTurnCount(1);
    }

    useEffect(() => {
        emptyBoard();
    }, [])

    const columnClicked = (i) => {
      let ballInserted = false;
      let j = 0;
      while(!ballInserted && j < 6) {
        if(board[i][j] === 'empty') {
          let newBoard = new Array(...board);
          newBoard[i][j] = turnCount % 2 === 0 ? 2 : 1;
          setBoard(newBoard);
          // console.log(board);
          setTurnCount(turnCount + 1);
          ballInserted = true;
        }
        j++;
      }
      if(turnCount > 6) {
        let hasWon = checkForWinner(turnCount % 2 === 0 ? 2 : 1);
        if(!hasWon && turnCount > 41) {
          setWinner('tie');
        }
      }
    }

    const checkForWinner = (player) => {
      let i = 0, j=0, square;
      while(i < 7) {
        while(j < 6) {
          square = board[i][j];
          if(i < 4) {
            if(j < 3) {
              if(square !== 'empty' && square === board[i+1][j+1] && square === board[i+2][j+2] && square === board[i+3][j+3]) {
                setWinner(player)
                return true;
              }  
            }
            if(square !== 'empty' && square === board[i+1][j] && square === board[i+2][j] && square === board[i+3][j]) {
              setWinner(player)
              return true;
            }  
          }
          if(j > 2) {
            if(i < 4) {
              if(square !== 'empty' && square === board[i+1][j-1] && square === board[i+2][j-2] && square === board[i+3][j-3]) {
                setWinner(player)
                return true;
              }  
            }
            if(square !== 'empty' && square === board[i][j-1] && square === board[i][j-2] && square === board[i][j-3]) {
              setWinner(player)
              return true;
            }  
          }
          j++;
        }
        i++;
        j = 0;
      }
      return false;
    }

  return (
    <>
      <div className="Board">
        {
          board.map((column, i) => {
            return <>
              {i === 0 && <div className="divider" />} {/* the red stripe separating each column */}
              <div className="Column" id={`column${i}`} onClick={() => columnClicked(i)}>
                {
                  column.map((square, j) => {
                    return <div className="Square" id={`square${j}`}>
                      { square !== 'empty' && <div className={`player${square}`}></div> }
                    </div>
                  })
                }
              </div>
              <div className="divider" /> {/* the red stripe separating each column */}
            </>
          })
        }
      </div>

      <Modal open={winner ? true : false} onClose={emptyBoard}>
        <div className = 'winModal'>
          <h2>Game Finished!</h2>
          <h2>{winner === 'tie' ? 'A Tie!' : `Winner is: player ${winner}`}</h2>
        </div>
      </Modal>
    </>
  );
}

export default Board;