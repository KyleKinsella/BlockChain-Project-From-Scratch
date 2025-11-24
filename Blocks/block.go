package Blocks

import (
	"BlockChainProjectFromScratch/KeyPairs"
	"BlockChainProjectFromScratch/ReadFile"
	"BlockChainProjectFromScratch/pow"
	"BlockChainProjectFromScratch/MyCurrency"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"
)

type BlockReward struct {
	Subsidy float32 
	TransactionFees float32
	BlockRewardTotal float32
}

type Block struct {
	Index int
	Timestamp string 
	PrevHash interface{}
	Transactions Transaction
	ProofOfWork bool 
	BlockHash string 
	BlockReward BlockReward
}

type Transaction struct {
	Sender string
	Receiver string
	Amount float32
}

var TransactionFee float32 = 0.0001
const THRESHOLD = 10

var Blockchain []Block

func CreateBlockZero(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	if len(Blockchain) == 0 {
		genesis := Block{}
	
		genesis.Index = 1
		time.Sleep(time.Second)
		genesis.Timestamp = Timestamp()
		genesis.PrevHash = nil
		genesis.Transactions = Transaction{}
		genesis.ProofOfWork = true
		genesis.BlockHash = hashBlock(&genesis)

		total, err := genesis.computeBlockReward(genesis.Index)
		if err != nil {
			fmt.Printf("Error: %v", err)
			panic(err)
		}

		if total == 0 {
			genesis.BlockReward.TransactionFees = TransactionFee
		}
		genesis.BlockReward.BlockRewardTotal = total
		
		Blockchain = append(Blockchain, genesis)
	}
	json.NewEncoder(w).Encode(Blockchain)
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

	for i := 1; i <= n; i++ {
		block := Block{}

		block.Index = len(Blockchain) + 1
		time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
		block.Timestamp = Timestamp()

		block.PrevHash = GetLastBlockHash(Blockchain)

		read := ReadFile.ReadAddresses("Addresses.txt")

		randomToFindValue := ReadFile.ReadKeywords("keywords.txt")
		toFind := GetRandomString(randomToFindValue)
		block.ProofOfWork = pow.ProofOfWork("0000abc", toFind)
			
		process, countedTransactions, err := processTransaction(&Transaction{}, read, &block, i)
		if err != nil {
			fmt.Println("something went wrong...")
			panic(err)
		}
		block.Transactions = process

		if block.ProofOfWork {
			// We have computed a valid proof of work field // 
			fmt.Println("Building Block", i, "on iteration", i, "/", n)

			total, err := block.computeBlockReward(countedTransactions)
			if err != nil {
				fmt.Printf("Error: %v", err)
				panic(err)
			}
			block.BlockReward.BlockRewardTotal = total
		} else {
			// don't make the block and don't send the block to the frontend //
			fmt.Println("Block", i, "discontinued on iteration", i, "/", n)
			continue
		}

		block.BlockHash = hashBlock(&block)

		Blockchain = append(Blockchain, block)
	}
	json.NewEncoder(w).Encode(Blockchain)
	fmt.Printf("Finished constructing %d Blocks!\n", n)
}

func hashBlock(block *Block) string {
	data := fmt.Sprintf("%d%s%v%s%v%v%v%v", block.Index, block.Timestamp, block.Transactions, block.PrevHash, block.ProofOfWork, block.BlockReward.Subsidy, block.BlockReward.TransactionFees, block.BlockReward.BlockRewardTotal)
	hash := sha256.Sum256([]byte(data))
	return hex.EncodeToString(hash[:])
}

func Timestamp() string {
	location, _ := time.LoadLocation("Europe/Dublin")
	currentTime := time.Now().In(location)
	timeAndDate := currentTime.Format("2006-01-02 15:04:05")   
	return timeAndDate
}

func GetLastBlockHash(chain []Block) string {
	if len(chain) == 0 {
		return ""
	}	
	blockHash := chain[len(chain)-1]
	return blockHash.BlockHash
}

func GetRandomString(arr []string) string {
	if len(arr) == 0 {
		return ""
	}
	rand.Seed(time.Now().UnixNano()) // Seed the RNG
	randomIndex := rand.Intn(len(arr))
	return arr[randomIndex]
}

func createTransaction(transaction Transaction, sender string, receiver string, amount float32) Transaction {
	transaction.Sender = sender
	transaction.Receiver = receiver
	transaction.Amount = amount
	return transaction
}

func processTransaction(transaction *Transaction, read []string, block *Block, count int) (Transaction, int, error) {	
	if len(read) == 0 {
		fmt.Println("File is empty!\nFile must contain data, in order to have the correct Sender and Receiver")
		return Transaction{}, 0, nil
	}

	random := rand.Float32()

	if len(read) == 2 {
		transaction.Sender = read[0]
		transaction.Receiver = read[1]

		tx := createTransaction(*transaction, transaction.Sender, transaction.Receiver, random)
		return tx, 0, nil
	} else {
		if block.ProofOfWork {
			KeyPairs.GenerateKeys()

			for i := 0; i < len(read) - 1; i++ {
				transaction.Sender = read[i] 
			}
			transaction.Receiver = read[len(read) - 1]
		} 

		tx := createTransaction(*transaction, transaction.Sender, transaction.Receiver, random)
		count++
		return tx, count, nil
	}
}

func (block *Block) computeBlockReward(counted int) (float32, error) {	
	if counted > THRESHOLD {
		// Compute a new transaction fee // 
		block.BlockReward.TransactionFees = (TransactionFee * float32(counted)) + 1
	} else {
		block.BlockReward.TransactionFees = TransactionFee
	}

	Subsidy := MyCurrency.MyCurrency()
	block.BlockReward.Subsidy = Subsidy / float32(block.Index)

	block.BlockReward.BlockRewardTotal = block.BlockReward.Subsidy + block.BlockReward.TransactionFees
	
	return block.BlockReward.BlockRewardTotal, nil
}