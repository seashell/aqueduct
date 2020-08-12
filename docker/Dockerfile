
FROM alpine:3.12 as runner

RUN apk add dnsmasq

FROM golang:alpine as builder

RUN apk add make

ENV GOPATH ""
COPY . .
RUN go build -o aqueduct ./cmd/main.go && cp aqueduct /bin/aqueduct

FROM runner
COPY --from=builder /bin/aqueduct /bin/aqueduct

ENTRYPOINT ["aqueduct"]