import "./styles.css";
import React, { useState } from "react";
import Photo from "./Photo";
import Answer from "./Answer";
import Score from "./Score";
import { useWindowSize } from "react-use";
import Confetti from "react-confetti";

const questions = [
  {
    photo: "assets/meme.png",
    answer: 0,
    answers: [
      "It ain't much but it's honest work",
      "Once again I'm asking you for your support",
      "They don't know that...",
      "Another one of those"
    ]
  },

  {
    photo: "assets/1.png",
    answer: 1,
    answers: [
      "They don't know that...",
      "It has always been",
      "Change my mind",
      "Is This A "
    ]
  },

  {
    photo: "assets/2.jpg",
    answer: 2,
    answers: [
      "They don't know that...",
      "They don't know that...",
      "Me and my homies",
      "They don't know that..."
    ]
  },

  {
    photo: "assets/3.png",
    answer: 0,
    answers: ["Ours", "It has always been", "Change my mind", "Is This A "]
  },

  {
    photo: "assets/5.png",
    answer: 2,
    answers: [
      "Aaaaand Its Gone Meme",
      "They don't know that...",
      "Stonks",
      "It has always been"
    ]
  },

  {
    photo: "assets/6.png",
    answer: 3,
    answers: ["Ours", "It has always been", "Change my mind", "I'm in danger"]
  },
  {
    photo: "assets/7.jpg",
    answer: 0,
    answers: [
      "Da fuq they doing ova der ",
      "It has always been",
      "Change my mind",
      "I'm in danger"
    ]
  },
  {
    photo: "assets/8.jpg",
    answer: 1,
    answers: [
      "Da fuq they doing ova der ",
      "That's my secret",
      "Change my mind",
      "I'm in danger"
    ]
  },

  {
    photo: "assets/9.png",
    answer: 2,
    answers: [
      "Da fuq they doing ova der ",
      "That's my secret",
      "nooo you can't just",
      "I'm in danger"
    ]
  }
];

const memeTitles = [
  "MEME GOD", // 100 - 90 %
  "MEME",
  "DANK MEME",
  "CERTIFIED MEMER",
  "POPULAR MEME CHANNEL",
  "SMALL MEME CHANNEL", //80 - 70 %
  "REDDIT MEME MAKER",
  "DISCORD MEME REPOSTER",
  "AVERAGE MEME ENJOYER",
  "AVERAGE MEME FAN",
  "REDDIT MEME SCROLLER", // 70 - 60 %
  "REDDIT MEME REPOSTER",
  "INSTAGRAM MEME VIEWER",
  "TIK TOK MEME VIEWER", // 60 - 0 %
  "PERSON WHO ENJOYS MINION FACEBOOK MEMES",
  'PERSON WHO PROUNOUNCES "MEME" as "ME-ME"',
  "PERSON WHO HAS NEVER BEEN ON THE INTERNET"
];

const answerLetters = ["A", "B", "C", "D"];

