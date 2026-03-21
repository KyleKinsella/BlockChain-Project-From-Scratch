import { useNavigate } from "react-router-dom";

function DaoStuff() {
    const navigate = useNavigate();
    
    return (
        <>
        {/*
        <h1>Welcome to the Governance section of my project.</h1>
        <p>Click either of the buttons below to go to the corrosponding page.</p>
        */}

        {/*
        <h1>Welcome to Governance!</h1>
        <p>Select a section to continue:</p>
        */}

        <h1>Welcome to the DAO Hub!</h1>
        <p>Choose what you’d like to do next:</p>

        {/*Go to the DAO*/}
        <button onClick={(e) => navigate("/dao")}>Enter the DAO</button>
        <button onClick={(e) => navigate("/ProvideProposalInfo")}>View Proposals & Candidates</button>
        <br/><br/>
        <button onClick={(e) => navigate("/")}>Return Home</button>
        </>
    )
}

export default DaoStuff;
