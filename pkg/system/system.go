package system

import (
	"github.com/godbus/dbus/v5"
)

// Reboot :
func Reboot() error {

	dbusPath := dbus.ObjectPath("/org/freedesktop/login1")
	dbusObject := "org.freedesktop.login1"
	method := "Manager.Reboot"

	conn, err := dbus.SystemBus()
	if err != nil {
		return err
	}

	err = conn.Object(dbusObject, dbusPath).Call(dbusObject+"."+method, 0, true).Store()
	if err != nil {
		return err
	}

	return nil
}
