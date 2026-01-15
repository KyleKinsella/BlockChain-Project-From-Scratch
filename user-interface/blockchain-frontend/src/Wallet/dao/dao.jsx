import { useState } from "react";

function DAO() {
	const [walletConnected, setWalletConnected] = useState("");
	
	const handleSubmit = (e) => {
		e.preventDefault();	
		
		// It is not going to be staying like this but for now it does the job //
		// The next step is to actually get the wallet that you made to connect to this DAO - this will be done in the backend
		// that is the next step:
		
		let s = "wallet connected";
		setWalletConnected(s);
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
			
			<h3>{walletConnected}</h3>
		</div>
	)
}

export default DAO;
