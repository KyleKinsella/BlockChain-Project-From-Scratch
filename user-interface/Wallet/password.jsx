import { useRef } from 'react';
import { useNavigate } from "react-router-dom";

function Password() {
    const inputRef = useRef();

    const handleSubmit = (event) => {
        alert("This is your password for your wallet: " + inputRef.current.value);
        event.preventDefault();
    };

    const navigate = useNavigate();

    return (
        <div>
            <h1>Wallet Setup</h1>
            <p>
                This password is required in order to get access to your wallet. <br /> <br />
                <strong>Note:</strong> No data is stored, but there is a file on your computer with this password - hashed!
            </p>

        <form onSubmit={handleSubmit}>
            Password:
            <input type="text" ref={inputRef} placeholder="Enter a password" style={{ marginLeft: '5px' }} required/>
            
            <br /><br />

            <button type="submit">Create Password</button>
        </form>

        <br /><br />

        <button onClick={() => navigate("/phrase")}>Next Step</button>
    </div>
    )
}

export default Password