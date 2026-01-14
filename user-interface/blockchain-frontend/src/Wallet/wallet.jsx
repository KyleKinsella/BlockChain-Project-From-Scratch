import './wallet.css'
import { useNavigate } from "react-router-dom";

function Wallet() {
    const navigate = useNavigate();

    return (
        <div className="block-container">
            <h1 class="title">Wallet Setup</h1>
            <p class="intro">
                On this section of my project you will be able to either import your wallet using your secret seed phrase <strong>or</strong> you can create a new wallet.
                <br /><br /> Get started by clicking on one of the below buttons!
            </p>

            {/* This needs to be designed for the frontend */}
            <button class="" onClick={() => navigate("/importWallet")}>Import a wallet</button>
            
            <button class="button" onClick={() => navigate("/walletsetup")}>Create a new wallet</button>
        </div>
  );
}

export default Wallet