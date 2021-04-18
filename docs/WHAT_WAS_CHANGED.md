# O que eu mudei no código?
Como eu não concordei com certas partes de código trabalhados na NLW #4, eu me senti a vontade de mudar algumas estruturas do código, esta página mostra com detalhes o que eu mudei.

## App montável
Eu adoro de trabalhar com o conceito de uma aplicação montável, aonde você pode adicionar ou remover "plugins" da aplicação, e mesmo assim ela funciona normalmente. Por causa disso, eu trabalhei este conceito na minha aplicação. Veja:


`app.ts`
```ts
import express from 'express';

// ...

const app = express();

import middlewares from './middlewares';
import routes from './routes';
import handlers from './handlers';

middlewares.init(app);
routes.init(app);
handlers.init(app);

export default app
```

Aqui vemos que há certos módulos que são importados e em seguida inicializados, passando o `app` do Express como parâmetro da função. Este é um modelo que eu gosto de usar já que você pode remover qualquer plugin e a aplicação continuará funcionando normalmente (claro, sem as features do plugin).

Por exemplo, remover a linha `routes.init(app)` irá remover as rotas da aplicação. A aplicação continuará funcionando normalmente, mas claro, sem suas rotas.


`routes/index.ts`
```ts
import { Express } from 'express';

import usersRoute from './usersRoute';
import surveysRoute from './surveysRoute';
import responsesRoute from './responsesRoute';
import npsRoute from './npsRoute';

export default {
  init(app: Express) {
    app.use(usersRoute.path, usersRoute.router);
    app.use(surveysRoute.path, surveysRoute.router);
    app.use(responsesRoute.path, responsesRoute.router);
    app.use(npsRoute.path, npsRoute.router);
  }
}
```

Dentro das rotas, vemos que o módulo retorna um objeto com a função `init` e que dentro dela adicionamos todas as rotas necessárias. Há duas coisas que podem ser notadas aqui:
1. Não trabalhei com o conceito de *controllers* (na qual foi trabalhado na NLW #4). Isso é explicado no próximo tópico.
2. Esse código poderia ser automatizado, para que as rotas fossem adicionadas automaticamente, sem precisar adicionar manualmente.

O motivo de eu não ter automatizado a adição de rotas foi porque este é um projeto simples. Não há necessidade de automatizar tudo.

## `Router`s ao invés de *controllers*
É possível notar que meu projeto não possui *controllers*, mas ao invés disso, cada rota possui seu próprio `Router`, veja:

`routes/usersRoute.ts`
```ts
import { Router } from 'express';

// ...

const router = Router();

// Rotas são criadas aqui.

export default {
  path: '/users',
  router: router
}
```

O motivo disso é que, na minha opinião, `Router`s deveriam ser usados para cada rota da aplicação, e por fim acoplados ao app. Além disso, isso me garante que eu não precise usar `app.use`s redundantes como foi feito no evento. Veja:

```ts
app.use('/users', UsersController.view);
app.use('/users', UsersController.execute);
app.use('/users', UsersController.patch);
// ...

// versus

app.use('/users', usersRoute.router);
```

Bem mais limpo, né?

## Módulo de utilidades
É possível notar que em `node/src` há um arquivo `utils.ts`. Este arquivo serve apenas para utilidades que podem ser adicionados de acordo com a necessidade. Lá eu adicionei um enum de cores para o terminal e também a função `log()`, que faz um `console.log()` formatado.

É válido lembrar que esse módulo foi criado para fins demonstrativos e não foi usado completamente no projeto, logo ele poderia ser descartado.
