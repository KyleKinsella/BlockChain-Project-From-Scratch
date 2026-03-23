import { useEffect, useState } from "react";
import Treasury from './treasury.jsx';
import { useNavigate } from "react-router-dom";

function sumValuesForTreasury(values) {
    if (values === null) {
        return;
    }
    
    var sum = 0;
    for (let i = 0; i < values.length; i++) {
        sum += values[i]
    }
    return sum;
}

function ProvideProposalInfo() {
    const date = new Date();    
    const formtatDate = date.toLocaleDateString("en-US", {      
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const hourIs = date.getHours(); 

    const [allProposals, setAllProposals] = useState([]);
    const [showData, setShowData] = useState(false);

    const [allVotes, setAllVotes] = useState([]);
    const [showData2, setShowData2] = useState(false);

    const [countedVotes, setCountedVotes] = useState([]);
    const [countedVotesBtn, setCountedVotesBtn] = useState(false);
    
    const [bids, setBids] = useState(() => {
        const storedBids = localStorage.getItem("bids");
        return storedBids ? JSON.parse(storedBids) : [];
    });

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("bids", JSON.stringify(bids));
    }, [bids]);  

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

    useEffect(() => {
        fetch("http://192.168.200.89:8083/counted")
          .then(res => res.json())
          .then(data => {
            // is there any counted votes for a proposal ? //
            if (data === null) {
                return;
            }
            setCountedVotes(data)
            });
    }, [countedVotes]);

    useEffect(() => {
        const treasuryFunds = localStorage.getItem("bids");
        
        if(treasuryFunds) { 
            try {
                const tf = JSON.parse(treasuryFunds);       
                setBids(tf);
            } catch (err) {
                console.error("Invalid bids in storage");
                localStorage.removeItem("bids");
            }
        }
    }, [])

    const getDAOWinnerAliasName = (e) => {
        e.preventDefault();

        const typedAlias = e.target.aliasName.value.trim().toLowerCase();
        const proposalName = e.target.proposalName.value;
        const proposalDescription = e.target.descriptionDetails.value;
        const requestedFunds = Number(e.target.requestedFunds.value);

        if (requestedFunds === 0) {
            alert("Please enter an value greater than zero.");
            e.target.requestedFunds.value = "";
            return;
        }

        if (requestedFunds < 0) {
            alert("Please enter a positive number. Negative values are not allowed.");
            e.target.requestedFunds.value = "";
            return;
        }
        
        fetch("winner.txt")
        .then(res => res.text())
        .then((text) => {
            if (typedAlias === text) {
                
                const info = {
                    alias: typedAlias,
                    name: proposalName,
                    description: proposalDescription,
                    potentialFunds: requestedFunds
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
                    e.target.requestedFunds.value = "";
                })
                .catch(err => {
                    console.log(err);
                });
            } else {
                alert("Sorry, you cannot make a proposal just yet '" + typedAlias + "'.\n\nYou must have won an Achievement Card in the DAO, to make a proposal! \n\nYour proposal information:\n\nName: " + proposalName + "\nDescription: " + proposalDescription + "\nRequested Funds: " + requestedFunds + "\n\nYour proposal has not been created.");

                e.target.aliasName.value = "";
                e.target.proposalName.value = "";
                e.target.descriptionDetails.value = "";
                e.target.requestedFunds.value = "";
            
                return;
            }
        })
    };

    const processVoteInfo = (e) => {
        e.preventDefault();

        var aliasName = e.target.aliasName.value;

        {/* not a good idea to hard-code value */}
        if (aliasName === "I-WAS-HERE-FIRST") {
            aliasName = aliasName.trim();
        } else {
            aliasName = aliasName.trim().toLowerCase();
        }
        
        const proposalIndex = Number(e.target.proposalIndex.value);
        const voteValue = e.target.voteValue.value.trim();
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
            alert("Sorry, you cannot vote for a proposal that currently does not exist");
            
            e.target.proposalIndex.value = "";
            e.target.aliasName.value = "";
            e.target.voteValue.value = "";

            return;
        }

        {/* edge case - if you have made a proposal you cannot vote for your own proposal! */}
        for (var i = 0; i < allProposals.length; i++) {
            var aliasVoted = allProposals[i].Alias.trim();

            if (aliasName === aliasVoted) {
                alert("Sorry, '" + aliasName + "', you have created this proposal, therefore you cannot vote for your own proposal! Nice try!");
                
                e.target.proposalIndex.value = "";
                e.target.aliasName.value = "";
                e.target.voteValue.value = "";
            
                return;
            }
        }
        
        {/* edge case - you cannot vote if you have already voted */}
        {/* another edge case (child edge case) - if you have voted for one proposal thats good, but if you try to vote for the same exact proposal again, you cannot do this! But if any other proposals are created you can vote for them, but if you have already voted for another proposal you cannot vote again. */}
        for (var i = 0; i < allVotes.length; i++) {
            var votedAliases = allVotes[i].AliasName;
            var votedIdx = allVotes[i].Index;
            
            if (proposalIndex != votedIdx) {
                continue;
            } else {
                if (aliasName === votedAliases) {
                    alert("Sorry, '" + aliasName + "' you have already voted, you cannot vote again. Nice try!");

                    e.target.proposalIndex.value = "";
                    e.target.aliasName.value = "";
                    e.target.voteValue.value = "";
                    
                    return;
                }
            }
        }
        
        fetch("allAliases.txt")
        .then(res => res.text())
        .then((text) => {
            const aliases = text.split("\n");
            
            var found = false;
            for (var i = 0; i < aliases.length; i++) {

                if(aliasName === aliases[i]) {
                    
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

        isVotingOver(e);
    };

    function upperCase(alias) {
        return alias.charAt(0).toUpperCase() + alias.slice(1); 
    }

    function isVotingOver(e) {
        e.preventDefault();
        
        for (var i = 0; i < allProposals.length; i++) {
            var expiry = allProposals[i].Expiry;
                        
            if (hourIs != expiry) {
                continue;
            } else {
                doesProposalHaveValidProposedFunds();
                return;
            }
        }
    }

    function doesProposalHaveValidProposedFunds() {

        const treasuryFunds = Number(sumValuesForTreasury(bids));

        for (var i = 0; i < allProposals.length; i++) {
            
            const proposedFunds = Number(allProposals[i].FundsToUseOutOfTreasury);
            
            for (var j = 0; j < countedVotes.length; j++) {
                if (countedVotes[j].For > countedVotes[j].Against) {

                    {/* edge case - if your proposal exceeds the Treasury amount, stop... */}
                    if (proposedFunds <= treasuryFunds) {
                        alert("🎉 Hooray! The following Proposal has been approved:\n\n" + "Name: " + allProposals[i].Name + "\n" + "Description: " + allProposals[i].Description + "\n" + "Requested Funds: "  + allProposals[i].FundsToUseOutOfTreasury);
                        
                        setBids(prev => {   
                            let remaining = proposedFunds;

                            {/* here i decrement the Treasury by x funds */}
                            return prev.map(bid => {
                                if (remaining <= 0) return bid;

                                const deduction = Math.min(bid, remaining);
                                remaining -= deduction;

                                return bid - deduction;
                            });
                        });
                    } else {
                        alert("Oops! The following Proposal cannot be processed:\n\n" + "Name: " + allProposals[i].Name + "\n" + "Description: " + allProposals[i].Description + "\n" + "Requested Funds: "  + allProposals[i].FundsToUseOutOfTreasury + "\n\nYou proposed: " + proposedFunds + "\nTreasury only has: " + treasuryFunds + "\n\nPlease wait until the treasury has enough funds for this proposal to be processed.");
                        break;
                    }
                }
            }
        }
    }
    
    const total = sumValuesForTreasury(bids);
    
    return (
        <div>
            <div className="button-container">
                <div className="welcome">
                    <h1>Welcome to the Proposals & Candidates</h1>
                    <p>
                        This is your hub for shaping the DAO! If you’ve earned an <strong>Achievement Card</strong>, you can submit a proposal and share your ideas with the community. <br/><br/> You can also explore proposals submitted by others, cast your vote for the ones you support and see how the community is voting in real time. Get involved and help guide our next steps!
                    </p>
                </div>

                <div className="treasury">
                    <hr/>
                      <Treasury amount={total}/>
                    <hr/>
                </div>

                <br/>
            
                <div className="createAProposal">
                    <h3 id="title">Bring your proposal to life. Fill in the form below!</h3>

                    <form onSubmit={getDAOWinnerAliasName}> 
                        <label>Alias Name:</label> <br/><br/>
                        <input type="text" name="aliasName" placeholder="e.g., CryptoNinja" required></input> <br/><br/>  <br/><br/>
                                    
                        <label>Proposal Name:</label> <br/><br/>
                        <input type="text" name="proposalName" placeholder="e.g., Lower Gas Fee's" required></input> <br/><br/>

                        <label>Proposal Description:</label> <br/><br/>
                        <input type="text" name="descriptionDetails" placeholder="Describe your proposal..." required></input>     <br/><br/>

                        <label>Requested Funds:</label> <br/><br/>
                        <input type="number" name="requestedFunds" placeholder="e.g., 120" required></input>

                        <br/><br/>

                        <button type="submit">Submit Proposal</button>
                    </form>
                </div>

                <br/><br/><br/><br/>
                
                <div className="viewProposals">
                    <h2>View Proposals</h2>
                    <p>Click the button below to view all proposals.</p>
                    <button onClick={() => setShowData(prev => !prev)}>
                      {showData ? "Hide Proposal's" : "Show Proposal's"}
                    </button>

                    {showData && allProposals.map((proposal, i) => (
                      <div key={i} className="propCard">
                        <h4>Proposal {i + 1} was proposed by: {upperCase(proposal.Alias)}.</h4>
                                                                                    
                        <p>Name: {proposal.Name}</p>
                        <p>Description: {proposal.Description}</p>
                        <p>Requested Funds: {proposal.FundsToUseOutOfTreasury}</p>

                        <br/>
                      </div>
                    ))}
                </div>
                
                <br/><br/><br/><br/>

                <div className="castYourVote">
                    <h2>Cast your vote</h2>
                    <form onSubmit={processVoteInfo}>
                        <label>Which proposal would you like to vote on?</label> <br/><br/>

                        <input type="number" name="proposalIndex" placeholder="Enter proposal number" required></input> 
                        <br/><br/> 

                        <input type="text" name="aliasName" placeholder="Alias name" required></input> 

                        <br/><br/> 

                        <input type="text" name="voteValue" placeholder="Your Vote" required></input> <br/><br/>
                                        
                        <button type="submit">Submit Vote</button>
                    </form>
                </div>
                                
                <br/><br/><br/><br/>
                
                <div className="viewVotes">
                    <h2>View Votes</h2>
                    <p>Curious how the community voted? Click below to see all proposal votes!</p>
                    <button onClick={() => setShowData2(prev => !prev)}>
                      {showData2 ? "Hide Vote's" : "Show Vote's"}
                    </button>

                    {showData2 && allVotes.map((vote, i) => (
                      <div key={i} className="propCard">
                        <h4>Vote: {i + 1} - {upperCase(vote.AliasName)}.</h4>
                        <p>{upperCase(vote.AliasName)} voted for proposal: {vote.Index}. They voted: {" "}

                        <strong className={vote.VoteValue.trim().toLowerCase()}>{vote.VoteValue}</strong>.</p>
                        
                        <br/>
                      </div>
                    ))}
                </div>

                <br/><br/><br/><br/>

                <div className="votesForEachProposal">
                    <h2>Votes for each Proposal</h2>
                    <p>
                        Below, you can see the votes for every proposal. Each proposal tracks three types of votes: For, Against and Abstain. When someone votes, the corresponding count is increased by one.
                    </p>

                    <br/><br/>

                    <button onClick={() => setCountedVotesBtn(prev => !prev)}>
                      {countedVotesBtn ? "Hide Vote Standings" : "View Vote Standings"}
                    </button>

                    {countedVotesBtn && countedVotes.map((vp, i) => (
                      <div key={i} className="propCard">
                        <p>Proposal {vp.ProposalIndex} has recieved the following votes:</p>
                        <ul>
                            <li id="for"><strong>For: </strong>{vp.For}</li>
                            <li id="against"><strong>Against: </strong>{vp.Against}</li>
                            <li id="abstain"><strong>Abstain: </strong>{vp.Abstain}</li>
                        </ul>
                      </div>
                    ))}
                </div>
        
                <br/><br/>
                <button onClick={(e) => navigate("/proposals")}>Go Back</button>
            </div>
        </div>
    )
}

export default ProvideProposalInfo;
