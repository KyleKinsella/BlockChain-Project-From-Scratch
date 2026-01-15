import { useState } from "react";

function WalletMainUI() {
	const [walletFunds, setWalletFunds] = useState(null);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		
		let x = 5;
		setWalletFunds(x);
	};
	
    return (
        <div>
            <h1>Welcome to your Wallet!</h1>
            <p>In your wallet you can buy crypto such as: BTC, ETH and many more, swap your tokens for other tokens and send your tokens to somewhere else...</p>
                        
            {/*this would be a clickable dropdown ul - not how it is at the moment!*/}
            {/*<ul>
				<li>Account 1</li>
				<li>Account 2</li>
				<li>Account n</li>
            </ul>*/}
            
            <div>
				<h3>Fund your wallet</h3>
				<p>Get your wallet up and going, so you can get ready for web3 technology!</p>
				
				<form onSubmit={handleSubmit}>
					<button type="submit">Add funds</button>
				</form>
            </div>
            
            <p>Your wallet currently has: <strong>{walletFunds}</strong> tokens.</p>
              
            <br /> <br />
                        
            <div>
				<button>Buy</button>
				<button>Swap</button>
				<button>Send</button>
            </div>
            
           <br /> <br /><br />
           
           <h3>NFTs</h3>
           <p>this will be a div with all of your NFTs...</p>
        </div>
    )
}

export default WalletMainUI
