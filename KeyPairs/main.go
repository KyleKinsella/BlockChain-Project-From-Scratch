package KeyPairs

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
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

	fmt.Println("Public Key:", hex.EncodeToString(hash[:])[:42])
	fmt.Println("Private Key:", hex.EncodeToString(privateKey.D.Bytes())[:42])
}

func main() {
	GenerateKeys()
}