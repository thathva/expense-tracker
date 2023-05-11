package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"golang.org/x/crypto/bcrypt"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

const (
	DB_USER     = "postgres"
	DB_PASSWORD = "password"
	DB_NAME     = "expense-tracker"
)

type User struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func setupDB() *sql.DB {
	dbinfo := fmt.Sprintf("user=%s password=%s dbname=%s sslmode=disable", DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	return db
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}

// Login handles the login endpoint
func Login(w http.ResponseWriter, r *http.Request) {
	// Decode the user from the request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Query the database for the user
	db := setupDB()
	defer db.Close()

	var dbUser User
	err = db.QueryRow("SELECT username, password FROM users WHERE username=$1", user.Username).Scan(&dbUser.Username, &dbUser.Password)
	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Compare the hashed password
	err = bcrypt.CompareHashAndPassword([]byte(dbUser.Password), []byte(user.Password))
	if err != nil {
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Return success
	w.WriteHeader(http.StatusOK)
}

// Register handles the register endpoint
func Register(w http.ResponseWriter, r *http.Request) {
	// Decode the user from the request body
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Hash the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Insert the user into the database
	db := setupDB()
	defer db.Close()

	var dbUser User
	err = db.QueryRow("SELECT username, password FROM users WHERE username=$1", user.Username).Scan(&dbUser.Username, &dbUser.Password)
	if err == nil {
		http.Error(w, "User already exists!", http.StatusBadRequest)
		return
	} else if err != sql.ErrNoRows {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = db.Exec("INSERT INTO users (username, password) VALUES ($1, $2)", user.Username, hashedPassword)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Return success
	w.WriteHeader(http.StatusOK)
}

func main() {
	router := mux.NewRouter()

	// Route handles & endpoints

	router.HandleFunc("/login", Login).Methods("POST")

	router.HandleFunc("/register", Register).Methods("POST")

	// serve the app
	fmt.Println("Server at 8000")
	log.Fatal(http.ListenAndServe(":8000", router))
}
