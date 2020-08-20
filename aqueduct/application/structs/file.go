package structs

import "time"

type GetFileInput struct {
	Path string
}

type GetFileOutput struct {
	// Path, e.g. `/opt/test/image.jpg`
	Path string `json:"path"`

	// File extension, e.g. `.jpg`
	Extension string `json:"extension"`

	// Is a directory, default: false
	IsDir bool `json:"isDir"`

	// Is a hidden file, default: false
	IsHidden bool `json:"isHidden"`

	// Is a symlink, default: false
	IsSymlink bool `json:"isSymLink"`

	// File size in bytes
	Size int `json:"size"`

	// Last change date (or its string representation)
	ModDate time.Time `json:"modifiedAt"`

	// Number of files inside of a folder (only for folders)
	ChildrenCount int `json:"childrenCount"`
}

type DeleteFileInput struct {
	Path string
}

type ListFilesInput struct {
}

type ListFilesOutput struct {
	Items []*GetFileOutput `json:"items"`
}
