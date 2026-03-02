package main

import (
	"BlockChainProjectFromScratch/Blocks"
	"net/http"
	"fmt"
) 

func main() {
	http.HandleFunc("/genesis", Blocks.CreateBlockZero)
	http.HandleFunc("/mine", Blocks.CreateBlocksForFrontend)

	fmt.Println("My App is running on: http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
