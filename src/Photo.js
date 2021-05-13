// Photo component
// Renders the meme template
const style = {
  height: "70%",
  width: "70%",
  border: "2px solid gold",
  backgroundColor: "#113994"
};

export default function Photo(props) {
  /// v h
  return <img style={style} src={props.url} className="img-fluid" alt="..." />;
}
