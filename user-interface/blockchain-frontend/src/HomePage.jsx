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
            <h1 id="title">Blockchain Simulation Project!</h1>
            <p id="para">
                Welcome to my Blockchain Project! I’m Kyle and I’m building a blockchain simulation project from the ground up.
                <br/> <br/>
                This project includes <strong>Block Creation, Wallet Creation and DAO Governance</strong>, allowing you to create proposals, vote for proposals, bid for rewards, oversee the treasury and explore other exciting features!
                <br/> <br/>
                Dive in and explore how it works using the menu below. Enjoy experimenting!
            </p>

            <GiHamburgerMenu className="icon" size={40} color="white" onClick={toggleMenu}/>
            {showMenu && <Navigate />}
        </header>
    );
}

export default Home
