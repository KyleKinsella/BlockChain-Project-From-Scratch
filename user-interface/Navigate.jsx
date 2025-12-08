import { Link } from "react-router-dom";
import "./index.css"
import Wallet from './Wallet/wallet.jsx'

function Navigate() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/block">Blocks</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/phrase">Phrase</Link>
            {/* <Link to="/walletsetup">Wallet Setup</Link> */}
            <Link to="/contact">Contact</Link>

            {/* <hr /> */}



            {/* <Route path="/wallet" element={<Wallet />} />
            <Route path="/walletsetup" element={<SetupWallet />} /> */}





            {/* <Link to="/transaction">Transactions</Link> */}
            {/* <Link to="/sim">Simulation</Link> */}

            {/* <Link to="/pow">Proof of Work</Link> */}
            {/* <Link to="/pos">Proof of Stake</Link> */}
            {/* <Link to="/kp">Key-Pairs</Link> */}
            
            {/* <Link to="/a">Addresses</Link> */}
        </nav>
    );
}

export default Navigate