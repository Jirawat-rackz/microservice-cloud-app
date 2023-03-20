package main

import (
	"fmt"
	"os"
	"os/signal"
	"strings"
	"syscall"
	"time"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/jirawat-rackz/go-speech-publisher/environn"
	"github.com/spf13/viper"
)

func init() {
	viper.SetConfigName(".env.example") // name of config file (without extension)
	viper.SetConfigType("env")          // REQUIRED if the config file does not have the extension in the name
	viper.AddConfigPath(".")            // optionally look for config in the working directory
	err := viper.ReadInConfig()         // Find and read the config file
	if err != nil {
		fmt.Printf("Fatal error config file: %s \n", err)
	}

	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))
	viper.AutomaticEnv()
}

func main() {
	c := make(chan os.Signal, 1)
	signal.Notify(c, os.Interrupt, syscall.SIGTERM)

	subClient := mqtt.NewClient(environn.MQTTSubscribeOption())
	if token := subClient.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	}

	sub(subClient)
	<-c
}

func sub(client mqtt.Client) {
	topic := viper.GetString("MQTT_SUBSCRIBE_TOPIC")
	token := client.Subscribe(topic, 1, func(client mqtt.Client, msg mqtt.Message) {
		fmt.Println(string(msg.Payload()))
	})
	token.Wait()
	time.Sleep(5 * time.Second)
	fmt.Printf("Subscribed to topic: %s", topic)
}
