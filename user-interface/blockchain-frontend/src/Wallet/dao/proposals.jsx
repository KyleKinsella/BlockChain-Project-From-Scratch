import { useNavigate } from "react-router-dom";
{/* import Treasury from './treasury.jsx'; */}
import MakeAVote from "./makeAVote.jsx";
import { useEffect, useState } from "react";

function Proposals() {
    const navigate = useNavigate();
    const [allInfo, setAllInfo] = useState([]);

    return (
        <div>
            {/* <Treasury /> */}
        
            <h1>Let's Vote!</h1>
            <p>Here you will be able to make a proposal and depending on your proposal you could have the opportunity to use some of the treasury funds for your specific proposal. To get started click the button below.</p>
            
            <button onClick={(e) => navigate("/ProvideProposalInfo")}>Submit a Proposal</button>

            {/* {allInfo} */}

            {/*
            <h3>Proposals</h3>
            {allInfo.map((data, i) => (       
                <div key={i} className="">        
                    <>
                    <ul>
                        <p>Name: {data.Name}</p>
                        <p>Description: {data.Description}</p>
                        <p>Potential Funds to use: {data.FundsToUseOutOfTreasury}</p>
                    </ul>
                    </>
                </div>
            ))}
            */}

            {/*
            <br/><br/><br/><br/><br/><br/><br/>
            <MakeAVote />
            */}
        </div>
    ) 
}

export default Proposals;
