import { useNavigate } from "react-router-dom";
import FillInPhrase from "./fillInPhrase";

function GeneratedWords() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Write down your Secret Recovery Phrase down</h1>
            <p>Below are your generated words for your Secret Recovery Phrase, write them down.</p>

            {/* I will have backend code that will put in some random words in the below 12 input boxes */}
            <FillInPhrase />
            <br />

            <button onClick={() => navigate("/confirm")}>Confirm - Secret Recovery Phrase</button>
        </div>
    )
}

export default GeneratedWords