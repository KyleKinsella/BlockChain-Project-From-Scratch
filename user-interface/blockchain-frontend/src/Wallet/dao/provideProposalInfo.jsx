import { useEffect, useState } from "react";
import MakeAVote from "./makeAVote.jsx";

function ProvideProposalInfo() {
    const [allProposals, setAllProposals] = useState([]);
    const [showData, setShowData] = useState(false);
    
    useEffect(() => {
        fetch("http://192.168.200.89:8083/getAllProposals")
          .then(res => res.json())
          .then(data => {
            // is there any proposals ? //
            if (data === null) {
                return;
            }
            setAllProposals(data)
            });
    }, []);
    
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
            setAllProposals(data);
            alert("Your Proposal has been created!");

            e.target.proposalName.value = "";
            e.target.descriptionDetails.value = "";
            e.target.potentialFunds.value = "";
        })
        .catch(err => {
            console.log(err);
        });
    };
    
    return (
        <div>        
            <h1>Welcome to the Proposals & Candidates</h1>
            <p>Here you will be able to submit a proposal (if and only you have won an <strong>Achievement Card</strong> in the DAO). View submitted proposals and cast your vote for the current set proposal.</p>

            <hr/>
        
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
            </form>

            <hr />
            
            <h2>Proposals</h2>
            <p>You can click the button below to view all of the proposals.</p>
            <button onClick={() => setShowData(prev => !prev)}>
              {showData ? "Hide Proposal's" : "Show Proposal's"}
            </button>

            {showData && allProposals.map((proposal, i) => (
              <div key={i}>
                <h4>Proposal {i + 1}</h4>

                <p>Name: {proposal.Name}</p>
                <p>Description: {proposal.Description}</p>
                <p>Potential Funds to use: {proposal.FundsToUseOutOfTreasury}</p>

                <br/>
              </div>
            ))}

            <hr/>
            
            <br/><br/>
            <MakeAVote />
            
            {/*
            SOME THINGS TO THINK ABOUT
            1: can anyone make a proposal ? 
            2: how do i check who has voted ?
            */}
        </div>
    )
}

export default ProvideProposalInfo;
