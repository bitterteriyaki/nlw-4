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

import { getCustomRepository } from 'typeorm';
import { Router } from 'express';

import UsersRepository from '../repositories/UsersRepository';
import SurveysRepository from '../repositories/SurveysRepository';
import SurveysResponsesRepository from '../repositories/SurveysResponsesRepository';

import MailService from '../services/MailService';
import { AppError } from '../errors';

const router = Router();

router.get('/', async (_req, res) => {
  const surveys = getCustomRepository(SurveysRepository);
  return res.json(await surveys.find())
});

router.post('/', async (req, res) => {
  const { title, description } = req.body;

  const surveys = getCustomRepository(SurveysRepository);
  const survey = surveys.create({ title, description });

  await surveys.save(survey);
  return res.status(201).json(survey)
});

router.post('/email', async (req, res, next) => {
  const { email, survey_id } = req.body;

  const users = getCustomRepository(UsersRepository);
  const surveys = getCustomRepository(SurveysRepository);
  const responses = getCustomRepository(SurveysResponsesRepository);

  const user = await users.findOne({ email });
  const survey = await surveys.findOne({ id: survey_id });

  if (!user) {
    throw new AppError('User does not exists');
  }

  if (!survey) {
    throw new AppError('Survey does not exists');
  }

  const path = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs');
  const existingResponse = await responses.findOne({
    where: { user_id: user.id, value: null },
    relations: ['user', 'survey']
  });

  const variables = {
    name: user.name,
    title: survey.title,
    description: survey.description,
    link: process.env.URL_MAIL,
    id: null
  };


  if (existingResponse) {
    variables.id = existingResponse.id;

    await MailService.send(email, survey.title, variables, path);
    return res.json(existingResponse);
  }

  const surveyResponse = responses.create({ user_id: user.id, survey_id });
  await responses.save(surveyResponse);

  variables.id = surveyResponse.id;

  await MailService.send(email, survey.title, variables, path);

  return res.json(surveyResponse);
});

export default {
  path: '/surveys',
  router: router
}
