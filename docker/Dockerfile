
FROM alpine:3.12 as runner

#RUN apk add dnsmasq

FROM golang:alpine as builder

ENV GOPATH ""
COPY . .
RUN go build -o /bin/aqueduct

FROM runner
COPY --from=builder /bin/aqueduct /bin/aqueduct
COPY ./docker/entrypoint.sh .

ENTRYPOINT ["./entrypoint.sh"]