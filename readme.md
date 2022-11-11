# Performance testing Demo with K6 Framework

## repo used on the following blog post

### What is needed to run it
- Java / Maven 
- Docker / Docker-compose 
- Node JS 

### Java Project 
`cd appDemo`  
`mvn clean install`  
`docker build -t rafmaia/appdemo .`

### Docker 
`docker-compose up -d`

## Run the examples. 

#### Smoke testing
`docker-compose run -v \
    $PWD/samples:/scripts \
    k6 run /scripts/smokeTesting.js`

#### Stress Testing 
`docker-compose run -v \
    $PWD/samples:/scripts \
    k6 run /scripts/stressTesting.js`

#### Spike Testing 
`docker-compose run -v \
    $PWD/samples:/scripts \
    k6 run /scripts/spikeTesting.js`

##### Test Results 
![Spike Testing](/assets/spike.png "Spike Testing")

#### Load testing 
`docker-compose run -v \
    $PWD/samples:/scripts \
    k6 run /scripts/loadTesting.js`

#### Soak Testing 
`docker-compose run -v \
    $PWD/samples:/scripts \
    k6 run /scripts/test01.js`
