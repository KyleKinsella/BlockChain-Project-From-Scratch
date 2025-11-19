package Blocks

import (
	"testing"
)

func TestValidGenesisBlock(t *testing.T) {
	block := Block{}

	block.Index = 1
	block.Timestamp = timestamp()
	block.PrevHash = nil
	block.Transactions = Transaction{}
	block.ProofOfWork = true
	block.BlockHash = hashBlock(&block)
	
	got := block.getBlockData(1, timestamp(), nil, Transaction{}, true, hashBlock(&block))

	if got != block {
		t.Errorf("got=%v want=%v:", got, block)
	}
}

func TestInvalidGenesisBlock(t *testing.T) {
	// TODO
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
	startLength := len(blockchain)

	block := Block{}

	for range 10 {
		startLength++
		blockchain = append(blockchain, block)
	}

	if startLength != len(blockchain) {
		t.Errorf("start length is not the length of the blockchain. got=%v want=%v", blockchain, startLength)
	}
}

func TestMiningNBlocks(t *testing.T) {
	startLength := len(blockchain)

	for i := 0; i<6; i++ {
		block := Block{}

		block.Index = i
		block.Timestamp = timestamp()
		block.PrevHash = getLastBlockHash(blockchain)
		block.Transactions = Transaction{}
		block.ProofOfWork = false
		block.BlockHash = hashBlock(&block)

		startLength++
		blockchain = append(blockchain, block)
	}

	if startLength != len(blockchain) {
		t.Errorf("the start length != to the blockchain's Length. got=%v want=%v", blockchain, 6)
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