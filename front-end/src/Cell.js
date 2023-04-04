import React from "react";

export default function Cell({ value, onClick }) {
  const getValue = (value) => {
    if (!value.wasClicked) {
      return value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.adjacentBombCount === 0) {
      return null;
    }
    return value.adjacentBombCount;
  };
  return (
    <div
      style={{ maxWidth: "50px", border: "1px solid gray" }}
      onClick={onClick}
    >
      {getValue(value)}
    </div>
  );
}
