# Blockchain from Scratch

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

## Did I Start This Project a While Ago?
<p>
  Yes. I began working on this project after completing my final college semester, using the time while waiting for results to explore blockchain development. Once my results were released, I paused the project. This was around June 2025.
</p>

## Why I Returned?
<p>
  I returned to this project primarily because I had free time after completing another project. I initially considered two new ideas:
</p>

<ol>
  <li>A Video Game</li>
  <li>A Job Application Tracker</li>
</ol>

<p>
  After some analysis, I decided not to pursue the game for now. I then explored the Job Application Tracker idea and worked on it for about a week. Ultimately, I realized it wasn’t the right project for me at the moment, as I wasn't using it personally (Excel worked better for my workflow).
</p>

<p>
  A few days later, I brainstormed new ideas such as:
</p>

<ol>
  <li>A Spotify clone</li>
  <li>A LinkedIn clone</li>
</ol>

<p>
  Then I remembered this blockchain project, the one already in my portfolio. I realized it would be far more enjoyable and meaningful to revisit it. After some reflection, I decided to continue development. Since returning, I’ve been enjoying the process of writing code, debugging, solving problems and learning throughout the development cycle.
</p>

## Importance of This Project
<p>
  The main objective of this project is to create a fully functional system while expanding my knowledge of blockchain concepts. It also serves as an opportunity to demonstrate to future employers that I can independently develop a full-stack application from the ground up.
</p>

<p>
  While I don’t yet have professional software development experience, I do have extensive exposure to many areas of Computer Science and Software Engineering, including: DevOps, Testing (Unit, Integration), UML, Concurrent Development, Data Structures & Algorithms, Operating Systems, Object-Oriented Programming (OOP), Software Engineering principles, Design Patterns, Data Science & machine learning and more.
</p>

<p>
  Additionally, I have over three years of experience in retail at Movies@ Gorey, where I developed key soft skills such as teamwork, communication, problem-solving, handling difficult customer interactions, patience, active listening and maintaining professionalism in a work environment.
</p>

## What is this Project?
<p>
  This project is a small-scale simulation of a blockchain system. The goal is to develop a full-stack application that demonstrates how a blockchain functions from end to end.
</p>

## Technology Stack
<p>
  This project includes frontend, backend and (eventually) deployment components.
</p>

<h3>Frontend</h3>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>React</li>
</ul>

<h3>Backend</h3>
<ul>
  <<li>Go (the entire backend is currently written in Go)</li>
  <li>Python (possible future integration)</li>
</ul>

<h3>Version Control</h3>
<p>Version control is essential and I am using:</p>

<ul>
  <li>Git</li>
</ul>

<p>Git allows me to maintain a detailed and reliable history of the project.</p>

<h3>Deployment</h3>
<p>
  Deployment has not yet been implemented. Once the project reaches a more complete state, I plan to deploy it publicly. Potential deployment tools include:
</p>

<ul>
  <li>Docker</li>
  <li>AWS (potentially)</li>
  <li>Vercel</li>
  <li>Additional deployment technologies (to be researched)</li>
</ul>

## Current Features
<p>Current functionality includes:</p>
<ul>
  <li>Block creation</li>
  <li>Proof of Work (PoW) algorithm (this is what each block needs to make a block on my blockchain at the moment)</li>
  <li>Proof of Stake (PoS) algorithm (I did this a while ago, I need to make my pos algorithm much better)</li>
  <li>Backend-to-frontend integration</li>
</ul>

## Potential Features
<p>Upcoming and potential enhancements include:</p>
<ul>
  <li>Block rewards</li>
  <li>Transaction fees</li>
  <li>A Decentralized Autonomous Organization (DAO) - I'm going to make my own DAO, but my DAO will take a good bit of inspiration from 
    <a href="https://nouns.wtf/">nouns.wtf</a>.</li>
</ul>

<p>Additional features to be determined as the project evolves.</p>

## Project Images
<h3>Image 1</h3>
<p>This image shows how the project appeared on the day I returned to development. At this point, the frontend simply displayed each block’s data.</p>
<img src="images/13thofnovember.jpg" width="600" height="400" alt="13thofnovember">

<h3>Image 2 & Image 3</h3>
<p>
  The next day, I updated the UI so that each block appears in its own container. Users can toggle block data visibility using a “Show Data” / “Hide Data” button. I sought help from ChatGPT for part of this implementation.
</p>

<p>Image 2:</p><img src="images/14thofnovemberimg1.jpg" width="600" height="400" alt="14thofnovemberimg1">
<p>Image 3:</p><img src="images/14thofnovemberimg2.jpg" width="600" height="400" alt="14thofnovemberimg2">

<h3>Image 4 & Image 5</h3>
<p>
  On November 16th, I redesigned each block’s container to display the block number and included a dividing line for clarity. I also added arrows to show how each block links to the next—except the last block, which naturally cannot point to a successor until a new block is mined.

<p>Image 4:</p><img src="images/16thofnovember.jpg" width="600" height="400" alt="16thofnovember">
<p>Image 5:</p><img src="images/17thofnovember.jpg" width="600" height="400" alt="17thofnovember">

<h3><strong>Note:</strong></h3>
<p>
  In Image 5, you may notice the arrow is placed inside the block’s container. Ideally, I wanted the arrow positioned outside the block, pointing to the next one. Unfortunately, due to React's component structure, this isn’t directly feasible in the current design. This part of the project may be redesigned later.
</p>

## Project Video 
<a href="">A YouTube link will be added here soon, showcasing the current state of the project once the video is recorded.</a>
