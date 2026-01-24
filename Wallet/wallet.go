package wallet

import (
	//"crypto/ecdsa"

	"math/rand"
	"time"
	"encoding/json"
	"net/http"
	"fmt"
)

type Wallet struct {
	Index int
	Address string
	Balance float32
	PrivateKey string
	PublicKey string

	//PrivateKey *ecdsa.PrivateKey
	//PublicKey ecdsa.PublicKey
}

const (
	LOW = 0.01
	START_FUNDS = 100.00
	USERS = 1000000
)

func randomWalletAddress() string {
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))
	chars := "0123456789abcdef"
	addr := "0x"
	
	for i := 0; i < 40; i++ {
		addr += string(chars[rng.Intn(16)])
	}
	return addr
}

func createMultipleWallets(w http.ResponseWriter, n int) {
	if n > USERS {
		fmt.Println("My DAO can only support", USERS, "sorry about this, try again.")
		return
	}
	
	var wallets []Wallet
	
	for i := 1; i <= n; i++ {
		wallet := Wallet{
			Index: i,
			Address: randomWalletAddress(),
			Balance: LOW,
			PrivateKey: "",
			PublicKey: "",
		}	
	
		wallets = append(wallets, wallet)
		//wallets.append(wallets, wallet)
	}
	
	json.NewEncoder(w).Encode(wallets)
}

var wallet *Wallet

func SetupWallet(w http.ResponseWriter, r *http.Request) {	
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	
	if wallet == nil {
		wallet = &Wallet{
			Address: randomWalletAddress(),
			Balance: START_FUNDS,
			PrivateKey: "",
			PublicKey: "",
		}
	} 
	
	//else {		
		//wallet.Address = randomWalletAddress()
	//}
	
	json.NewEncoder(w).Encode(wallet)
}
