import React, { useEffect, useState, useRef } from "react";
import Cell from "./Cell.js";
export default function Board({ height, width, mines }) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(createBoard);
  }, []);

  const createBoard = () => {
    const data = [];
    for (let i = 0; i < height; i++) {
      data.push([]);
      for (let j = 0; j < width; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isBomb: false,
          adjacentBombCount: 0,
          wasClicked: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    return getAdjacentCount(plantMines(data, height, width, mines));
  };

  const plantMines = (data, height, width, mines) => {
    let randomx,
      randomy,
      minesPlanted = 0;

    while (minesPlanted < mines) {
      randomx = Math.floor(Math.random() * height);
      randomy = Math.floor(Math.random() * width);

      if (!data[randomx][randomy].isMine) {
        data[randomx][randomy].isMine = true;
        minesPlanted++;
      }
    }
    return data;
  };

  const traverseBoard = (x, y, data) => {
    const el = [];
    //up
    if (x > 0) {
      el.push(data[x - 1][y]);
    }
    //down
    if (x < height - 1) {
      el.push(data[x + 1][y]);
    }
    //left
    if (y > 0) {
      el.push(data[x][y - 1]);
    }
    //right
    if (y < width - 1) {
      el.push(data[x][y + 1]);
    }
    // top left
    if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
    }
    // top right
    if (x > 0 && y < width - 1) {
      el.push(data[x - 1][y + 1]);
    }
    // bottom right
    if (x < height - 1 && y < width - 1) {
      el.push(data[x + 1][y + 1]);
    }
    // bottom left
    if (x < height - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
    }
    return el;
  };

  const getAdjacentCount = (data) => {
    let updatedData = data;

    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        if (data[i][j].isMine !== true) {
          let mine = 0;
          const area = traverseBoard(data[i][j].x, data[i][j].y, data);
          area.map((value) => {
            if (value.isMine) {
              mine++;
            }
          });
          if (mine === 0) {
            updatedData[i][j].isEmpty = true;
          }
          updatedData[i][j].adjacentBombCount = mine;
        }
      }
    }
    return updatedData;
  };
  const handleClick = (x, y) => {
    if (board[x][y].wasClicked || board[x][y].isFlagged) return null;

    if (board[x][y].isMine) {
    }
  };

  return (
    <div className="container">
      <div className="game-info">
        <span className="info">mines: {mines}</span>
        <br />
      </div>
      {board.map((row, index) => {
        return (
          <div key={index} className="row" style={{ height: "50px" }}>
            {row.map((item, ind) => {
              return (
                <Cell
                  onClick={handleClick}
                  className="col-sm"
                  key={ind}
                  value={item}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
