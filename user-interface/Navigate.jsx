import { Link } from "react-router-dom";
import "./index.css"

function Navigate() {
    return (
        <nav>
            <Link to="/home">Home</Link>
            <Link to="/block">Blocks</Link>
            <Link to="/transaction">Transactions</Link>
            <Link to="/sim">Simulation</Link>

            <Link to="/pow">Proof of Work</Link>
            <Link to="/pos">Proof of Stake</Link>
            <Link to="/kp">Key-Pairs</Link>
            
            <Link to="/a">Addresses</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    );
}

export default Navigate