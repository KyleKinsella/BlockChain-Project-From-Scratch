import { useNavigate } from "react-router-dom";

function DaoStuff() {
    const navigate = useNavigate();
    
    return (
        <>
        <h1>Welcome to the DAO Hub!</h1>
        <p>Choose what you’d like to do next:</p>
        
        <button onClick={(e) => navigate("/dao")}>Enter the DAO</button>
        <button onClick={(e) => navigate("/proposals")}>View Proposals & Candidates</button>
        <br/><br/>
        <button onClick={(e) => navigate("/")}>Return Home</button>
        </>
    )
}

export default DaoStuff;
