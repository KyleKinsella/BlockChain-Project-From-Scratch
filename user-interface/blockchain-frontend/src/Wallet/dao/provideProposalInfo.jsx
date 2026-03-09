import { useEffect, useState } from "react";
{/* import MakeAVote from "./makeAVote.jsx"; */}
import { useNavigate } from "react-router-dom";

function ProvideProposalInfo() {
    const [allInfo, setAllInfo] = useState([]);
    const navigate = useNavigate();

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

                {/*
                    here i will have a file of everyone that has won a reward in the DAO.
                    what i'll have to do is, check what is typed in and if the typed in alias name is in the file, that alias can make a proposal, otherwise, they are not in the file, so you cannot make a proposal!
                */}
                
                <label>Enter your Alias name:</label> <br/><br/>
                <input type="text" name="aliasName" placeholder="Alias Name:" required></input> <br/><br/>  <br/><br/>
                            
                <label>Enter the name of your Proposal:</label> <br/><br/>
                <input type="text" name="proposalName" placeholder="Proposal Name:" required></input> <br/><br/>

                <label>Enter the Description of your Proposal:</label> <br/><br/>
                <input type="text" name="descriptionDetails" placeholder="Description details:" required></input>     <br/><br/>

                <label>Enter the potential funds to use for your Proposal:</label> <br/><br/>
                <input type="number" name="potentialFunds" placeholder="Potential funds to use:" required></input>

                <br/><br/>

                <button type="submit">Make Proposal</button>

                <br/><br/>
                <button onClick={(e) => navigate("/proposals")}>Go back to view all Proposals</button>
            </form>

            {/*
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
            */}

            {/* here I will have buttons for the end users to submit their vote... */}

            {/*
            <br/><br/>
            <MakeAVote />
            */}

            {/*
            SOME THINGS TO THINK ABOUT
            1: can anyone make a proposal ? 
            2: how do i check who has voted ?
            */}
        </div>
    )
}

export default ProvideProposalInfo;
