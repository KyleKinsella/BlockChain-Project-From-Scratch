package main

import (
    "BlockChainProjectFromScratch/my_interpreter/lexer"
    "fmt"
)

func main() {
    var source_code string
    fmt.Println("Enter in your source code...")
    fmt.Scan(&source_code)

    l := lexer.New(source_code)
    fmt.Println(l)
}
