package dao

import (
	"net/http"
	"encoding/json"
	"BlockChainProjectFromScratch/Blocks"
)

func CreateAchievementCards(w http.ResponseWriter, values []string) string {		
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	
	var alreadyGot []string
	
	if values == nil {
		return ""
	}
	
	reward := Blocks.GetRandomString(values)	
	alreadyGot = append(alreadyGot, reward)
	
	// I need to have error checking, to see if the user already has a value, etc...
			
	json.NewEncoder(w).Encode(reward)

	return reward
}

//func BlockchainPerks(w http.ResponseWriter) {
	//json.NewEncoder(w).Encode("B")
//}

//func CallFuncs(w http.ResponseWriter) {
	//CreateAchievementCards(w)
	//BlockchainPerks(w)
//}


// this function might not be here in this package or codebase. I might just make a new section for this project and develop this feature in python!
//func CreateCommunity() {
//}
