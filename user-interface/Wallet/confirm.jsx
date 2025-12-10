import FillInPhrase from "./fillInPhrase"
import { useNavigate } from "react-router-dom";

function ConfirmPhrase() {
    const navigate = useNavigate();
    
    return (
        <div>
            <h1>Confirm your Secret Recovery Phrase</h1>
            <p>Fill in the below form in the correct order that the words were shown to you.</p>

            {/* I will have backend code to check for the correct values in the form */}
            {/* if the form has all of the correct values - render: "complete.jsx" */}
            {/* otherwise, render: "error.jsx" */}
            <form action="">
                <FillInPhrase />
            </form>

            <br />

            <button onClick={() => navigate("/done")}>Finish wallet setup</button>
        </div>
    )
}

export default ConfirmPhrase