package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/gin-contrib/cors"
	ginzap "github.com/gin-contrib/zap"
	"github.com/gin-gonic/gin"
	"github.com/jirawat-rackz/go-speech-publisher/environn"
	"github.com/jirawat-rackz/go-speech-publisher/handler/speechpublisherhandler"
	"go.uber.org/zap"
)

func main() {
	logger, _ := zap.NewProduction()

	r := gin.Default()
	r.Use(ginzap.Ginzap(logger, time.RFC3339, true))
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Access-Control-Allow-Headers", "access-control-allow-origin, access-control-allow-headers", "Content-Type", "X-XSRF-TOKEN", "Accept", "Origin", "X-Requested-With", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	client := mqtt.NewClient(environn.MQTTOption())
	if token := client.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	v1 := r.Group("/api/v1")

	speechHandler := speechpublisherhandler.NewSpeechPublisherHandler(client)

	v1.POST("/speech-upload", speechHandler.SpeechPublisher)

	port := fmt.Sprintf(":%s", os.Getenv("PORT"))

	srv := &http.Server{
		Addr:    port,
		Handler: r,
	}

	go func() {
		// service connections
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed { // listen and serve on 0.0.0.0:8080
			logger.Error("listen: ", zap.Error(err))
		}
	}()

	// Gracefully shutdown the server

	// Wait for interrupt signal to gracefully shutdown the server with
	// a timeout of 5 seconds.
	quit := make(chan os.Signal)

	//lint:ignore SA1017 ignore this!
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit
	log.Println("Shutdown Server ...")

	ctxR, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctxR); err != nil {
		log.Fatal("Server Shutdown:", err)
	}
	log.Println("Server exiting")
}