export default function App() {
  const [score, setScore] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [answerStreak, setAnswerStreak] = useState(0);
  const [longestAnswerStreak, setLongestAnswerStreak] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(
    questions[questionIndex]
  );

  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize();

  const [memeTitle, setMemeTitle] = useState("Memetitle");

  function resetGame() {
    setScore(0);
    setQuestionIndex(0);
    setQuestionsCorrect(0);
    setQuestionsAnswered(0);
    setAnswerStreak(0);
    setLongestAnswerStreak(0);
    setCurrentQuestion(questions[questionIndex]);
  }

  function calculateMemeTitle() {
    let index = memeTitles.length;
    let percentage = questionsCorrect / questionsAnswered;

    if (percentage === 1 || percentage >= 0.99) {
      index = 0;
    } else if (percentage < 0.99 && percentage >= 0.98) {
      // 100 - 90 %
      index = 1;
    } else if (percentage < 0.98 && percentage >= 0.96) {
      index = 2;
    } else if (percentage < 0.96 && percentage >= 0.94) {
      index = 3;
    } else if (percentage < 0.94 && percentage >= 0.92) {
      index = 4;
    } else if (percentage < 0.92 && percentage >= 0.9) {
      index = 5;
    } else if (percentage < 0.9 && percentage >= 0.86) {
      index = 6;
    } else if (percentage < 0.86 && percentage >= 0.82) {
      index = 7;
    } else if (percentage < 0.82 && percentage >= 0.78) {
      index = 8;
    } else if (percentage < 0.78 && percentage >= 0.74) {
      index = 9;
    } else if (percentage < 0.74 && percentage >= 0.7) {
      index = 10;
    } else if (percentage < 0.8 && percentage >= 0.77) {
      index = 11;
    } else if (percentage < 0.77 && percentage >= 0.74) {
      index = 12;
    } else if (percentage < 0.74 && percentage >= 0.7) {
      index = 13;
    } else if (percentage < 0.7 && percentage >= 0.6) {
      index = 14;
    } else if (percentage < 0.6 && percentage >= 0.5) {
      index = 15;
    } else {
      index = 16;
    }
    return memeTitles[index];
  }

  function handleAnswerClick(index) {
    if (currentQuestion.answer === index) {
      setAnswerStreak(answerStreak + 1);
      setScore(score + 100 + answerStreak * 50);
      setQuestionsCorrect(questionsCorrect + 1);
    } else {
      setScore(score - 50);
      setAnswerStreak(0);
    }
    setQuestionsAnswered(questionsAnswered + 1);

    if (answerStreak > longestAnswerStreak) {
      setLongestAnswerStreak(answerStreak);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(questions[questionIndex]);
    } else {
      setMemeTitle(calculateMemeTitle());

      /// Element reference.
      const elRef = document.getElementById("exampleModal");

      /// Triger modal
      /// Ignore error. We're referencing a library in index.html but the code editor thinks it's missing.
      const myModal = new bootstrap.Modal(elRef, {
        keyboard: false
      });

      /// Show modal.
      myModal.show(elRef);

      /// Show confetti
      setShowConfetti(true);

      /// turn of confetti after 5 seconds
      /// TODO: this looks horrible but it works.
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }

  return (
    <div className="App container">
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={() => resetGame()}
      >
        {showConfetti ? <Confetti width={width} height={height} /> : null}

        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Times up!
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => resetGame()}
              ></button>
            </div>
            <div class="modal-body">
              <h1>You are a {memeTitle}!</h1>
              <br />
              <h1>Score: {score}</h1>
              <br />
              <p>
                You answered {questionsCorrect} of the {questionsAnswered} memes
                correctly!
              </p>
              <p>Your longest answer streak was {longestAnswerStreak}!</p>
    answer: 2,
    answers: [
      "Aaaaand Its Gone Meme",
      "They don't know that...",
      "Stonks",
      "It has always been"
    ]
  },

  {
    photo: "assets/6.png",
    answer: 3,
    answers: ["Ours", "It has always been", "Change my mind", "I'm in danger"]
  },
  {
    photo: "assets/7.jpg",
    answer: 0,
    answers: [
      "Da fuq they doing ova der ",
      "It has always been",
      "Change my mind",
      "I'm in danger"
    ]
  },
  {
    photo: "assets/8.jpg",
    answer: 1,
    answers: [
      "Da fuq they doing ova der ",
      "That's my secret",
      "Change my mind",
      "I'm in danger"
    ]
  },

  {
    photo: "assets/9.png",
    answer: 2,
    answers: [
      "Da fuq they doing ova der ",
      "That's my secret",
      "nooo you can't just",
      "I'm in danger"
    ]
  }
];

const memeTitles = [
  "MEME GOD", // 100 - 90 %
  "MEME",
  "DANK MEME",
  "CERTIFIED MEMER",
  "POPULAR MEME CHANNEL",
  "SMALL MEME CHANNEL", //80 - 70 %
  "REDDIT MEME MAKER",
  "DISCORD MEME REPOSTER",
  "AVERAGE MEME ENJOYER",
  "AVERAGE MEME FAN",
  "REDDIT MEME SCROLLER", // 70 - 60 %
  "REDDIT MEME REPOSTER",
  "INSTAGRAM MEME VIEWER",
  "TIK TOK MEME VIEWER", // 60 - 0 %
  "PERSON WHO ENJOYS MINION FACEBOOK MEMES",
  'PERSON WHO PROUNOUNCES "MEME" as "ME-ME"',
  "PERSON WHO HAS NEVER BEEN ON THE INTERNET"
];

