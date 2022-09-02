# Cafeteria

## Rodar RabbitMQ localmente no docker container
`docker run -d -p 5672:5672 -p 15672:15672 rabbitmq:3-management`
### Acessar interface do RabbitMQ em [localhost:15672](http://localhost:15672/)

## Rodar coffe-maker e coffe-deliver no Bash:
`./coffee-maker.js`
`./coffee-deliver.js`

## Criar ordem de café
`./order-coffee.js "coffee_name" "client_name"`

Exemplo: `./order-coffee.js "expresso" "Guilherme"`

## Arquitetura
![Arquitetura](./CoffeeShopArchitecture.png)

## Baseado no https://www.rabbitmq.com/tutorials/tutorial-five-javascript.html