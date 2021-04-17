import { Express, json } from 'express';

export default {
  init(app: Express) {
    app.use(json());
  }
}
