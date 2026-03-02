function ProjectMotivation() {
    return (
    <div>
        <h1>Why I Chose to Build a Blockchain Project</h1>
        <p>
            During my final year of college, I took a module on <strong>Blockchain Technology</strong>. I was fascinated by how blockchain works and decided to build a project to deepen my understanding.
        </p>

        <h4>Key Concepts I Learned</h4>
        <ul>
            <li>Blocks & Transactions</li>
            <li>Tokens (Fungible & Non-Fungible)</li>
            <li>Decentralized Governance & DAOs (Decentralized Autonomous Organizations) - for example, <a href="https://nouns.wtf/">Nouns DAO</a></li>
            <li>Addresses, Keypairs (Private & Public)</li>
            <li>Consensus Algorithms:
                <ul>
                    <li><strong>Proof of Work (PoW)</strong> - as used in Bitcoin, miners solve computational puzzles to validate blocks.</li>
                    <li><strong>Proof of Stake (PoS)</strong> - as used in Ethereum, validators stake ETH to propose and validate blocks.</li>
                </ul>
            </li>
            <li>Ethereum Virtual Machine (EVM) & Smart Contracts</li>
            <li>Solidity programming language</li>
            <li>Peer-to-peer networks, cryptography & decentralized finance (DeFi)</li>
        </ul>

        <p>
            I was particularly inspired by the <strong>decentralized nature of blockchain</strong>. Unlike centralized systems where control is held by a single entity, blockchain ensures that users maintain control over their assets. This principle motivated me to create a hands-on simulation of blockchain features.
        </p>

        <h4>Project Features</h4>
        <p>My project implements core blockchain concepts and adds practical functionality:</p>
        <ul>
            <li>Block creation and validation</li>
            <li>Wallet creation and management</li>
            <li>DAO simulation with:
                <ul>
                    <li>Bidding to win rewards</li>
                    <li>Bid history tracking</li>
                    <li>Reward viewing</li>
                    <li>Time-limited bidding</li>
                    <li>Connecting multiple wallets</li>
                    <li>Treasury management for all bids</li>
                </ul>
            </li>
        </ul>

        <h4>Upcoming Features</h4>
        <ul>
            <li>Proposal and candidate system for treasury usage</li>
            <li>Dashboard for tracking project data and analytics</li>
            <li>Further exploration of blockchain concepts for expansion</li>
        </ul>

        <h4>Potential Features</h4>
        <ul>
            <li>Peer-to-peer (P2P) network implementation</li>
            <li>Blockchain forking (for learning purposes)</li>
            <li>Block height limits and data management (like Bitcoin)</li>
        </ul>

        <h4>Continuous Learning</h4>
        <p>
            I am deeply passionate about blockchain technology. I have studied advanced materials such as the <em>Mastering Ethereum</em> book and I plan to continue integrating more sophisticated blockchain features into my project.
        </p>
    </div>
    )
}

export default ProjectMotivation;


{/*
<h3>Why did I chose to make a Blockchain project ?</h3>
<p>
    The main and core reason to why I chose to develop this project was because in my final year of college I took a module called:
    <strong>Blockchain Technology</strong>. Each time I went to this class I was very intrested how it all worked. I learned about the following in that class:
</p>

<ul>
    <li>Blocks</li>
    <li>Transactions</li>
    <li>Tokens (fungible & non-fungible)</li>
    <li>Governance</li>
    <li>Addresses, Keypairs (Private & Public)</li>
    <li>The Decentralized Autonomous Organization (DAO) - when Etheruem got hackered and had to fork. During one of our lectures we were shown <a href="https://nouns.wtf/">Nouns DAO</a>. The our lecturer explained what the idea is and this really sparked with me! (I don't know why but this really really sparked with me!)</li>
    <p>Consensus Algorithms:</p>
        
        <li>Proof of Work (POW) - Has this block miner found a nonce such that the blockhash contains 5 zeros at the start of the hash, if so you have done enough compute/work, so you can make this block. Otherwise you didn't find the nonce with the 5 zeros. <br /><br/> This is the consensus algorithm that Bitcoin uses.</li>   <br/>

        
        <li>Proof of Stake (POS) - You must have 32 ETH to try and make a block, then these funds are staked/locked up. Then there are <strong>validators</strong> and these validators validate these blocks from other wallets that have x ETH. <br/> <br /> I did study proof of stake but I have not did too much work on it in this project. <br/> <br /> This is the consensus algorithm that Etheruem uses. Note: (Ethereum used to use POW but they changed over to POS).
        </li>

        <li>Ethereum virtual machine (EVM) - this executes smart contracts that are on the blockchain. The EVM is very slow, is was told this during my studies...</li>

        <li>Smart Contracts</li>
        <li>Solidity - the programming language that runs on the EVM and on all of the smart contracts.</li>

        <br/><br/>

        So, after I was exposed to all of the above topics I was extremely intrested in doing further research. And also the fact that the blockchain is completly <strong>decentralized (no one is is control of anything)</strong> vs <strong> centralization (someone is in control)</strong> for example, if you loose some money from your <strong>bank</strong> they have all of the control of what goes through the bank and out, so it's very likely that they will be able to get your money back for you. But in a decentralized way if your BTN (Bitcoin), ETH (Ethereum) or any other token (Cordano, Solana, etc) gets lost its gone forever! But there are measures to ensure that you keep your funds safe!

        <li>peer-to-peer networks</li>
        <li>cryptography</li>
        <li>decentralized finance (defi)</li>

        <br/><br/>

        And for some odd reason the decentralization aspect of the blockchain really clicked with me (lol!).  
</ul>

<p>
    So, that summer when I was done my final semester of my final year of college, I decided that I was going to build my very own blockchain project! So what does my project contain?

    <p>From what I learned in my blockchain technology module I took the core features of the blockchain and said - "I'm going to implement some of these features into my project!". I also said - "I am going to write my own code to try and simulate how the blockchain actually works."</p>
    <ul>
        <li>Block(s) Creation</li>
        <li>Wallet Creation</li>
        <p>Decentralized Autonomous Organization (DAO):</p>
            <li>bidding to win a reward</li>
            <li>bid history</li>
            <li>view the reward to win</li>
            <li>time left to bid - before someone wins the reward</li>
            <li>Connecting your wallet & n other wallets</li>
            <li>treasury - this contains all of the bids from every wallet that is connected to the DAO.</li>
            <li>current bid - the current bid starts at <strong>1</strong> and when someone bids the current bid updates</li>
    </ul>

    <h3>upcoming features</h3>
    <ul>
        <li>proposals & candidates for how to use the funds in the treasury</li>
        <li>dashboard - to view all the data/traffic for my application/project</li>
         <li>the project could end here but because I am so intrested in the technology behind the blockchain, the project might get even bigger.</li>
    </ul>

    <h3>potential features</h3>
    <ul>
        <li>peer-to-peer (p2p) network</li>
        <li>allow my blockchain to fork (I know a blockchain should not fork, but this is for leanring purposes)</li>
        <li>block height - this is something that <strong>Bitcoin</strong> has. for example, a block can only contain 1MB of data.</li>
    </ul>

    <h3>also!</h3>
    I am so intrested in the blockchain technology space that I got - Mastering Ethereum book and some of the things in this book could or might possibly get added/implemened into my blockchain project!
</p>
*/}
