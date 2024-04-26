import Imap = require('imap');
import * as MailParser from 'mailparser';
import * as fs from 'fs';
import * as path from 'path';

const imap = new Imap({
  user: '1025350644@qq.com',
  password: 'zliunhbvgljobdgh',
  host: 'imap.qq.com',
  port: 993,
  tls: true,
});

imap.once('ready', () => {
  imap.openBox('INBOX', true, (err) => {
    console.log('打印日志看看-err:', err);

    imap.search(
      // ['SEEN'] 是查询已读的邮件。
      // ['UNSEEN'] 是查询未读的邮件。
      // ['SINCE', '某个日期'] 是查询从这个日期以来的邮件。
      [
        ['UNSEEN'],
        // ['SEEN'],
        // ['SINCE', 'May 20, 2010'],
      ],
      (err, results) => {
        if (!err) {
          console.log(results);
          handleResults(results);
        } else {
          throw err;
        }
      },
    );
  });
});

imap.connect();
/**
 * imap.fetch 来请求这些 id 的内容，bodies 为 '' 是查询 header + body 的意思
 * @param results
 */
function handleResults(results) {
  imap
    .fetch(results, {
      bodies: '',
    })
    .on('message', (msg) => {
      const mailparser = new MailParser.MailParser();

      msg.on('body', (stream) => {
        const info: any = {};
        stream.pipe(mailparser);

        mailparser.on('headers', (headers) => {
          info.theme = headers.get('subject');
          info.form = headers.get('from').value[0].address;
          info.mailName = headers.get('from').value[0].name;
          info.to = headers.get('to').value[0].address;
        });

        mailparser.on('data', (data) => {
          if (data.type === 'text') {
            info.html = data.html;
            info.text = data.text;

            const filePath = path.join(
              __dirname,
              'mails',
              info.theme + '.html',
            );
            fs.writeFileSync(filePath, info.html || info.text);

            console.log('打印日志看看-info:', info);
          }
          if (data.type === 'attachment') {
            const filePath = path.join(__dirname, 'files', data.filename);
            const ws = fs.createWriteStream(filePath);
            data.content.pipe(ws);
          }
        });
      });
    });
}
