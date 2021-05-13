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
    photo: "assets/4.jpg",
    answer: 0,
    answers: [
      "Aaaaand Its Gone Meme",
      "They don't know that...",
      "Change my mind",
      "It has always been"
    ]
  }
];

export default function App() {
  const [score, setScore] = useState(0);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(
    questions[questionIndex]
  );

  const [showConfetti, setShowConfetti] = useState(false);

  const { width, height } = useWindowSize();

  const [memeTitle, setMemeTitle] = useState("not a memer");

  const mystyle = {
    height: "60%"
  };

  function resetGame() {
    setScore(0);
    setQuestionIndex(0);
    setQuestionsCorrect(0);
    setQuestionsAnswered(0);
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
              <h2>Score: {score}</h2>
              <p>
                You answered {questionsCorrect} of the {questionsAnswered} memes
                correctly!
              </p>
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

      <Photo url={currentQuestion.photo} />

      <div className="row align-items-start">
        {currentQuestion.answers.map((value, index) => {
          /// Render all the answers for the question.
          return (
            <div className="col-md-6 mt-4">
              <Answer
                key={index}
                answer={value}
                handler={() => {
                  /// TODO: when user is done, move to the end screen.
                  // if (questionIndex === questions.length) {
                  //   history.push('/end');
                  // }

                  if (currentQuestion.answer === index) {
                    setScore(score + 100);
                    setQuestionsCorrect(questionsCorrect + 1);
                  } else {
                    setScore(score - 100);
                  }
                  setQuestionsAnswered(questionsAnswered + 1);
                  // Later on instead of cyclying through the same memes
                  // We stop the game and move to the end screen
                  if (questionIndex < questions.length - 1) {
                    setQuestionIndex(questionIndex + 1);
                  } else {
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
                  setCurrentQuestion(questions[questionIndex]);
                }}
              />
            </div>
          );
        })}
      </div>
      <Score score={score} />
    </div>
  );
}

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route path="/">
//           <Game />
//         </Route>

//         <Route path="/end">
//           <End />
//         </Route>
//       </Switch>
//     </BrowserRouter>
//   );
//}
