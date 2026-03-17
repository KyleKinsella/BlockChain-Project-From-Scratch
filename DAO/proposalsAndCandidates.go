package dao

import (
    "net/http"
    "encoding/json"
    "fmt"
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
    VoteMap map[int]string
}

type VoteInfo struct {
    Index int `json:"index"`
    AliasName string `json:"alias"`
    VoteValue string `json:"vote"`
}

type CountedVotes struct {
    ProposalIndex int
    For int
    Against int
    Abstain int
}

var (
    proposals []Proposal
    votes []Vote
    counted []CountedVotes
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
        Expiry: "22",
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
        Index: v.Index,
        AliasName: v.AliasName,
        VoteValue: v.VoteValue,
        VoteMap: make(map[int]string),
    }

    vote.VoteMap[vote.Index] = vote.VoteValue

    votes = append(votes, vote)
         
    json.NewEncoder(w).Encode(votes)
}

func GetAllVotes(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    json.NewEncoder(w).Encode(votes)
}

func getVoteMap(votes []Vote) ([]map[int]string, error) {
    var voteMapping []map[int]string

    if len(votes) == 0 {
        return voteMapping, nil
    }

    for _, vote := range votes {
        mapping := vote.VoteMap
        voteMapping = append(voteMapping, mapping)
    }

    return voteMapping, nil
}

func processMaps(data []map[int]string, index int) (int, int, int) {
    var counterFor int
    var counterAgainst int
    var counterAbstain int

    for _, n := range data {
        for key, value := range n {
            if key != index {
                continue
            }
            
            if value == "for" || value == "For" {
                counterFor += 1
            }

            if value == "against" || value == "Against" {
                counterAgainst += 1
            }

            if value == "abstain" || value == "Abstain" {
                counterAbstain += 1
            }
        }
    }

    return counterFor, counterAgainst, counterAbstain
}

func VotesCounted(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")

    data, err := getVoteMap(votes)
    if err != nil {
        fmt.Errorf("Could not find any vote mappings, error: %v", err)
    }

    counted = []CountedVotes{}

    for _, n := range votes {
        idx := n.Index
        
        found := false

        for _, c := range counted {
            if c.ProposalIndex == idx {
                found = true
                break
            }
        }

        if found {
            continue
        }

        yes, no, dontCare := processMaps(data, idx)

        count := CountedVotes{
            ProposalIndex: idx,
            For: yes,
            Against: no,
            Abstain: dontCare,
        }

        counted = append(counted, count)
    }

    json.NewEncoder(w).Encode(counted)
}
