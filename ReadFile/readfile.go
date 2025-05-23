package ReadFile

import (
	"fmt"
	"os"
	"strings"
)

func ReadFile(file string) []string {
	filename, err := os.ReadFile(file)
	if err != nil {
		panic(err)
	}
	lines := strings.Split(string(filename), "\n")
	return lines
}

func main() {
	file := "keywords.txt"
	fmt.Println(ReadFile(file))
}