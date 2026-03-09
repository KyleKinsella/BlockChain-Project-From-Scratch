package dao

import (
    "net/http"
    "encoding/json"
)

type Proposal struct {
    Index int
    Name string
    Description string
    FundsToUseOutOfTreasury int
    Expiry interface{}
    Status string
}

type ProposalInfo struct {
    Name string `json:"name"`
    Description string `json:"description"`
    PotentialFunds int `json:"potentialFunds"`
}

var proposals []Proposal

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
