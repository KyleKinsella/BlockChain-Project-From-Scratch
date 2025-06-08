function Block() {
    return(
        <header>
            <h1>Block</h1>
            <p>Each block has the follwoing data:</p>
            <ul>
                <li>index</li>
                <li>timestamp</li>
                <li>prevHash</li>
                <li>transactions</li>
                <li>proofOfWork</li>
                <li>blockHash</li>
            </ul>
        </header>
    );
}

export default Block