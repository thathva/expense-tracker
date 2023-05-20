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
	Id       int
	Username string `json:"username"`
	Password string `json:"password"`
}

type ExpenseType int

const (
	Credit ExpenseType = iota
	Debit
)

type Expense struct {
	User     User
	Id       int         `json:"id"`
	Name     string      `json:"expensename"`
	Year     int         `json:"year"`
	Month    int         `json:"month"`
	Day      int         `json:"day"`
	Category string      `json:"category"`
	Amount   float32     `json:"amount"`
	Type     ExpenseType `json:"expensetype"`
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

func Create(w http.ResponseWriter, r *http.Request) {
	var expense Expense
	err := json.NewDecoder(r.Body).Decode(&expense)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	db := setupDB()
	defer db.Close()
	var user User
	err = db.QueryRow("SELECT id FROM users WHERE id = $1", expense.User.Id).Scan(&user.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = db.Exec("INSERT INTO expenses (name, year, month, day, category, amount, type, userid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
		expense.Name, expense.Year, expense.Month, expense.Day, expense.Category, expense.Amount, int(expense.Type), user.Id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func View(w http.ResponseWriter, r *http.Request) {
	userId := r.URL.Query().Get("userId")
	db := setupDB()
	defer db.Close()

	rows, err := db.Query("SELECT name, category, amount, year, month, day, type FROM expenses WHERE userid = $1", userId)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var expenses []Expense
	for rows.Next() {
		var expense Expense
		err := rows.Scan(&expense.Id, &expense.Name, &expense.Category, &expense.Amount, &expense.Year, &expense.Month, &expense.Day, &expense.Type)
		if err != nil {
			fmt.Println(err.Error())
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		expenses = append(expenses, expense)
	}

	if err = rows.Err(); err != nil {
		fmt.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Convert expenses to JSON
	jsonData, err := json.Marshal(expenses)
	if err != nil {
		fmt.Println(err.Error())
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Set the appropriate HTTP headers
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Write the JSON response
	w.Write(jsonData)
}

func main() {
	router := mux.NewRouter()

	// Route handles & endpoints

	router.HandleFunc("/login", Login).Methods("POST")

	router.HandleFunc("/register", Register).Methods("POST")

	router.HandleFunc("/create", Create).Methods("POST")

	router.HandleFunc("/view", View).Methods("GET")

	// serve the app
	fmt.Println("Server at 8000")
	log.Fatal(http.ListenAndServe(":8000", router))
}
