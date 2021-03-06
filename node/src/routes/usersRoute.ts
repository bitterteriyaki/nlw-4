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
import * as yup from 'yup';

import { AppError } from '../errors';
import UsersRepository from '../repositories/UsersRepository';

const router = Router();

router.post('/', async (req, res, next) => {
  const { name, email } = req.body;

  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required()
  });

  if (!(await schema.isValid(req.body))) {
    throw new AppError('Invalid fields');
  }

  const users = getCustomRepository(UsersRepository)

  if (await users.findOne({ email })) {
    throw new AppError('User already exists');
  }

  const user = users.create({ name, email });

  await users.save(user);
  return res.status(201).json(user)
});

export default {
  path: '/users',
  router: router
} 
