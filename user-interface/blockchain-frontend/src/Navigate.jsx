import { Link } from "react-router-dom";

function Navigate() {
    return (
        <nav>
            <Link to="/block">Blocks</Link>
            <Link to="/wallet">Wallet</Link>
            <Link to="/daoStuff">Governance (DAO Hub)</Link>
        </nav>
    );
}

export default Navigate
