import { useNavigate } from "react-router-dom";
//import "../main.css";

function Wallet() {
    const navigate = useNavigate();

    return (
        <div className="wallet-container">
            <h1 className="title">Wallet Setup</h1>
            <h3 id="stepZero">Step 0</h3>
            <p className="intro">
                {/*Your wallet lets you securely <strong>buy, swap & send</strong> digital assets, while maintaining full control of your funds.*/}

                Welcome to the Wallet Creation Process! Here, you can either create a new wallet <strong>or</strong> import an existing one. <br /> <br />  <strong>You control your Wallet!</strong> <br /> <br />
                        
                Select an option below to continue.
            </p>

            {/* This needs to be designed for the frontend */}
            <button class="" onClick={() => navigate("/importWallet")}>Import a wallet</button>
            
            <button class="button" onClick={() => navigate("/walletsetup")}>Create a new wallet</button>

            <br /><br/>

            <button onClick={(e) => navigate("/")}>Go Back</button>
        </div>
  );
}

export default Wallet
