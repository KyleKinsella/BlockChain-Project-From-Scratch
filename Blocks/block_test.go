package Blocks

import (
	"testing"
)

func TestValidGenesisBlock(t *testing.T) {
	block := Block{}

	block.Index = 1
	block.Timestamp = Timestamp()
	block.PrevHash = nil
	block.Transactions = Transaction{}
	block.ProofOfWork = true
	block.BlockHash = hashBlock(&block)
	
	got := block.getBlockData(1, Timestamp(), nil, Transaction{}, true, hashBlock(&block))

	if got != block {
		t.Errorf("got=%v want=%v:", got, block)
	}
}

// This test also took a good bit of time to write! //
func TestInvalidGenesisBlock(t *testing.T) {
	block := Block{}

	var blockData []interface{}

	index := block.Index
	timestamp := Timestamp()
	prevHash := block.PrevHash
	transaction := block.Transactions
	proofOfWork := block.ProofOfWork
	blockHash := block.BlockHash

	blockData = append(blockData, index, timestamp, prevHash, transaction, proofOfWork, blockHash)

	emptyValues := []string{}

	indexEmpty := ""
	timestampEmpty := ""
	prevHashEmpty := ""
	transactionEmpty := ""
	proofOfWorkEmpty := ""
	blockHashEmpty := ""

	emptyValues = append(emptyValues, indexEmpty, timestampEmpty, prevHashEmpty, transactionEmpty, proofOfWorkEmpty, blockHashEmpty)

	randomVal := GetRandomString(emptyValues)

	for i := range blockData {
		blockData[i] = randomVal

		if blockData[i] != emptyValues[i] {
			t.Errorf("block data at index=[got=%d] != to empty values at index=[want=%s].", blockData[i], emptyValues[i])
		}
	}
}

// This test should always pass //
func TestEmptyTransaction(t *testing.T) {
	emptyTransaction := Transaction{}
	trans := Transaction{}

	if emptyTransaction != trans {
		t.Errorf("got=%v want=%v", trans, emptyTransaction)
	}
}

// This test should always fail // 
func TestInvalidTransaction(t *testing.T) {
	// The the Sender and Receiver here in the test are Kyle and Bob, but this is not how it 
	// operates in the blockchain. This is to really illustarte a point. On the blockchain it would be from 
	// one address to another address.
	validTransaction := Transaction{Sender: "Kyle", Receiver: "Bob", Amount: 2}

	invalidTransaction := Transaction{Sender: "door", Receiver: "car", Amount: 0.00000001}

	if validTransaction != invalidTransaction {
		t.Errorf("got=%v want=%v", invalidTransaction, validTransaction)
	}
}

func TestLengthOfBlockchain(t *testing.T) {
	startLength := len(Blockchain)

	block := Block{}

	for range 10 {
		startLength++
		Blockchain = append(Blockchain, block)
	}

	if startLength != len(Blockchain) {
		t.Errorf("start length is not the length of the blockchain. got=%v want=%v", Blockchain, startLength)
	}
}

func TestMiningNBlocks(t *testing.T) {
	startLength := len(Blockchain)

	for i := 0; i<6; i++ {
		block := Block{}

		block.Index = i
		block.Timestamp = Timestamp()
		block.PrevHash = GetLastBlockHash(Blockchain)
		block.Transactions = Transaction{}
		block.ProofOfWork = false
		block.BlockHash = hashBlock(&block)

		startLength++
		Blockchain = append(Blockchain, block)
	}

	if startLength != len(Blockchain) {
		t.Errorf("the start length != to the blockchain's Length. got=%v want=%v", Blockchain, 6)
	}
}

// This unit test took quite a bit of work to get working - but I'm really happy that it works! //
func TestValidHashBlock(t *testing.T) {
	block := Block{}

	blockData := block.getBlockData(1, "", nil, Transaction{Sender: "", Receiver: "", Amount: 0}, false, "")

	hashedBlock := hashBlock(&blockData)

	blockHashedConverted, err := convertStringToBool(blockData.BlockHash, hashedBlock)
	if err != nil {
		panic(err)
	}

	if blockHashedConverted {
		t.Errorf("the block data is not hashed - big problem. got=%v, want=%v", !blockHashedConverted, blockHashedConverted)
	}
}

func TestInvalidHashBlock(t *testing.T) {
	block := Block{}

	blockData := block.getBlockData(1, "", nil, Transaction{Sender: "", Receiver: "", Amount: 0}, false, "")

	blockHashedConverted, err := convertStringToBool(blockData.BlockHash, blockData.BlockHash)
	if err != nil {
		panic(err)
	}

	if !blockHashedConverted {
		t.Errorf("the block data is in plain text... really really bad! got=%v, want=%v", blockHashedConverted, !blockHashedConverted)
	}
}

// This is a helper function that gives us data about a block // 
func (block Block) getBlockData(index int, timestamp string, prevHash interface{}, trans Transaction, pow bool, blockHash string) Block {
	return Block {
		Index: index,
		Timestamp: timestamp,
		PrevHash: prevHash,
		Transactions: trans,
		ProofOfWork: pow,
		BlockHash: blockHash,
	}
}

func convertStringToBool(valueToConvert string, hashedBlock string) (bool, error) {
	if valueToConvert == hashedBlock {
		return true, nil
	}
	return false, nil
} 