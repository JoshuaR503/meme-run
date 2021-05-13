// Photo component
// Renders the meme template
export default function Photo(props) {
  /// v h
  return (
    <img
      height="70%"
      width="70%"
      src={props.url}
      className="img-fluid"
      alt="..."
    />
  );
}
