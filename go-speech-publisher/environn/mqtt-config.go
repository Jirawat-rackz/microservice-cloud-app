package environn

import (
	"fmt"
	"os"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/google/uuid"
)

var connectHandler mqtt.OnConnectHandler = func(client mqtt.Client) {
	fmt.Println("Connected")
}

var connectLostHandler mqtt.ConnectionLostHandler = func(client mqtt.Client, err error) {
	fmt.Printf("Connect lost: %v", err)
}

func MQTTOption() *mqtt.ClientOptions {
	mqtt_host := os.Getenv("MQTT_HOST")
	mqtt_port := os.Getenv("MQTT_PORT")
	options := mqtt.NewClientOptions()
	options.AddBroker(fmt.Sprintf("mqtt://%s:%s", mqtt_host, mqtt_port))
	options.SetClientID(uuid.New().String())
	options.SetAutoReconnect(true)
	options.OnConnect = connectHandler
	options.OnConnectionLost = connectLostHandler
	options.CleanSession = false
	return options
}
