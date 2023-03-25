package speech

import (
	"fmt"
	"os"

	mqtt "github.com/eclipse/paho.mqtt.golang"
)

type ISpeechRepository interface {
	PublishSpeech(message interface{})
}

type SpeechRepository struct {
	MQTTClient mqtt.Client
}

func NewSpeechRepository(client mqtt.Client) ISpeechRepository {
	return &SpeechRepository{
		MQTTClient: client,
	}
}

func (repo SpeechRepository) PublishSpeech(message interface{}) {
	topic := os.Getenv("MQTT_PUBLISH_TOPIC")
	repo.MQTTClient.Publish(topic, 0, false, message)
	fmt.Println("Publish to topic: " + topic)
}
