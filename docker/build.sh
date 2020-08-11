#!/bin/bash

CONTEXT_PATH="$1"
DOCKERFILE_PATH="$2"

docker run --rm --privileged docker/binfmt:66f9012c56a8316f9244ffd7622d7c21c1f6f28d
docker buildx build --platform linux/amd64,linux/arm64 "$CONTEXT_PATH" -f "$DOCKERFILE_PATH" -t seashelltechnology/wiman --push