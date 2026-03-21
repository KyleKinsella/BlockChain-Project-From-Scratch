import { useNavigate } from "react-router-dom";

function SetupWallet() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="step1">
                <h1>Wallet Creation</h1>
                <h3 id="stepOne">Step 1</h3>
                <p id="intro">
                    Create a new wallet to manage your digital assets safely. You can store and track your items in your wallet.
                </p>
                
                <button class="button" onClick={() => navigate("/phrase")}>Create Wallet</button>
                <button onClick={(e) => navigate("/wallet")}>Go Back to Step 0</button>
            </div>
        </div>
    )
}

export default SetupWallet
