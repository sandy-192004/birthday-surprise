import React, { useState } from "react";

export default function Level2GuessWhoSaidIt() {
  const questions = [
    { text: "I'll be late today 😅", answer: "Me" },
    { text: "Food first, everything later 🍕", answer: "Both" },
    { text: "Let's plan a trip soon ✈️", answer: "You" },
    { text: "One more episode only 😆", answer: "Both" },
    { text: "I'm already on the way 🚶", answer: "Me" },
    { text: "You forgot again 🙄", answer: "You" },
    { text: "Sleep is overrated ☕", answer: "Both" },
    { text: "Trust me on this 💯", answer: "Me" },
    { text: "This reminds me of us 💖", answer: "You" },
    { text: "We survived this together 😂", answer: "Both" },
  ];

  const options = ["You", "Me", "Both 😂"];

  const [index, setIndex] = useState(0);
  const [popup, setPopup] = useState(null);
  const [animKey, setAnimKey] = useState(0);

  const current = questions[index];

  function checkAnswer(option) {
    const normalized = option.startsWith("Both") ? "Both" : option;

    if (normalized === current.answer) {
      setPopup("correct");
      setTimeout(() => {
        setPopup(null);
        setIndex((i) => i + 1);
        setAnimKey((k) => k + 1);
      }, 1200);
    } else {
      setPopup("wrong");
      setTimeout(() => setPopup(null), 1200);
    }
  }

  return (
    <div className="sunrise-bg">
      <div className="card">
        <h2>Level 2 – Guess Who Said It 💬</h2>
        <p className="subtitle">Only we understand these moments 💖</p>

        <div className="progress">
          {index + 1} / {questions.length}
        </div>

        <div key={animKey} className="question">
          “{current.text}”
        </div>

        <div className="options">
          {options.map((opt) => (
            <button key={opt} onClick={() => checkAnswer(opt)}>
              {opt}
            </button>
          ))}
        </div>
      </div>

      {popup && (
        <div className="overlay">
          <div className={`popup ${popup}`}>
            {popup === "wrong" ? "olunga padi nk 😒" : "correct nk 🥳"}
          </div>
        </div>
      )}

      <style>{`
        .sunrise-bg {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: linear-gradient(
            to top,
            #ff9a9e,
            #fad0c4,
            #fbc2eb,
            #a6c1ee
          );
          animation: sunrise 8s ease-in-out infinite alternate;
        }

        @keyframes sunrise {
          from { filter: brightness(0.9); }
          to { filter: brightness(1.1); }
        }

        .card {
          background: white;
          padding: 32px;
          border-radius: 20px;
          width: 100%;
          max-width: 420px;
          text-align: center;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        h2 {
          margin-bottom: 6px;
        }

        .subtitle {
          color: #555;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .progress {
          font-size: 12px;
          color: #777;
          margin-bottom: 12px;
        }

        .question {
          background: #f5f5f5;
          padding: 18px;
          border-radius: 14px;
          font-size: 18px;
          font-weight: 600;
          margin-bottom: 20px;
          animation: slide 0.5s ease;
        }

        @keyframes slide {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .options button {
          width: 100%;
          padding: 12px;
          margin-top: 10px;
          border-radius: 12px;
          border: none;
          font-weight: bold;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          transition: 0.3s;
        }

        .options button:hover {
          transform: scale(1.05);
          background: #ffeaa7;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .popup {
          padding: 18px 26px;
          border-radius: 14px;
          color: white;
          font-weight: bold;
          font-size: 18px;
          animation: pop 0.4s ease;
        }

        .popup.wrong { background: #e74c3c; }
        .popup.correct { background: #2ecc71; }

        @keyframes pop {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
