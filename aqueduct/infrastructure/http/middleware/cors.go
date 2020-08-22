package middleware

import (
	"net/http"
)

// WithCORS :
func WithCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(rw http.ResponseWriter, req *http.Request) {
		rw.Header().Set("Access-Control-Allow-Origin", "*")
		rw.Header().Set("Access-Control-Allow-Methods", "*")
		rw.Header().Set("Access-Control-Allow-Headers", "Origin, Accept, Referer, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		if req.Method == "OPTIONS" {
			rw.WriteHeader(http.StatusOK)
			return
		}

		next(rw, req)
	}
}
