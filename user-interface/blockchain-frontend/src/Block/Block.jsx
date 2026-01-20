import { useEffect, useState } from "react";
import "./block.css";

function Block() {
  const [blocks, setBlocks] = useState([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    fetch("http://192.168.200.89:8080/genesis")
      .then(res => res.json())
      .then(data => setBlocks(data));
  }, []);

  return (
    <div className="block-container">
        <h1>Blocks</h1>

        <button className="toggle-btn" onClick={() => setShowData(prev => !prev)}>
            {showData ? "Hide Data" : "Show Data"}
        </button>

      {blocks.map((block, i) => (        
        <div key={i} className="block">

          <h4>Block {i+1} | Block Reward: {block.BlockReward?.BlockRewardTotal}</h4>
          <hr />
            {/* Only visible when button clicked */}
            {showData && (
                <>
                <p>Index: {block.Index}</p>
                <p>Timestamp: {block.Timestamp}</p>
                <p>PrevHash: {JSON.stringify(block.PrevHash)}</p>
                <h3>Transactions Info:</h3>
                <p>Sender: {block.Transactions?.Sender}</p>
                <p>Receiver: {block.Transactions?.Receiver}</p>
                <p>Amount: {block.Transactions?.Amount}</p>
                <p>ProofOfWork: {JSON.stringify(block.ProofOfWork)}</p>
                <p>BlockHash: {block.BlockHash}</p>
                {/* Ideally I would have the arrow outside of the div, but due to the design of react I cannot have this arrow outside of the div - if I did react would break and complain
                (this might change later on in the project...) */}
                {i < blocks.length - 1 && <div className="chain-arrow"></div>}
                </>
            )}
        </div>
      ))}
    </div>
  );
}

export default Block;
