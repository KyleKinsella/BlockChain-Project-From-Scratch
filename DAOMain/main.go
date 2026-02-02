package main

import (
	"BlockChainProjectFromScratch/DAO"
	"net/http"
	"fmt"
) 

func main() {
	http.HandleFunc("/dao", dao.CreateAchievementCards)
		
	fmt.Println("My App is running on: http://localhost:8083")
	http.ListenAndServe("0.0.0.0:8083", nil)
}
