const Discord = require('discord.js')
require('dotenv').config()

const token = process.env.DISCORDJS_BOT_TOKEN
const prefix = '-'

const client = new Discord.Client({
  allowedMentions: {
    parse: [`users`, `roles`],
    repliedUser: true,
  },
  intents: [
    "GUILDS",
    "GUILD_MESSAGES",
    "GUILD_MEMBERS"
  ],
})

let bot = {
  client,
  prefix,
  owners: ["334052461587333130"]
}

client.commands = new Discord.Collection()
client.events = new Discord.Collection()

client.loadEvents = (bot, reload) => require('./handlers/events')(bot, reload)
client.loadCommands = (bot, reload) => require('./handlers/commands')(bot, reload)

client.loadEvents(bot, false)
client.loadCommands(bot, false)

module.exports = bot

// client.on('ready', () => {
//   console.log("Bot is online!");
// })

// client.on('messageCreate', (message) => {
//   if (!message.content.startsWith(prefix) || message.author.bot) return;

//   const args = message.content.slice(prefix.length).split(/ +/)
//   const command = args.shift().toLowerCase()
//   if (command === 'help') {
//     message.reply(`Я пока умею только чекать рио персонажей на ревущем фьорде, для этого отправь '${prefix}rio Имя_персонажа'`)
//   }
//   if (command === 'rio') {
//     axios.get('https://raider.io/api/v1/characters/profile', {
//       params: {
//         region: `eu`,
//         realm: `howling-fjord`,
//         name: args[0],
//         fields: 'mythic_plus_scores'
//       }
//     })
//       .then(function (response) {
//         const rio = response.data.mythic_plus_scores.all
//         if (rio > 0) {
//           message.reply("Твое рио: " + String(rio))
//         } else {
//           message.reply("Такое чувство, что твоя подписка не оплачена в этом сезоне")
//         }
//       })
//       .catch(function (error) {
//         messageText = error.response.data.message
//         message.reply(messageText)
//       })
//       .then(function () {
//         // always executed
//       });
//   }
// })

client.login(token)