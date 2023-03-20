package speechpublisherhandler

import (
	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/gin-gonic/gin"
	"github.com/jirawat-rackz/go-speech-publisher/pkg/model"
	"github.com/jirawat-rackz/go-speech-publisher/pkg/speech"
)

type ISpeechPublisherHandler interface {
	SpeechPublisher(c *gin.Context)
}

type SpeechPublisherHandler struct {
	SpeechService speech.ISpeechService
}

func NewSpeechPublisherHandler(client mqtt.Client) ISpeechPublisherHandler {
	return &SpeechPublisherHandler{
		SpeechService: speech.NewSpeechService(client),
	}
}

func (handler SpeechPublisherHandler) SpeechPublisher(c *gin.Context) {

	var data model.RequestGetSpeech

	if err := c.ShouldBindJSON(&data); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	err := handler.SpeechService.ProcessPublishSpeech(data)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "success"})
}
