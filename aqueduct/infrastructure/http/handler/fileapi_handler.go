package handler

import (
	"fmt"
	"io"
	stdhttp "net/http"
	"os"
	"path/filepath"
	"strings"

	structs "github.com/seashell/aqueduct/aqueduct/application/structs"
	http "github.com/seashell/aqueduct/aqueduct/infrastructure/http"
	log "github.com/seashell/aqueduct/pkg/log"
)

type FileSystemHandlerAdapter struct {
	http.BaseHandlerAdapter
	path      string
	fsHandler http.HandlerAdapter
	logger    log.Logger
}

type FileSystemManager interface {
}

func NewFileSystemHandlerAdapter(path string, logger log.Logger) *FileSystemHandlerAdapter {

	fs := stdhttp.Dir(path)

	a := &FileSystemHandlerAdapter{
		path:      path,
		fsHandler: stdhttp.FileServer(fs),
	}
	a.logger = logger

	a.RegisterHandlerFunc("GET", "/", a.list)
	a.RegisterHandlerFunc("POST", "/", a.upload)
	a.RegisterHandlerFunc("DELETE", "/*filepath", a.delete)

	return a
}

func (a *FileSystemHandlerAdapter) list(resp http.Response, req *http.Request) (interface{}, error) {

	out := &structs.ListFilesOutput{
		Items: []*structs.GetFileOutput{},
	}

	err := filepath.Walk(a.path,
		func(path string, info os.FileInfo, err error) error {
			if err != nil {
				return err
			}
			if path != a.path { // Ignore root dir
				relPath := strings.Replace(path, a.path, "", 1)
				out.Items = append(out.Items, &structs.GetFileOutput{
					Path:       relPath,
					Size:       int(info.Size()),
					IsDir:      info.IsDir(),
					ModifiedAt: info.ModTime(),
					URL:        fmt.Sprintf("static/%s", relPath),
				})
			}
			return nil
		})
	if err != nil {
		a.logger.Errorf(err.Error())
	}

	return out, nil
}

func (a *FileSystemHandlerAdapter) upload(resp http.Response, req *http.Request) (interface{}, error) {

	req.ParseMultipartForm(32 << 20)

	m := req.MultipartForm

	files := m.File["files"]
	for i := range files {
		file, err := files[i].Open()

		defer file.Close()
		if err != nil {
			return nil, err
		}

		dst, err := os.Create(a.path + "/" + files[i].Filename)

		defer dst.Close()
		if err != nil {
			return nil, err
		}

		if _, err := io.Copy(dst, file); err != nil {
			return nil, err
		}

	}

	return nil, nil
}

func (a *FileSystemHandlerAdapter) delete(resp http.Response, req *http.Request) (interface{}, error) {

	in := &structs.DeleteFileInput{
		Path: req.Params["filepath"],
	}

	err := os.RemoveAll(a.path + "/" + in.Path)
	if err != nil {
		return nil, err
	}

	return nil, nil
}
