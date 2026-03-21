import ConfirmUserInput from './confirmUserInput';
import { useNavigate } from "react-router-dom";

function ConfirmPhrase() {
    const navigate = useNavigate();
    return (
        <div>
            <div className="button-container">
                <h1>Confirm Your Recovery Phrase</h1>
                <h3><strong>Final Step</strong></h3>
                <p>Enter the words from your recovery phrase in the <strong>correct order</strong> to verify your wallet.</p>
            </div>

            <ConfirmUserInput buttonText="Create Wallet" message="Congratulations! You have completed the Wallet Creation Process."/>

            <div className="button-container">
                <button onClick={(e) => navigate("/words")}>Go Back to Step 4</button>
            </div>
        </div>
    )
}

export default ConfirmPhrase
