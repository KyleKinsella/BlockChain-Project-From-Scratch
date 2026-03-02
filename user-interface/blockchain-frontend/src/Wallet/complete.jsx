import WalletMainUI from "./walletHomePage"

function WalletSetupComplete({reward}) {
    return (
        <div>
            {/*<h1>Congratulations! You have completed the Wallet Creation Process. </h1>*/}

            {/*<br /><br /><br /><br /><br />*/}
            
            <WalletMainUI reward={reward}/>
        </div>
    )
}

export default WalletSetupComplete
