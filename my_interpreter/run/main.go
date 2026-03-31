package main

import (
    "BlockChainProjectFromScratch/my_interpreter/lexer"
    "net/http"
    "encoding/json"
    "fmt"
)

type UserInput struct {
    Code string `json:"code"`
}

func Lexing(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", "*")
    w.Header().Set("Content-Type", "application/json")
    w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
    w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
    

    var ui UserInput
    err := json.NewDecoder(r.Body).Decode(&ui)
    if err != nil {
        return
    }

    fmt.Println(ui.Code)

    lex := lexer.New(ui.Code)
    fmt.Println(lex)
    json.NewEncoder(w).Encode(lex)
}

func main() {
    //var source_code string
    //fmt.Println("Enter in your source code...")
    //fmt.Scan(&source_code)

    http.HandleFunc("/lex", Lexing)
        
    fmt.Println("My App is running on: http://localhost:8084")
    http.ListenAndServe("0.0.0.0:8084", nil)

    //l := lexer.New(source_code)
    //fmt.Println(l)
}
