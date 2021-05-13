// Score component
// Renders the user's Score
const style = {
  color: "White",
  border: "2px solid gold",
  backgroundColor: "#113994",
  padding: "5px"
};

export default function Score(props) {
  return <h5 style={style}>Score: {props.score}</h5>;
}
