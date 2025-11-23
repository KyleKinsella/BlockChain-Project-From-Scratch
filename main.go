package main

import (
	"BlockChainProjectFromScratch/Blocks"
	"fmt"
	"net/http"
)

func main() {
	var answer int

	var questions = []string{
		"1. Do you want to run the creation of the Genesis & n Blocks?",
		// there will be many more to come
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
		// Was POS - not doing anymore - might do it later on in the project!
	default: 
		fmt.Println("I only have numbers 1 and 2 for the moment! Try again...")
		return
	}
}