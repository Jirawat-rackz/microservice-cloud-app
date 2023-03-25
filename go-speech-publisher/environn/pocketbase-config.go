package environn

import (
	"fmt"
	"os"
)

func PBApi() string {
	protocol := os.Getenv("POCKETBASE_PUBLISH_PROTOCOL")
	host := os.Getenv("POCKETBASE_PUBLISH_HOST")
	port := os.Getenv("POCKETBASE_PUBLISH_PORT")
	path := os.Getenv("POCKETBASE_PUBLISH_PATH")

	apiPath := fmt.Sprintf("%s://%s:%s%s", protocol, host, port, path)
	return apiPath
}
