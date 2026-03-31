package lexer

import (
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
