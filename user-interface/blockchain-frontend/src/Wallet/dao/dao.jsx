import { useState } from "react";

function DAO() {
	const [walletConnected, setWalletConnected] = useState(null);
	const [dao, setDao] = useState(null);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		
		fetch("http://localhost:8082/initWallet")
			.then(res => res.json())
			.then(data => setWalletConnected(data));
			alert("Wallet Connected!");
	};	

	const handleSubmit2 = (e) => {
		e.preventDefault();	
		
		fetch("http://localhost:8083/dao")
			.then(res => res.json())
			.then(data2 => setDao(data2))
	};	
	
	const getBidAmount = (e) => {
		e.preventDefault();	

		const bidAmount = e.target.bidAmount.value;
		alert("you bidded:" + bidAmount);
		// The next step is to get the wallet funds / balance and check if they can do the bid!
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
			
			<br />
			
			<hr />
			<h3> Let's get going shall we?  </h3>
			<p>Click the button below to see what you could win today!</p>
			
			<form onSubmit={handleSubmit2}>
				<button type="submit">Todays DAO Thing to Win</button>
			</form>
			
			<hr />
			{dao && (
				<div className="dao">
					<pre><strong>Achievement Card for your profile: </strong>{dao}</pre>
			</div>
			)}
			<hr />
			
			<form onSubmit={getBidAmount}>
				<input type="number" name="bidAmount" placeholder="Enter an amount to bid..."/>		
				<br /><br />
				<button type="submit">Bid</button>
			</form>
		</div>
	);
}

export default DAO;
