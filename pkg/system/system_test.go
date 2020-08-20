package system

import (
	"testing"
)


func TestReboot(t *testing.T) {
	err := Reboot()
	if err != nil {
		t.Error(err)
	}

}