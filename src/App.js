import './App.css';
import {Container} from "react-bootstrap"

import Header from "./Header"
import WordCount from "./WordCount"

function App() {
  return (
    <Container className="App">
      <Header />
      <WordCount />
    </Container>
  );
}

export default App;
