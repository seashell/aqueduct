package http

import (
	"errors"
	"fmt"
)

const (
	errMethodNotAllowed    = "method not allowed"
	erraqueductServerError = "aqueduct server error"
	errBadRequest          = "bad request"
	errNotAuthorized       = "not authorized"
	errNotImplemented      = "not implemented"
)

var (
	// ErrMethodNotAllowed :
	ErrMethodNotAllowed = errors.New(errMethodNotAllowed)

	// ErraqueductServerError :
	ErraqueductServerError = errors.New(erraqueductServerError)

	// ErrBadRequest :
	ErrBadRequest = errors.New(errBadRequest)

	// ErrNotAuthorized :
	ErrNotAuthorized = errors.New(errNotAuthorized)

	// ErrNotImplemented :
	ErrNotImplemented = errors.New(errNotImplemented)
)

// Error :
type Error interface {
	error
	Code() int
}

// Error represents an error generated by an HTTP handler.
type httpError struct {
	// Code is an HTTP status code corresponding to the error
	code int

	// Message is a human-readable message that describes the error
	message string
}

// NewError :
func NewError(code int, base error, extra ...interface{}) Error {
	return &httpError{code, fmt.Sprintf("%s %q", base.Error(), extra)}
}

// Error returns a string representation for the Error type
func (e *httpError) Error() string {
	return fmt.Sprintf("%s", e.message)
}

// Code
func (e *httpError) Code() int {
	return e.code
}
