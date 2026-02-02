package wallet

import (
	//"crypto/ecdsa"

	"math/rand"
	"time"
	"encoding/json"
	"net/http"
	"fmt"
	"BlockChainProjectFromScratch/MyCurrency"
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

func initWalletWithFunds(n int) []float32 {
	var arrFunds []float32
	for i := 0; i < n; i++ {
		funds := MyCurrency.MyCurrency()
		arrFunds = append(arrFunds, funds)
	}
	return arrFunds 
}

func sum(arr []float32) float32 {
	var sum float32
	for i := 0; i < len(arr); i++ {
		sum += arr[i]
	}
	return sum
}

func randomNumsInRange(min, max int) int {
	if max <= min {
		panic("max must be greater than min")
	}
	
	return min + rand.Intn(max-min)
}

func run() float32 {
	randomVal := randomNumsInRange(50, 100)
	funds := initWalletWithFunds(randomVal)
	sum := sum(funds)
	return sum
}

func randomWalletAddress() string {
	rng := rand.New(rand.NewSource(time.Now().UnixNano()))
	chars := "0123456789abcdef"
	addr := "0x"
	
	for i := 0; i < 40; i++ {
		addr += string(chars[rng.Intn(16)])
	}
	return addr
}

func CreateMultipleWallets(w http.ResponseWriter, r *http.Request) {
	
	var n int
	fmt.Println("How many wallets do you want to create?")
	fmt.Scan(&n)
	
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
