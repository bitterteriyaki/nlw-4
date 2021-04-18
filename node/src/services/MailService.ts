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
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRzINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

import fs from 'fs';

import nodemailer, { Transporter } from 'nodemailer';
import handleBars from 'handlebars';

import { log } from '../utils';

class MailService {
  private transporter: Transporter

  constructor() {
    nodemailer.createTestAccount((err, account) => {
      if (err) throw err;

      this.transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: { user: account.user, pass: account.pass }
      })
    })
  }

  async send(to: string, subject: string, variables: object, path: string) {
    const input = fs.readFileSync(path).toString('utf-8');

    const template = handleBars.compile(input)
    const html = template(variables);

    const message = await this.transporter.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreply@email.com>'
    });

    log(`Message sent: ${message.messageId}`);
    log(`Preview URL: ${nodemailer.getTestMessageUrl(message)}`);
  }
};

export default new MailService()
