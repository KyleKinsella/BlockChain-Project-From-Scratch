import { useEffect, useState } from "react";

function Block() {
    const [blocks, setBlocks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/genesis")
        .then(res => res.json())
        .then(data => setBlocks(data));
    }, []);

    return (
        <div>
        {/* <h1>Here is the Blockchain at the moment...</h1> */}
        {blocks.map((block, i) => (
            <div key={i} className="block">
            <p>Index: {block.Index}</p>
            <p>Timestamp: {block.Timestamp}</p>
            <p>PrevHash: {block.PrevHash}</p>
            {/* <p>Transactions: {block.Transactions}</p> */}
            {/* <br /> */}
            <div>
                <h3>Transactions Info:</h3>
                <p>Sender: {block.Transactions?.Sender}</p>
                <p>Receiver: {block.Transactions?.Receiver}</p>
                <p>Amount: {block.Transactions?.Amount}</p>
                {/* <br /> */}
            </div>
            <p>ProofOfWork: {block.ProofOfWork}</p>
            <p>BlockHash: {block.BlockHash}</p>
            <br />
            </div>
        ))}
        </div>
    );
}

export default Block;
