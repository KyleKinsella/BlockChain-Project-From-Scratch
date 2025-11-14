package ReadFile

import (
	"fmt"
	"os"
	"strings"
)

func ReadFile(file string) []string {
	filename, _ := os.ReadFile(file)
	// if err != nil {
	// 	panic(err)
	// }
	lines := strings.Split(string(filename), "0x")
	return lines
}

func main() {
	file := "keywords.txt"
	fmt.Println(ReadFile(file))
}