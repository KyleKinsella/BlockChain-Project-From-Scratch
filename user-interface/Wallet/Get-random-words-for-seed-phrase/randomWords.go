package main

import (
	"BlockChainProjectFromScratch/Blocks"
	"encoding/json"
	"io"
	"net/http"
	"os"
)

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

func createFile(words []string) {
	file, err := os.Create("file.txt")

	if err != nil {
		panic(err)
	}

	defer file.Close()

	for _, n := range words {
		file.WriteString(n + "\n")
	}
}

// this function will send the random words in the "file.txt" to the frontend
func SendRandomWordsToFrontend(w http.ResponseWriter, r *http.Request) {
	// TODO 
}

func main() {
	var seedPhrase []string

	for range 12 {
		randomWords := getRandomWords()
		word := Blocks.GetRandomString(randomWords)
	
		seedPhrase = append(seedPhrase, word)
	}

	createFile(seedPhrase)
}