package KeyPairs

import (
	"crypto/ecdsa"
	"crypto/elliptic"
	"crypto/rand"
	// "crypto/sha256"
	// "encoding/hex"
	"fmt"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/ethereum/go-ethereum/common"
	"os"
)

func GenerateKeys() {
	// privateKey is random and unique
	privateKey, err := ecdsa.GenerateKey(elliptic.P256(), rand.Reader)
	if err != nil {
		panic(err)
	}

	// publicKey is derived deterministically from privateKey
	publicKey := privateKey.PublicKey
	
	// publicBytes := append(publicKey.X.Bytes(), publicKey.Y.Bytes()...)
	// hash := sha256.Sum256(publicBytes)

	// pubKey := hex.EncodeToString(hash[:])[:42]
	// priKey := hex.EncodeToString(privateKey.D.Bytes())[:42]
	add := address(publicKey)

	// fmt.Println("Public Key:", pubKey)
	// fmt.Println("Private Key:", priKey)
	// fmt.Println("Public Key:", pubKey, "has this address:", add)

	// file, err := os.Create("Addresses.txt")
	file, err := os.OpenFile("Addresses.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		panic(err)
	}
	defer file.Close()

	file.WriteString(fmt.Sprintf("%s\n", add))
}

func address(publicKey ecdsa.PublicKey) common.Address {
	address := crypto.PubkeyToAddress(publicKey)
	return address
}

func main() {
	GenerateKeys()
}