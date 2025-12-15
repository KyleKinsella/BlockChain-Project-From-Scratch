package main

import (
	"BlockChainProjectFromScratch/Blocks"
	"BlockChainProjectFromScratch/ReadFile"
	"encoding/json"
	"fmt"
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

func initSeed() {
	var seedPhrase []string

	for range 12 {
		randomWords := getRandomWords()
		word := Blocks.GetRandomString(randomWords)
	
		seedPhrase = append(seedPhrase, word)
	}

	createFile(seedPhrase)
}

func SendRandomWordsToFrontend(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	
	file := ReadFile.ReadKeywords("./file.txt")
	json.NewEncoder(w).Encode(file)
}

func main() {
	http.HandleFunc("/seed", SendRandomWordsToFrontend)
	
	fmt.Println("My App is running on: http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}