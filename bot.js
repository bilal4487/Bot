const venom = require('venom-bot');
const randomEmoji = require('random-emoji');

venom.create().then(client => start(client)).catch(error => console.log(error));

function decorateMessage(msg) {
  const emojis = randomEmoji.random({count: 3}); // يختار 3 ايموجي عشوائية
  const decorate = emojis.map(e => e.char).join(' ');
  return decorate + " " + msg + " " + decorate;
}

function start(client) {
  client.onMessage(async message => {
    if(message.body) {
      const reply = decorateMessage(message.body);
      await client.sendText(message.from, reply);
    }
  });
}
