package Blocks

import (
	"BlockChainProjectFromScratch/KeyPairs"
	"BlockChainProjectFromScratch/ReadFile"
	"BlockChainProjectFromScratch/pow"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"math/rand"
	crand "math/rand/v2"
	"net/http"
	"time"
)

type Block struct {
	Index int
	Timestamp string 
	PrevHash interface{}
	Transactions Transaction
	ProofOfWork bool 
	BlockHash string 
}

type Transaction struct {
	Sender string
	Receiver string
	Amount float32
}

var blockchain []Block

func CreateBlockZero(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	if len(blockchain) == 0 {
		genesis := Block{}
	
		genesis.Index = 1
		time.Sleep(time.Second)
		genesis.Timestamp = timestamp()
		genesis.PrevHash = nil
		genesis.Transactions = Transaction{}
		genesis.ProofOfWork = true
		genesis.BlockHash = hashBlock(&genesis)
		
		blockchain = append(blockchain, genesis)
	}
	json.NewEncoder(w).Encode(blockchain)
}

func CreateBlocksForFrontend(w http.ResponseWriter, r *http.Request) {
	var n int
	fmt.Println("How many blocks do you want to make?")
	fmt.Scan(&n)

	if n == 0 {
		fmt.Println("you cannot make zero blocks!")
		return
	}

	fmt.Println("You are creating:", n, "blocks")
	
	w.Header().Set("Access-Control-Allow-Origin", "*")

	for i:=0; i<n; i++ {
		block := Block{}

		if i == 0 {
			block.PrevHash = nil
			fmt.Println("block.prevHash:", block.PrevHash)
		} 

		block.Index = len(blockchain) + 1
		time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
		block.Timestamp = timestamp()

		block.PrevHash = getLastBlockHash(blockchain)

		read := ReadFile.ReadAddresses("Addresses.txt")

		randomToFindValue := ReadFile.ReadKeywords("keywords.txt")
		toFind := getRandomString(randomToFindValue)
		block.ProofOfWork = pow.ProofOfWork("0000abc", toFind)

		process, err := processTransaction(&Transaction{}, read, &block)
		if err != nil {
			fmt.Println("something went wrong...")
			panic(err)
		}
		block.Transactions = process

		if block.ProofOfWork {
			// We have computed a valid proof of work field // 
			fmt.Println("Building Block", i, "on iteration", i, "/", n)
		} else {
			// don't make the block and don't send the block to the frontend //
			fmt.Println("Block", i, "discontinued on iteration", i, "/", n)
			continue
		}

		block.BlockHash = hashBlock(&block)

		blockchain = append(blockchain, block)
	}
	json.NewEncoder(w).Encode(blockchain)
}

func hashBlock(block *Block) string {
	data := fmt.Sprintf("%d%s%v%s%v", block.Index, block.Timestamp, block.Transactions, block.PrevHash, block.ProofOfWork)
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
	if lastBlock.Index == 0 {
		fmt.Println("you cannot make a zero block!")
		return nil
	}

	newBlock := Block{}

	newBlock.Index = lastBlock.Index + 1
	time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
	newBlock.Timestamp = timestamp()
	newBlock.PrevHash = lastBlock.PrevHash
	newBlock.Transactions = lastBlock.Transactions
	newBlock.ProofOfWork = pow.ProofOfWork("0000abc", "0000")
	newBlock.BlockHash = hashBlock(&newBlock)
	
	chain = append(chain, newBlock)
	return chain
}

func getLastBlockHash(chain []Block) string {
	if len(chain) == 0 {
		fmt.Println("you are on the genesis block!")
		return ""
	}	
	blockHash := chain[len(chain)-1]
	return blockHash.BlockHash
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

	genesis.Index = 0
	time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
	genesis.Timestamp = timestamp()
	genesis.PrevHash = "00000000000000000000000000000"
	transaction := Transaction{}
	genesis.Transactions = transaction
	genesis.ProofOfWork = false
	genesis.BlockHash = hashBlock(&genesis)

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
			block.PrevHash = "Genesis Block"
			fmt.Println("block.prevHash:", block.PrevHash)
		} 
		fmt.Println("Building Block", i, "on iteration", i, "/", n)
		
		block.Index = i + 1
		time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
		block.Timestamp = timestamp()

		block.PrevHash = getLastBlockHash(blockData)

		readAddresses := "Addresses.txt"
		transaction := Transaction{}
		read := ReadFile.ReadAddresses(readAddresses)

		process, err := processTransaction(&transaction, read, &block)
		if err != nil {
			fmt.Println("something went wrong...")
			panic(err)
		}
		block.Transactions = process

		wordToFind := "keywords.txt"
		randomToFindValue := ReadFile.ReadKeywords(wordToFind)
		toFind := getRandomString(randomToFindValue)
		block.ProofOfWork = pow.ProofOfWork("0000abc", toFind)

		block.BlockHash = hashBlock(&block)

		blockData = append(blockData, block)
	}
	return blockData 
}

func createTransaction(transaction Transaction, sender string, receiver string, amount float32) Transaction {
	transaction.Sender = sender
	transaction.Receiver = receiver
	transaction.Amount = amount
	return transaction
}

func processTransaction(transaction *Transaction, read []string, block *Block) (Transaction, error) {	
	if len(read) == 0 {
		fmt.Println("file is empty")
		return *transaction, nil
	}

	random := crand.Float32()

	if len(read) == 0 {
		fmt.Println("file must contain data, in order to have the correct sender and receiver")
		return Transaction{}, nil
	}

	if len(read) == 2 {
		transaction.Sender = read[0]
		transaction.Receiver = read[1]

		tx := createTransaction(*transaction, transaction.Sender, transaction.Receiver, random)
		return tx, nil
	} else {
		if block.ProofOfWork {
			KeyPairs.GenerateKeys()

			for i := 0; i < len(read) - 1; i++ {
				transaction.Sender = read[i] 
			}
			transaction.Receiver = read[len(read) - 1]
		} 

		tx := createTransaction(*transaction, transaction.Sender, transaction.Receiver, random)
		return tx, nil
	}
}
