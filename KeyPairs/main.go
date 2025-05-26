package main

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/common"
)

func GenerateKeys() {
	// privateKey is random and unique
	privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		panic(err)
	}

	// publicKey is derived deterministically from privateKey
	publicKey := privateKey.PublicKey
	
	publicBytes := append(publicKey.X.Bytes(), publicKey.Y.Bytes()...)
	hash := sha256.Sum256(publicBytes)

	pubKey := hex.EncodeToString(hash[:])[:42]
	priKey := hex.EncodeToString(privateKey.D.Bytes())[:42]

	fmt.Println("Public Key:", pubKey)
	fmt.Println("Private Key:", priKey)
	fmt.Println("Public Key:", pubKey, "has this address:", address(publicKey))
}

func address(publicKey ecdsa.PublicKey) common.Address {
	address := crypto.PubkeyToAddress(publicKey)
	return address
}

func main() {
	GenerateKeys()
}