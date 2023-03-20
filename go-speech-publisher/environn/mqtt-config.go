package environn

import (
	"fmt"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/google/uuid"
	"github.com/spf13/viper"
)

var messagePubHandler mqtt.MessageHandler = func(client mqtt.Client, msg mqtt.Message) {
	// db := influxdb2.NewClient(viper.GetString("influxdb.url"), viper.GetString("influxdb.token"))
	// // always close client at the end
	// defer db.Close()
	// writeAPI := db.WriteAPI(viper.GetString("influxdb.organization"), viper.GetString("influxdb.bucket"))

	// // write line protocol
	// writeAPI.WriteRecord(string(msg.Payload()))
	// // Flush writes
	// writeAPI.Flush()
	fmt.Printf("Message received: %s\n", msg.Payload())
}

var connectHandler mqtt.OnConnectHandler = func(client mqtt.Client) {
	fmt.Println("Connected")
}

var connectLostHandler mqtt.ConnectionLostHandler = func(client mqtt.Client, err error) {
	fmt.Printf("Connect lost: %v", err)
}

func MQTTPublishOption() *mqtt.ClientOptions {
	mqtt_host := viper.GetString("MQTT_HOST")
	mqtt_port := viper.GetInt("MQTT_PORT")
	options := mqtt.NewClientOptions()
	options.AddBroker(fmt.Sprintf("mqtt://%s:%d", mqtt_host, mqtt_port))
	options.SetClientID(uuid.New().String())
	options.SetAutoReconnect(true)
	options.OnConnect = connectHandler
	options.OnConnectionLost = connectLostHandler
	options.CleanSession = false
	return options
}

func MQTTSubscribeOption() *mqtt.ClientOptions {
	mqtt_host := viper.GetString("MQTT_HOST")
	mqtt_port := viper.GetInt("MQTT_PORT")
	options := mqtt.NewClientOptions()
	options.AddBroker(fmt.Sprintf("mqtt://%s:%d", mqtt_host, mqtt_port))
	options.SetClientID(uuid.New().String())
	options.SetAutoReconnect(true)
	options.SetDefaultPublishHandler(messagePubHandler)
	options.OnConnect = connectHandler
	options.OnConnectionLost = connectLostHandler
	options.CleanSession = false
	return options
}
