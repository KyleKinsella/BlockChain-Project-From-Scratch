package lexer

import (
    //"net/http"
    //"fmt"
)

type Lexer struct {
    Input string
    CurToken string 
    NextToken string
}

func New(input string) *Lexer {
    l := &Lexer{Input: input}
    return l
}

//func Lexing(w http.ResponseWriter, r *http.Request) {
    //w.Header().Set("Access-Control-Allow-Origin", "*")
    //w.Header().Set("Content-Type", "application/json")

    //lex := New("var i = 5;")
    //json.NewEncoder(w).Encode(lex)
//}
