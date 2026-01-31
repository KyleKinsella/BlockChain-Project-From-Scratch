import { useLocation } from "react-router-dom";

function WalletMainUI() {
	const location = useLocation();
	const reward = location.state?.reward;
	
    return (
        <div>
            <h1>Welcome to your Wallet!</h1>
            
            <div class="achievementCard">
				<h3>Achievement Card</h3>
				<pre>{reward}</pre>
            </div>
        </div>
    )
}

export default WalletMainUI
