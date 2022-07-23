const { Client } = require('discord.js')
const axios = require('axios').default;
require('dotenv').config()

const token = process.env.DISCORDJS_BOT_TOKEN
const prefix = '$'

const client = new Client({
  allowedMentions: {
    parse: [`users`, `roles`],
    repliedUser: true,
  },
  intents: [
    "GUILDS",
    "GUILD_MESSAGES"
  ],
})

client.on('ready', () => {
  console.log("Bot is online!");
})

client.on('message', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/)
  const command = args.shift().toLowerCase()
  if (command === 'help') {
    message.channel.send(`Я пока умею только чекать рио персонажей на ревущем фьорде, для этого отправь '${prefix}rio Имя_персонажа'`)
  }
  if (command === 'rio') {
    axios.get('https://raider.io/api/v1/characters/profile', {
      params: {
        region: `eu`,
        realm: `howling-fjord`,
        name: args[0],
        fields: 'mythic_plus_scores'
      }
    })
      .then(function (response) {
        const rio = response.data.mythic_plus_scores.all
        if (rio > 0) {
          message.channel.send("Твое рио: " + String(rio))
        } else {
          message.channel.send("Такое чувство, что твоя подписка не оплачена в этом сезоне")
        }
      })
      .catch(function (error) {
        messageText = error.response.data.message
        message.channel.send(messageText)
      })
      .then(function () {
        // always executed
      });
  }

})

client.login(token)