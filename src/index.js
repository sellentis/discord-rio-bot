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

client.login(token)