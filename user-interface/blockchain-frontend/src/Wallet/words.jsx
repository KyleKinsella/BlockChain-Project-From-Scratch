import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";

function GeneratedWords() {
    const [seed, setSeed] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://192.168.200.89:8081/seed")
        .then(res => res.json())
        .then(data => setSeed(data));
    }, []);

    return (
        <div>
            <h1>Write Down Your Recovery Phrase</h1>
            <h3 id="step4">Step 4</h3>
            <p id="alert">Write these words down in order and store them safely offline.</p>

            <div className="button-container">
                <div className="words">
                    {seed.map((data, i) => (        
                        <div key={i} className="seed">        
                            <>
                            <input name="" type="text" placeholder={i+1 + ": " + data}/>
                            </>
                        </div>
                    ))}

                <br/>
                <button onClick={() => navigate("/confirm")}>Next Step (Confirm)</button>
                </div>
            </div>

            <div className="button-container">
                <button onClick={(e) => navigate("/ssp")}>Go Back to Step 3</button>
            </div>
        </div>
    )
}

export default GeneratedWords
