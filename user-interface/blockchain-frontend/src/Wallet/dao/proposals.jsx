import { useEffect, useState } from "react";

function Proposals() {
    const [proposal, setProposal] = useState([]);

    useEffect(() => {
        fetch("http://192.168.200.89:8083/makeAProposal")
        .then(res => res.json())
        .then(data => setProposal(data));
    }, []);
    
    return (
        <div>
            <h3>Here is the Proposal data from the backend:</h3> 

            <p>Index: {proposal?.Index}</p> 
            <p>Name: {proposal?.Name}</p>
            <p>Description: {proposal?.Description}</p>
            <p>Funds To Use Out Of Treasury: {proposal?.FundsToUseOutOfTreasury}</p>
            <p>Expiry: {JSON.stringify(proposal?.Expiry)}</p>
            <p>Status: {proposal?.Status}</p>
        </div>
    ) 
}

export default Proposals;
