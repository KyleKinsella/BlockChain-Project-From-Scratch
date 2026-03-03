{/*
   TODO:
    - persist n wallets balance --- going to leave (might do in the future...)
    - edge cases:
        - if the Alias "I-WAS-HERE-FIRST" balance is zero, any of the n other wallets cannot bid  --- done!!!
        - when any of the n wallets bids if they try to bid more than they have this will work and there balance goes into negative value --- done!!!

    Tidy up:
    - make the readme more developer / engineer like --- mostly done
    - polishing up everthing --- mostly done
    - styling --- not a bid issue, will do last

    Upcoming:
    - proposals & candidates
    - complete or make a dashboard to see traffic for my project 
*/}

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

const hourIs = date.getHours(); 
const biddingIsOver = hourIs + 1;

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
    const [bidHistory, setBidHistory] = useState([]);
    const noDups = [...new Set(bidHistory)];
    const [disableNWallets, setDisableNWallets] = useState(false);
    const [loading, setLoading] = useState(false);

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
        const updatedWall = localStorage.getItem("updatedBalance");
        const bh = localStorage.getItem("bidHistory");
        
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
                const data4 = JSON.parse(treasuryBids);
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

        if(updatedWall) { 
            try {
                const data6 = JSON.parse(updatedWall);
                setWalletBalance(data6.Balance);
            } catch (err) {
                console.error("Invalid currentBid in storage");
                localStorage.removeItem("currentBid");
            }
        }

        if(bh) {
            try {
                const data7 = JSON.parse(bh);
                setBidHistory(data7);
            } catch (err) {
                console.error("Invalid bidHistory in storage");
                localStorage.removeItem("bidHistory");
            }
        }
    }, [])
    
    useEffect(() => {
        var bidAmounts = [];
        var maxValue = 0;
         
        for(var i = 0; i < bidHistory.length; i++) {
            bidAmounts.push(bidHistory[i].Amount);
            maxValue = Math.max(...bidAmounts);
            
            if (hourIs === biddingIsOver) {
                rewardExpired(hourIs, bidHistory[i].Address, maxValue);
                break;
            }
        }
    }, [bidHistory])
    
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
    
    const rewardExpired = (exactTimeHour, address, winningBid) => {
        var hour = date.getHours();

        if (bids === 0) {
            alert("No bids have been placed yet. The reward remains unclaimed. Place a bid to participate!");
            return;
        }
        
        if (hour === exactTimeHour) {
            alert("Congratulations 🎉\n\nThe winner of the reward: '" + dao + "' is: " + address + "\n\nThe winning bid was: " + winningBid);

            //"\n\nCheck your Wallet to see your brand new Achievement Card!");     
            
            setDisableBidBtn(true);
            
            //navigate("/done", { state: { reward: dao } });
        }
    }

    const removeDupsInBidHistory = (noDups) => {
        setBidHistory(noDups);
    };
    
    const getBidAmount = (e) => {
        e.preventDefault();
        
        var bidAmount = e.target.bidAmount.value;
        var typedAlias = e.target.aliasName.value;
        
        if (bidAmount === 0 || bidAmount < 0) {
            alert("Please enter a bid greater than zero. Negative values are not allowed.");
            e.target.bidAmount.value = "";
            return;
        }
        
        var currentBid = bidAmount + LOWEST;

        {/* this code checks to see if you are trying to bid more than you have */}
        for (var i = 0; i < multipleWallets.length; i++) {
            var nWalletBal = multipleWallets[i].Balance;
            if (bidAmount > nWalletBal) {
                alert("Your bid is higher than your available funds. Please enter a smaller amount.");
                e.target.bidAmount.value = "";
                return;
            }     
        }

        {/* this is required so when "I-WAS-HERE-FIRST" balance is zero the other n wallets can bid */}
        if (typedAlias === walletConnected.Alias) {
            if (bidAmount > walletBalance) {
                alert("Oops! You don’t have enough funds to place that bid. Try a smaller amount.");
                e.target.bidAmount.value = "";
                return;
            }
        }
        
        var validBalance = checkWalletForValidBalance(bidAmount, walletConnected.Balance);
        
        if (currentBid === LOWEST || validBalance > LOWEST) {

            if(typedAlias === walletConnected.Alias) {
                typedAlias = typedAlias;
            } else {
                typedAlias = typedAlias.trim();
            }
            
            // valid alias name ? //
            var found = false;                               
            for(var i = 0; i < multipleWallets.length; i++) {
                if(typedAlias === multipleWallets[i].Alias || typedAlias === walletConnected.Alias) {

                    setBid(prevBid => prevBid + validBalance);
                    setCurrentBid(prev => prev + validBalance);
                    setBids(prevBids => [...prevBids, validBalance]);

                    found = true;
                    break;
                }
            }

            if(!found) {
                alert("Sorry we could not find a valid wallet for '" + typedAlias + "'. Try again");
                e.target.aliasName.value = "";
                e.target.bidAmount.value = "";
                return;
            }
                     
            // This is the state for the first wallet // 
            if (typedAlias === walletConnected.Alias) {
                setWalletBalance(prev => {
                    const newBalance = prev - validBalance;

                    const updatedWallet = {
                        Alias: walletConnected.Alias,
                        Address: walletConnected.Address,
                        Balance: newBalance
                    };
                    
                    removeDupsInBidHistory(noDups);
                    handleBid(updatedWallet.Address, bidAmount);
                    
                    setWalletConnected(updatedWallet);
                    localStorage.setItem("updatedBalance", JSON.stringify(updatedWallet));

                    return newBalance;
                })
            }
            
            // This is the state for the n other connected wallets //
            setMultipleWallets(prevWallets =>
              prevWallets.map(wallet => {
                if (wallet.Alias === typedAlias) {
                    const updated = {
                        ...wallet,
                        Balance: wallet.Balance - validBalance
                    };
                    
                    removeDupsInBidHistory(noDups);
                    handleBid(wallet.Address, bidAmount);
                    
                    return updated;
                }
                                
                e.target.aliasName.value = "";
                return wallet;
              })
            );
            
            alert("Your bid has placed successfully!");
        }

        e.target.bidAmount.value = "";               
    };

     const multipleWallet = (e) => {
        e.preventDefault(); 
        
        fetch("http://192.168.200.89:8082/nwallets")
            .then(res => res.json())
            .then(data3 => {
                setMultipleWallets(data3);
                alert(data3.length + " Wallets have been created!");
                setDisableNWallets(true);
            });
    };

    const clearLocalStorage = (e) => {
        e.preventDefault(); 

        alert("Local Storage has been cleared!")
        localStorage.clear();
    };

    function handleBid(Address, Amount) {
        setBidHistory(prev => {
            const bidInfo = [...prev, { Address, Amount }];
            localStorage.setItem("bidHistory", JSON.stringify(bidInfo));
            return bidInfo;
        });
    }

    const makeNWallets = (e) => {
        e.preventDefault(); 
        const walletsToMake = Number(e.target.nWallets.value);

        if (walletsToMake === 0) {
            alert("Please enter an value greater than zero.");
            e.target.nWallets.value = "";
            return;
        }

        if (walletsToMake < 0) {
            alert("Please enter a positive number. Negative values are not allowed.");
            e.target.nWallets.value = "";
            return;
        }

        setLoading(true);

        fetch("http://192.168.200.89:8082/nwallets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(walletsToMake)
        })
        .then(res => res.json())
        .then(data => {
            setMultipleWallets(data)
            setLoading(false);
        })
          .catch(err => {
            setLoading(false);
          });
    };
    
    const total = sumValuesForTreasury(bids);
          
    return (
        <div>       
            <h1>Kyle's Decentralized Autonomous Organization (DAO)</h1>
            <p>
                Welcome to my DAO! Connect your wallet, check today’s reward and place bids for a chance to win exclusive achievement cards!
            </p>

            <form onSubmit={createWallet}>
              <button type="submit" disabled={buttonClicked}>
                {buttonClicked ? "Wallet Connected" : "Connect Wallet"}
              </button>
            </form>
            
            {walletConnected && (                                                 
                <div className="wallet">
                    <p>
                        Alias: {walletConnected.Alias} <br />
                        Balance: {walletBalance}
                    </p>
                </div>
            )}

            <br/>

            <form onSubmit={makeNWallets}>
                <label>How many Wallets do you want to make ?</label>
                  <br/><br/>
                  <input type="number" name="nWallets" placeholder="Wallets to Make" required/>
                  <br/><br/>
                  <button type="submit" disabled={loading}>
                    {loading ? "Creating Wallets..." : "Create Wallets"}
                  </button>
            </form>

            {loading && <p>💼 Creating Wallets... please wait</p>}

            {/*
            <br/><br/><br/>
            
            <form onSubmit={multipleWallet}>
               <button type="submit" disabled={disableNWallets}>View Multiple Wallets</button>
            </form>
            */}
            
            {multipleWallets.map((data, i) => (       
                <div key={i} className="">        
                    <>
                    <ul>
                        <p>Alias({i+1}): {data.Alias} <br />
                        Balance: {data.Balance}</p>
                    </ul>
                    </>
                </div>
            ))}
            
            <hr />
            <Treasury amount={total}/>
            <br />

            <h3>Bid History</h3>
            <ul>
                {bidHistory.map((bid) => (
                    <li>{bid.Address} bidded: {bid.Amount}</li>
                ))}
            </ul>
            
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

            <p>Time left to bid: {biddingIsOver} hrs (Irish Time)</p>
            <p>Current Bid is: {currentBid}</p> 
                        
            <form onSubmit={getBidAmount}>
                <input type="text" pattern="/^[A-Za-z-]+$/" name="aliasName" placeholder="Enter your Alias name" required/>
                <br /><br />
                <input type="number" step="1" name="bidAmount" placeholder="Enter your bid"/>
  
                <br /><br />
                <button type="submit" disabled={disableBidBtn}>Place Bid</button>
            </form>

            {/*
            <button onClick={() => navigate("/done", { state: { reward: dao } })}>View Your Wallet</button>
            <br />              
            */}
            
            <form onSubmit={clearLocalStorage}>
                <button type="submit">Reset Page</button>
            </form>

            <br />

           <button onClick={(e) => navigate("/")}>Go Back</button>
        </div>
    );
}

export default DAO;
