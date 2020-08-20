package structs

import "time"

// GetFileInput :
type GetFileInput struct {
	Path string
}

// GetFileOutput :
type GetFileOutput struct {
	// Path, e.g. `/opt/test/image.jpg`
	Path string `json:"path"`

	// File extension, e.g. `.jpg`
	Extension string `json:"extension"`

	// Is a directory, default: false
	IsDir bool `json:"isDir"`

	// File size in bytes
	Size int `json:"size"`

	// Last change date (or its string representation)
	ModifiedAt time.Time `json:"modifiedAt"`

	// Number of files inside of a folder (only for folders)
	ChildrenCount int `json:"childrenCount"`

	// Download URL
	URL string `json:"url"`
}

// DeleteFileInput :
type DeleteFileInput struct {
	Path string
}

// ListFilesInput :
type ListFilesInput struct {
}

// ListFilesOutput :
type ListFilesOutput struct {
	Items []*GetFileOutput `json:"items"`
}
