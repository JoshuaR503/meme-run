import "./styles.css";
import React, { useState } from "react";
import Photo from "./Photo";
import Answer from "./Answer";
import Score from "./Score";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import End from "./End";
import { useHistory } from "react-router-dom";

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
    photo: "assets/meme.png",
    answer: 0,
    answers: ["New answer 1", "New answer 2", "New answer 3", "New answer 4"]
  }
];

function Game() {
  const history = useHistory();

  let questionIndex = 0;

  const [score, setScore] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(
    questions[questionIndex]
  );

  return (
    <div className="App container">
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
                  } else {
                    setScore(score - 100);
                  }

                  // Later on instead of cyclying through the same memes
                  // We stop the game and move to the end screen
                  if (questionIndex < questions.length - 1) {
                    questionIndex++;
                  } else {
                    questionIndex = 0;
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

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Game />
        </Route>

        <Route path="/end">
          <End />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
