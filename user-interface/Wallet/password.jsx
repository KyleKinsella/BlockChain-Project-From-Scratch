import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import DownloadLink from 'react-download-link';
import sha256 from 'crypto-js/sha256';

function Password() {
    const inputRef = useRef();
    const navigate = useNavigate();

    return (
        <div>
            <h1>Create password</h1>
            <p>
                This password is required in order to get access to your wallet. <br /> <br />
                <strong>Note:</strong> No data is stored, but there is a file on your computer with this password - hashed!
            </p>

            <form>
                Password:
                <input type="text" ref={inputRef} placeholder="Enter a password" style={{ marginLeft: '5px' }} required/>
                
                <br /><br />

                {/* I'm not too sure if I want to do this. I think a button would be better but im not too sure as of right now... */}
                <DownloadLink label="Download file" filename="data.txt" exportFile={() => sha256(inputRef.current.value)} />
            </form>

            <br />

            <p>
                Once you have came up with a strong password, click the button below to continue your wallet setup.
            </p>

            <button onClick={() => navigate("/phrase")}>Next Step</button>
        </div>
    )
}

export default Password