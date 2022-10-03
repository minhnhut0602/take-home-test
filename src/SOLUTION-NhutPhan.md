# Home test

Home test is an example to promote an event and allow visitors to sign up it.

* Author [***Nhut Phan***] - minhnhut@gmail.com
* Website: [Home test site](https://m4smep2ypy.us-west-2.awsapprunner.com/login)
* Postman: [Public workspace](https://www.postman.com/vietsalesplatform/workspace/hometest/overview)
* Github: [Home-test repo](https://github.com/minhnhut0602/take-home-test)
* AWS credentials with region **US West (Oregon) us-west-2**
* AWS Login site: [AWS login](https://aws-nhut-phan-group.signin.aws.amazon.com)
  * username: tester
  * password: NewTester@1

### Prerequisites
* **Git** - (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) follow this instruction to install git on your machine.
* **NodeJS** - This applicaion is tested with node v16.15.1 and npm v8.11.0. You can follow instructions https://nodejs.org/en/ to install node and npm on your machine.
* **Docker** - This application is tested with docker v20.10.17. You can follow instructions https://docs.docker.com/engine/installation/ to install Docker on your machine.
* **Docker compose** - (https://docs.docker.com/compose/install/)

### How to Run/Test?
Make sure that, you have installed Git and Node your machine before proceeding.

#### Clone workshop repository
Clone the source code repository:
```
mkdir ~/test-app
cd ~/test-app
git clone https://github.com/minhnhut0602/take-home-test.git
cd ~/test-app/take-home-test/src
npm install
```

## Running the application
To ensure Docker and Docker-compose on your machine before proceeding. 
```
docker-compose up -d
```
And then the application and database will be started:
```
 ⠿ Container src-mysql-1  Started...
 ⠿ Container src-web-1    Started...
```
The application will be available on PORT 3000 by default, but it's configurable via docker-compose.yml file as an environment variable.
```
http://localhost:3000
```