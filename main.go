package main

import (
	"BlockChainProjectFromScratch/Blocks"
	"fmt"
	"net/http"
	"BlockChainProjectFromScratch/Wallet"
	"BlockChainProjectFromScratch/DAO"
)

func main() {
	var answer int

	var questions = []string{
		"1. Create the Genesis and many other Blocks",
		"2. Run my Wallet API",
		"3. Run my DAO API",
	}

	for _, n := range questions {
		fmt.Println(n + "\n")
	}

	fmt.Scan(&answer)

	switch answer {
	case 1:
		http.HandleFunc("/genesis", Blocks.CreateBlockZero)
		http.HandleFunc("/mine", Blocks.CreateBlocksForFrontend)

		fmt.Println("My App is running on: http://localhost:8080")
		http.ListenAndServe(":8080", nil)
	case 2:
		http.HandleFunc("/initWallet", wallet.SetupWallet)
		
		fmt.Println("My App is running on: http://localhost:8082")
		http.ListenAndServe("0.0.0.0:8082", nil)
	case 3:
		http.HandleFunc("/dao", dao.CreateAchievementCards)
		
		fmt.Println("My App is running on: http://localhost:8083")
		http.ListenAndServe("0.0.0.0:8083", nil)
	default: 
		fmt.Println("I only have numbers 1, 2 & 3 for the moment! Try again.")
		return
	}
}
