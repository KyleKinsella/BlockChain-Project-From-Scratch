package dao

import (
	"encoding/json"
	"net/http"
)

func DAO(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode("This is going to be my DAO code...")
}