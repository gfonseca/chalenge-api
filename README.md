# ms-watchlist

### Este é um serviço de favoritos para que usuários do Magazine Luiza possam registrar os seu produtos desejados.

## Dependências
- node >= v12.16.1 
- yarn
- docker
- docker-compose

## Test
```sh
$ yarn test
```

- Após executar os testes é possível visualizar os relatorios de cobertura de testes na passta ./coverage/


## Build & Run
```sh
$ docker-compose build && docker-compose up
```

Após este passo é possível acessar a aplicação através da porta 3000 que estara disponível localmente
___
 ***Opcionalmente é possível executar os seeds do projeto para popular o banco de dados***
 ```
 docker exec -it ms-watchlist yarn seed
 ```
_______
Também é possível executar o servidor sem uso do docker
```sh
$ yarn 
$ yarn start
```
Este modo não irá prover o serviço "mongodb"

## Postman
Após a instalação está disponível uma pequena collection do postman em ./postman/chalenge-api.postman_collection.json, la consta uma documentação das rotas e de seus parâmetros.

