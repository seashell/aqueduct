package structs

import "time"

type GetFileInput struct {
}

type GetFileOutput struct {
	// (Required) String that uniquely identifies the file
	ID string

	// (Required) Full name, e.g. `MyImage.jpg`
	Name string

	// File extension, e.g. `.jpg`
	Extension string

	// Is a directory, default: false
	IsDir bool

	// Is a hidden file, default: false
	IsHidden bool

	// Is a symlink, default: false
	IsSymlink bool

	// File size in bytes
	Size int

	// Last change date (or its string representation)
	ModDate time.Time

	// Number of files inside of a folder (only for folders)
	ChildrenCount int

	// Any other user-defined property
	Properties []string
}

type DeleteFileInput struct {
	ID string
}

type DeleteFileOutput struct {
	ID string
}

type ListFilesInput struct {
}

type ListFilesOutput struct {
	Items []*GetFileOutput
}
