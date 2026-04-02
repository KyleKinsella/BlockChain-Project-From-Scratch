import { useEffect, useState } from "react";
//import "./block.css";
import { useNavigate } from "react-router-dom";
import "../main.css";

function Block() {
  const [blocks, setBlocks] = useState([]);
  const [showBlockData, setShowBlockData] = useState(false);
  const [loadingBlocks, setLoadingBlocks] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.200.89:8080/genesis")
      .then(res => res.json())
      .then(data => setBlocks(data));
  }, [blocks]);
  
    const makeNBlocks = (e) => {
        e.preventDefault(); 
        const blocksToMake = Number(e.target.nBlocks.value);

        if (blocksToMake >= 100) {
            alert("You're about to mine '" + blocksToMake + "' blocks. This may take a while...");
        }

        if (blocksToMake === 0) {
            alert("Oops! You can't create zero blocks. Try again with a positive number.");
            e.target.nBlocks.value = "";
            return;
        }

        if (blocksToMake < 0) {
            alert("Oops! You can't create negative blocks. Try a positive number instead.");
            e.target.nBlocks.value = "";
            return;
        }

        setLoadingBlocks(true);

        fetch("http://192.168.200.89:8080/mine", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blocksToMake)
        })
        .then(res => res.json())
        .then(blocks => {
            setBlocks(blocks)
            setLoadingBlocks(false);
            e.target.nBlocks.value = "";
        })
          .catch(err => {
            setLoadingBlocks(false);
          });
    };

    return (
        <div className="block-container">
            <h1 id="top">Blocks</h1>
            <p id="blockPage">
                Welcome to the Blocks page. Here you can view the current state of the blockchain, starting with the Genesis block - the first block that links to all subsequent blocks.
            </p>

            <div className="button-container">
                <button className="toggle-btn" onClick={() => setShowBlockData(prev => !prev)}>
                    {showBlockData ? "Hide Block Data" : "Show Block Data"}
                </button>
            </div>

            {blocks.map((block, i) => (       
                <div key={i} className="block" id="block">
                  <h4>Block {i+1} | Block Reward: {block.BlockReward?.BlockRewardTotal}</h4>
                  <hr id="line"/>
                    {/* Only visible when button clicked */}
                    {showBlockData && (
                        <>
                        <div className="blockData">
                            <p>Block Index: {block.Index}</p>
                            <p>Block was mined on {block.Timestamp}</p>
                            <p id="prevHash">Previous Block Hash: {JSON.stringify(block.PrevHash)}</p>
                            <h3>Transaction Info:</h3>

                            <p id="txInfo">
                                {JSON.stringify(block.Transactions?.Sender).replace(/\\n/g, '')} sent {block.Transactions?.Amount} tokens to {JSON.stringify(block.Transactions?.Receiver).replace(/\\n/g, '')}
                            </p>

                            <p id="blockHash">Block Hash: {block.BlockHash}</p>
                            {i < blocks.length - 1 && <div className="chain-arrow"></div>}
                    </div>
                    </>
                )}
            </div>
          ))}
      
          <br/><br/>
          <div className="button-container">
              <form onSubmit={makeNBlocks}>
                  <label id="question">How many blocks do you want to Mine ?</label>
                  
                  <br/><br/>

                  <input type="number" name="nBlocks" id="blocksToMake" placeholder="Mine Blocks" required/>

                  <br/><br/>

                  <button type="submit" disabled={loadingBlocks}>
                    {loadingBlocks ? "Mining Blocks..." : "Mine Blocks"}
                  </button>

                  <button onClick={(e) => navigate("/")}>Return Home</button>
              </form>
            </div>

          {loadingBlocks && <p id="msg">Mining blocks... please wait</p>}   
        </div>
    );
}

export default Block;
