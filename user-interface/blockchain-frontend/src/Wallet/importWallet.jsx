import ConfirmUserInput from './confirmUserInput';

function ImportWallet() {
    return (
        <div>
            <h1>Import Wallet</h1>
            <p>Enter your <strong>secret recovery phrase</strong> to restore access to your wallet.</p>

			<ConfirmUserInput buttonText="Import Wallet" message="You have successfully imported your wallet."/>
        </div>
    )
}

export default ImportWallet
