package main

import (
    "BlockChainProjectFromScratch/DAO"
    "net/http"
    "fmt"
) 

func main() {
    http.HandleFunc("/dao", dao.CreateAchievementCards)

    http.HandleFunc("/makeAProposal", dao.InitProposal)
    http.HandleFunc("/getAllProposals", dao.GetAllProposals)

    http.HandleFunc("/createAVote", dao.CreateVote)
    http.HandleFunc("/getAllVotes", dao.GetAllVotes)

    http.HandleFunc("/counted", dao.CountedVotes)
        
    fmt.Println("My App is running on: http://localhost:8083")
    http.ListenAndServe("0.0.0.0:8083", nil)
}
