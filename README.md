# 📦 MEAN Stack CRUD Application

## 📌 Overview

This project demonstrates containerization, CI/CD automation, and cloud deployment of a full-stack **MEAN (MongoDB, Express, Angular 15, Node.js)** CRUD application.

The application allows users to manage a collection of tutorials with the following fields:

* ID
* Title
* Description
* Published Status

Users can:

* ✅ Create tutorials
* ✅ Retrieve tutorials
* ✅ Update tutorials
* ✅ Delete tutorials
* ✅ Search tutorials by title

The entire application is containerized using Docker and deployed using Docker Compose on an Ubuntu cloud VM. A CI/CD pipeline automatically builds and deploys updated Docker images.

---

# 🏗️ Tech Stack

| Layer            | Technology            |
| ---------------- | --------------------- |
| Frontend         | Angular 15            |
| Backend          | Node.js + Express     |
| Database         | MongoDB 6             |
| Containerization | Docker                |
| Orchestration    | Docker Compose        |
| CI/CD            | GitHub Actions        |
| Reverse Proxy    | Nginx                 |
| Cloud            | Ubuntu VM (AWS/Azure) |

---

# 📂 Project Structure

```
crud-dd-task-mean-app/
│
├── backend/
│   ├── app/
│   ├── server.js
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

---

# 🐳 Docker Setup (Local Development)

## 🔹 Build and Run Containers

```bash
docker compose build
docker compose up
```

Application URLs:

* Frontend → [http://localhost:8081](http://localhost:8081)
* Backend API → [http://localhost:8080](http://localhost:8080)
* MongoDB → Port 27017

---

# ⚙️ Docker Configuration

## Backend

* Built using Node 18 Alpine image
* Exposes port 8080
* Connects to MongoDB container using service name `mongo`

## Frontend

* Multi-stage build (Node build stage + Nginx production stage)
* Serves production Angular build via Nginx
* Exposes port 80 inside container

## MongoDB

* Uses official MongoDB 6 image
* Data persisted using Docker volume

---

# ☁️ Cloud Deployment (Ubuntu VM)

## 1️⃣ Install Docker & Docker Compose

```bash
sudo apt update
sudo apt install docker.io docker-compose -y
```

## 2️⃣ Clone Repository

```bash
git clone <repository-url>
cd crud-dd-task-mean-app
```

## 3️⃣ Run Application

```bash
docker compose up -d
```

---

# 🔁 CI/CD Pipeline (GitHub Actions)

The CI/CD workflow performs:

1. Trigger on every push to main branch
2. Build frontend & backend Docker images
3. Push images to Docker Hub
4. SSH into Ubuntu VM
5. Pull latest images
6. Restart Docker containers

Workflow file location:

```
.github/workflows/deploy.yml
```

---

# 🌐 Nginx Reverse Proxy Configuration

Nginx is configured on the Ubuntu VM to route traffic from port 80 to the frontend container.

Configuration file:

```
/etc/nginx/sites-available/default
```

Example configuration:

```nginx
server {
    listen 80;

    location / {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

After configuration:

```bash
sudo systemctl restart nginx
```

Application accessible via:

```
http://<VM_PUBLIC_IP>
```

---


# 🔐 Notes

* MongoDB runs as a container service
* Docker volumes ensure data persistence
* Versioned Docker image tagging used for controlled deployment
* VM infrastructure is kept running for live demonstration

---

# 🚀 How to Stop the Application

```bash
docker compose down
```

---
