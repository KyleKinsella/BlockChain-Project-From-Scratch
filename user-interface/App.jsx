import Block from "./Block/Block.jsx"
import Transaction from './transaction.jsx';
import Home from "./HomePage.jsx"
import "./index.css";
import Wallet from './Wallet/wallet.jsx'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Simulation from "./Simulation.jsx";

import SetupWallet from "./Wallet/walletSetup.jsx";
import Password from './Wallet/password.jsx'
// import phrase from './Wallet/phrase.jsx'
import Phrase from "./Wallet/phrase.jsx";

function App() {
  return (
    <>
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/block" element={<Block />} />
          {/* <Route path="/transaction" element={<Transaction />}></Route> */}
          {/* <Route path="/sim" element={<Simulation />}></Route> */}
          <Route path="/wallet" element={<Wallet />}></Route>

          {/* <Route path="/wallet" element={<Wallet />} /> */}
          <Route path="/walletsetup" element={<SetupWallet />} />
          <Route path="/passwordsetup" element={<Password />} />

          <Route path="/phrase" element={<Phrase />} />
        </Routes>
    </Router>
    </>
  );
}

export default App
