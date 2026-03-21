import { useNavigate } from "react-router-dom";

function Proposals() {
    const navigate = useNavigate();
    
    return (
        <div>
            <div className="button-container">
                <h1>Let's Vote!</h1>
                <p>
                    Share your ideas and help shape our community! Submit a proposal and if it’s approved, you might be able to access treasury funds to bring it to life. <br/><br/>

                    Ready to get started? Click the button below to submit your proposal.
                </p>
                
                <button onClick={(e) => navigate("/ProvideProposalInfo")}>Submit a Proposal</button>
                <button onClick={(e) => navigate("/")}>Return Home</button>
            </div>
        </div>
    ) 
}

export default Proposals;
