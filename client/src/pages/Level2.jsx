import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./level2.css";

export default function Level2FillBlanks() {
  const navigate = useNavigate();

  const questions = [
    { question: "What is the nickname given by me?", answer: "NK" },
    { question: "Which word do I use the most?", answer: "CHI" },
    { question: "What is my favourite color?", answer: "GREEN" },
    { question: "What do I call you the most?", answer: "IDIOT" },
    { question: "Which day is special for us?", answer: "FRIDAY" },
  ];

  const [index, setIndex] = useState(0);
  const [inputs, setInputs] = useState([]);
  const [popup, setPopup] = useState(null);
  const [message, setMessage] = useState("");

  const inputRefs = useRef([]);

  const current = questions[index];
  const answer = current.answer.toUpperCase();

  function handleChange(value, i) {
    const newInputs = [...inputs];


    if (value === "") {
      newInputs[i] = "";
      setInputs(newInputs);
      if (i > 0) inputRefs.current[i - 1]?.focus();
      return;
    }

    newInputs[i] = value.toUpperCase();
    setInputs(newInputs);

 
    if (i < answer.length - 1) {
      inputRefs.current[i + 1]?.focus();
    }

    if (newInputs.filter(Boolean).length === answer.length) {
      if (newInputs.join("") === answer) {
        setPopup("correct");
        setMessage("Correct!");

        setTimeout(() => {
          setPopup(null);
          setInputs([]);
          inputRefs.current = [];

          if (index === questions.length - 1) {
            setPopup("final");
            setMessage(
              "🎉 You have completed all levels successfully!\n🎁 Here is your surprise…"
            );

            setTimeout(() => {
              navigate("/gift");
            }, 3000);
          } else {
            setIndex((i) => i + 1);
          }
        }, 1000);
      } else {
        
        setPopup("wrong");
        setMessage("Wrong, Try again");

        setTimeout(() => {
          setPopup(null);
          setInputs([]);
          inputRefs.current = [];
          inputRefs.current[0]?.focus();
        }, 1200);
      }
    }
  }

  
  function handleKeyDown(e, i) {
    if (e.key === "Backspace") {
      const newInputs = [...inputs];
      if (newInputs[i]) {
        newInputs[i] = "";
        setInputs(newInputs);
      } else if (i > 0) {
        inputRefs.current[i - 1]?.focus();
      }
    }
  }

  return (
    <div className="level2-container">
      <header className="level2-header">
        Level 2 – Fill in the Blanks 
      </header>

      <div className="card">
        <p className="progress">
          {index + 1} / {questions.length}
        </p>

        <div className="question">{current.question}</div>

        <div className="blanks">
          {answer.split("").map((_, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="text"
              autoComplete="off"
              maxLength="1"
              value={inputs[i] || ""}
              onChange={(e) => handleChange(e.target.value, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
            />
          ))}
        </div>
      </div>

      {popup && (
        <div className="overlay">
          <div className={`popup ${popup}`}>{message}</div>
        </div>
      )}
    </div>
  );
}
