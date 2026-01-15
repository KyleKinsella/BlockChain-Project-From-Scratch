import { Link } from "react-router-dom";
import "./index.css"

function Navigate() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/block">Blocks</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/dao">DAO</Link>
            <Link to="/contact">Contact</Link>
        </nav>
    );
}

export default Navigate
