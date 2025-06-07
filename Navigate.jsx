import { Link } from "react-router-dom";

function Navigate() {
    return (
        <nav>
            <ul>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/block">Blocks</Link></li>
                <li><Link to="/transaction">Transactions</Link></li>

                <li><Link to="/pow">Proof of Work</Link></li>
                <li><Link to="/pos">Proof of Stake</Link></li>
                <li><Link to="/kp">Key-Pairs</Link></li>
                
                <li><Link to="/a">Addresses</Link></li>
                <li><Link to="/contact">Contact</Link></li>
            </ul>
        </nav>
    );
}

export default Navigate