const answerLetters = ["A", "B", "C", "D"];

export default function App() {
  const [score, setScore] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [answerStreak, setAnswerStreak] = useState(0);
  const [longestAnswerStreak, setLongestAnswerStreak] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(
    questions[questionIndex]
  );

  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize();

  const [memeTitle, setMemeTitle] = useState("Memetitle");

  function resetGame() {
    setScore(0);
    setQuestionIndex(0);
    setQuestionsCorrect(0);
    setQuestionsAnswered(0);
    setAnswerStreak(0);
    setLongestAnswerStreak(0);
    setCurrentQuestion(questions[questionIndex]);
  }

  function calculateMemeTitle() {
    let index = memeTitles.length;
    let percentage = questionsCorrect / questionsAnswered;

    if (percentage === 1 || percentage >= 0.99) {
      index = 0;
    } else if (percentage < 0.99 && percentage >= 0.98) {
      // 100 - 90 %
      index = 1;
    } else if (percentage < 0.98 && percentage >= 0.96) {
      index = 2;
    } else if (percentage < 0.96 && percentage >= 0.94) {
      index = 3;
    } else if (percentage < 0.94 && percentage >= 0.92) {
      index = 4;
    } else if (percentage < 0.92 && percentage >= 0.9) {
      index = 5;
    } else if (percentage < 0.9 && percentage >= 0.86) {
      index = 6;
    } else if (percentage < 0.86 && percentage >= 0.82) {
      index = 7;
    } else if (percentage < 0.82 && percentage >= 0.78) {
      index = 8;
    } else if (percentage < 0.78 && percentage >= 0.74) {
      index = 9;
    } else if (percentage < 0.74 && percentage >= 0.7) {
      index = 10;
    } else if (percentage < 0.8 && percentage >= 0.77) {
      index = 11;
    } else if (percentage < 0.77 && percentage >= 0.74) {
      index = 12;
    } else if (percentage < 0.74 && percentage >= 0.7) {
      index = 13;
    } else if (percentage < 0.7 && percentage >= 0.6) {
      index = 14;
    } else if (percentage < 0.6 && percentage >= 0.5) {
      index = 15;
    } else {
      index = 16;
    }
    return memeTitles[index];
  }

  function handleAnswerClick(index) {
    if (currentQuestion.answer === index) {
      setAnswerStreak(answerStreak + 1);
      setScore(score + 100 + answerStreak * 50);
      setQuestionsCorrect(questionsCorrect + 1);
    } else {
      setScore(score - 50);
      setAnswerStreak(0);
    }
    setQuestionsAnswered(questionsAnswered + 1);

    if (answerStreak > longestAnswerStreak) {
      setLongestAnswerStreak(answerStreak);
    }

    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(questions[questionIndex]);
    } else {
      setMemeTitle(calculateMemeTitle());

      /// Element reference.
      const elRef = document.getElementById("exampleModal");

      /// Triger modal
      /// Ignore error. We're referencing a library in index.html but the code editor thinks it's missing.
      const myModal = new bootstrap.Modal(elRef, {
        keyboard: false
      });

      /// Show modal.
      myModal.show(elRef);

      /// Show confetti
      setShowConfetti(true);

      /// turn of confetti after 5 seconds
      /// TODO: this looks horrible but it works.
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }

  return (
    <div className="App container">
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        onClick={() => resetGame()}
      >
        {showConfetti ? <Confetti width={width} height={height} /> : null}

        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Times up!
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => resetGame()}
              ></button>
            </div>
            <div class="modal-body">
              <h1>You are a {memeTitle}!</h1>
              <br />
              <h1>Score: {score}</h1>
              <br />
              <p>
                You answered {questionsCorrect} of the {questionsAnswered} memes
                correctly!
              </p>
              <p>Your longest answer streak was {longestAnswerStreak}!</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={() => resetGame()}
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Score score={score}/>

      <br/> */}

      <Photo url={currentQuestion.photo} />

      <div className="row align-items-start">
        {currentQuestion.answers.map((value, index) => {
          /// Render all the answers for the question.
          return (
            <div className="col-md-6 mt-4">
              <Answer
                key={index}
                answer={value}
                answerLetter={answerLetters[index]}
                handleClick={() => handleAnswerClick(index)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
