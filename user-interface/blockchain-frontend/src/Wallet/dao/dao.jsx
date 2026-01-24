import { useState } from "react";
import Treasury from './treasury.jsx';

const LOWEST = 0.01;

const date = new Date();	
const formtatDate = date.toLocaleDateString("en-US", {		
	month: "short",
	day: "numeric",
	year: "numeric",
});

const bids = [];

function sumValuesForTreasury(values) {
	var sum = 0;
	for (let i = 0; i < values.length; i++) {
		sum += values[i]
	}
	return sum;
}

function checkWalletForValidBalance(amount, bidAmount) {	
	let numAmount = parseFloat(amount);
	
	if (numAmount === 0.0 || numAmount <= 0) {
		alert("Oops! You don’t have enough funds in your wallet to place a bid.");
		return;
	}
	
	if (isNaN(numAmount) || numAmount <= 0) {
		alert(`Oops! ${amount} isn’t a valid bid. Please enter a number greater than 0.`);
		return;
	}
	
	if (numAmount <= LOWEST) {
		alert("Oops! Your wallet doesn’t have enough funds to place this bid. Try a higher amount.");
		return;
	}
	
	numAmount = parseFloat(numAmount.toFixed(2));
	
	return numAmount;
}

function DAO() {
	const [walletConnected, setWalletConnected] = useState(null);
	const [dao, setDao] = useState(null);
	const [bid, setBid] = useState(0.01);
	const [funds, setFunds] = useState(0);
	const [buttonClicked, setButtonClicked] = useState(false);
	const [walletBalance, setWalletBalance] = useState(0);
	
	const handleSubmit = (e) => {
		e.preventDefault();
    
		fetch("http://192.168.200.89:8082/initWallet")
			.then(res => res.json())
			.then(data => {
				setWalletConnected(data); 
				alert("Wallet Connected Successfully!");
				setWalletBalance(Number(data.Balance));
				setButtonClicked(true);
			});
	};

	const handleSubmit2 = (e) => {
		e.preventDefault();	
		
		fetch("http://192.168.200.89:8083/dao")
			.then(res => res.json())
			.then(data2 => setDao(data2))
	};	
	
	const getBidAmount = (e) => {
		e.preventDefault();	

		var bidAmount = parseFloat(e.target.bidAmount.value);
		bidAmount = parseFloat(bidAmount.toFixed(2));	
		
		if (bidAmount > walletBalance) {
			alert("Oops! You don’t have enough funds to place that bid. Try a smaller amount.");
			return;
		}
		
		var validBalance = checkWalletForValidBalance(bidAmount, walletConnected.Balance);
		
		if (validBalance > LOWEST) {
			setBid(prevBid => prevBid + validBalance);
			bids.push(parseFloat((validBalance + LOWEST).toFixed(2)));
			
			setWalletBalance(prevBalance => parseFloat((prevBalance - validBalance).toFixed(2)));
			alert("Your bid has placed successfully!");
		} 
		
		e.target.bidAmount.value = "";
	};
	
	return (
		<div>		
			<h1>Kyle's DAO</h1>
			<p>
				Welcome! Connect your wallet, check today’s reward and place bids for a chance to win exclusive achievement cards!
			</p>
			
			<form onSubmit={handleSubmit}>
			  <button type="submit" disabled={buttonClicked}>
				{buttonClicked ? "Wallet Connected" : "Connect Wallet"}
			  </button>
			</form>
			   
			{walletConnected && (
				<div className="wallet">
					<p>Wallet: {walletConnected.Address}</p>
					{/*<p>Balance: {walletConnected.Balance}</p>*/}
					<p>Balance: {walletBalance}</p>
				</div>
			)}
			
			<br />
			
			<hr />
			<Treasury amount={sumValuesForTreasury(bids).toFixed(2)}/>
			<br />
			
			<h3>Today's Reward</h3>
			<pre>{formtatDate}</pre>
			
			<p>Place your bids to compete for this amazing achievement!</p>
			
			<form onSubmit={handleSubmit2}>
				<button type="submit">Reveal Today’s Reward</button>
			</form>
			
			<br />
			
			{dao && (
				<div className="dao">
					<pre><strong>Achievement Card: </strong>{dao}</pre>
			</div>
			)}
			
			<p>Current Bid is: {bid.toFixed(2)}</p>
			
			<form onSubmit={getBidAmount}>
				<input type="number" step="0.01" name="bidAmount" placeholder="Enter your bid"/>		
				<br /><br />
				<button type="submit">Place Bid</button>
			</form>
		</div>
	);
}

export default DAO;
