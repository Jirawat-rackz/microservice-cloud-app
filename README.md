# X-Stack
This project was created for EN814710 Cloud Applications and Networking. \
One-Command Deployment. We provide a fast and easy deployment strategy.

# Member
Thanachai Kaewsaen 623040136-9 \
Jirawat Kurakhan 623040224-2 \
Warayut Poomiwatracanont 623040323-0 \
Sukon Sahunalu 623040495-1 \
Adison Wonglakhon 623040652-1

# Topology




# Setting up
You need to go to https://platform.openai.com/ and get API secret key from there. \
If you don't have one, please click at <b>Create new secret key</b> to get one. \
API key might be in format like "sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"

```bash
cd microservice-cloud-app
vim docker-compose.yaml

---Output---
environment:
  - OPENAI_API_KEY=sk-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

# Run with Docker Compose

Verify that Docker Compose is installed correctly by checking the version.
(https://github.com/docker/compose/releases)
```bash
docker compose version

---Output---
Docker Compose version v2.15.1
```

Linux
```bash
docker compose up
```

Windows
```powershell
docker-compose up
```

If your have any problem when docker build
```bash
docker compose up --build
```
## Usage

### Front-End ([NextJS](https://nextjs.org/docs/getting-started))
http://localhost:3000
| Username | Password   | 
|----------|------------|
| admin    | 1234567890 |

### Back-End ([Pocketbase](https://pocketbase.io/))
http://localhost:8090/_/
| Username         | Password   | 
|------------------|------------|
| admin@xstack.com | 1234567890 |

### MQTT ([EMQX Dashboard](https://www.emqx.io/))
http://localhost:18083
| Username | Password |
|----------|----------|
| admin    | public   |

# Run with Docker Swarm
## Install Multipass on Linux
```bash
sudo snap install multipass

# Create a Ubuntu 22.04.1 LTS VM instances
multipass launch --name manager
multipass launch --name worker1
multipass launch --name worker2
```

Create a Swarm (Manager)
```bash
docker swarm init --advertise-addr <MANAGER IP Address>
```

Join to Swarm (Worker)
```bash
docker swarm join --token <TOKEN>

If you have problem when the worker nodes don't join to the swarm
docker swarm leave –-force
```

Check your Docker Swarm Cluster
```bash 
docker node ls
```

## Deploy and check your application
```bash
docker stack deploy -c docker-compose.yaml x-stack
```

Check your task or application
```bash
docker service ls
```

 Tear down your application
 ```bash
 docker stack rm x-stack
 ```
