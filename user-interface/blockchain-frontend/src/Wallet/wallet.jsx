import './wallet.css'
import { useNavigate } from "react-router-dom";

function Wallet() {
    const navigate = useNavigate();

    return (
        <div className="block-container">
            <h1 class="title">Welcome to your Wallet</h1>
            <h3>Step 0</h3>
            <p class="intro">
				Your wallet lets you securely <strong>buy, swap & send</strong> digital assets, while maintaining full control of your funds.
            
				Create a new wallet <strong>or</strong> import an existing one. <strong>You control your assets!</strong> <br /> <br />
				            
                Select an option below to continue.
            </p>

            {/* This needs to be designed for the frontend */}
            <button class="" onClick={() => navigate("/importWallet")}>Import a wallet</button>
            
            <button class="button" onClick={() => navigate("/walletsetup")}>Create a new wallet</button>
        </div>
  );
}

export default Wallet
