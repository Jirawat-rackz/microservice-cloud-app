package main

import (
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/jirawat-rackz/go-speech-publisher/environn"
)

func main() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	subClient := mqtt.NewClient(environn.MQTTOption())
	if token := subClient.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	sub(subClient)
	<-c
}

func sub(client mqtt.Client) {
	apiPath := environn.PBApi()
	topic := os.Getenv("MQTT_SUBSCRIBE_TOPIC")
	token := client.Subscribe(topic, 1, func(client mqtt.Client, msg mqtt.Message) {
		payload := string(msg.Payload())
		fmt.Printf("Received message: %s from topic: %s", payload, msg.Topic())

		c := http.Client{Timeout: time.Duration(1) * time.Second}
		resp, err := c.Post(apiPath, "application/json", strings.NewReader(payload))
		if err != nil {
			fmt.Println(err)
			return
		}

		fmt.Printf("Update status to pocketbase: %s", resp.Status)
	})
	token.Wait()
	fmt.Printf("Subscribed to topic: %s", topic)
}
