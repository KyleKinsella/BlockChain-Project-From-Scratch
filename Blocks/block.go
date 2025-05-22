package main

import (
	"fmt"
	"time"
	"BlockChainProjectFromScratch/pow"
)

type Block struct {
	index int
	timestamp string
	prevHash string
	transactions []int
	proofOfWork bool
	blockHash string
}

func createBlock(block *Block) []Block {
	
	block.index = 1
	
	location, _ := time.LoadLocation("Europe/Dublin")
    currentTime := time.Now().In(location)
    timeAndDate := currentTime.Format("2006-01-02 15:04:05")        
	block.timestamp = timeAndDate

	block.prevHash = "00000000000000000000000000000"
	
	trans := []int{1,2,3,4,5,6}
	block.transactions = trans

	block.proofOfWork = pow.ProofOfWork("0000abc", "0000")

	block.blockHash = "999999999999999999999999999999999"

	blockData := []Block{}
	blockData = append(blockData, *block)
	return blockData
}

func main() {
	fmt.Println("this is a block:", createBlock(&Block{}))
}