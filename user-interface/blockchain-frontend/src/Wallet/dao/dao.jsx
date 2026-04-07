{/*
    Tidy up:
    - make the readme more developer / engineer like --- mostly done
    - polishing up everything --- mostly done
    - styling --- not a big issue, will do last --- in the works...
*/}

import { useState, useEffect } from "react";
import Treasury from './treasury.jsx';
import { useNavigate } from "react-router-dom";
import { saveAs } from 'file-saver';

const LOWEST = 1;

const date = new Date();    
const formtatDate = date.toLocaleDateString("en-US", {      
    month: "short",
    day: "numeric",
    year: "numeric",
});

const hourIs = date.getHours(); 
const biddingIsOver = 22;   //hourIs + 1;

function sumValuesForTreasury(values) {
    if (values === null) {
        return;
    }
    
    var sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i]
    }
    return sum;
}

function DAO() {
    const navigate = useNavigate();

    const [firstWalletConnected, setFirstWalletConnected] = useState(null);
    const [daoReward, setDaoReward] = useState(null);
    const [bidValue, setBidValue] = useState(1);
    const [firstWalletClicked, setFirstWalletClicked] = useState(false);
    const [firstWalletBalance, setFirstWalletBalance] = useState(0);
    const [over, setOver] = useState(false);
    const [rewardBtn, setRewardBtn] = useState(false);
    const [multipleWallets, setMultipleWallets] = useState([]);
    const [currentBid, setCurrentBid] = useState(1);
    const [loadData, setLoadedData] = useState(false);
    const [treasuryFunds, setTreasuryFunds] = useState(0);    
    const [bidHistory, setBidHistory] = useState([]);
    const [loadingNWallets, setLoadingNWallets] = useState(false);
    const [nWallets, setNWallets] = useState(null);
    
    const [bids, setBids] = useState(() => {
        const storedBids = localStorage.getItem("bids");
        return storedBids ? JSON.parse(storedBids) : [];
    });
    
    useEffect(() => {
        localStorage.setItem("bids", JSON.stringify(bids));
    }, [bids]);

    useEffect(() => {
        if (!loadData) return;
        localStorage.setItem("currentBid", JSON.stringify(currentBid));
    }, [currentBid, loadData]);
    
    useEffect(() => {
        const firstWalletData = localStorage.getItem("firstWalletData");
        const reward = localStorage.getItem("reward");
        const currentBid = localStorage.getItem("currentBid");
        const treasuryBids = localStorage.getItem("bids");
        const firstWalletBalanceUpdated = localStorage.getItem("firstWalletBalanceUpdated");
        const bh = localStorage.getItem("bidHistory");
        const nWallets = localStorage.getItem("nWallets");
        
        if(firstWalletData) { 
            try {
                const foundFirstWalletData = JSON.parse(firstWalletData);
                
                setFirstWalletConnected(foundFirstWalletData);
                setFirstWalletBalance(Number(foundFirstWalletData.Balance)); 
                setFirstWalletClicked(true);
            } catch (err) {
                console.error("Invalid firstWalletData in storage");
                localStorage.removeItem("firstWalletData");
            }
        }

        if(reward) { 
            try {
                const foundReward = JSON.parse(reward);

                setDaoReward(foundReward);
                setRewardBtn(true);
            } catch (err) {
                console.error("Invalid reward in storage");
                localStorage.removeItem("reward");
            }
        }

        if(currentBid) { 
            try {
                const foundCurrentBid = JSON.parse(currentBid);
                setCurrentBid(foundCurrentBid);
            } catch (err) {
                console.error("Invalid currentBid in storage");
                localStorage.removeItem("currentBid");
            }
        }

        setLoadedData(true);
        
        if(treasuryBids) { 
            try {
                const foundTreasuryBids = JSON.parse(treasuryBids);       
                setBids(foundTreasuryBids);
            } catch (err) {
                console.error("Invalid bids in storage");
                localStorage.removeItem("bids");
            }
        }

        if(firstWalletBalanceUpdated) { 
            try {
                const foundFirstWalletBalanceUpdated = JSON.parse(firstWalletBalanceUpdated);
                setFirstWalletBalance(foundFirstWalletBalanceUpdated.Balance);
            } catch (err) {
                console.error("Invalid firstWalletBalanceUpdated in storage");
                localStorage.removeItem("firstWalletBalanceUpdated");
            }
        }

        if(bh) {
            try {
                const foundBh = JSON.parse(bh);
                setBidHistory(foundBh);
            } catch (err) {
                console.error("Invalid bidHistory in storage");
                localStorage.removeItem("bidHistory");
            }
        }
        
        if (nWallets) {
            const wallet = JSON.parse(nWallets);
            setMultipleWallets(wallet);
            setNWallets(wallet);
        }
    }, [])
    
    useEffect(() => {
        var bidAmounts = [];
        var winningBid = 0;
        var winnerWalletAddress = "";
        var winnerAlias = "";
        
        for(var i = 0; i < bidHistory.length; i++) {
            bidAmounts.push(bidHistory[i].Amount);
            winningBid = Math.max(...bidAmounts);

            winnerWalletAddress = bidHistory[bidHistory.length - 1].Address;
            winnerAlias = bidHistory[bidHistory.length - 1].Alias;
        }

        if (hourIs === biddingIsOver) {  
            if (multipleWallets.length > 0) {
                rewardExpired(hourIs, winnerAlias, winnerWalletAddress, winningBid);

                // MIGHT DO: append to the file, each time there is a new winner (currently over-writes the file...) //
                // you have won a reward, so add you to this file (this is used in the proposals)! //
                const file = new Blob([winnerAlias], { type: 'text/plain;charset=utf-8' });
                saveAs(file, 'winner.txt');
            } 
        } 
    }, [bidHistory])
    
    const createWallet = (e) => {
        e.preventDefault();
    
        fetch("http://192.168.200.89:8082/initWallet")
            .then(res => res.json())
            .then(firstWallet => {
                setFirstWalletConnected(firstWallet); 
                alert("Wallet Connected Successfully!");
                setFirstWalletBalance(Number(firstWallet.Balance));
                setFirstWalletClicked(true);
                
                localStorage.setItem("firstWalletData", JSON.stringify(firstWallet));
            })
            .catch(err => console.error(err));
    };
    
    const winThis = (e) => {
        e.preventDefault(); 
        
        fetch("http://192.168.200.89:8083/dao")
            .then(res => res.json())
            .then(reward => {
                setDaoReward(reward);
                setRewardBtn(true);

                localStorage.setItem("reward", JSON.stringify(reward));
            });
    };  
    
    const rewardExpired = (timesUp, alias, winningAddress, winningBid) => {
        var hour = date.getHours();

        if (bids === 0) {
            alert("No bids have been placed yet. The reward remains unclaimed. Place a bid to participate!");
            return;
        }
        
        if (hour === timesUp) {
            alert("Congratulations 🎉\n\nThe winner of the reward: '" + daoReward + "' is: " + winningAddress + " with the following Alias '" + alias + "'." + "\n\nThe winning bid was: " + winningBid + "\n\nTransaction confirmed. Your Achievement Card has been minted. Redirecting to your wallet...");
            
            setOver(true);
            
            //navigate("/done", { state: { reward: daoReward } });
        }
    }
    
    const processAliasesForVoting = (e) => {
        e.preventDefault();

        const connectedAliasNames = [];
        
        connectedAliasNames.push(firstWalletConnected.Alias);
            
        for(var i = 0; i < multipleWallets.length; i++) {
            connectedAliasNames.push("\n" + multipleWallets[i].Alias);
        }

        for (let i = 0; i < connectedAliasNames.length; i++) {
            connectedAliasNames[i] = connectedAliasNames[i].replace(/,/g, "");
        }

        const allAliasesString = connectedAliasNames.join("");
        
        const allAliases = new Blob([allAliasesString], { type: 'text/plain;charset=utf-8' });
        saveAs(allAliases, 'allAliases.txt');
    };
    
    const getBidAmount = (e) => {
        e.preventDefault();
        
        var bidAmount = e.target.bidAmount.value;
        var typedAlias = e.target.aliasName.value;

        if (typedAlias === firstWalletConnected.Alias) {
            typedAlias = typedAlias.trim();
        } else {
            typedAlias = typedAlias.trim().toLowerCase();
        }
        
        if (bidAmount === 0) {
            alert("That bid isn't valid. Please enter a value greater than 0.");
            e.target.bidAmount.value = "";
            return;
        }

        if (bidAmount < 0) {
            alert("Negative values are not allowed. Enter a positive number to continue.");
            e.target.bidAmount.value = "";
            return;
        }
            
        var cb = bidAmount + LOWEST;
                
        {/* this code checks to see if you are trying to bid more than you have */}
        for (var i = 0; i < multipleWallets.length; i++) {
            if (typedAlias === multipleWallets[i].Alias) {
                var nWalletBal = multipleWallets[i].Balance;

                if (bidAmount > nWalletBal) {
                    alert("Your bid is higher than your available funds. Please enter a smaller amount.");
                    e.target.bidAmount.value = "";
                    return;
                }     
            }
        }
        
        {/* this is required so when "I-WAS-HERE-FIRST" balance is zero the other n wallets can bid */}
        if (typedAlias === firstWalletConnected.Alias) {
            if (bidAmount > firstWalletBalance) {
                alert("Oops! You don’t have enough funds to place that bid. Try a smaller amount.");
                e.target.bidAmount.value = "";
                return;
            }
        }
        
        var validBalance = parseInt(bidAmount);
        
        if (cb === LOWEST || validBalance > LOWEST) {

            // valid alias name ? //
            var found = false;                               
            for(var i = 0; i < multipleWallets.length; i++) {
                if(typedAlias === multipleWallets[i].Alias.trim().toLowerCase() || typedAlias === firstWalletConnected.Alias.trim()) {

                    {/* this was a new edge case! what happens if the bid history contains two wallet addresses that bid the same amount? Who wins? */}
                    {/* the fix was this - just check the bid amount to the current bid, if its more update state otherwise stop */}
                    if (bidAmount > currentBid) { 
                        setCurrentBid(prev => prev + validBalance);
                    } else {
                        alert("Try increasing your bid of '" + bidAmount + "' it needs to be higher than '" + currentBid + "'.");
                        e.target.bidAmount.value = "";
                        return;
                    }

                    setBidValue(prevBid => prevBid + validBalance);
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
            if (typedAlias === firstWalletConnected.Alias) {
                setFirstWalletBalance(prev => {
                    const newBalance = prev - validBalance;

                    const updatedWallet = {
                        Alias: firstWalletConnected.Alias,
                        Address: firstWalletConnected.Address,
                        Balance: newBalance
                    };
                    
                    handleBid(updatedWallet.Alias, updatedWallet.Address, bidAmount);
                    
                    setFirstWalletConnected(updatedWallet);
                    localStorage.setItem("firstWalletBalanceUpdated", JSON.stringify(updatedWallet));

                    return newBalance;
                })
            }
            
            // This is the state for the n other connected wallets //
            const wallets = multipleWallets.map(wallet => {
                if (wallet.Alias === typedAlias) {
                    handleBid(wallet.Alias, wallet.Address, bidAmount);

                    return {
                      ...wallet,
                      Balance: wallet.Balance - validBalance
                    };
                  }
                  return wallet;
                });
            
                setMultipleWallets(wallets);
                setNWallets(wallets);
                
                localStorage.setItem("nWallets", JSON.stringify(wallets));
                                         
                alert("Your bid has placed successfully!");
                //processAliasesForVoting(e);
        }

        e.target.aliasName.value = "";
        e.target.bidAmount.value = "";               
    };
    
    const clearLocalStorage = (e) => {
        e.preventDefault(); 

        alert("Local Storage has been cleared!")
        localStorage.clear();
    };

    function handleBid(Alias, Address, Amount) {
        setBidHistory(prev => {
            const bidInfo = [...prev, { Alias, Address, Amount }];
            localStorage.setItem("bidHistory", JSON.stringify(bidInfo));
            return bidInfo;
        });
    }
    
    const makeNWallets = (e) => {
        e.preventDefault(); 
        const walletsToMake = Number(e.target.nWallets.value);
        
        if (walletsToMake >= 100) {
            alert("You're about to create '" + walletsToMake + "' wallets. This may take a while...");
        }

        if (walletsToMake === 0) {
            alert("Invalid input. Please enter a value greater than zero.");
            e.target.nWallets.value = "";
            return;
        }

        if (walletsToMake < 0) {
            alert("Please enter a positive number. Negative values are not allowed.");
            e.target.nWallets.value = "";
            return;
        }

        setLoadingNWallets(true);

        fetch("http://192.168.200.89:8082/nwallets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(walletsToMake)
        })
        .then(res => res.json())
        .then(nWallets => {
            setMultipleWallets(nWallets);
            setLoadingNWallets(false);
            
            // clear the input box once the wallets have been shown on the frontend //
            e.target.nWallets.value = "";
        })
          .catch(err => {
            setLoadingNWallets(false);
          });
    };
    
    const total = sumValuesForTreasury(bids);
    
    return (
        <div>       
            <h1 id="dao">Kyle's Decentralized Autonomous Organization (DAO)</h1>
            <p id="daoWelcome">
                Welcome to my DAO! Connect your wallet, check today’s reward and place bids for a chance to win exclusive achievement cards!
            </p>

            <div className="button-container">
                <hr/>
                <Treasury name="treasury" amount={total}/>
                <hr/>

                <form onSubmit={createWallet}>
                  <button type="submit" disabled={firstWalletClicked}>
                    {firstWalletClicked ? "Wallet Connected" : "Connect Wallet"}
                  </button>
                </form>

                <br/>
                
                <form onSubmit={makeNWallets}>
                    <label id="nWallets">How many Wallets do you want to make ?</label>
                      <br/><br/>
                      <input type="number" name="nWallets" placeholder="Wallets to Make" required/>
                      <br/><br/>
                      <button type="submit" disabled={loadingNWallets}>
                        {loadingNWallets ? "Creating Wallets..." : "Create Wallets"}
                      </button>
                </form>

                {loadingNWallets && <p>Creating Wallets... please wait</p>}
            </div>

            <br/><br/>

            {!firstWalletConnected ? "Error: No wallets have been connected to the DAO - Connect your Wallet to use the DAO." :
                <table className="dao-table">
                    <thead>
                        <tr>
                          <th><strong>#</strong></th>
                          <th><strong>Alias</strong></th>
                          <th><strong>Balance</strong></th>
                        </tr>
                    </thead>
                    <tbody>
                        {firstWalletConnected && (
                          <tr>
                            <td>1</td>
                            <td>{firstWalletConnected.Alias}</td>
                            <td>{firstWalletBalance}</td>
                          </tr>
                        )}

                        {multipleWallets.map((multipleWallets, i) => (
                          <tr>
                            <td>{multipleWallets.Index+1}</td>
                            <td>{multipleWallets.Alias}</td>
                            <td>{multipleWallets.Balance}</td>
                          </tr>
                        ))}
                    </tbody>
                </table>
            }
            
            <br/><br/>

            <div className="button-container">
                <h3 id="bh">Bid History</h3>
                {!bidHistory.length ? "No bids have been submitted just yet." : 
                    <ul>
                        {bidHistory.map((bid) => (
                            <li id="bidHistory">{bid.Address} bidded: {bid.Amount}</li>
                        ))}
                    </ul>
                }
            </div>
            
            <br/><br/>
            
            <div className="button-container">
                <div className="importantInfo">
                     <form onSubmit={winThis}>
                        <button type="submit" disabled={rewardBtn}>Reveal Today’s Reward</button>
                    </form>

                    {daoReward && (
                        <div className="achievementCard">
                            <pre><strong>Achievement Card: <br/> </strong><i>{daoReward}</i></pre>
                        </div>
                    )}

                    <hr id="sep"/>
                    
                    <p id="today">Today's Date: <strong>{formtatDate}</strong>.</p>
                    <p id="currentBid">Current Bid is: <strong>{currentBid}</strong>.</p>
                    <p id="timeLeft">Time left to bid: <strong>{biddingIsOver} hrs (GMT)</strong>.</p>
                </div>
            </div>

            <br/>

            <div className="button-container">
                <form onSubmit={getBidAmount}>
                    <input type="text" pattern="/^[A-Za-z-]+$/" name="aliasName" placeholder="Enter your Alias name" required/>
                    <br /><br />
                    <input type="number" step="1" name="bidAmount" placeholder={"Bid more than " + currentBid} required/>
      
                    <br /><br />
                    <button type="submit" disabled={over}>Place Bid</button>
                    <button onClick={(e) => navigate("/daoStuff")}>Go Back</button>

                    <br/>
                    <button type="submit" onClick={clearLocalStorage}>Reset Page</button>
                </form>
            </div>
          </div>
        );
}
            
export default DAO;
