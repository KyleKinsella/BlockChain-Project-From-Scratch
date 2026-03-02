import ConfirmUserInput from './confirmUserInput';

function ConfirmPhrase() {
    return (
        <div>
            <h1>Confirm Your Recovery Phrase</h1>
            <h3><strong>Final Step</strong></h3>
            <p>Enter the words from your recovery phrase in the <strong>correct order</strong> to verify your wallet.</p>

			<ConfirmUserInput buttonText="Submit" message="Congratulations! You have completed the Wallet Creation Process."/>
        </div>
    )
}

export default ConfirmPhrase
