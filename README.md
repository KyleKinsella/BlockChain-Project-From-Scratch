# Blockchain from Scratch Project

![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Go](https://img.shields.io/badge/Go-00ADD8?style=flat&logo=go&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow)

## Project Summary
Blockchain From Scratch is a personal project simulating a blockchain system end-to-end. It demonstrates full-stack development skills, including backend logic in Go, frontend display with React, and integration between the two. The project explores core blockchain concepts like Proof of Work, Proof of Stake, and block linking, with future plans for DAO functionality and block rewards. This project showcases problem-solving, iterative development, and practical implementation of blockchain principles.

## Table of Contents
- [Did I Start This Project a While Ago](#Did-I-Start-This-Project-a-While-Ago)
- [Why I Returned](#Why-I-Returned)
- [Importance of This Project](#Importance-of-This-Project)
- [What is this Project](#What-is-this-Project)
- [Technology Stack](#Technology-Stack)
- [Current Features](#Current-Features)
- [Potential Features](#Potential-Features)
- [Project Images](#Project-Images)
- [Project Video](#Project-Video)
- [Roadmap](#Roadmap)
- [Contact](#Contact)

## Did I Start This Project a While Ago?
Yes. I began working on this project after completing my final college semester, using the time while waiting for results to explore blockchain development. Once my results were released, I paused the project. This was around June 2025.


## Why I Returned
I returned to this project primarily because I had free time after completing another project. I initially considered two new ideas:

- A Video Game
- A Job Application Tracker

After some analysis, I decided not to pursue the game for now. I then explored the Job Application Tracker idea and worked on it for about a week. Ultimately, I realized it wasn’t the right project for me at the moment, as I wasn't using it personally (Excel worked better for my workflow).

A few days later, I brainstormed new ideas such as:

- A Spotify clone
- A LinkedIn clone

Then I remembered this blockchain project, the one already in my portfolio. I realized it would be far more enjoyable and meaningful to revisit it. After some reflection, I decided to continue development. Since returning, I’ve been enjoying the process of writing code, debugging, solving problems and learning throughout the development cycle.

## Importance of This Project
The main objective of this project is to create a fully functional system while expanding my knowledge of blockchain concepts. It also serves as an opportunity to demonstrate to future employers that I can independently develop a full-stack application from the ground up.

While I don’t yet have professional software development experience, I do have extensive exposure to many areas of Computer Science, including: 
- DevOps
- Testing (Unit, Integration)
- Unified Modeling Language (UML)
- Concurrent Development
- Data Structures & Algorithms
- Operating Systems
- Object-Oriented Programming (OOP)
- Design Patterns
- Data Science & machine learning
- and more

Additionally, I have over three years of experience in retail at Movies@ Gorey, where I developed key soft skills such as teamwork, communication, problem-solving, handling difficult customer interactions, patience, active listening and maintaining professionalism in a work environment.

## What is this Project?
This project is a small-scale simulation of a blockchain system. The goal is to develop a full-stack application that demonstrates how a blockchain functions from end to end.

## Technology Stack
This project includes frontend, backend and (eventually) deployment components.

Frontend
- HTML
- CSS
- JavaScript
- React

Backend
- Go (the entire backend is currently written in Go)
- Python (possible future integration)

Version Control
Version control is essential and I am using:
- Git

Git allows me to maintain a detailed and reliable history of the project.

Deployment
Deployment has not yet been implemented. Once the project reaches a more complete state, I plan to deploy it publicly. Potential deployment tools include:
- Docker
- AWS (potentially)
- Vercel
- Additional deployment technologies (to be researched)

## Current Features
Current functionality includes:
- Block creation
- Proof of Work (PoW) algorithm (this is what each block needs to make a block on my blockchain at the moment)
- Proof of Stake (PoS) algorithm (I did this a while ago, I need to make my pos algorithm much better)
- Backend-to-frontend integration

## Potential Features
Upcoming and potential enhancements include:
- Block rewards
- Transaction fees
- A Decentralized Autonomous Organization (DAO) - I'm going to make my own DAO, but my DAO will take a good bit of inspiration from <a href="https://nouns.wtf/">nouns.wtf</a>.

Additional features to be determined as the project evolves.

## Project Images
This image shows how the project appeared on the day I returned to development. At this point, the frontend simply displayed each block’s data.

### Image 1
<img src="images/13thofnovember.jpg" width="600" height="400" alt="14thofnovemberimg1">

<br>

The next day, I updated the UI so that each block appears in its own container. Users can toggle block data visibility using a “Show Data” / “Hide Data” button. I sought help from ChatGPT for part of this implementation.

### Image 2
<img src="images/14thofnovemberimg1.jpg" width="600" height="400" alt="14thofnovemberimg1">

### Image 3
<img src="images/14thofnovemberimg2.jpg" width="600" height="400" alt="14thofnovemberimg2">

<br>

On November 16th, I redesigned each block’s container to display the block number and included a dividing line for clarity. I also added arrows to show how each block links to the next, except the last block, which naturally cannot point to a successor until a new block is mined.

### Image 4
<img src="images/16thofnovember.jpg" width="600" height="400" alt="16thofnovember">

### Image 5
<img src="images/17thofnovember.jpg" width="600" height="400" alt="17thofnovember">

**Note:**
In Image 5, you may notice the arrow is placed inside the block’s container. Ideally, I wanted the arrow positioned outside the block, pointing to the next one. Unfortunately, due to React's component structure, this isn’t directly feasible in the current design. This part of the project may be redesigned later.

## Project Video 
<a href="">Have a look at my project...</a>

## Roadmap

| Feature          | Status   | Notes |
|-----------------|---------|-------|
| Block Rewards     | Planned | Will simulate miner incentives |
| Transaction Fees  | Planned | Integrate fees per transaction |
| DAO               | Planned | Inspired by <a href="https://nouns.wtf/">nouns.wtf</a> |
| Improved PoS      | Planned | Enhance Proof of Stake algorithm |
| Deployment        | Planned | Docker, AWS, Vercel |

## Contact
If you have read this README or reviewed parts of the codebase (for example, Block/block.go, which currently contains the core logic), I would greatly appreciate any feedback. If you notice potential issues or areas for improvement, whether in the backend or frontend, your insights would be extremely valuable.

Additionally, if you believe I may be a good fit for your team or are interested in discussing potential opportunities, please feel free to reach out to me on LinkedIn. I am passionate about building meaningful software, whether for personal development or contributing to a company’s success.
