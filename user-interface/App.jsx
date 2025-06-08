import Block from "./Block/Block.jsx"
import Transaction from './transaction.jsx';
import Home from "./HomePage.jsx"
import "./index.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/block" element={<Block />} />
          <Route path="/transaction" element={<Transaction />}></Route>
        </Routes>
    </Router>
    </>
  );
}

export default App
