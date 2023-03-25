# X-Stack
This project was created for EN814710 Cloud Applications and Networking. \
One-Command Deployment. We provide a fast and easy deployment strategy.

# Member
นายธนชัย แก้วแสน 623040136-9 \
นายจิราวัฒน์ กุระขันธ์ 623040224-2 \
นายวรายุทธ ภูมิวัฒฑราคานนท์ 623040323-0 \
นายศุกล สหุนาลุ 623040495-1 \
นายอดิศร วงษ์ลคร 623040652-1

# Topology


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
