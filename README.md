# Blockchain from Scratch

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

## Table of Contents
- [Project Summary](#Project-Summary)
- [Technology Stack](#Technology-Stack)
- [Current Features](#Current-Features)
- [In Development](#In-Development)
- [Potential Features](#Potential-Features)
- [Project Videos](#Project-Videos)
- [Roadmap](#Roadmap)
- [Contact](#Contact)

## Project Summary
Blockchain From Scratch is a personal project simulating a blockchain system end-to-end. It demonstrates full-stack development skills, including backend logic in Go, frontend display with React and integration between the two.

The project explores core blockchain concepts, such as: Block Creation (Proof of Work: Consensus Algorithm) and block linking, Wallet Creation, Decentralized Autonomous Organization (DAO) which allows connected wallets to submit proposals via the Proposals & Candidates section.

This project showcases problem-solving, iterative development and practical implementation of blockchain principles.

## Technology Stack
This project includes frontend, backend and (eventually) deployment components. The frontend is built with: HTML, CSS, JavaScript and React. The backend is currently written completely in Go with a small portion implemented in Python. I am using Git to keep track of my project and if I need to revert back I can do so. The project is getting closer than ever to the Deployment stage, once I get to this point in the project I plan to use Docker and Kubernetes to get my project to real users.

## Current Features
Current functionality includes:
- Block Creation - Proof of Work (PoW) Consensus Algorithm.
- Backend-to-Frontend integration && Frontend-to-Backend integration.
- Block Rewards.
- Fluctuating Transaction fees - depending on the state of the blockchain the transaction fees might be low or high.
- Wallet Creation.
- Decentralized Autonomous Organization (DAO):
    - Place bids to possibly win reward.
    - Bid history log.
    - Bid before the time is up - highest bid amount wins.
    - Connecting your wallet and multiple other wallets.
    - Treasury management for all bids.
- Proposals & Candidates:
    - Only members who have won an Achievement Card in the DAO can create proposals.
    - Anyone can view all submitted proposals.
    - Connected wallets can cast votes for the proposals they wish to support.
    - Everyone can see which Aliases have voted for which proposals.
    - The total votes for each proposal are visible to all. For example, Proposal 1 might have 5 votes For, 1 Against and 2 Abstain. This information is available for every proposal. 

## In Development 
The below feature is in the works:
- Improve Styling – making the project look cleaner, more polished and visually appealing!
    
## Potential Features
Potential enhancements include:
- Peer-to-peer (P2P) network.
- Allow my blockchain to fork (for learning purposes).
- Block height limits and data management (like Bitcoin).
- Dashboard for analytics.
- Mini EVM Support – a compiler or interpreter for a small subset of Solidity (.sol), enabling basic smart contract functionality within the project.

## Project Videos
I have created an array of YouTube videos while I've been iteratively developing my project.

Watch any of the demos of the Blockchain From Scratch project in action:
[All of my Project Videos](https://www.youtube.com/watch?v=jVPlQYKiZJE&list=PL82FQWeDS43BBdAlQB1J00baP2iOqVzYz).

## Roadmap
| Feature          | Status   | Notes |
|-----------------|---------|-------|
| Block Creation            | Complete | Simulating Mining |
| Block Rewards     | Complete | Will simulate miner incentives |
| Fluctuating Transaction Fees | Complete | Integrate fees per transaction |
| Wallet Creation   | Complete | Inspired by MetaMask & Phantom |
| DAO               | Complete | Inspired by <a href="https://nouns.wtf/">nouns.wtf</a> |
| Proposals & Candidates | Complete | Also Inspired by <a href="https://nouns.wtf/vote">nouns.wtf</a> |
| Deployment        | Planned | Docker, Kubernetes |

## Contact
If you have read this README or reviewed parts of the codebase, I would greatly appreciate any feedback. If you notice potential issues or areas for improvement, whether in the backend or frontend, your insights would be extremely valuable.

Additionally, if you believe I may be a good fit for your team or are interested in discussing potential opportunities, please feel free to reach out to me on [Linkedin - Kyle Kinsella](https://www.linkedin.com/in/kyle-kinsella-52614b291/). I am passionate about building meaningful software, whether for personal development or contributing to a company’s success.
