// Answer component
// Renders an answer button
export default function Answer(props) {
  return (
    <div className="d-grid gap-2">
      <button onClick={props.handler} className="btn btn-primary" type="button">
        <p className="mt-1"> {props.answer}</p>
      </button>
    </div>
  );
}
