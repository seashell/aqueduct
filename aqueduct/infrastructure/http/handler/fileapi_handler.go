package handler

import (
	"fmt"
	"io"
	stdhttp "net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/seashell/aqueduct/aqueduct/application/structs"
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
	a.RegisterHandlerFunc("DELETE", "/:filename", a.delete)

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

			if path != a.path {
				fmt.Println(path)
				fmt.Println(info.Name())
				out.Items = append(out.Items, &structs.GetFileOutput{
					Path:     strings.Replace(path, a.path, "", 1),
					Size:     int(info.Size()),
					IsDir:    info.IsDir(),
					IsHidden: strings.HasPrefix(info.Name(), "."),
					ModDate:  info.ModTime(),
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
	file, handler, err := req.FormFile("uploadfile")
	if err != nil {
		return nil, err
	}
	defer file.Close()

	f, err := os.OpenFile(a.path+"/"+handler.Filename, os.O_WRONLY|os.O_CREATE, 0666)
	if err != nil {
		return nil, err
	}

	defer f.Close()
	io.Copy(f, file)

	return nil, nil
}

func (a *FileSystemHandlerAdapter) delete(resp http.Response, req *http.Request) (interface{}, error) {
	return nil, nil
}
