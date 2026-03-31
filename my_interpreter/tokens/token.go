// this package is going to contain all of the types of tokens my programming langauge is going to have
package tokens

const (
    VARIABLE = "VARIABLE"
    INT = "INT"

    ASSIGN = "="
    CHECK = "=="
    NOT = "!"

    LESS = "<"
    GREATER = ">"
    
    PLUS = "+"
    MINUS = "-"
    MUL = "*"
    DIV = "/"

    COMMA = ","
    SEMICOLON = ";"

    OPENNORMAL = "("
    CLOSENORMAL = ")"

    OPENSQUARE = "["
    CLOSESQUARE = "]"

    OPENCURLY = "{"
    CLOSECURLY = "}"

    FN = "fn"
    TRUE = "true"
    FALSE = "false"
    IF = "if"
    ELSE = "else"
    STOP = "stop" // this is my return

    // this is going to be for my tunrary operators
    COLON = ":"
    QUESTION_MARK = "?"

    STRING = "string"
    END_OF_FILE = "EOF"
    NO = "NO" // token is not supported
)

func GetAllTokens() []string {
    return []string{VARIABLE, INT, ASSIGN, CHECK, NOT, LESS, GREATER, PLUS, MINUS, MUL, DIV, COMMA, SEMICOLON, OPENNORMAL, CLOSENORMAL, OPENSQUARE, CLOSESQUARE, OPENCURLY, CLOSECURLY, FN, TRUE, FALSE, IF, ELSE, STOP, COLON, QUESTION_MARK, STRING, END_OF_FILE, NO}
}

func ValidToken(tokens []string) bool {
    for i, token := range tokens {
        if token == tokens[i] {
            return true
        }
    }
    return false
}
