package main

import (
	"BlockChainProjectFromScratch/pow"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"time"
)

type Block struct {
	index int
	timestamp string 
	prevHash string
	transactions []int
	proofOfWork bool 
	blockHash string 
}

func hashBlock(block Block) string {
	data := fmt.Sprintf("%d%s%v%s%d", block.index, block.timestamp, block.transactions, block.prevHash, block.proofOfWork)
	hash := sha256.Sum256([]byte(data))
	return hex.EncodeToString(hash[:])
}

func timestamp() string {
	location, _ := time.LoadLocation("Europe/Dublin")
	currentTime := time.Now().In(location)
	timeAndDate := currentTime.Format("2006-01-02 15:04:05")   
	return timeAndDate
}

func addBlockToChain(chain []Block) []Block {
	lastBlock := chain[len(chain)-1]

	newBlock := Block{}

	newBlock.index = lastBlock.index + 1
	time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
	newBlock.timestamp = timestamp()
	newBlock.prevHash = lastBlock.prevHash
	newBlock.transactions = lastBlock.transactions
	newBlock.proofOfWork = pow.ProofOfWork("0000abc", "0000")
	newBlock.blockHash = hashBlock(newBlock)
	
	chain = append(chain, newBlock)
	return chain
}

func createGenesisBlock() []Block {
	var chain []Block
	genesis := Block{}

	genesis.index = 0
	time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
	genesis.timestamp = timestamp()
	genesis.prevHash = "00000000000000000000000000000"
	genesis.transactions = []int{}
	genesis.proofOfWork = false
	genesis.blockHash = hashBlock(genesis)

	chain = append(chain, genesis)
	return chain
}

func createBlock(n int) []Block {
	blockData := []Block{}

	for i:=0; i<n; i++ {
		block := Block{}
		
		block.index = i + 1
		time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
		block.timestamp = timestamp()

		block.prevHash = "00000000000000000000000000000"
		block.transactions = []int{1,2,3,4,5,6}

		block.proofOfWork = pow.ProofOfWork("0000abc", "0000")
		block.blockHash = hashBlock(block)

		blockData = append(blockData, block)
	}
	return blockData 
}

func main() {
	now := time.Now()
	defer func() {
		fmt.Println("time it took to execute sequentially:", time.Since(now))
	}()

	time.Sleep(2 * time.Second)
	fmt.Println("Genesis Block:", createGenesisBlock(), "\n")

	n := 100
	time.Sleep(2 * time.Second)
	block := createBlock(n)
	
	for _, n := range block {
		time.Sleep(2 * time.Second)
		fmt.Println("Constructing Block")
		fmt.Println(n)
	}

	time.Sleep(5 * time.Second)
	addedToChain := addBlockToChain(block)

	for _, n := range addedToChain {
		fmt.Println("\nBlock Added:", n, "\n\n")
	}
	fmt.Println("this is the total blockchain:", addedToChain)
}