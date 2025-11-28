// This package will store your funds.
// These funds in your wallet will be used for paying transaction fees
// and
// whatever funds you "bid" for an asset or "nft" in my DAO

// Potential Idea's:
// The wallet might have an address for where the funds are, but I'm not sure if I'll do this... //

package wallet

import (
	"fmt"
)

type Wallet struct {
	Funds float32
}

func SetWalletFunds(wallet Wallet) float32 {
	return wallet.Funds
}

func GetWalletFunds(setFunds float32) {
	fmt.Printf("Wallet contains funds: [%v]\n", setFunds)
}