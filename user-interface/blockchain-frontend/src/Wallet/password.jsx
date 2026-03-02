import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import DownloadLink from 'react-download-link';
import sha256 from 'crypto-js/sha256';

function Password() {
    const inputRef = useRef();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Create a Password</h1>
            <h3>Step 2</h3>
            <p>Create a password to unlock your wallet.</p>

            <form>
                Password:
                <input type="text" ref={inputRef} placeholder="Enter a password" style={{ marginLeft: '5px' }} required/>
                
                <br /><br />

                {/* I'm not too sure if I want to do this. I think a button would be better but im not too sure as of right now... */}
                <DownloadLink label="Download file" filename="data.txt" exportFile={() => sha256(inputRef.current.value)} />
            </form>

            <p>Choose a strong password to continue setting up your wallet.</p>

            <button onClick={() => navigate("/phrase")}>Next Step</button>
        </div>
    )
}

export default Password
