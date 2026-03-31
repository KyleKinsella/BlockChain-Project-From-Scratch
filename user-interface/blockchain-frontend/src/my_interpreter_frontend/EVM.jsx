//import { useState } from "react";

function EVM() {
    //const [code, setCode] = useState([]);

    const sendCodeToBackend = (e) => {
        e.preventDefault(); 
        const sourceCode = e.target.code.value;
        alert("Your code has been sent to the backend...");

        const info = {
            code: sourceCode
        };
        
        fetch("http://192.168.200.89:8084/lex", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        })
        .then(res => res.json())
        .then(sourceCode => {
            //setCode(sourceCode);
            e.target.code.value = "";
        })
          .catch(err => {
          });
};

    return (
        <div>
        {/* <h1>Welcome to my Interpreter (Programming Language)</h1> */}
         <form onSubmit={sendCodeToBackend}>
              <label id="">Enter your code that you wish to run...</label>
              
              <br/><br/>

              <input type="text" name="code" id="" placeholder="Source Code..." required/>
              <br/><br/>
              <button type="submit">Execute Code</button>

              <br/><br/><br/><br/>
              <h3>Output</h3>
              <p>Below is the output of your above program:</p>
              {/* this will be the output from my backend */}

              {/* {code} */}
          </form>
        </div>
    )
}

export default EVM
