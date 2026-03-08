import { useState } from "react";

function MakeAVote() {
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
    
    return (
        <div>
            <h1>Cast your vote</h1>
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
        </div>
    )
}

export default MakeAVote;
