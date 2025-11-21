package pos

import (
	"BlockChainProjectFromScratch/Blocks"
	"fmt"
	"time"
	"math/rand"
)

// Notes:
// ValidatorSignature: I'm not to sure what type to have for "ValidatorSignature" field - I'm thinking either (string || bool)
// StakeWeight: I'm not to sure what type to have for "StakeWeight" field - I'm thinking either (int || some type of float)

type PosBlock struct {
	Index int
	Timestamp string
	PrevHash interface{}
	ValidatorAddress string
	ValidatorSignature string
	StakeWeight int
	BlockHash string
}

type Validator struct {
	posBlock *PosBlock
}

func CreateGenesisPosBlock() *PosBlock {
	return &PosBlock{
		Index: 0,
		Timestamp: Blocks.Timestamp(),
		PrevHash: Blocks.GetLastBlockHash(Blocks.Blockchain),
		ValidatorAddress: "0x8805dC4935e8c00329AE00Fe1E4AE87bDf5d37dF", // this is from the "Addresses.txt" file!
		ValidatorSignature: "Kyle",
		StakeWeight: 20,
		BlockHash: "00000000000000000000000000000000000000000000000", // TODO - write a new function for this!
	}
}

func CreateNPosBlocks(n int) []PosBlock {
	if n == 0 {
		fmt.Println("you cannot make a zero block!")
		return nil
	}

	posBlockData := []PosBlock{}

	for i:=0; i<n; i++ {
		posBlock := PosBlock{}

		if i == 0 {
			posBlock.PrevHash = nil
			fmt.Println("block.prevHash:", posBlock.PrevHash)
		} 
		fmt.Println("Building Block", i, "on iteration", i, "/", n)
		
		posBlock.Index = i + 1
		time.Sleep(time.Second) // I use time.Sleep to simulate a block being made
		posBlock.Timestamp = Blocks.Timestamp()

		posBlock.PrevHash = Blocks.GetLastBlockHash(Blocks.Blockchain)

		posBlock.ValidatorAddress = "000000" // TODO 

		posBlock.ValidatorSignature = "YES" // TODO

		posBlock.StakeWeight = rand.Intn(100) // TODO

		posBlock.BlockHash = "" // TODO

		posBlockData = append(posBlockData, posBlock)
	}
	return posBlockData 
}

func (v *Validator) ValidatePOSBlock(posBlock *PosBlock) bool {
	// step 1: how do i validate a block?

	if posBlock.Index < 0 {
		fmt.Println("posBlock.Index is <= 0")
		return false
	} 

	if posBlock.Timestamp == "" || posBlock.Timestamp == "America/New_York" {
		fmt.Println("posBlock.Timestamp is empty or America/New_York")
		return false
	} 

	if posBlock.PrevHash == nil {
		fmt.Println("posBlock.PrevHash is nil")
		return false
	}

	if posBlock.ValidatorAddress == "" {
		fmt.Println("posBlock.ValidatorAddress is empty")
		return false
	}

	if posBlock.ValidatorSignature != "Kyle" {
		fmt.Printf("posBlock.ValidatorSignature should be [Kyle] not: [%s]", posBlock.ValidatorSignature)
		return false
	}

	if posBlock.StakeWeight <= 0 {
		fmt.Println("posBlock.StakeWeight is <= 0")
		return false
	}

	if posBlock.BlockHash == "" {
		fmt.Println("posBlock.BlockHash is empty")
		return false
	}

	return true
}