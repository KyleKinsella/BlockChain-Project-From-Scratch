import { useNavigate } from "react-router-dom";

function SetupWallet() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Wallet Creation</h1>
            <h3>Step 1</h3>
            <p>
                Create a new wallet to manage your digital assets safely. You can store and track your items in your wallet.
            </p>
            
            <button class="button" onClick={() => navigate("/phrase")}>Create Wallet</button>
        </div>
    )
}

export default SetupWallet
