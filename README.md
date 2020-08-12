# aqueduct

Aqueduct is a simple tool to facilitate the provisioining and configuration of Linux-enabled devices by developers and end-users. 

### Features

- Single binary, lightweight
- Automatic WiFi AP setup on supported hardware
- Visualization and configuration of WiFi networks seen by the device
- Visualization and upload of files from/to the device
- Execution of simple commands such as rebooting, shutting down, cleaning up logs, etc
- Visualization of system information
- REST API + Responsive web UI

### How it works
On supported hardware, Aqueduct will automatically bring up an access point to which users can connect in order to access a web UI through which provisioning and configuration data, as well as simple commands can be sent to the device.


### Roadmap
- [x] Basic project layout
- [ ] Abstraction and exposure of host functionality through a REST API
- [x] Simple web UI for interacting with the API
- [ ] Project website / documentation portal
- [ ] SSH terminal for accessing the device via web UI
- [ ] Containerization
- [ ] Test coverage
