import { useState } from "react";

const LOWEST = 0.01;

function checkWalletForValidBalance(amount, bidAmount) {	
	const numAmount = parseFloat(amount);
	
	if (isNaN(numAmount) || numAmount <= 0) {
		alert(`Oops! ${amount} isn’t a valid bid. Please enter a number greater than 0.`);
		return;
	}
	
	if (amount <= LOWEST) {
		alert("Oops! Your wallet doesn’t have enough funds to place this bid. Try a higher amount.");
		return;
	}
	
	if (amount > LOWEST) {
		let numAmount = parseFloat(amount);
		numAmount = parseFloat(numAmount.toFixed(2));
	}
	
	return numAmount;
}

function DAO() {
	const [walletConnected, setWalletConnected] = useState(null);
	const [dao, setDao] = useState(null);
	const [bid, setBid] = useState(0.01);
	const [funds, setFunds] = useState(0);
		
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

		var bidAmount = e.target.bidAmount.value;	
		var validBalance = checkWalletForValidBalance(bidAmount, walletConnected.Balance);
		
		if (validBalance > LOWEST) {
			setBid(prevBid => prevBid + validBalance);
		} 
		
		e.target.bidAmount.value = "";
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
			
			<br /><br/><br/><br/><br/><br/>
			
			{/*<hr />*/}
			{dao && (
				<div className="dao">
					<pre><strong>Achievement Card for your profile: </strong>{dao}</pre>
			</div>
			)}
			{/*<hr />*/}
			
			<p>Current Bid is: {bid}</p>
			
			<form onSubmit={getBidAmount}>
				<input type="number" step="0.01" name="bidAmount" placeholder="Enter an amount to bid..."/>		
				<br /><br />
				<button type="submit">Bid</button>
			</form>
		</div>
	);
}

export default DAO;
