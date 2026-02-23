import { useState, useEffect } from "react";
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

//const bids = [];

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
    const navigate = useNavigate();

    const [walletConnected, setWalletConnected] = useState(null);
    const [dao, setDao] = useState(null);
    const [bid, setBid] = useState(1);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [walletBalance, setWalletBalance] = useState(0);
    const [disableBidBtn, setDisableBidBtn] = useState(false);
    const [btn, setBtn] = useState(false);
    const [multipleWallets, setMultipleWallets] = useState([]);

    const [currentBid, setCurrentBid] = useState(1);
    const [loaded, setLoaded] = useState(false);
    const [t, setT] = useState(0);
       
    const [bids, setBids] = useState(() => {
        const storedBids = localStorage.getItem("bids");
        return storedBids ? JSON.parse(storedBids) : [];
    });

    useEffect(() => {
        localStorage.setItem("bids", JSON.stringify(bids));
    }, [bids]);

    useEffect(() => {
        if (!loaded) return;
        localStorage.setItem("currentBid", JSON.stringify(currentBid));
    }, [currentBid, loaded]);
    
    useEffect(() => {
        const walletData = localStorage.getItem("walletData");
        const reward = localStorage.getItem("reward");
        const curr = localStorage.getItem("currentBid");

        const treasuryBids = localStorage.getItem("Treasury-Amount");
        const bds = localStorage.getItem("bids");
        
        if(walletData) { 
            try {
                const data = JSON.parse(walletData);
                
                setWalletConnected(data);
                setWalletBalance(Number(data.Balance));
                setButtonClicked(true);
            } catch (err) {
                console.error("Invalid wallet in storage");
                localStorage.removeItem("walletData");
            }
        }

        if(reward) { 
            try {
                const data2 = JSON.parse(reward);

                setDao(data2);
                setBtn(true);
            } catch (err) {
                console.error("Invalid reward in storage");
                localStorage.removeItem("reward");
            }
        }

        if(curr) { 
            try {
                const data3 = JSON.parse(curr);
                setCurrentBid(data3);
            } catch (err) {
                console.error("Invalid currentBid in storage");
                localStorage.removeItem("currentBid");
            }
        }

        setLoaded(true);

        if(treasuryBids) {
            try {
                const data4 = JSON.parse(ta);
                setT(data4);
            } catch (err) {
                console.error("Invalid currentBid in storage");
                localStorage.removeItem("currentBid");
            }
        }

       if(bds) { 
            try {
                const data5 = JSON.parse(bds);       
                setBids(data5);
            } catch (err) {
                console.error("Invalid bids in storage");
                localStorage.removeItem("bids");
            }
        }  
    }, [])
    
    const createWallet = (e) => {
        e.preventDefault();
    
        fetch("http://192.168.200.89:8082/initWallet")
            .then(res => res.json())
            .then(data => {
                setWalletConnected(data); 
                alert("Wallet Connected Successfully!");
                setWalletBalance(Number(data.Balance));
                setButtonClicked(true);
                
                localStorage.setItem("walletData", JSON.stringify(data));
            })
            .catch(err => console.error(err));
    };
    
    const daoReward = (e) => {
        e.preventDefault(); 
        
        fetch("http://192.168.200.89:8083/dao")
            .then(res => res.json())
            .then(data2 => {
                setDao(data2);
                setBtn(true);

                localStorage.setItem("reward", JSON.stringify(data2));
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
            setCurrentBid(prev => prev + validBalance);    // + validBalance + LOWEST);
            //bids.push(parseInt(validBalance));

            setBids(prevBids => [...prevBids, validBalance]);
            
            setWalletBalance(prevBalance => parseInt((prevBalance - validBalance)));
            alert("Your bid has placed successfully!");
            rewardExpired(23);
        } 
        
        e.target.bidAmount.value = "";
    };

     const multipleWallet = (e) => {
        e.preventDefault(); 
        
        fetch("http://192.168.200.89:8082/nwallets")
            .then(res => res.json())
            .then(data3 => {
                setMultipleWallets(data3);
                alert("5 Wallets have been created!");
            });
    };

    const clearLocalStorage = (e) => {
        e.preventDefault(); 

        alert("Local Storage has been cleared!")
        localStorage.clear();
    };

    const total = sumValuesForTreasury(bids);
    
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
                    <p>Wallet: {walletConnected?.Address}</p>
                    <p>Balance: {walletBalance}</p>
                </div>
            )}
                      
            {/*
            <form onSubmit={multipleWallet}>
                  <button type="submit">View Multiple Wallets</button>
            </form>
            
            {multipleWallets.map((data, i) => (       
                <div className="seed">        
                    <>
                    <ul>
                        <p>Wallet({i+1}): {data.Address} <br /> Balance: {data.Balance}</p>
                    </ul>
                    </>
                </div>
            ))}
            */}
            
            <hr />
            <Treasury amount={total}/>
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
            
            <p>Current Bid is: {currentBid}</p>
            
            <form onSubmit={getBidAmount}>
                <input type="number" step="1" name="bidAmount" placeholder="Enter your bid"/>       
                <br /><br />
                <button type="submit" disabled={disableBidBtn}>Place Bid</button>
            </form>

            <br />               

            <form onSubmit={clearLocalStorage}>
                <button type="submit">Reset Page</button>
           </form>
        </div>
    );
}

export default DAO;
