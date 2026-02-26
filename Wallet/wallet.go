package wallet

import (
    //"crypto/ecdsa"

    "math/rand"
    "time"
    "encoding/json"
    "net/http"
    "BlockChainProjectFromScratch/Blocks"
    "io"
    //"fmt"
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
        //fmt.Errorf("This is the problem here: %v", err)
    }

    data, err := io.ReadAll(res.Body) 
    if err != nil {
        panic(err)
    }

    //fmt.Println("HERE IS WHAT DATA HAS:", data)

    var words []string

    if err := json.Unmarshal(data, &words); err != nil {
        panic(err)
    }

    return words
}

//var adjectives = []string{
    //"silent", "blue", "red", "dark", "silver",
    //"rapid", "frozen", "wild", "brave", "ancient",
//}

//var nouns = []string{
    //"hawk", "forest", "falcon", "river", "wolf",
    //"tiger", "shadow", "storm", "phoenix", "lion",
//}

//func makeAliases(n int) []string {
    //var words []string
    //const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

    //b := make([]byte, n)
    //for i := range b {
        //b[i] = letters[rand.Intn(len(letters))]
        //str := string(b[i])
        //words = append(words, str)
    //}
    
    //return words
//}

//func makeAliases(n int) []string {
    //var aliases []string

    //for i := 0; i < n; i++ {
        //adj := adjectives[rand.Intn(len(adjectives))]
        //noun := nouns[rand.Intn(len(nouns))]
        //number := rand.Intn(1000)

        //alias := fmt.Sprintf("%s%s%d", adj, noun, number)
        //aliases = append(aliases, alias)
    //}

    //return aliases
//}

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
