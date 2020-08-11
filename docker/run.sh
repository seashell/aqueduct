#!/bin/bash

docker pull seashelltechnology/wiman

docker run --rm -ti \
      --name wiman \
      --env DBUS_SESSION_BUS_ADDRESS="$DBUS_SESSION_BUS_ADDRESS" \
      --volume /run/user/1000/bus:/run/user/1000/bus \
      --volume /run/dbus/system_bus_socket:/run/dbus/system_bus_socket \
      --network host \
      --cap-add NET_ADMIN \
      seashelltechnology/wiman