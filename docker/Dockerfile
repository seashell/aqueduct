
FROM alpine:3.12 as runner

RUN apk add dnsmasq

FROM golang:alpine as builder

RUN apk add make

ENV GOPATH ""
COPY . .
RUN go build -o wiman ./cmd/main.go && cp wiman /bin/wiman

FROM runner
COPY --from=builder /bin/wiman /bin/wiman

ENTRYPOINT ["wiman"]