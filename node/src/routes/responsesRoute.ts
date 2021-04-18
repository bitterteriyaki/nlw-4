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

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import SurveysResponsesRepository from '../repositories/SurveysResponsesRepository';
import { AppError } from '../errors';

const router = Router();

router.get('/:value', async (req, res, next) => {
  const { value } = req.params;
  const { s } = req.query;

  const responses = getCustomRepository(SurveysResponsesRepository);
  const response = await responses.findOne({ id: String(s) });

  if (!response) {
    throw new AppError('Response does not exists');
  }

  response.value = Number(value);
  await responses.save(response);

  return res.json(response);
});

export default {
  path: '/responses',
  router: router
}
