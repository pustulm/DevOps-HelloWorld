# DevOps-HelloWorld

### **-OVERVIEW OF PROJECT-**

Simple project where my main goal was create a deployment for a Node.js app which prints "hello world" in console. 

### **-TECHNOLOGIES-**

- Docker
- Node.js
- Kubernetes (minikube)=
- Github Actions

### **-STEPS-**

1. *PREREQUISITES*
   
  - Docker and DockerHub account
  - Kubernetes (kubectl and minikube)
  - Github account
    
2. *PULL REPOSITORY FROM GITHUB TO YOUR LOCAL MACHINE*
  ```
  git clone github.com/pustulm/DevOps-HelloWorld
  ```
3. *DOCKERIZE YOUR APP*
  ```
  FROM node:20-alpine3.17

  WORKDIR /app

  COPY package*.json ./

  RUN npm install

  EXPOSE 3000

  COPY . .

  CMD [ "node", "app.js" ]
  ```
4. *CREATE GITHUB REPO AND ADD CREDENTIALS*
   
  First create a new repo for pulled node.js app or fork my repo.
  
  Then go to settings tabs and choose Secret and Variables->Actions.
  Add two repository token. First one call
  ```
  DOCKERHUB_TOKEN
  ```
  which one will store token that your create on DockerHub website.
  The second one should be called
  ```
  DOCKERHUB_USERNAME
  ```
  which one will store your DockerHub username.

4. *CREATE GITHUB ACTION WORKFLOW*

  ```
  name: Hello World CI/CD

on:
  push:
    branches: [ "master" ]
  pull_request:
    branches: [ "master" ]

jobs:
  job1:
      runs-on: ubuntu-latest
      name: Build docker Image and push to DockerHUB
      steps:
        -
          name: Set up QEMU
          uses: docker/setup-qemu-action@v2
        -
          name: Set up Docker Buildx
          uses: docker/setup-buildx-action@v2
        -
          name: Login to Docker Hub
          uses: docker/login-action@v2
          with:
            username: ${{ secrets.DOCKERHUB_USERNAME }}
            password: ${{ secrets.DOCKERHUB_TOKEN }}
        -
          name: Build and push
          uses: docker/build-push-action@v4
          with:
            push: true
            tags: your-dockerhub-username/image-name
  job2:
      runs-on: ubuntu-latest
      name: build Node.js app and deploy to Minikube
      steps:
      -  uses: actions/checkout@v2
      -  name: Start minikube
         uses: medyagh/setup-minikube@master
      -  name: Try cluser
         run: kubectl get pods -A
      -  name: Deploy to minikube
         run:
          kubectl apply -f kubernetesdeploy.yml
  ```  

***IN WORK***

### **-SUMMARY OF THE PROJECT-**

The main difference from [my previous project](https://github.com/pustulm/timelog) was the use of GithubActions in place of Jenkins, which I had previously used. Other than that, the project has no major differences. It was certainly a good exercise to solidify the processes that are essential in DevOps work, even though they are simple. It's more of a project that I don't plan to develop further in any way, just a consolidation of what I did previously with additional use of Github Actions. In other projects, he plans to develop other tools for Devops work.
