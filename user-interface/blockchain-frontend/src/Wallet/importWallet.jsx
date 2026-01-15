import FillInPhrase from "./fillInPhrase"

function ImportWallet() {
    return (
        <div>
            <h1>Import Wallet</h1>
            <p>Enter your <strong>secret recovery phrase</strong> to restore access to your wallet.</p>

            <form action="">
                <FillInPhrase />
            </form>

            <br />

            <button onClick={() => navigate("")}>Import Wallet</button>
        </div>
    )
}

export default ImportWallet
