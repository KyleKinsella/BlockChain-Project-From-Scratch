import { useNavigate } from "react-router-dom";

function Phrase() {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Secure your wallet</h1>
            <p>
            <strong>**</strong> Below explains the importance of your secret seed phrase. <strong><u>Read it!</u></strong> <strong>**</strong>
            </p>

            <p><strong><u>Note:</u></strong> <br /><br /> 
                It's vitally important that you remember your secret seed phrase. A seed phrase consists of 12 or more 
                randomized words. These words that are given to you, you must remember (if you don't remember these words that you are provided, you loose all your assets / funds <strong>forever!</strong>).

                <br /><br />

                So, at this stage get a piece of paper and a pen and write down your secret seed phrase set of words on this page. 
                
                <br /><br />

                <strong>What not to do (under any circumstances):</strong>
                <p>
                    Below is a list of what not do, for when it comes to keeping a log of your <strong>secret seed phrase</strong>:
                </p>

                <ul>
                    <li>Save this on your <strong><u>email</u></strong> or any other <strong><u>web services</u></strong> such as: (<u>Google Docs, Google Slides, etc</u>).</li>
                    <li>Locally on your <strong><u>computer</u></strong>, such as: (<u>word docs, text files, excel, etc</u>).</li>
                    <li>Save it on your phone.</li>
                    <li>Or, any other potential way to save your secret seed phrase digitally.</li>
                </ul>

                <strong>What to do (the correct way):</strong>
                <ul>
                    <li>Fortify your secret seed phrase <strong><u>offline!</u></strong></li>
                </ul>

                <p>
                    This is the best and most secure way to ensure your seed phrase is completly safe. Having your 
                    seed phrase on a physical piece of paper (that is kept in a very safe spot and somewhere you won't loose it!). 
                    
                    <br /><br />
                    This way is entirely better and way more secure than using any web service.
                </p>

                <button onClick={() => navigate("/ssp")}>Next Step</button>
                {/* View your secret seed phrase */}
            </p>
        </div>
    )
}

export default Phrase