import { useEffect, useState } from "react";

function ProvideProposalInfo() {
    const [allInfo, setAllInfo] = useState([]);

    const sendDataToBackend = (e) => {
        e.preventDefault();
        
        const name = e.target.proposalName.value;
        const description = e.target.descriptionDetails.value;
        const potentialFunds = Number(e.target.potentialFunds.value);
        
        const info = {
            name: name,
            description: description,
            potentialFunds: potentialFunds
        };
        
        fetch("http://192.168.200.89:8083/makeAProposal", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(data => {
            setAllInfo([data]);
            alert("Your Proposal has been created!");
        })
        .catch(err => {
            console.log(err);
        });
    };
    
    return (
        <div>
            <h3>Fill in the below form for your proposal:</h3>

            <form onSubmit={sendDataToBackend}>
                <label>Enter the name of your Proposal:</label> <br/><br/>
                <input type="text" name="proposalName" placeholder="Proposal Name:" required></input> <br/><br/>

                <label>Enter the Description of your Proposal:</label> <br/><br/>
                <input type="text" name="descriptionDetails" placeholder="Description details:" required></input>     <br/><br/>

                <label>Enter the potential funds to use for your Proposal:</label> <br/><br/>
                <input type="number" name="potentialFunds" placeholder="Potential funds to use:" required></input>

                <br/><br/>

                <button type="submit">Make Proposal</button>
            </form>

            <br/><br/>

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

            {/* here I will have buttons for the end users to submit their vote... */}
            
        </div>
    )
}

export default ProvideProposalInfo;
