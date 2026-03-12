{/*
    edge cases:
    - edge case - if you have voted already you cannot vote again
      BUT, there is another edge case for this edge case, if an alias has voted for one proposal thats fine, but if they try to vote again for that same proposal they cannot do this. But if the same alias name tries to vote for a diffrent proposal, they should be able to do that.

    - the alias that made a proposal cannot vote for their own proposal

     - if an alias has created a proposal and the same alias tries to make a new proposal with the same alias name, they should not be able to make this proposal
*/}

import { useEffect, useState } from "react";

function ProvideProposalInfo() {
    const [allProposals, setAllProposals] = useState([]);
    const [showData, setShowData] = useState(false);

    const [allVotes, setAllVotes] = useState([]);
    const [showData2, setShowData2] = useState(false);
    
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

    useEffect(() => {
        fetch("http://192.168.200.89:8083/getAllVotes")
          .then(res => res.json())
          .then(data => {
            // is there any votes ? //
            if (data === null) {
                return;
            }
            setAllVotes(data)
            });
    }, []);

    const getDAOWinnerAliasName = (e) => {
        e.preventDefault();

        const typedAlias = e.target.aliasName.value;
        const proposalName = e.target.proposalName.value;
        const proposalDescription = e.target.descriptionDetails.value;

        {/*
            TODO: an edge case that ill do soon:

                say the treasury contains 120 funds, but a proposal wants to take/use 121 funds, this cannot happen because the treasury only contains 120 funds. So:

                const treasuryFunds = TODO - ?
                if (potentialFunds > treasuryFunds) {
                    alert("you cannot make this proposal due to the potential funds to use, is higher than the current funds in the treasury")
                    return
                }
        */}
        const potentialFunds = Number(e.target.potentialFunds.value);

        if (potentialFunds === 0) {
            alert("Please enter an value greater than zero.");
            e.target.potentialFunds.value = "";
            return;
        }

        if (potentialFunds < 0) {
            alert("Please enter a positive number. Negative values are not allowed.");
            e.target.potentialFunds.value = "";
            return;
        }       

        fetch("winner.txt")
        .then(res => res.text())
        .then((text) => {
            if (typedAlias.trim() === text) {
                
                const info = {
                    alias: typedAlias,
                    name: proposalName,
                    description: proposalDescription,
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
                alert("Sorry, you cannot make a proposal just yet '" + typedAlias + "'.\n\nYou must have won an Achievement Card in the DAO, to make a proposal! \n\nYour proposal information:\n\nName: " + proposalName + ".\nDescription: " + proposalDescription + ".\nPotential Funds: " + potentialFunds + ".\n\nYour proposal has not been created.");

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
        const proposalIndex = Number(e.target.proposalIndex.value);
        const voteValue = e.target.voteValue.value;
        const voting = ["for", "For", "against", "Against", "abstain", "Abstain"];
        
        if (proposalIndex === 0) {
            alert("Please enter an value greater than zero.");
            e.target.proposalIndex.value = "";
            return;
        }

        if (proposalIndex < 0) {
            alert("Please enter a positive number. Negative values are not allowed.");
            e.target.proposalIndex.value = "";
            return;
        }
                
        if (!voting.includes(voteValue)) {
            alert("Sorry, you cannot vote '" + voteValue + "'. It must be one of these values: \n\n" + voting + ".");        
            e.target.voteValue.value = "";
            return;
        }

        {/* edge case: trying to vote for something that does not exist ! */}
        const proposalLen = allProposals.length;
        if (proposalIndex > proposalLen) {
            alert("Sorry, you cannot vote for a proposal that currently do not exist");
            
            e.target.proposalIndex.value = "";
            e.target.aliasName.value = "";
            e.target.voteValue.value = "";

            return;
        }
        
        fetch("allAliases.txt")
        .then(res => res.text())
        .then((text) => {
            const aliases = text.split("\n");
            
            var found = false;
            for (var i = 1; i <= aliases.length; i++) {

                if(aliasName.trim() === aliases[i]) {

                    {/* edge case - trying to vote if there is no proposals */}
                    if (allProposals.length === 0) {
                        alert("Sorry you cannot make a vote. There are currently no proposal to vote for. Once a proposal is created then you can vote.");

                        e.target.proposalIndex.value = "";
                        e.target.aliasName.value = "";
                        e.target.voteValue.value = "";
                        
                        return;
                    }
                    
                    found = true;
                    
                    const voteInfo = {
                        index: proposalIndex,
                        alias: aliasName,
                        vote: voteValue
                    };
        
                    fetch("http://192.168.200.89:8083/createAVote", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(voteInfo)
                    })
                    .then(res => res.json())
                    .then(data => {
                        setAllVotes(data);
                        alert("Your vote has been submitted!");

                        e.target.proposalIndex.value = "";
                        e.target.aliasName.value = "";
                        e.target.voteValue.value = "";
                    })
                    .catch(err => {
                        console.log(err);
                    });
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
                <h4>Proposal {i + 1} was proposed by: {proposal.Alias}.</h4>

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

            <hr/>
            <br/><br/>

            <h2>View Votes</h2>
            <p>You can click the button below to view all of the votes for each proposal.</p>
            <button onClick={() => setShowData2(prev => !prev)}>
              {showData2 ? "Hide Vote's" : "Show Vote's"}
            </button>

            {showData2 && allVotes.map((vote, i) => (
              <div key={i}>
                <h4>Vote: {i + 1} - {vote.AliasName}</h4>
                <p>{vote.AliasName} voted for proposal: {vote.Index}. They voted: <strong>{vote.VoteValue}</strong>.</p>
                
                <br/>
              </div>
            ))}
            
            {/*
            SOME THINGS TO THINK ABOUT
            1: can anyone make a proposal ?  -- no, the only people that can make a proposal is someone that has won an Achievement card in the DAO
            2: how do i check who has voted ?  -- work in progress!!!!
            */}
        </div>
    )
}

export default ProvideProposalInfo;
