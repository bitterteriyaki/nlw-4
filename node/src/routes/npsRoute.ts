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
import { getCustomRepository, Not, IsNull } from 'typeorm';

import SurveysResponseRepository from '../repositories/SurveysResponsesRepository';

const router = Router();

router.get('/:survey_id', async (req, res) => {
  const { survey_id } = req.params;

  const repository = getCustomRepository(SurveysResponseRepository);
  const responses = await repository.find({ survey_id, value: Not(IsNull()) });
  
  const detractors = responses.filter(survey => survey.value >= 0 && survey.value <= 6).length;
  const promoters = responses.filter(survey => survey.value >= 9 && survey.value <= 10).length;
  const passives = responses.filter(survey => survey.value >= 7 && survey.value <= 8).length;

  const total = responses.length;
  const nps = Number((((promoters - detractors) / total) * 100).toFixed(2));

  return res.json({ detractors, promoters, passives, total, nps });
});

export default {
  path: '/nps',
  router: router
}
