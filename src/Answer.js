// Answer component
// Renders an answer button
const style = {
  textAlign: "left",
  border: "2px solid gold",
  backgroundColor: "#113994"
};

const answerLetterStyle = {
  color: "#a9784b"
};

export default function Answer(props) {
  return (
    <div className="d-grid gap-2">
      <button
        onClick={props.handleClick}
        className="btn btn-primary"
        type="button"
        style={style}
      >
        <h5 className="mt-2">
          · <span style={answerLetterStyle}>{props.answerLetter}.</span>{" "}
          {props.answer}
        </h5>
      </button>
    </div>
  );
}
