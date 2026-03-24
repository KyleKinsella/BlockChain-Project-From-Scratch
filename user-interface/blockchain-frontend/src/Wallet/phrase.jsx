import { useNavigate } from "react-router-dom";

function Phrase() {
    const navigate = useNavigate();

    return (
        <div>
            <div className="button-container">
                <h1 id="secureYourWallet">Secure Your Wallet</h1>
                <h3>Step 2</h3>
                <p id="mustRead">Your secret recovery phrase is the only way to restore access to your wallet. Please read this carefully.</p>

                <br/>
                
                <h2><i>Important</i></h2>
                <p>
                    Your recovery phrase consists of 12 or more random words.
                    Anyone with access to this phrase can control your wallet.
                                 
                    If you lose it, your assets cannot be recovered.
                </p>

                <br/>
                
                <h2><i>What to Do</i></h2>
                <ul id="todo">
                    <li>Write your recovery phrase down on paper.</li>
                    <br/>
                    <li>Store it offline in a safe, private location.</li>
                    <br/>            
                    <li>Keep it somewhere you won’t lose or forget.</li>
                </ul>

                <br/>
                
                <h2><i>What Not to Do</i></h2>
                <p>Never store your recovery phrase digitally. This includes:</p>
                <ul id="notDo">
                    <li>Email or cloud services (Google Docs, Drive, etc).</li>
                    <br/>
                    <li>Files on your computer (Word, text files, spreadsheets).</li>
                    <br/>
                    <li>Screenshots or notes on your phone.</li>
                    <br/>
                    <li>Any online or internet-connected storage.</li>
                </ul>

                <br/>
                
                <h2><i>Why this Matters</i></h2>
                <p>
                    Storing your recovery phrase offline is the most secure way to protect your wallet.
                    Physical storage is safer than any digital method. <br/><br/><strong>When you’re ready, write down your recovery phrase when shown</strong>.
                </p>
                
                <button onClick={() => navigate("/ssp")}>Next Step</button>
                    {/* View your secret seed phrase */}
                <button onClick={(e) => navigate("/walletsetup")}>Go Back to Step 1</button>
            </div>
        </div>
    )
}

export default Phrase
