
# Typer

Um jogo de digitação (typing game) com backend em Java Spring Boot e frontend em Vite + React.




## Database Setup (MySQL)

O backend depende de um banco de dados MySQL. Antes de rodar o projeto, crie o banco de dados executando o comando abaixo no terminal:

```bash
  mysql -u root -p -e "CREATE DATABASE typer_db;"
```

Depois, configure as credenciais no arquivo springboot-app/src/main/resources/application.properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/typer_db
spring.datasource.username=root
spring.datasource.password=your_password
```
## Deployment

Para executar este projeto rode este comando

```bash
  git clone https://github.com/VitorAu/typer.git
```

```bash
  ./start-all.sh
```

