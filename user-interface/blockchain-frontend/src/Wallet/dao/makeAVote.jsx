import { useState } from "react";

function MakeAVote() {
    {/*
    const [voteYes, setVoteYes] = useState(0);
    const [voteNo, setVoteNo] = useState(0);
    const [voteAbstain, setVoteAbstain] = useState(0);
    
    const yes = () => {
        setVoteYes(voteYes + 1);
    };

    const no = () => {
        setVoteNo(voteNo + 1);
    };

    const dontCare = () => {
        setVoteAbstain(voteAbstain + 1);
    };
    */}

    const processVoteInfo = (e) => {


        fetch("allAliases.txt")
        .then(res => res.text())
        .then((text) => {
            console.log(text)
        })
    };

    const thisFuncWillProcesYourVote = (e) => {
        e.preventDefault();

        // how do i get the alias name! ? // 
        //const aliasName = e.target.aliasName.value;



        // the vote value can only be "for", "against" or "abstain", so if the "voteValue" is anything other than that alert and tell the user you must only enter in "for", "against" or "abstain", then return, otherwise, they typed in one of the correct values, so process that vote, etc... //
        const voteValue = e.target.voteValue.value;
        const nameOfProposal = e.target.nameOfProp.value;
        alert(voteValue + ", " + nameOfProposal);
        

        //alert(aliasName + "voted: " + voteValue);

        // keep a log / array of everyone who voted

        // then check each time someone inputs there alias name, have they voted already if yes, tell them they cannot vote again and return, otherwise, process the vote, by adding them to the logs / array, etc...

        //e.target.aliasName.value = "";
        e.target.nameOfProp.value = "";
        e.target.voteValue.value = "";
    };
    
    return (
        <div>
            <h2>Cast your vote</h2>

            <form onSubmit={processVoteInfo}>
                <label>What do you wish to vote ?</label>  <br/><br/>

                <input type="number" name="proposalIndex" placeholder="Proposal Index" required></input> 
                <br/><br/> 

                <input type="text" name="nameOfProp" placeholder="Alias name" required></input> 

                <br/><br/> 

                <input type="text" name="voteValue" placeholder="Your Vote" required></input> <br/><br/>

                <button type="submit">Vote</button>
            </form>
            

            {/*
            <p>
                You can either vote for:

                <ul>
                    <li>For (you agree).</li>
                    <li>Against (you disagree).</li>
                    <li>Abstain (you don't care).</li>
                </ul>
                
                <br/>
                <p>Make your Vote...</p>

                <button onClick={yes}>For</button>  <br/>
                Votes for Yes: {voteYes}.

                <br/><br/>
                
                <button onClick={no}>Against</button> <br/>
                Votes for No: {voteNo}.

                <br/><br/>

                <button onClick={dontCare}>Abstain</button> <br/>
                Votes for Abstain: {voteAbstain}.
            </p>
            */}
        </div>
    )
}

export default MakeAVote;
