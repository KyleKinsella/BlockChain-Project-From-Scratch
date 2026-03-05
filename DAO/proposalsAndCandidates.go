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

func InitProposal(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")

    prop := Proposal{
        Index: 1,
        Name: "Kyle",
        Description: "In my proposal I want to make a vote for the following - change the consensus algorithm from Proof of Work (PoW) to Proof of Stake (PoS). Why? To help the environment!",
        FundsToUseOutOfTreasury: 10,
        Expiry: nil,
        Status: "In Progress!",
    }
    
    json.NewEncoder(w).Encode(prop) 
}
