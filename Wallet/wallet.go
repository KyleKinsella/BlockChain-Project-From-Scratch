package wallet

import (
    //"crypto/ecdsa"

    "math/rand"
    "time"
    "encoding/json"
    "net/http"
    "BlockChainProjectFromScratch/Blocks"
    "io"
)

type Wallet struct {
    Index int
    Alias string
    Address string
    Balance int
    PrivateKey string
    PublicKey string
    AliasToBalance map[string]int
    
    //PrivateKey *ecdsa.PrivateKey
    //PublicKey ecdsa.PublicKey
}

const (
    START_FUNDS = 100
    FIVEFIVE = 50
)

var (
    wallet *Wallet
    wallets []Wallet
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

func getNRandomWords(n int) []string {
    var words []string

    for i := 0; i < n; i++ {
        word := getRandomWords()
        randomWord := Blocks.GetRandomString(word)

        words = append(words, randomWord)
    }

    return words
}

func getRandomWords() []string {
    res, err := http.Get("https://random-word-api.herokuapp.com/all")

    if err != nil {
        panic(err)
    }

    data, err := io.ReadAll(res.Body) 
    if err != nil {
        panic(err)
    }

    var words []string

    if err := json.Unmarshal(data, &words); err != nil {
        panic(err)
    }

    return words
}

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
    
    json.NewEncoder(w).Encode(wallet)
}

func CreateMultipleWallets(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")
    
    if wallets == nil {
        
        n := 5
        alias := getNRandomWords(n)
        
        for i := 1; i <= n; i++ {
            wallet := Wallet{
                Index: i,
                Alias: alias[i - 1],  
                Address: randomWalletAddress(),
                Balance: START_FUNDS,
                PrivateKey: "",
                PublicKey: "",
                AliasToBalance: make(map[string]int),
            }
            
            wallet.AliasToBalance[wallet.Alias] = wallet.Balance
            
            if i == n {
                wallet.Balance = FIVEFIVE
                wallet.AliasToBalance[wallet.Alias] = wallet.Balance
            }
        
            wallets = append(wallets, wallet)
        }
    }
    
    if len(wallets) > 50 {
        return;
    }
    
    json.NewEncoder(w).Encode(wallets)
}
