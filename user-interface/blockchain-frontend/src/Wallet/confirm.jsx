import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function correct(seed) {
	alert("Seed '" + seed + "' is correct.");
}

function printWrongAnswers(wrongAnswers) {
	alert("You entered the following seed values incorrectly, try again:" +  "\n\n" + wrongAnswers + ".");
}

function ConfirmPhrase() {
    const navigate = useNavigate();
    const [seedValues, setSeedValues] = useState(null);
        
	useEffect(() => {
		fetch('./file.txt')
		.then(res => res.text())
		.then(text => {
			   
			let result = text
			.split('\n')
			.map(w => w.trim())
			.filter(Boolean);
			
			{/*I need to fix the indexs from 0-11 to be from 1-12*/}
			
			setSeedValues(result);
		});
	}, []);

    // I'm currently working on trying to validate to see if you have typed in the correct seed values 
    const handleSubmit = (e) => {
        e.preventDefault();
        
        let userTypedValues = [e.target.one.value, e.target.two.value, e.target.three.value, e.target.four.value, e.target.five.value, e.target.six.value, e.target.seven.value, e.target.eight.value, e.target.nine.value, e.target.ten.value, e.target.eleven.value, e.target.twelve.value];

		let wrongAnswers = [];

		for(let i = 0; i < userTypedValues.length; i++) {
			if (userTypedValues[i] == "") {
				alert("Seed '" + i + "' cannot be empty, try again.");
				return;
			}
			
			if (userTypedValues[i] != seedValues[i]) {
				alert("You entered '" + userTypedValues[i] + "' this is incorrect, try again.");
				wrongAnswers.push(userTypedValues[i]);
			}
			
			if (i != 11 && userTypedValues[i] == seedValues[i]) {
				correct(i);
			}
			
			if (i == 11 && userTypedValues[i] != seedValues[i]) {
				printWrongAnswers(wrongAnswers);
			}
			
			// the last iteration
			if (i == 11 && userTypedValues[i] == seedValues[i]) {
				correct(i);
				if (wrongAnswers.length != 0) {
					printWrongAnswers(wrongAnswers);
				}
				
				if (wrongAnswers.length == 0) {
					alert("Congratulations! You have completed the Wallet Creation Process.");
					navigate("/done");
				}
			}
		}

        //for(let i = 0; i < userTypedValues.length; i++) {
			//console.log(i, userTypedValues[i]);
        //}
        
        //for(let k = 0; k < seedValues.length; k++) {
			//console.log(k, seedValues[k])
		//}
		
		
		// I'm going to use the two below lines of commented out code for something later on:
		
		//let seed = {words}; // object
        //let stuff = Object.entries(seed); // array
    };
    
    return (
        <div>
            <h1>Confirm your Secret Recovery Phrase</h1>
            <p>Fill in the below form in the correct order that the words were shown to you.</p>

            {/* I will have backend code to check for the correct values in the form */}
            {/* if the form has all of the correct values - render: "complete.jsx" */}
            {/* otherwise, render: "error.jsx" */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="">1: </label>
                <input name="one" type="text" />  

                <br /><br />       
                
                <label htmlFor="">2: </label>
                <input name="two" type="text" />

                <br /><br />

                <label htmlFor="">3: </label>
                <input name="three" type="text" />

                <br /><br />

                <label htmlFor="">4: </label>
                <input name="four" type="text" />

                <br /><br />

                <label htmlFor="">5: </label>
                <input name= "five" type="text" />

                <br /><br />

                <label htmlFor="">6: </label>
                <input name="six" type="text" />

                <br /><br />

                <label htmlFor="">7: </label>
                <input name="seven" type="text" />

                <br /><br />

                <label htmlFor="">8: </label>
                <input name="eight" type="text" />

                <br /><br />

                <label htmlFor="">9: </label>
                <input name="nine" type="text" />

                <br /><br />

                <label htmlFor="">10: </label>
                <input name="ten" type="text" />

                <br /><br />

                <label htmlFor="">11: </label>
                <input name="eleven" type="text" />

                <br /><br />

                <label htmlFor="">12: </label>
                <input name="twelve" type="text" />

                <br /><br />

                <button type="submit">Submit</button>
            </form>
            
            <br />
            
            {/* <button onClick={() => navigate("/done")}>Finish wallet setup</button> */}
        </div>
    )
}

export default ConfirmPhrase
