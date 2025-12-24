import { useEffect, useRef, useState } from "react";
import tharImg from "./public/thar.png";
import "./level1.css";

export default function ImagePuzzle() {
  const rows = 3;
  const cols = 3;

  const [pieceSize, setPieceSize] = useState(100);
  const [pieces, setPieces] = useState([]);
  const [completed, setCompleted] = useState(false);

  const dragIndexRef = useRef(null);
  const touchIndexRef = useRef(null);

 
  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(window.innerWidth, 330);
      setPieceSize(Math.floor(size / cols));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

 
  useEffect(() => {
    const temp = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        temp.push({
          id: y * cols + x,
          correctIndex: y * cols + x,
          x,
          y,
        });
      }
    }
    setPieces(temp.sort(() => Math.random() - 0.5));
  }, []);


  const swapPieces = (from, to) => {
    if (from === null || to === null || completed) return;

    const updated = [...pieces];
    [updated[from], updated[to]] = [updated[to], updated[from]];
    setPieces(updated);

    if (updated.every((p, i) => p.correctIndex === i)) {
      setCompleted(true);
    }
  };

  const puzzleWidth = pieceSize * cols;
  const puzzleHeight = pieceSize * rows;

  return (
    <div className="page">
     
      <div className="header">
        <h2>Level 1</h2>
        <h3>Reassemble the image</h3>
      </div>

      <div className="centerArea">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(3, ${pieceSize}px)`,
            gridTemplateRows: `repeat(3, ${pieceSize}px)`,
          }}
        >
          {pieces.map((p, index) => (
            <div
              key={p.id}
              className="piece"
              draggable={!completed}
              onDragStart={() => (dragIndexRef.current = index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                swapPieces(dragIndexRef.current, index);
                dragIndexRef.current = null;
              }}
              onTouchStart={() => (touchIndexRef.current = index)}
              onTouchEnd={() => {
                swapPieces(touchIndexRef.current, index);
                touchIndexRef.current = null;
              }}
              style={{
                width: pieceSize,
                height: pieceSize,
                backgroundImage: `url(${tharImg})`,
                backgroundSize: `${puzzleWidth}px ${puzzleHeight}px`,
                backgroundPosition: `-${p.x * pieceSize}px -${p.y * pieceSize}px`,
              }}
            />
          ))}
        </div>
      </div>

     
      {completed && (
        <div className="overlay">
          <div className="popup">
            🎉 Congratulations! <br />
            Your key is <b style={{ color: "green" }}>GREEN</b>
            <br /><br />
            <button onClick={() => (window.location.href = "/level2")}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
