import { useNavigate } from "react-router-dom";

function Proposals() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Let's Vote!</h1>
            <p>Here you will be able to make a proposal and depending on your proposal you could have the opportunity to use some of the treasury funds for your specific proposal. To get started click the button below.</p>
            
            <button onClick={(e) => navigate("/ProvideProposalInfo")}>Submit a Proposal</button>
        </div>
    ) 
}

export default Proposals;
