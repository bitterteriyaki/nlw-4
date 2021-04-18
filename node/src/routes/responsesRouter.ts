// MIT License

// Copyright (c) 2021 Caio Alexandre

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import { resolve } from 'path';

import { json, Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UsersRepository from '../repositories/UsersRepository';
import SurveysRepository from '../repositories/SurveysRepository';
import SurveysResponsesRepository from '../repositories/SurveysResponsesRepository';

import MailService from '../services/MailService';
import { AppError } from '../errors';

const router = Router();

router.post('/', async (req, res, next) => {
  const { email, survey_id } = req.body;

  const users = getCustomRepository(UsersRepository);
  const surveys = getCustomRepository(SurveysRepository);
  const responses = getCustomRepository(SurveysResponsesRepository);

  const user = await users.findOne({ email });
  const survey = await surveys.findOne({ id: survey_id });

  if (!user) {
    return next(new AppError(400, 'User does not exists'));
  }

  if (!survey) {
    return next(new AppError(400, 'Survey does not exists'));
  }

  const path = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
  const variables = {
    name: user.name,
    title: survey.title,
    description: survey.description,
    user_id: user.id,
    link: process.env.URL_MAIL
  };

  const existingResponse = await responses.findOne({
    where: [{ user_id: user.id }, { value: null }],
    relations: ['user', 'survey']
  });

  if (existingResponse) {
    await MailService.send(email, survey.title, variables, path);
    return res.json(existingResponse);
  }

  const surveyResponse = responses.create({ user_id: user.id, survey_id });
  await responses.save(surveyResponse);

  await MailService.send(email, survey.title, variables, path);

  return res.json(surveyResponse);
});

export default {
  path: '/responses',
  router: router
}
