#!/bin/bash

docker pull seashelltechnology/aqueduct

docker run --rm -ti \
      --name aqueduct \
      --env HOTSPOT_SSID="$(hostname)" \
      --env DBUS_SESSION_BUS_ADDRESS="$DBUS_SESSION_BUS_ADDRESS" \
      --volume /run/user/1000/bus:/run/user/1000/bus \
      --volume /run/dbus/system_bus_socket:/run/dbus/system_bus_socket \
      --network host \
      --pid host \
      --privileged \
      seashelltechnology/aqueduct
      