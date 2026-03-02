import "./index.css"
import Navigate from "./Navigate.jsx"
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";

function Home() {
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return(
        <header>
            <h1>Blockchain Simulation Project!</h1>
            <p>
                Welcome to my Blockchain Project! I’m Kyle and I’m building a blockchain simulation project from the ground up.
                <br/> <br/>
                This project includes <strong>Block Creation, Wallet Creation and a Decentralized Autonomous Organization (DAO)</strong> including the following features - bidding to win rewards, treasury management & more!
                <br/> <br/>
                Dive in and explore how it works using the menu below. Enjoy experimenting!
            </p>

            <GiHamburgerMenu className="icon" size={28} color="white" onClick={toggleMenu}/>
            {showMenu && <Navigate />}
        </header>
    );
}

export default Home
