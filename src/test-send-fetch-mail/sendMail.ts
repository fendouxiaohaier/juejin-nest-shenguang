import nodemailer = require('nodemailer');

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
    text: '我是通过node发送的邮件',
  });

  console.log('邮件发送成功：', info.messageId);
}

main().catch(console.error);
