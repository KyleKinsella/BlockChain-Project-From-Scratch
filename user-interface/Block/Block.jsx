import { useEffect, useState } from "react";
import "./block.css";

function Block() {
  const [blocks, setBlocks] = useState([]);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/genesis")
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
            {/* Only visible when button clicked */}
            {showData && (
                <div className="block-details">
                    <p>Index: {block.Index}</p>
                    <p>Timestamp: {block.Timestamp}</p>
                    <p>PrevHash: {JSON.stringify(block.PrevHash)}</p>
                    <h3>Transactions Info:</h3>
                    <p>Sender: {block.Transactions?.Sender}</p>
                    <p>Receiver: {block.Transactions?.Receiver}</p>
                    <p>Amount: {block.Transactions?.Amount}</p>
                    <p>ProofOfWork: {JSON.stringify(block.ProofOfWork)}</p>
                    <p>BlockHash: {block.BlockHash}</p>
                    {/* {i < blocks.length - 1 && <div className="chain-arrow"></div>} */}
                </div>
            )}
        </div>
      ))}
    </div>
  );
}

export default Block;
