#!/bin/sh

hotspot_ssid=${HOTSPOT_SSID}

aqueduct agent --enable-hotspot --hotspot-ssid ${hotspot_ssid} --http-port 80 