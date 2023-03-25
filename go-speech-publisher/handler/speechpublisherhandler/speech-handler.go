package speechpublisherhandler

import (
	"log"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
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

	file, err := c.FormFile("data")
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}
	log.Println(file.Filename)

	newFilename := uuid.New().String() + ".wav"

	c.SaveUploadedFile(file, "./temp/"+newFilename)

	userId := c.Request.FormValue("user_id")

	data.Data = newFilename
	data.UserId = userId

	err = handler.SpeechService.ProcessPublishSpeech(data)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "success"})
}
