# aqueduct

Aqueduct is a simple tool to facilitate the provisioining and configuration of Linux-enabled devices by developers and end-users. 

<p align="center"> 
<img src="../assets/demo.gif"/>
</p>


### Use cases
- Manually setting up Linux devices (network,provisioning, etc)
- Improving the development experience for devices without a GUI
- ...

### Features

- Single binary, lightweight
- Automatic WiFi AP setup on supported hardware
- Visualization and configuration of WiFi networks seen by the device
- Visualization and upload of files from/to the device
- Execution of simple commands such as rebooting, shutting down, cleaning up logs, etc
- Visualization of system information
- REST API + Responsive web UI

### How it works
On supported hardware, Aqueduct will automatically bring up an access point to which users can connect. Through a web UI, accessible via the AP, they are then able to interact with the device, performing sending provisioning and configuration data, as well as simple commands.


### Roadmap
- [x] Basic project layout
- [ ] Abstraction and exposure of host functionality through a REST API
- [x] Simple web UI for interacting with the API
- [ ] Project website / documentation portal
- [x] Shell access to the device via web UI
- [x] Containerization
- [ ] Test coverage
