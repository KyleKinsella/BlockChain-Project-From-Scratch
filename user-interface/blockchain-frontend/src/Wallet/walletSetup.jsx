import { useNavigate } from "react-router-dom";

function SetupWallet() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Wallet Creation</h1>
            <p>
                Here you will create a wallet, your wallet stores your assets such as: <strong>NFT'S</strong> and <strong>tokens</strong>.
                <br /><br /> Click the button below to get started!
            </p>
            
            <button class="button" onClick={() => navigate("/passwordsetup")}>Create a new Wallet</button>
        </div>
    )
}

export default SetupWallet