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
			return true
		} else {
			return false
		}
	}	
	return true
}