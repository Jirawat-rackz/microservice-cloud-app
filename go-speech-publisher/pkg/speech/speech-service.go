package speech

import (
	"encoding/json"
	"errors"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/jirawat-rackz/go-speech-publisher/pkg/model"
)

type ISpeechService interface {
	ProcessPublishSpeech(data model.RequestGetSpeech) error
}

type SpeechService struct {
	SpeechRepository ISpeechRepository
}

func NewSpeechService(client mqtt.Client) ISpeechService {
	return &SpeechService{
		SpeechRepository: NewSpeechRepository(client),
	}
}

func (service SpeechService) ProcessPublishSpeech(data model.RequestGetSpeech) error {

	if data.UserId == "" {
		return errors.New("user_id is required")
	}

	message, err := json.Marshal(&data)
	if err != nil {
		return err
	}

	service.SpeechRepository.PublishSpeech(message)
	return nil
}
