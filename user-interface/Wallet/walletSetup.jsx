import { useNavigate } from "react-router-dom";

function SetupWallet() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Let's get your Wallet setup, shall we!</h1>
            
            <button class="button" onClick={() => navigate("/passwordsetup")}>Create a new Wallet</button>
        </div>
    )
}

export default SetupWallet