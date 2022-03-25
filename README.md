# Cadastro de Desenvolvedores

## Sobre

Esta aplicação tem como objetivo permitir que o usuário faça o gerenciamento de uma lista de desenvolvedores, podendo cadastrar, atualizar, visualizar e remover um registro, além de associá-lo a um nível.

## Tecnologias Utilizadas

No desenvolvimento desta aplicação foram utilizadas as seguintes tecnologias:

- <a href="https://nodejs.org" target="_blank">NodeJS</a> - Interpretador javascript
- <a href="https://adonisjs.com" target="_blank">AdonisJS</a> - Framework backend
- <a href="https://pt-br.reactjs.org" target="_blank">ReactJS</a> - Framework frontend
- <a href="https://getbootstrap.com" target="_blank">Bootstrap</a> - Componentes estilizados

## Demonstração Online

A demonstração está <a href="http://desafio-fullstack.socialfitness.com.br" target="_blank">hospedada</a> na AWS.

## Download

```bash
# Clonar o repositório
$ git clone https://github.com/antunesdanilo/desafio-fullstack.git

# Instalar as dependências do backend
$ cd backend && npm install

# Instalar as dependências do frontend
$ cd frontend && npm install
```

## Instalação em container

Pré-requisitos

Docker<br/>
NodeJs<br/>
NPM

### Com docker compose

```bash
# Entrar no diretório do projeto
$ cd desafio-fullstack

# Fazer o build das imagens e criar os containers
$ docker-compose up -d --build
```

### Com containers isolados

```bash
# Entrar no diretório do projeto
$ cd desafio-fullstack

# Entrar no sub-diretório backend
$ cd backend

# Fazer o build da imagem
$ docker build -t desafio-fullstack/backend .

# Executar o container
$ docker run -it -p 3333:3333 desafio-fullstack/backend


# Entrar no sub-diretório frontend
$ cd frontend

# Fazer o build da imagem
$ docker build -t desafio-fullstack/frontend .

# Executar o container
$ docker run -it -p 80:80 desafio-fullstack/frontend
```

Acessar <a href="http://localhost" target="_blank">localhost</a>

## Instalação local

Pré-requisitos

NodeJS<br/>
NPM

```bash
# Clonar o repositório
$ git clone https://github.com/antunesdanilo/desafio-fullstack.git

# Entrar no diretório do projeto
$ cd desafio-fullstack

# Iniciar o backend
$ cd backend && npm run dev

# Iniciar o frontend
$ cd frontend && npm start
```

Acessar <a href="http://localhost" target="_blank">localhost</a>

## Testes

### Backend

```bash
# Entrar no diretório do projeto
$ cd desafio-fullstack

# Entrar no sub-diretório backend
$ cd backend

# Execução do servidor de testes (necessário para a transpilação dos arquivos ts em js)
$npm run dev

#Execução dos testes
$ npm run test
```

---
Desenvolvido por @DaniloAntunes - 2022