package main

import (
	"BlockChainProjectFromScratch/ReadFile"
	"BlockChainProjectFromScratch/pow"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"math/rand"
	crand "math/rand/v2"
	"time"
)

type Block struct {
	index int
	timestamp string 
	prevHash string
	transactions Transaction
	proofOfWork bool 
	blockHash string 
}

type Transaction struct {
	sender string
	receiver string
	amount float32
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
	if lastBlock.index == 0 {
		fmt.Println("you cannot make a zero block!")
		return nil
	}

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

func getLastBlockHash(chain []Block) string {
	if len(chain) == 0 {
		fmt.Println("you are on the genesis block!")
		return ""
	}	
	blockHash := chain[len(chain)-1]
	return blockHash.blockHash
}

func getRandomString(arr []string) string {
	if len(arr) == 0 {
		return ""
	}
	rand.Seed(time.Now().UnixNano()) // Seed the RNG
	randomIndex := rand.Intn(len(arr))
	return arr[randomIndex]
}

func createGenesisBlock() []Block {
	var chain []Block
	genesis := Block{}

	genesis.index = 0
	time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
	genesis.timestamp = timestamp()
	genesis.prevHash = "00000000000000000000000000000"
	transaction := Transaction{}
	genesis.transactions = transaction
	genesis.proofOfWork = false
	genesis.blockHash = hashBlock(genesis)

	chain = append(chain, genesis)
	return chain
}

func createBlock(n int) []Block {
	if n == 0 {
		fmt.Println("you cannot make a zero block!")
		return nil
	}

	blockData := []Block{}

	for i:=0; i<n; i++ {
		block := Block{}

		if i == 0 {
			block.prevHash = "Genesis Block"
			fmt.Println("block.prevHash:", block.prevHash)
		} 
		fmt.Println("Building Block", i, "on iteration", i, "/", n)
		
		block.index = i + 1
		time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
		block.timestamp = timestamp()

		block.prevHash = getLastBlockHash(blockData)

		readAddresses := "Addresses.txt"
		transaction := Transaction{}
		read := ReadFile.ReadFile(readAddresses)

		process, err := processTransaction(transaction, read)
		if err != nil {
			fmt.Println("something went wrong...")
			panic(err)
		}
		block.transactions = process

		wordToFind := "keywords.txt"
		randomToFindValue := ReadFile.ReadFile(wordToFind)
		toFind := getRandomString(randomToFindValue)
		block.proofOfWork = pow.ProofOfWork("0000abc", toFind)

		block.blockHash = hashBlock(block)

		blockData = append(blockData, block)
	}
	return blockData 
}

func createTransaction(transaction Transaction, sender string, receiver string, amount float32) Transaction {
	transaction.sender = sender
	transaction.receiver = receiver
	transaction.amount = amount
	return transaction
}

func processTransaction(t Transaction, read []string) (Transaction, error) {	
	if len(read) == 0 {
		fmt.Println("file is empty")
		return t, nil
	}

	if len(read) == 2 {
		t.sender = read[0]
		t.receiver = read[1]
		random := crand.Float32()

		return createTransaction(t, t.sender, t.receiver, random), nil
	} else {
		// todo
		return t, nil
	}
}

func main() {
	now := time.Now()
	defer func() {
		fmt.Println("time it took to execute sequentially:", time.Since(now))
	}()

	time.Sleep(2 * time.Second)
	fmt.Println("Genesis Block:", createGenesisBlock(), "\n")

	blocksToCreate := 5
	time.Sleep(2 * time.Second)
	block := createBlock(blocksToCreate)

	for _, n := range block {
		time.Sleep(2 * time.Second)
		fmt.Println("Getting Block Data:", n, "\n")
	}

	time.Sleep(5 * time.Second)
	addedToChain := addBlockToChain(block)

	for _, n := range addedToChain {
		fmt.Println("\nBlock Added:", n, "\n\n")
	}
	fmt.Println("this is the total blockchain:", addedToChain)
}