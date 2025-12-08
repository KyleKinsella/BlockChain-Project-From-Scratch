package KeyPairs

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"fmt"
	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/common"
	"os"
)

func GenerateKeys() (*ecdsa.PrivateKey, ecdsa.PublicKey) {
	// privateKey is random and unique
	privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		panic(err)
	}

	// publicKey is derived deterministically from privateKey
	publicKey := privateKey.PublicKey
	
	address := address(publicKey)

	file, err := os.OpenFile("Addresses.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	file.WriteString(fmt.Sprintf("%s\n", address))

	return privateKey, publicKey
}

func address(publicKey ecdsa.PublicKey) common.Address {
	return crypto.PubkeyToAddress(publicKey)
}