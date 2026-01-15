import { useNavigate } from "react-router-dom";

function Phrase() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Secure Your Wallet</h1>
            <h3>Step 3</h3>
            <p>Your secret recovery phrase is the only way to restore access to your wallet. Please read this carefully.</p>
            
            <h2>Important</h2>
            <p>
				Your recovery phrase consists of 12 or more random words.
				Anyone with access to this phrase can control your wallet.

				If you lose it, your assets cannot be recovered.
            </p>
            
            <h2>What to Do</h2>
            <ul>
				<li>Write your recovery phrase down on paper</li>
				<li>Store it offline in a safe, private location</li>				
				<li>Keep it somewhere you won’t lose or forget</li>
            </ul>
            
            <h2>What Not to Do</h2>
            <p>Never store your recovery phrase digitally. This includes:</p>
            <ul>
				<li>Email or cloud services (Google Docs, Drive, etc.)</li>
				<li>Files on your computer (Word, text files, spreadsheets)</li>
				<li>Screenshots or notes on your phone</li>
				<li>Any online or internet-connected storage</li>
            </ul>
            
            <h2>Why this Matters</h2>
            <p>
				Storing your recovery phrase offline is the most secure way to protect your wallet.
				Physical storage is safer than any digital method. <strong>When you’re ready, write down your recovery phrase when shown</strong>.
            </p>
            
            <button onClick={() => navigate("/ssp")}>Next Step</button>
                {/* View your secret seed phrase */}
        </div>
    )
}

export default Phrase
