package main

import (
	"BlockChainProjectFromScratch/MyCurrency"
	"fmt"
	"math/rand/v2"
)

func sumTotalValue(arr[] float32) float32 {
	var sum float32
	for i:=0; i<len(arr); i++ {
		sum += arr[i]
	}
	return sum
}

func main() {
	var ui float32
	var totalFunds[] float32 

	// get user input //
	fmt.Println("Enter in the amount you wish to stake:")
	fmt.Scan(&ui)

	// get a random number either between 0-99 or 1-100 //
	random := rand.IntN(100)

	// edge cases for user input // 
	if int(ui) > random {
		fmt.Println("you cannot stake more than the random number!")
		return
	}

	if ui < 0.01 {
		fmt.Println("you cannot stake less than 0.01, try again!")
		return
	}

	// loop whatever the value of random is // 
	for i:=0; i<random; i++ {
		// call my made up currency function // 
		amountOfFunds := MyCurrency.MyCurrency()

		// add the value of "amountOfFunds" to the "totalFunds" array // 
		totalFunds = append(totalFunds, amountOfFunds)
	}

	// whatever is in the array sum up the values then print the result // 
	total := sumTotalValue(totalFunds)
	fmt.Println("Result:", total)
}