// This package will store your funds.
// These funds in your wallet will be used for paying transaction fees
// and
// whatever funds you "bid" for an asset or "nft" in my DAO

// Potential Idea's:
// The wallet might have an address for where the funds are, but I'm not sure if I'll do this... //

package wallet

import (
	"crypto/ecdsa"
	// "crypto/sha256"
	// "encoding/hex"
	"encoding/json"
	// "fmt"
	"net/http"
)

var (
	TransactionRecords []TransactionRecord
	TypeOfTransaction []string
)

type TransactionRecord struct {
    Timestamp string
    TxID int
    Amount float32
    Type string 
}

type Wallet struct {
	Address string
	Balance float32
	Nonce bool
	History []TransactionRecord
	PrivateKey *ecdsa.PrivateKey
	PublicKey ecdsa.PublicKey
}

type PasswordInput struct {
    Password string `json:"Password"`
}

func GetUserPassword(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	
	var input PasswordInput

    // Decode JSON from the frontend
    err := json.NewDecoder(r.Body).Decode(&input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Hash the password (sha256 for example)


    // hash := sha256.Sum256([]byte(input.Password))
    // hashedPassword := hex.EncodeToString(hash[:])

	// fmt.Println("User password is:", hashedPassword)
}


// var WalletData = []Wallet{}

// func InitWallet(w http.ResponseWriter, r *http.Request) {	
// 	wallet := Wallet{
// 		Address: "Ox",
// 		Balance: 0,
// 		Nonce: false,
// 		History: []TransactionRecord{},
// 		PrivateKey: nil,
// 		PublicKey: ecdsa.PublicKey{},
// 	}
	
// 	WalletData = append(WalletData, wallet)
// 	json.NewEncoder(w).Encode(wallet)
// }