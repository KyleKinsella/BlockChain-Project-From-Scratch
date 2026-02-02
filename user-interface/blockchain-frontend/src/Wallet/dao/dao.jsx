import { useState } from "react";
import Treasury from './treasury.jsx';
import { useNavigate } from "react-router-dom";
import WalletMainUI from './walletHomePage.jsx';

const LOWEST = 1;

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
	let numAmount = parseInt(amount);
	
	if (numAmount === 0 || numAmount <= 0) {
		alert("Oops! You don’t have enough funds in your wallet to place a bid.");
		return;
	}
	
	if (isNaN(numAmount) || numAmount <= 0) {
		alert(`Oops! ${amount} isn’t a valid bid. Please enter a number greater than 0.`);
		return;
	}
	
	if (numAmount <= LOWEST) {
		alert("Invalid bid: " + numAmount + ".\n\nPlease enter a bid greater than " + LOWEST + ".");
		return;
	}
	
	numAmount = parseInt(numAmount);
	
	return numAmount;
}

function DAO() {
	const [walletConnected, setWalletConnected] = useState(null);
	const [dao, setDao] = useState(null);
	const [bid, setBid] = useState(1);
	const [buttonClicked, setButtonClicked] = useState(false);
	const [walletBalance, setWalletBalance] = useState(0);
	const [disableBidBtn, setDisableBidBtn] = useState(false);
	const navigate = useNavigate();
	const [btn, setBtn] = useState(false);
		
	const createWallet = (e) => {
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

	const daoReward = (e) => {
		e.preventDefault();	
		
		fetch("http://192.168.200.89:8083/dao")
			.then(res => res.json())
			.then(data2 => {
				setDao(data2);
				setBtn(true);
			});
	};	
	
	const rewardExpired = (exactTimeHour) => {
		var hour = date.getHours();

		if (bids.length === 0) {
			alert("No bids have been placed yet. The reward remains unclaimed. Place a bid to participate!");
			return;
		}
		
		if (hour === exactTimeHour) {
			alert("Congratulations 🎉\n\nThe winner of the reward: '" + dao + "' is: " + walletConnected.Address + "\n\nCheck your Wallet to see your brand new Achievement Card!"); 	
			
			setDisableBidBtn(true);
			
			//navigate("/done", { state: { reward: dao } });
		}
	}
	
	const getBidAmount = (e) => {
		e.preventDefault();	
		
		var bidAmount = parseInt(e.target.bidAmount.value);
		bidAmount = parseInt(bidAmount);	
		
		if (bidAmount === 0 || bidAmount < 0) {
			alert("Please enter a bid greater than zero. Negative values are not allowed.");
			e.target.bidAmount.value = "";
			return;
		}
		
		var currentBid = bidAmount + LOWEST;
		
		if (bidAmount > walletBalance) {
			alert("Oops! You don’t have enough funds to place that bid. Try a smaller amount.");
			e.target.bidAmount.value = "";
			return;
		}
		
		var validBalance = checkWalletForValidBalance(bidAmount, walletConnected.Balance);
		
		if (currentBid === LOWEST || validBalance > LOWEST) {
			setBid(prevBid => prevBid + validBalance);
			bids.push(parseInt((validBalance + LOWEST)));
			
			setWalletBalance(prevBalance => parseInt((prevBalance - validBalance)));
			alert("Your bid has placed successfully!");
			rewardExpired(20);
		} 
		
		e.target.bidAmount.value = "";
	};
	
	return (
		<div>		
			<h1>Kyle's DAO</h1>
			<p>
				Welcome! Connect your wallet, check today’s reward and place bids for a chance to win exclusive achievement cards!
			</p>
			
			<form onSubmit={createWallet}>
			  <button type="submit" disabled={buttonClicked}>
				{buttonClicked ? "Wallet Connected" : "Connect Wallet"}
			  </button>
			</form>
			   
			{walletConnected && (
				<div className="wallet">
					<p>Wallet: {walletConnected.Address}</p>
					<p>Balance: {walletBalance}</p>
				</div>
			)}
			
			<br />
			
			<hr />
			<Treasury amount={sumValuesForTreasury(bids)}/>
			<br />
			
			<h3>Today's Reward</h3>
			<pre>{formtatDate}</pre>
			
			<p>Place your bids to compete for this amazing achievement!</p>
			
			<form onSubmit={daoReward}>
				<button type="submit" disabled={btn}>Reveal Today’s Reward</button>
			</form>
			
			<br />
			
			{dao && (
				<div className="dao">
					<pre><strong>Achievement Card: </strong>{dao}</pre>
			</div>
			)}
			
			<p>Current Bid is: {bid}</p>
			
			<form onSubmit={getBidAmount}>
				<input type="number" step="1" name="bidAmount" placeholder="Enter your bid"/>		
				<br /><br />				
				<button type="submit" disabled={disableBidBtn}>Place Bid</button>
			</form>
		</div>
	);
}

export default DAO;
