![rocketseat](./_site/rocketseat.png)

<div style="text-align: center;">
  <h1>Next Level Week #4</h1>
  <img src="https://img.shields.io/github/license/soukyomi/nlw-4"/>
  <img src="https://img.shields.io/discord/327861810768117763?label=discord"/>
  
  <p>Este é meu repositório contendo o código das aulas da NLW #4. Que ocorreu em fevereiro de 2021. 🚀</p>
  <p>Este repositório foi arquivado já que ele foi feito para fins demonstrativos apenas. Este código possui partes autorais minhas, já que eu não copiei o código completamente. Para ver o que eu decidi fazer diferente, clique <a href="docs/WHAT_WAS_CHANGED.md">aqui</a>.</p>
</div>

Tabela de conteúdos
=================
<!--ts-->
  * [Pré-requisitos](#pre-requisitos)
  * [Instalação](#instalacao)
  * [Tecnologias usadas](#tecnologias-usadas)
  * [Autor](#autor)
  * [Licença](#licenca)

## Pré-requisitos
Antes de começar, verifique se você possui o Node e o Git instalados.

1. Instale o Yarn
```
$ npm i yarn -g
```

2. Clone o repositório
```
$ git clone https://github.com/soukyomi/nlw-4
```

3. Acesse a pasta do projeto no seu terminal
```
$ cd nlw-4
$ cd node
```

## Instalação
A instalação do projeto é simples:

1. Faça as configurações do banco de dados
```
$ yarn typeorm migration:run
```

2. Ligue a aplicação
```
$ yarn dev
```

## Tecnologias usadas
As seguintes tecnologias foram usadas neste projeto:

- [Node](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Handlebars](https://handlebarsjs.com/)
- [Nodemailer](https://nodemailer.com/about/)
- [SQLite](https://www.sqlite.org/index.html)
- [TypeORM](https://typeorm.io/#/)
- [Yup](https://www.npmjs.com/package/yup)
- [Jest](https://jestjs.io/)
- [SuperTest](https://www.npmjs.com/package/supertest)

## Autor
<div style="text-align: center;">
  <img src="https://cdn.discordapp.com/attachments/816517409573437470/833426158996422707/image.png"/>
  <p><strong>kyomi</strong></p>

  Desenvolvedor proficiente em Python, com conhecimentos em diversas linguagens.

  [![linkedin](https://img.shields.io/badge/-Caio-blue?style=flat-square&logo=LINKEDIN&logoColor=white&link=https://www.linkedin.com/in/soukyomi)](https://www.linkedin.com/in/soukyomi)
  [![gmail](https://img.shields.io/badge/-contato.kyomi@gmail.com-c14438?style=flat-square&logo=GMAIL&logoColor=white&link=mailto:contato.kyomi@gmail.com)](mailto:contato.kyomi@gmail.com)
</div>

## Licença
Este código está protegido sob a licença MIT.
```
MIT License

Copyright (c) 2021 Caio Alexandre

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
