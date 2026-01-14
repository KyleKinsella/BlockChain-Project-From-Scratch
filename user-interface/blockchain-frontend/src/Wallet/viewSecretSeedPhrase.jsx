import { useNavigate } from "react-router-dom";

function SecretSeedPhrase() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>View your Secret Seed Phrase</h1>
            <p>Below is your <strong><u>Secret Recovery Phrase</u></strong>. Write it down on a piece of paper and keep it in a safe place.
                You will be asked to re-enter this phrase (in order) for the next step.
            </p>

            <div>
                <h3>Reveal your Secret Recovery Phrase</h3>
                <p>Click the button below to view your Secret Recovery Phrase.</p>
                
                <button onClick={() => navigate("/words")}>View</button>
            </div>
        </div>
    )
}

export default SecretSeedPhrase