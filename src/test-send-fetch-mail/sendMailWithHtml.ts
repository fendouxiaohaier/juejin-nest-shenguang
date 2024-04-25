import nodemailer = require('nodemailer');
import * as fs from 'fs';
import * as path from 'path';

const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 587,
  secure: false,
  auth: {
    user: '1025350644@qq.com',
    pass: 'zliunhbvgljobdgh', // 邮箱授权码
  },
});

async function main() {
  const info = await transporter.sendMail({
    from: '"liYang" <1025350644@qq.com>',
    to: 'cdjv_liyang@163.com',
    subject: 'Hello',
    html: fs.readFileSync(path.join(__dirname, './threeBird.html')),
  });

  console.log('html邮件发送成功：', info.messageId);
}

main().catch(console.error);
