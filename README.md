# cl-desafio-jwe

API _restful_ para demonstração de login de usuário utilizando JWE (JSON Web Encryption) para _encriptar/decriptar_ payload.

<!-- > **Importante**
>  -->

## Tecnologias
- [Node v22.15.1](https://nodejs.org/)
- [Express](https://expressjs.com/) 
- [PostgreSQL](https://www.postgresql.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [JOSE](https://github.com/panva/jose)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/) 
- [Swagger](https://www.npmjs.com/package/swagger-ui-express)

## Como executar a aplicação

Para executar a aplicação é necessário ter o _docker_ instalado. Com isso, executar o compose conforme o comando abaixo:
```sh
docker-compose up --build
```
> :warning: **Atenção!** :warning:
> 
> As variáveis de ambiente estão configuradas no arquivo _docker-compose.yml_ por este ser apenas um repositório de **TESTE**. Por este mesmo motivo estão disponíveis tambéms as chaves [**dev-private.pem**](dev-private.pem) e [**dev-public.pem**](dev-public.pem).
> Como boas práticas de desenvolvimento e segurança, essas informações devem ser configuradas no ambiente.
> Mais uma vez, a configuração foi disponibilizada aqui apenas como **facilitação** dos testes.
>
> Caso queira gerar novas chaves, executar os comandos abaixo:
> ```sh
> # geração de chave privada
> openssl genpkey -algorithm RSA -out dev-private.pem -pkeyopt rsa_keygen_bits:2048
> # geração de chave pública
> openssl rsa -in dev-private.pem -pubout -out dev-public.pem 
> ```

Com a aplicação rodando, é possível acessar o _swagger_ através do [/docs](http://localhost:3000/docs)
