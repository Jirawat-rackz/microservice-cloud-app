package model

type RequestGetSpeech struct {
	UserId string `json:"user_id"`
	Data   string `json:"data"`
}

type MessageToPublish struct {
	UserId string  `json:"user_id"`
	Data   []uint8 `json:"data"`
}
