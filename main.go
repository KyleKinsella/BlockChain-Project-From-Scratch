package main

import (
	"BlockChainProjectFromScratch/Blocks"
	"fmt"
	"net/http"
	"BlockChainProjectFromScratch/DAO"
	"BlockChainProjectFromScratch/Wallet"
)

func main() {
	var answer int

	var questions = []string{
		"1. Create the Genesis and many other Blocks?",
		"2. DAO",
		"3. Run my wallet code, so far...",
		"4. Get user password from frontend",
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
		http.HandleFunc("/dao", dao.DAO)

		fmt.Println("My App is running on: http://localhost:8080")
		http.ListenAndServe(":8080", nil)
	case 3:
		// http.HandleFunc("/wallet", wallet.InitWallet)

		// fmt.Println("My App is running on: http://localhost:8080")
		// http.ListenAndServe(":8080", nil)
	case 4:
		http.HandleFunc("/password", wallet.GetUserPassword)

		fmt.Println("My App is running on: http://localhost:8080")
		http.ListenAndServe(":8080", nil)
	default: 
		fmt.Println("I only have numbers 1 and 2 for the moment! Try again...")
		return
	}
}