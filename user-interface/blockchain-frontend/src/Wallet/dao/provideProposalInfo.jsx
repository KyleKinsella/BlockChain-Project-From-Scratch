import { useEffect, useState } from "react";

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

    const getDAOWinnerAliasName = (e) => {
        e.preventDefault();

        const typedAlias = e.target.aliasName.value;
        const name = e.target.proposalName.value;
        const description = e.target.descriptionDetails.value;
        const potentialFunds = Number(e.target.potentialFunds.value);

        fetch("winner.txt")
        .then(res => res.text())
        .then((text) => {
            if (typedAlias === text) {
               
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

                    e.target.aliasName.value = "";
                    e.target.proposalName.value = "";
                    e.target.descriptionDetails.value = "";
                    e.target.potentialFunds.value = "";
                })
                .catch(err => {
                    console.log(err);
                });
            } else {
                alert("Sorry, you cannot make a proposal just yet '" + typedAlias + "'.\n\nYou must have won an Achievement Card in the DAO, to make a proposal! \n\nYour proposal information:\n\nName: " + name + ".\nDescription: " + description + ".\nPotential Funds: " + potentialFunds + ".\n\nYour proposal has not been created.");

                e.target.aliasName.value = "";
                e.target.proposalName.value = "";
                e.target.descriptionDetails.value = "";
                e.target.potentialFunds.value = "";
            
                return;
            }
        })
    };

    const processVoteInfo = (e) => {
        e.preventDefault();

        const aliasName = e.target.aliasName.value;

        fetch("allAliases.txt")
        .then(res => res.text())
        .then((text) => {
            const aliases = text.split("\n");
            
            var found = false;
            for (var i = 1; i <= aliases.length; i++) {
                if(aliasName.trim() === aliases[i]) {
                    alert(aliasName + " was found in the file called: allAliases.txt. You can vote!");

                    found = true;
                    
                    // next up - send the vote data to the backend // 
                }
            }

            if(!found) {
                alert(aliasName + " was not found in the file called: allAliases.txt. Your alias must have been connected to the DAO before you can make a vote!");

                e.target.proposalIndex.value = "";
                e.target.aliasName.value = "";
                e.target.voteValue.value = "";

                return;     
            }
        })
    };
    
    return (
        <div>        
            <h1>Welcome to the Proposals & Candidates</h1>
            <p>Here you will be able to submit a proposal (if and only you have won an <strong>Achievement Card</strong> in the DAO). View submitted proposals and cast your vote for the current set proposal.</p>

            <hr/>
        
            <h3>Fill in the below form for your proposal:</h3>

            <form onSubmit={getDAOWinnerAliasName}> 
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

            <h2>Cast your vote</h2>

            <form onSubmit={processVoteInfo}>
                <label>What do you wish to vote ?</label>  <br/><br/>

                <input type="number" name="proposalIndex" placeholder="Proposal Index" required></input> 
                <br/><br/> 

                <input type="text" name="aliasName" placeholder="Alias name" required></input> 

                <br/><br/> 

                <input type="text" name="voteValue" placeholder="Your Vote" required></input> <br/><br/>

                <button type="submit">Vote</button>
            </form>
            
            {/*
            SOME THINGS TO THINK ABOUT
            1: can anyone make a proposal ?  -- no, the only people that can make a proposal is someone that has won an Achievement card in the DAO
            2: how do i check who has voted ?
            */}
        </div>
    )
}

export default ProvideProposalInfo;
