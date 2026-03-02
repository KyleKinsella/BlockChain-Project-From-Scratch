import ConfirmUserInput from './confirmUserInput';
import { useNavigate } from "react-router-dom";

function ConfirmPhrase() {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Confirm Your Recovery Phrase</h1>
            <h3><strong>Final Step</strong></h3>
            <p>Enter the words from your recovery phrase in the <strong>correct order</strong> to verify your wallet.</p>

            <ConfirmUserInput buttonText="Submit" message="Congratulations! You have completed the Wallet Creation Process."/>
            <br />
            <button onClick={(e) => navigate("/words")}>Go back to Step 4</button>
        </div>
    )
}

export default ConfirmPhrase
