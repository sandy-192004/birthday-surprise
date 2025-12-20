import { useEffect, useRef, useState } from "react";
import tharImg from "./public/thar.png";
import "./leaves.css";

export default function ImagePuzzle() {
  const rows = 3;
  const cols = 3;
  const [pieceSize, setPieceSize] = useState(90);
  const [pieces, setPieces] = useState([]);
  const [completed, setCompleted] = useState(false);
  const dragIndexRef = useRef(null);

  // 🔥 REDUCED FIREFLIES
  const fireflyCount = 20;

  /* ---------- Responsive Puzzle Size ---------- */
  useEffect(() => {
    const updateSize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight, 360);
      setPieceSize(Math.floor(size / cols));
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  /* ---------- Initialize Puzzle ---------- */
  useEffect(() => {
    const temp = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        temp.push({ id: y * cols + x, correct: y * cols + x, x, y });
      }
    }
    setPieces(temp.sort(() => Math.random() - 0.5));
  }, []);

  /* ---------- Swap Logic ---------- */
  const swapPieces = (dropIndex) => {
    if (dragIndexRef.current === null || completed) return;

    const newPieces = [...pieces];
    [newPieces[dragIndexRef.current], newPieces[dropIndex]] = [
      newPieces[dropIndex],
      newPieces[dragIndexRef.current],
    ];

    setPieces(newPieces);
    dragIndexRef.current = null;

    if (newPieces.every((p, i) => p.correct === i)) {
      setCompleted(true);
    }
  };

  const puzzleWidth = pieceSize * cols;
  const puzzleHeight = pieceSize * rows;

  return (
    <div className="page">
      {/* ---------- Fireflies ---------- */}
      {Array.from({ length: fireflyCount }).map((_, i) => (
        <div
          key={i}
          className="firefly"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDuration: `${12 + Math.random() * 12}s`,
          }}
        />
      ))}

      {/* ---------- Header ---------- */}
      <div className="header">
        <h2>Level 1</h2>
        <h3>Reassemble the image to continue</h3>
      </div>

      {/* ---------- Puzzle ---------- */}
      <div className="centerArea">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${cols}, ${pieceSize}px)`,
            gridTemplateRows: `repeat(${rows}, ${pieceSize}px)`,
          }}
        >
          {pieces.map((p, index) => (
            <div
              key={p.id}
              draggable={!completed}
              onDragStart={() => (dragIndexRef.current = index)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => swapPieces(index)}
              className="piece"
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

      {/* ---------- Success Popup ---------- */}
      {completed && (
        <div className="overlay">
          <div className="popup">
            🎉 Congratulations! <br /> Level Unlocked 🎉
            <button onClick={() => (window.location.href = "/level2")}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
