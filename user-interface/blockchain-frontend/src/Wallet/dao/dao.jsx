import { useState } from "react";

function DAO() {
	const [walletConnected, setWalletConnected] = useState(null);
		
	const handleSubmit = (e) => {
		e.preventDefault();	
		
		fetch("http://localhost:8082/initWallet")
			.then(res => res.json())
			.then(data => setWalletConnected(data));
			alert("Wallet Connected!");
	};	

	return (
		<div>		
			<h1>Kyle's DAO</h1>
			<p>Welcome, to my DAO! Here you will be able to win amazing prizes such as NFTs. But before you can do that
				you must connect your wallet, once this is done you will be able to get going.
			</p>
			
			<form onSubmit={handleSubmit}>
				<button type="submit">Connect Wallet</button>
			</form>
			   
			{walletConnected && (
				<div className="wallet">
					<p>Address: {walletConnected.Address}</p>
					<p>Balance: {walletConnected.Balance}</p>
				</div>
			)}
		</div>
	);
}

export default DAO;
