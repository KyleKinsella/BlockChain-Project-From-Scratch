import ConfirmUserInput from './confirmUserInput';
import { useNavigate } from "react-router-dom";

function ImportWallet() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Import Wallet</h1>
            <p id="restoreAccess">Enter your <strong>secret recovery phrase</strong> to restore access to your wallet.</p>

            <ConfirmUserInput buttonText="Import Wallet" message="You have successfully imported your wallet."/>
            
            <div className="button-container">
                <button onClick={(e) => navigate("/wallet")}>Go Back to Wallet Setup</button>
            </div>
        </div>
    )
}

export default ImportWallet
