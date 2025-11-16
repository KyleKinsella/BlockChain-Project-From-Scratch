import Block from "./Block/Block.jsx"
import Transaction from './transaction.jsx';
import Home from "./HomePage.jsx"
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Simulation from "./Simulation.jsx";

function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/block" element={<Block />} />
          <Route path="/transaction" element={<Transaction />}></Route>
          <Route path="/sim" element={<Simulation />}></Route>
        </Routes>
    </Router>
    </>
  );
}

export default App
