import { useNavigate } from "react-router-dom";

function ConfirmPhrase() {
    const navigate = useNavigate();

    // I'm currently working on trying to validate to see if you have typed in the correct seed values 
    const handleSubmit = (e) => {
        e.preventDefault();

        let values = [e.target.one.value, e.target.two.value, e.target.three.value, e.target.four.value, e.target.five.value, e.target.six.value, e.target.seven.value, e.target.eight.value, e.target.nine.value, e.target.ten.value, e.target.eleven.value, e.target.twelve.value];

        for(let i = 0; i < values.length; i++) {
            console.log(i, values[i]);
        }
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