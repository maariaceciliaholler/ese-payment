# ese-payment
Repository for the Service-Oriented Software Engineering course

## Comandos Docker úteis

| Comando                     | O que faz                                                   |
|----------------------------|-------------------------------------------------------------|
| `docker-compose up`        | Sobe os containers (sem rebuild).                          |
| `docker-compose up -d`     | Sobe os containers em segundo plano.                       |
| `docker-compose down`      | Derruba os containers e a rede criada.                     |
| `docker-compose down -v`   | Derruba containers e apaga volumes (⚠️ dados somem!).       |
| `docker-compose build`     | Só faz o rebuild das imagens, sem subir.                   |
| `docker-compose ps`        | Mostra o status dos containers da sua stack.               |
| `docker-compose logs -f`   | Acompanha os logs de todos os serviços em tempo real.      |


sudo lsof -i :5432 - para encontrar o PID que está usando a porta
sudo kill -9 <PID>

Comando para povoar o banco
docker cp script.sql ese-payment_postgres_1:/tmp/script.sql
docker exec -it ese-payment_postgres_1 psql -U postgres -d nhslog -f /tmp/script.sql

Para entrar no banco e ver as collections
psql -U postgres
\c nhslog