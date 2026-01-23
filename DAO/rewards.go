package dao

import (
	"net/http"
	"encoding/json"
	"BlockChainProjectFromScratch/Blocks"
)

var (
	values = []string{"Genesis Miner", "DAO Founder", "Validator", "Immutable Block", "Decentralized > Centralized", "Gas Fee's for life"}
	reward string
)

func CreateAchievementCards(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	
	if reward == "" {
		reward = Blocks.GetRandomString(values)
	}
	
	// I need to be able to change the value of the reward, I'll do this later on. 
	
	json.NewEncoder(w).Encode(reward)
}
