import { useNavigate } from "react-router-dom";

function SetupWallet() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Wallet Creation</h1>
            <h3>Step 1</h3>
            <p>
                Create a new wallet to securely store your digital assets, including <strong>tokens</strong> and
				<br /> <strong>NFTs</strong>. <br /> <br />
            </p>
            
            <button class="button" onClick={() => navigate("/passwordsetup")}>Create Wallet</button>
        </div>
    )
}

export default SetupWallet
