import WalletMainUI from "./walletHomePage"

function WalletSetupComplete({reward}) {
    return (
        <div>
            <WalletMainUI reward={reward}/>
        </div>
    )
}

export default WalletSetupComplete
