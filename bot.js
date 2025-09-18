const venom = require('venom-bot');
const fs = require('fs');

venom.create().then(client => start(client)).catch(error => console.error(error));

function saveMessage(data) {
  let messages = [];
  if (fs.existsSync('ser.json')) {
    const content = fs.readFileSync('ser.json', 'utf-8');
    if (content) messages = JSON.parse(content);
  }
  messages.push(data);
  fs.writeFileSync('ser.json', JSON.stringify(messages, null, 2));
}

function start(client) {
  client.onMessage(async message => {
    if (message.body) {
      // حفظ رسالة المستخدم
      const now = new Date();
      const data = {
        n: message.sender.pushname || "مجهول",
        text: message.body,
        d: now.toISOString().split('T'),
        t: now.toTimeString().split(' '),
      };
      saveMessage(data);

      // رد ثابت
      await client.sendText(message.from, "شكران");
    }
  });

  client.onStateChange(state => {
    console.log('State changed:', state);
  });

  client.onStreamChange(stream => {
    if (stream === 'CONNECTED') {
      console.log('WhatsApp connected!');
    }
  });
}
