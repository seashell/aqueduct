package console

import (
	"io"
	"os/exec"
)

type console struct {
	cmd *exec.Cmd
}

func New() *console {
	return &console{
		cmd: exec.Command("/bin/bash"),
	}
}

func (c *console) Open() (io.Writer, io.Reader, error) {

	stdin, _ := c.cmd.StdinPipe()
	stdout, _ := c.cmd.StdoutPipe()

	err := c.cmd.Start()

	if err != nil {
		return nil, nil, err
	}

	return stdin, stdout, nil
}

func (c *console) Close() error {
	return c.Close()
}
