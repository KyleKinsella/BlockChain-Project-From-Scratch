package pow

import (
	"fmt"
	"strings"
)

func ProofOfWork(hash string, toFind string) bool {
	if hash == "" {
		fmt.Println("you cannot have an empty hash!")
		return false
	}

	for range len(hash) {
		if strings.Contains(hash, toFind) {
			fmt.Println("you have computed the proof of work field!")
			return true
		} else {
			fmt.Println("you have not found the proof of work field, try again...")
			return false
		}
	}	
	return true
}