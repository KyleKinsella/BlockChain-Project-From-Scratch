//import AchievementCards from './achievementCards.jsx';

function WalletMainUI({ Comp, card }) {
    
    //alert(Comp);
    //alert(card);
    
    return (
        <div>
            <h1>Welcome to your Wallet!</h1>
            <p>testing...</p>
            
            {/*<comp card={card}/>*/} 
            
            <p>{Comp}</p>
            <pre>{card}</pre>
        </div>
    )
}

export default WalletMainUI
