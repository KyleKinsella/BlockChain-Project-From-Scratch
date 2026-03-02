import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function printWrongAnswers(wrongAnswers) {
	alert("You entered the following seed values incorrectly, try again:" +  "\n\n" + wrongAnswers + ".");
}

function ConfirmUserInput({ buttonText, message }) {
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
			
			setSeedValues(result);
		});
	}, []);
	
	const handleSubmit = (e) => {
        e.preventDefault();
        
        let userTypedValues = [e.target.one.value, e.target.two.value, e.target.three.value, e.target.four.value, e.target.five.value, e.target.six.value, e.target.seven.value, e.target.eight.value, e.target.nine.value, e.target.ten.value, e.target.eleven.value, e.target.twelve.value];

		let wrongAnswers = [];

		for(let i = 0; i < userTypedValues.length; i++) {
			if (userTypedValues[i] == "") {
				//alert("Seed '" + i + "' cannot be empty, try again.");
				alert("Some required fields are missing. Please fill them in and try again.");
				return;
			}
			
			if (userTypedValues[i] != seedValues[i]) {
				wrongAnswers.push(userTypedValues[i]);
			}
			
			if (i == 11 && userTypedValues[i] != seedValues[i]) {
				printWrongAnswers(wrongAnswers);
			}
			
			if (i == 11 && userTypedValues[i] == seedValues[i]) {
				if (wrongAnswers.length != 0) {
					printWrongAnswers(wrongAnswers);
				}
				
				if (wrongAnswers.length == 0) {
					alert(message);
					navigate("/done");
				}
			}
		}
    };
    
    return (
	<div>
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

			<button type="submit">{buttonText}</button>
          </form>
    </div>
    )
}

export default ConfirmUserInput
