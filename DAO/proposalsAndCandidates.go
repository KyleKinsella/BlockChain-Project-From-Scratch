package dao

import (
    "net/http"
    "encoding/json"
)

type Proposal struct {
    Index int
    Alias string
    Name string
    Description string
    FundsToUseOutOfTreasury int
    Expiry interface{}
    Status string
}

type ProposalInfo struct {
    Alias string `json:"alias"`
    Name string `json:"name"`
    Description string `json:"description"`
    PotentialFunds int `json:"potentialFunds"`
}

type Vote struct {
    Index int
    AliasName string
    VoteValue string
}

type VoteInfo struct {
    Index int `json:"index"`
    AliasName string `json:"alias"`
    VoteValue string `json:"vote"`
}

var (
    proposals []Proposal
    votes []Vote
)

func InitProposal(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    
    var info ProposalInfo
    err := json.NewDecoder(r.Body).Decode(&info)
    if err != nil {
        return
    }
    
    proposal := Proposal{
        Index: len(proposals) + 1,
        Alias: info.Alias,
        Name: info.Name,
        Description: info.Description,
        FundsToUseOutOfTreasury: info.PotentialFunds,
        Expiry: nil,
        Status: "In Progress!",
    }

    proposals = append(proposals, proposal)
    json.NewEncoder(w).Encode(proposals)
}

func GetAllProposals(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    json.NewEncoder(w).Encode(proposals)
}

func CreateVote(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    
    var v VoteInfo
    err := json.NewDecoder(r.Body).Decode(&v)
    if err != nil {
        return
    }
    
    vote := Vote{
        Index: len(votes) + 1, // this could be a potential issue...
        AliasName: v.AliasName,
        VoteValue: v.VoteValue,
    }

    votes = append(votes, vote)
    json.NewEncoder(w).Encode(votes)
}

func GetAllVotes(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    json.NewEncoder(w).Encode(votes)
}
