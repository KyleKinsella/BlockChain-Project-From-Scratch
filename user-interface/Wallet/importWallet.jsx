import FillInPhrase from "./fillInPhrase"

function ImportWallet() {
    return (
        <div>
            <h1>Import Wallet</h1>
            <p>Fill in the below form, with your <strong>Secret Recovery Phrase</strong>. Once you 
            have supplied your secret seed phrase, you will be able to gain access back to your wallet.</p>

            <form action="">
                <FillInPhrase />
            </form>

            <br />

            <button onClick={() => navigate("")}>Import Wallet</button>
        </div>
    )
}

export default ImportWallet