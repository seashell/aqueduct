package console

import (
	"io"
	"os/exec"
)

// Console :
type Console struct {
	cmd *exec.Cmd
}

// New :
func New() *Console {
	return &Console{
		cmd: exec.Command("/bin/sh"),
	}
}

// Open :
func (c *Console) Open() (io.Writer, io.Reader, error) {

	stdin, _ := c.cmd.StdinPipe()
	stdout, _ := c.cmd.StdoutPipe()

	err := c.cmd.Start()

	if err != nil {
		return nil, nil, err
	}

	return stdin, stdout, nil
}

// Close :
func (c *Console) Close() error {
	return c.Close()
}
