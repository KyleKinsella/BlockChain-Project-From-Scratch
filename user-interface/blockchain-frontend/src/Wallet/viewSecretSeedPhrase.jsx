import { useNavigate } from "react-router-dom";

function SecretSeedPhrase() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>View Your Recovery Phrase</h1>
            <h3>Step 4</h3>
            <p>
				Below is your secret recovery phrase. Write it down on paper and store it in a safe, offline location.
				You will be required to re-enter this phrase in the correct order in the next step.
            </p>

			<h2>Important</h2>
			<p>
				Anyone with access to this phrase can control your wallet.
				If you lose it, your wallet <strong>cannot be recovered</strong>.
			</p>

            <div>
                <h3>Reveal Recovery Phrase</h3>
                <p>Select the button below to reveal your secret recovery phrase.</p>
                
                <button onClick={() => navigate("/words")}>View</button>
                
                <p><strong>*Make sure no one is watching your screen*</strong></p>
            </div>
        </div>
    )
}

export default SecretSeedPhrase
