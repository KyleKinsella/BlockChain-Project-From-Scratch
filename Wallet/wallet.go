package wallet

import (
    //"crypto/ecdsa"

    "math/rand"
    "time"
    "encoding/json"
    "net/http"
    "BlockChainProjectFromScratch/MyCurrency"
    "BlockChainProjectFromScratch/Blocks"
    "io"
    "fmt"
)

type Wallet struct {
    Index int
    Alias string
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

//var aliases = []string{"Monster", "Sign", "Warning", "Spoon", "Drink"}

//var alias = map[string]string{
    //names[0]: randomWalletAddress(),
//}

//func validAlias(name string) (string, error) {
    //yes, ok := alias[name]
    //if !ok {
        //return "", nil
    //}

    //return yes, nil
//}

func getNRandomWords(n int) []string {
    // TODO
    // loop n times and get n random words
    // then
    // append / add these words to a slice

    var words []string

    for i := 0; i < n; i++ {
        word := getRandomWords()
        randomWord := Blocks.GetRandomString(word)

        words = append(words, randomWord)
    }

    return words
}

func assignAliasToWalletAddress(alias string, walletAddress string) {
    // TODO                                           (alias)             (wallet address)
    // assign a alias to a walletAddress. for example, leaf - 0xe793e3fe06c8637ba173b73992b486afed739527
    // it's extremly important to keep track of the used aliases! because we don't want two wallet addresses having the same alias name
    // I am going to design this such that, each alias name is unique to one and ONLY one alias name!
    // such that, this cannot happen:
    // spoon - 0xaf2d6ba96036c3b48dafebec408ffa9fb072fa8a
    // spoon - 0xedc8ba488cfaa5bad44d077c6c250cafc2949965

    // so the key point here is - keep track of the used alias names and if the name has been used do not use it again!

    var values []string

    if len(values) == 0 {
        values = append(values, alias)
        values = append(values, walletAddress)
    }

    for _, val := range values {
        fmt.Println("val:", val)

        if(val == alias) {
            continue
        }
    }

    //for _, val := range values {
        //if val == alias && val == walletAddress {
            //continue
            //return false
        //}
    //}

    //return true
}

func contains(s []string, e string) bool {
    for _, a := range s {
        if a == e {
            return true
        }
    }
    return false
}

func removeDuplicates(remove []string) []string {
    list := []string{}

    for _, item := range remove {
        // fmt.Println(item)
        if contains(list, item) == false {
            list = append(list, item)
        }
    }
    return list
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

var wallets []Wallet

func CreateMultipleWallets(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")
    
    if wallets == nil {
        
        n := 5
        alias := getNRandomWords(n)
        fmt.Println(alias)

        //updated := removeDuplicates(alias)
        
        for i := 1; i <= n; i++ {
            wallet := Wallet{
                Index: i,
                Alias: alias[i - 1],                    //Blocks.GetRandomString(alias),
                Address: randomWalletAddress(),
                Balance: START_FUNDS,
                PrivateKey: "",
                PublicKey: "",
            }

            //assignAliasToWalletAddress(wallet.Alias, wallet.Address)

            //fmt.Println(validValue)

            //c := contains(alias, wallet.Alias)
            //if c {
                //return
            //}
        
            wallets = append(wallets, wallet)
        }
    }
    
    if len(wallets) > 50 {
        return;
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
    
    json.NewEncoder(w).Encode(wallet)
}

func Bar(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")

    alias := getNRandomWords(60)
    json.NewEncoder(w).Encode(alias)
}
