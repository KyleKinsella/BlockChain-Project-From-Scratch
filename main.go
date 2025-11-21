package main

import (
	"net/http"
	"fmt"
	"BlockChainProjectFromScratch/Blocks"
	"BlockChainProjectFromScratch/pos"
)

func main() {
	var answer int

	var questions = []string{
		"1. Do you want to run the creation of the Genesis & n Blocks?",
		"2. Do you want to run the creation of a Proof of Stake (POS) Block?",
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
		proofOfStakeBlock := pos.CreateGenesisPosBlock()
		fmt.Println("This is the Syntax for a Proof of Stake (POS) Block!\n", proofOfStakeBlock)

		v := &pos.Validator{} 
		posBlock := pos.CreateGenesisPosBlock()

		nPosBlocks := pos.CreateNPosBlocks(5)
		nPosBlocks = append(nPosBlocks, *posBlock)

		for i, n := range nPosBlocks {
			isBlockValid := v.ValidatePOSBlock(&n)
			
			if isBlockValid {
				fmt.Println("Block:", i, "has been Validated!")
			} else {
				fmt.Println("Block:", i, "has not been Validated...")
			}
		}
	default: 
		fmt.Println("I only have numbers 1 and 2 for the moment! Try again...")
		return
	}
}