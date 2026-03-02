package ReadFile

import (
	"os"
	"strings"
)

func ReadAddresses(file string) []string {
	filename, _ := os.ReadFile(file) 
	return strings.Split(string(filename), "0x")
}

func ReadKeywords(file string) []string {
	filename, _ := os.ReadFile(file) 
	return strings.Split(string(filename), "\n")
}
