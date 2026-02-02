package main

import (
	"BlockChainProjectFromScratch/Wallet"
	"net/http"
	"fmt"
)

func main() {
	http.HandleFunc("/initWallet", wallet.SetupWallet)
	http.HandleFunc("/nwallets", wallet.CreateMultipleWallets)
		
	fmt.Println("My App is running on: http://localhost:8082")
	http.ListenAndServe(":8082", nil)
}
