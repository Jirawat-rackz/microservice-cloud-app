package model

type RequestGetSpeech struct {
	UserId string `json:"user_id"`
	Data   string `json:"data"`
}
