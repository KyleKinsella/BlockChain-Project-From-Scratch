import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

function GeneratedWords() {
    const [seed, setSeed] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8081/seed")
        .then(res => res.json())
        .then(data => setSeed(data));
    }, []);

    return (
        <div>
            <h1>Write down your Secret Recovery Phrase down</h1>
            <p>Below are your generated words for your Secret Recovery Phrase, write them down.</p>

            {seed.map((data, i) => (        
                <div key={i} className="seed">        
                    <>
                    <ul>
                        <p>{i+1}: {data}</p>
                    </ul>
                    </>
                </div>
            ))}

            <button onClick={() => navigate("/confirm")}>Confirm - Secret Recovery Phrase</button>
        </div>
    )
}

export default GeneratedWords
