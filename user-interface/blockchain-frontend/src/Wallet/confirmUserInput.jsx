import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function printWrongAnswers(wrongAnswers) {
    alert("You entered the following seed values incorrectly:\n\n" + wrongAnswers.join(", ") + ".\n\nPlease try again.");
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

        {/* validate / clean user-input */}
        for (var i = 0; i < userTypedValues.length; i++) {
            userTypedValues[i] = userTypedValues[i].trim().toLowerCase();
        }

        let wrongAnswers = [];

        for(let i = 0; i < userTypedValues.length; i++) {
            if (userTypedValues[i] == "") {
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
            <div className="button-container">
                <div className="inputSeed">
                    <input name="one" type="text" placeholder="Enter 1st seed value…" required/>  
                    <input name="two" type="text" placeholder="Enter 2nd seed value…" required/>
                    <input name="three" type="text" placeholder="Enter 3rd seed value…" required/>
                    <input name="four" type="text" placeholder="Enter 4th seed value…" required/>
                    <input name="five" type="text" placeholder="Enter 5th seed value…" required/>
                    <input name="six" type="text" placeholder="Enter 6th seed value…" required/>
                    <input name="seven" type="text" placeholder="Enter 7th seed value…" required/>
                    <input name="eight" type="text" placeholder="Enter 8th seed value…" required/>
                    <input name="nine" type="text" placeholder="Enter 9th seed value…" required/>
                    <input name="ten" type="text" placeholder="Enter 10th seed value…" required/>
                    <input name="eleven" type="text" placeholder="Enter 11th seed value…" required/>
                    <input name="twelve" type="text" placeholder="Enter 12th seed value…" required/>

                    <button type="submit">{buttonText}</button>
                </div>
            </div>
          </form>
    </div>
    )
}

export default ConfirmUserInput
