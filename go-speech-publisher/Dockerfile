FROM golang:1.20-alpine3.17 as builder

ENV TZ="Asia/Bangkok"

ARG APP_NAME=app
ENV APP_NAME $APP_NAME

RUN apk update && \
    apk --update upgrade && \
    apk add --no-cache ca-certificates gcc musl-dev git make && \
    update-ca-certificates && \
    rm -rf /var/cache/apk/*

WORKDIR /app

COPY . .
RUN go build -o main ./cmd/${APP_NAME}/main.go
RUN chmod +x main

FROM alpine:latest

ARG PORT=8080
ENV PORT $PORT

WORKDIR /app

RUN export GIN_MODE=release
COPY --from=builder /app/main ./main
RUN chmod +x main

EXPOSE ${PORT}

CMD [ "./main" ]

