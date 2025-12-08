// import blockchain from "./assets/blockchain.jpg"
// import react from "./assets/react.png"
// import dao from "./assets/dao.webp"
import "./index.css"
import Navigate from "./Navigate.jsx"
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
// import { FiShare } from "react-icons/fi";

function Home() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = new Date()

    const day = today.getDate()
    const month = months[today.getMonth()]
    const year = today.getFullYear()

    const name = "Kyle Kinsella"

    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return(
        <header>
            <h1>Building a Blockchain from the Ground Up</h1>
            <p className="details"> <strong>{name}</strong> <br /> {month} {day}, {year}</p>

            <GiHamburgerMenu className="icon" size={28} color="white" onClick={toggleMenu}/>
            {showMenu && <Navigate />}

            {/* <FiShare size={24} color="white"/> */}
            {/* <hr /> */}

            {/* <h2>The Goal</h2>
            <p>The goal of this project is to gain a deeper understanding on how a blockchain works under the hood.</p> */}

            {/* <h2>Technologies</h2>
            <p>I have chose to build my user-interface with <strong>React</strong>, I chose React because it's a widely used framework in modern software development and I want to strenghten my skills with it by applying it to a real world Personal Project.</p> */}

            {/* <p>I have developed some of the core features that a blockchain has, such as: <strong>Blocks, Proof of Work (POW) and Proof of Stake algorithms, Transactions, Public & Private Key-Pairs and Addresses.</strong></p>
            <p>I am currently working on the <strong>user-interface</strong> to enchance the user experience for end users. Once the UI is more polished I will be developing my own <strong>Decentralized Autonomous Organization (DAO)</strong>.
            My DAO will be taking most of the core inspiration from <strong>Nouns DAO:</strong> <a href="https://nouns.wtf/"><button>nouns.wtf</button></a></p>
            <p>If you wish to view my source code for this project, click this button: <a href="https://github.com/KyleKinsella/BlockChain-Project-From-Scratch"><button>Source Code</button></a></p> */}

            {/* <img className="card-img" src={blockchain} alt="blockchain Image" />
            <img className="card-img" src={react} alt="React Framework" />
            <img className="card-img" src={dao} alt="DAO Image" /> */}

            {/* <br />  */}

            {/* <h1>References</h1>            
            <ol>
                <li><a href="https://stock.adobe.com/ie/search?k=blockchain">Blockchain Image</a></li> <br />
                <li><a href="https://harsh05.medium.com/mastering-react-a-comprehensive-guide-for-frontend-developers-ccd5b63c2cad">React Image</a></li> <br />
                <li><a href="https://www.disruptionbanking.com/2022/10/13/how-to-choose-the-right-blockchain-for-your-dao/">DAO Image</a></li>
            </ol> */}

            {/* <footer>
                Wrote by <br />
                {name}
            </footer> */}
        </header>
    );
}

export default Home