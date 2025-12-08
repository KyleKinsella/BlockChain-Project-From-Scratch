import './wallet.css'
import { useNavigate } from "react-router-dom";

function Wallet() {
    const navigate = useNavigate();

    return (
        <div className="block-container">
            <h1 class="title">Welcome to <strong>Kyle's</strong> blockchain Wallet!</h1>
            <p class="intro">This is where you will be able to access the blockchain that I've created all
                by myself!
            </p>

            <button class="button" onClick={() => navigate("/walletsetup")}>Get Started!</button>
        </div>
  );
}

export default Wallet