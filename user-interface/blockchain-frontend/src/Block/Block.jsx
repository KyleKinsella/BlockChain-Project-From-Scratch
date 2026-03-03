import { useEffect, useState } from "react";
import "./block.css";
import { useNavigate } from "react-router-dom";

function Block() {
  const [blocks, setBlocks] = useState([]);
  const [showData, setShowData] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://192.168.200.89:8080/genesis")
      .then(res => res.json())
      .then(data => setBlocks(data));
  }, []);
  
    const makeNBlocks = (e) => {
        e.preventDefault(); 
        const blocksToMake = Number(e.target.nBlocks.value);

        if (blocksToMake === 0) {
            alert("Please enter an value greater than zero.");
            e.target.nBlocks.value = "";
            return;
        }

        if (blocksToMake < 0) {
            alert("Please enter a positive number. Negative values are not allowed.");
            e.target.nBlocks.value = "";
            return;
        }

        setLoading(true);

        fetch("http://192.168.200.89:8080/mine", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blocksToMake)
        })
        .then(res => res.json())
        .then(data => {
            setBlocks(data)
            setLoading(false);
        })
          .catch(err => {
            setLoading(false);
          });
    };

    return (
        <div className="block-container">
            <h1>Blocks</h1>
            <p id="blockPage">
                Welcome to the Blocks page. Here you can view the current state of the blockchain, starting with the Genesis block - the first block that links to all subsequent blocks.
            </p>

            <button className="toggle-btn" onClick={() => setShowData(prev => !prev)}>
                {showData ? "Hide Data" : "Show Data"}
            </button>

          {blocks.map((block, i) => (        
            <div key={i} className="block" id="block">

              <h4>Block {i+1} | Block Reward: {block.BlockReward?.BlockRewardTotal}</h4>
              <hr />
                {/* Only visible when button clicked */}
                {showData && (
                    <>
                    <p>Index: {block.Index}</p>
                    <p>Timestamp: {block.Timestamp}</p>
                    <p id="prevHash">PrevHash: {JSON.stringify(block.PrevHash)}</p>
                    <h3>Transactions Info:</h3>
                    <p id="sender">Sender: {block.Transactions?.Sender}</p>
                    <p id="reciever">Receiver: {block.Transactions?.Receiver}</p>
                    <p>Amount: {block.Transactions?.Amount}</p>
                    <p>ProofOfWork: {JSON.stringify(block.ProofOfWork)}</p>
                    <p id="blockHash">BlockHash: {block.BlockHash}</p>
                    {/* Ideally I would have the arrow outside of the div, but due to the design of react I cannot have this arrow outside of the div - if I did react would break and complain
                    (this might change later on in the project...) */}
                    {i < blocks.length - 1 && <div className="chain-arrow"></div>}
                    </>
                )}
            </div>
          ))}
      
          <br/><br/>

          <form onSubmit={makeNBlocks}>
              <label>How many blocks do you want to make ?</label>
              <br/><br/>
              <input type="number" name="nBlocks" placeholder="Blocks to Make" required/>
              <br/><br/>
              <button type="submit" disabled={loading}>
                {loading ? "Mining Blocks..." : "Make Blocks"}
              </button>
          </form>

          {loading && <p>⛏️ Mining blocks... please wait</p>}

          <button onClick={(e) => navigate("/")}>Go Back</button>
        </div>
    );
}

export default Block;
