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
            <h1>Building a Blockchain from the Ground Up</h1>
            <p>
                Welcome, to my blockchain project! My name is Kyle and I currently developing my very own blockchain simulation project.
                In order to view how my project operates you will need to click on the hamburger menu below. 
            </p>

            <GiHamburgerMenu className="icon" size={28} color="white" onClick={toggleMenu}/>
            {showMenu && <Navigate />}
        </header>
    );
}

export default Home